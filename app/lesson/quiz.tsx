"use client";

import { useCallback, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import { useAudio, useWindowSize, useMount } from "react-use";
import { toast } from "sonner";
import { ArrowLeft, BookOpen } from "lucide-react";

import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { challengeOptions, challenges, userSubscription } from "@/db/schema";
import { parseGlossary } from "@/lib/parse-glossary";
import { anatomyNotes } from "@/lib/anatomy-notes";
import { NotesView } from "@/components/notes-view";
import { Button } from "@/components/ui/button";
import { usePracticeModal } from "@/store/use-practice-modal";
import { useStreakModal } from "@/store/use-streak-modal";
import { cn } from "@/lib/utils";

import { Challenge } from "./challenge";
import { Footer } from "./footer";
import { Header } from "./header";
import { QuestionBubble } from "./question-bubble";
import { ResultCard } from "./result-card";

type ChallengeWithMeta = typeof challenges.$inferSelect & {
  completed: boolean;
  challengeOptions: (typeof challengeOptions.$inferSelect)[];
};

type QuizProps = {
  initialPercentage: number;
  initialStreak: number;
  initialLessonId: number;
  initialLessonChallenges: ChallengeWithMeta[];
  userSubscription:
    | (typeof userSubscription.$inferSelect & { isActive: boolean })
    | null;
  unitId: number;
  unitTitle: string;
};

type NotesOverlay = { sectionId: string; highlightTerm: string };
type Phase = "main" | "recap-intro" | "recap";

const FillBlankDisplay = ({
  question,
  selectedText,
  status,
}: {
  question: string;
  selectedText?: string;
  status: "none" | "correct" | "wrong";
}) => {
  const parts = question.split("___");
  const before = parts[0] ?? "";
  const after = parts[1] ?? "";

  return (
    <div className="text-center lg:text-start">
      <p className="text-lg font-bold leading-relaxed text-neutral-700 lg:text-2xl">
        {before}
        <span
          className={cn(
            "inline-block min-w-[100px] border-b-2 px-2 text-center",
            !selectedText && "border-slate-400 text-slate-300",
            selectedText && status === "none" && "border-sky-400 text-sky-500",
            selectedText && status === "correct" && "border-green-500 text-green-500",
            selectedText && status === "wrong" && "border-rose-500 text-rose-500"
          )}
        >
          {selectedText ?? ""}
        </span>
        {after}
      </p>
      {!selectedText && (
        <p className="mt-2 text-sm font-normal text-slate-400">
          Tap the missing word
        </p>
      )}
    </div>
  );
};

export const Quiz = ({
  initialPercentage,
  initialStreak,
  initialLessonId,
  initialLessonChallenges,
  userSubscription,
  unitId,
  unitTitle,
}: QuizProps) => {
  const [correctAudio, , correctControls] = useAudio({ src: "/correct.wav" });
  const [incorrectAudio, , incorrectControls] = useAudio({ src: "/incorrect.wav" });
  const [finishAudio] = useAudio({ src: "/finish.mp3", autoPlay: true });
  const { width, height } = useWindowSize();
  const router = useRouter();
  const { open: openPracticeModal } = usePracticeModal();

  useMount(() => {
    if (initialPercentage === 100) openPracticeModal();
  });

  const [lessonId] = useState(initialLessonId);
  const [streak, setStreak] = useState(initialStreak);
  const [pendingStreakValue, setPendingStreakValue] = useState<number | undefined>();
  const [percentage, setPercentage] = useState(() =>
    initialPercentage === 100 ? 0 : initialPercentage
  );
  const [challenges] = useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    const idx = challenges.findIndex((c) => !c.completed);
    return idx === -1 ? 0 : idx;
  });

  // Wrong-queue state
  const [phase, setPhase] = useState<Phase>("main");
  const [wrongItems, setWrongItems] = useState<ChallengeWithMeta[]>([]);
  const [recapQueue, setRecapQueue] = useState<ChallengeWithMeta[]>([]);
  const [recapTotalCount, setRecapTotalCount] = useState(0);
  const [recapCorrectCount, setRecapCorrectCount] = useState(0);

  // Answer state
  const [selectedOption, setSelectedOption] = useState<number>();
  const [status, setStatus] = useState<"none" | "wrong" | "correct">("none");
  const [correctOptionId, setCorrectOptionId] = useState<number | undefined>();

  // Notes overlay
  const [notesOverlay, setNotesOverlay] = useState<NotesOverlay | null>(null);

  const hasNotes = anatomyNotes.some((n) => n.unitTitle === unitTitle);

  const challenge = phase === "recap" ? recapQueue[0] : challenges[activeIndex];
  const options = challenge?.challengeOptions ?? [];

  const displayPercentage =
    phase === "recap"
      ? recapTotalCount > 0
        ? Math.round((recapCorrectCount / recapTotalCount) * 100)
        : 0
      : percentage;

  // Question counter
  const questionIndex =
    phase === "recap"
      ? recapTotalCount - recapQueue.length + 1
      : activeIndex + 1;
  const totalQuestions =
    phase === "recap" ? recapTotalCount : challenges.length;

  const correctAnswerText =
    status === "wrong" && correctOptionId
      ? options.find((o) => o.id === correctOptionId)?.text
      : undefined;

  const selectedOptionText =
    selectedOption !== undefined
      ? options.find((o) => o.id === selectedOption)?.text
      : undefined;

  const onSelect = (id: number) => {
    if (status !== "none") return;
    setSelectedOption(id);
  };

  const handleShowInNotes = useCallback(
    (sectionId: string, highlightTerm: string) => {
      setNotesOverlay({ sectionId, highlightTerm });
    },
    []
  );

  const onContinue = () => {
    if (!selectedOption) return;

    // ── Wrong: reveal was shown, now advance ───────────────────────────────
    if (status === "wrong") {
      setStatus("none");
      setSelectedOption(undefined);
      setCorrectOptionId(undefined);

      if (phase === "recap") {
        setRecapQueue((prev) => [...prev.slice(1), prev[0]]);
        return;
      }

      const nextIndex = activeIndex + 1;
      if (nextIndex >= challenges.length && wrongItems.length > 0) {
        setRecapQueue([...wrongItems]);
        setRecapTotalCount(wrongItems.length);
        setPhase("recap-intro");
        return;
      }
      setActiveIndex(nextIndex);
      return;
    }

    // ── Correct: advance ───────────────────────────────────────────────────
    if (status === "correct") {
      setStatus("none");
      setSelectedOption(undefined);
      setCorrectOptionId(undefined);

      if (phase === "recap") {
        const remaining = recapQueue.slice(1);
        setRecapQueue(remaining);
        setRecapCorrectCount((prev) => prev + 1);
        return;
      }

      const nextIndex = activeIndex + 1;
      if (nextIndex >= challenges.length && wrongItems.length > 0) {
        setRecapQueue([...wrongItems]);
        setRecapTotalCount(wrongItems.length);
        setPhase("recap-intro");
        return;
      }
      setActiveIndex(nextIndex);
      return;
    }

    // ── Check answer ───────────────────────────────────────────────────────
    const correctOption = options.find((o) => o.correct);
    if (!correctOption) return;

    if (correctOption.id === selectedOption) {
      void correctControls.play();
      setStatus("correct");
      if (phase !== "recap") {
        setPercentage((prev) => prev + 100 / challenges.length);
      }
      upsertChallengeProgress(challenge.id)
        .then((response) => {
          if (response?.streakIncremented) {
            setStreak(response.newStreak);
            setPendingStreakValue(response.newStreak);
          }
        })
        .catch(() => toast.error("Something went wrong. Please try again."));
    } else {
      void incorrectControls.play();
      setCorrectOptionId(correctOption.id);
      setStatus("wrong");
      if (phase === "main") {
        setWrongItems((prev) => [...prev, challenge]);
      }
    }
  };

  // ── Recap intro screen ───────────────────────────────────────────────────
  if (phase === "recap-intro") {
    return (
      <>
        <Header percentage={100} />
        <div className="mx-auto flex h-full max-w-lg flex-col items-center justify-center gap-y-6 px-6 text-center">
          <Image src="/mascot.png" alt="Mascot" height={100} width={100} />
          <h1 className="text-2xl font-bold text-neutral-700 lg:text-3xl">
            Nice work! Let&apos;s recap the{" "}
            <span className="text-brand-500">{wrongItems.length}</span>{" "}
            question{wrongItems.length !== 1 ? "s" : ""} you missed.
          </h1>
          <p className="text-muted-foreground">
            Get them right to complete the lesson. Wrong answers go back to the end of the queue.
          </p>
          <Button
            variant="secondary"
            size="lg"
            className="mt-2"
            onClick={() => setPhase("recap")}
          >
            Start recap
          </Button>
        </div>
      </>
    );
  }

  // ── Completion screen ────────────────────────────────────────────────────
  if (!challenge) {
    return (
      <>
        {finishAudio}
        <Confetti
          recycle={false}
          numberOfPieces={500}
          tweenDuration={10_000}
          width={width}
          height={height}
        />
        <div className="mx-auto flex h-full max-w-lg flex-col items-center justify-center gap-y-4 text-center lg:gap-y-8">
          <Image src="/finish.svg" alt="Finish" height={100} width={100} />
          <h1 className="text-lg font-bold text-neutral-700 lg:text-3xl">
            Great job! <br /> You&apos;ve completed the lesson.
          </h1>
          <div className="flex w-full items-center gap-x-4">
            <ResultCard variant="points" value={challenges.length * 10} />
            <ResultCard variant="streak" value={streak} />
          </div>
        </div>
        <Footer
          lessonId={lessonId}
          status="completed"
          onCheck={() =>
            router.push(
              pendingStreakValue
                ? `/learn?newStreak=${pendingStreakValue}`
                : "/learn"
            )
          }
        />
      </>
    );
  }

  const title =
    challenge.type === "ASSIST"
      ? "Select the correct meaning"
      : challenge.type === "FILL_BLANK"
        ? "Fill in the missing word"
        : challenge.question;

  // ── Quiz screen ──────────────────────────────────────────────────────────
  return (
    <>
      {incorrectAudio}
      {correctAudio}

      {/* Notes overlay */}
      {notesOverlay && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-white">
          <div className="sticky top-0 z-10 border-b bg-white shadow-sm">
            <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-3">
              <button
                onClick={() => setNotesOverlay(null)}
                className="flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:opacity-75"
              >
                <ArrowLeft size={16} />
                Back to quiz
              </button>
              <span className="text-sm text-slate-400">{unitTitle}</span>
            </div>
          </div>
          <NotesView
            unitTitle={unitTitle}
            sectionId={notesOverlay.sectionId}
            highlightTerm={notesOverlay.highlightTerm}
          />
        </div>
      )}

      <Header
        percentage={displayPercentage}
        questionIndex={questionIndex}
        totalQuestions={totalQuestions}
      />

      <div className="flex-1">
        <div className="flex h-full items-center justify-center">
          <div className="flex w-full flex-col gap-y-12 px-6 lg:min-h-[350px] lg:w-[600px] lg:px-0">
            {phase === "recap" && (
              <div className="rounded-lg bg-amber-50 px-4 py-2 text-center text-sm font-semibold text-amber-700">
                Recap mode — {recapQueue.length} question{recapQueue.length !== 1 ? "s" : ""} remaining
              </div>
            )}

            {challenge.type === "FILL_BLANK" ? (
              <FillBlankDisplay
                question={challenge.question}
                selectedText={selectedOptionText}
                status={status}
              />
            ) : (
              <h1 className="text-center text-lg font-bold text-neutral-700 lg:text-start lg:text-3xl">
                {parseGlossary(title, handleShowInNotes)}
              </h1>
            )}

            <div>
              {challenge.type === "ASSIST" && (
                <QuestionBubble question={challenge.question} />
              )}
              <Challenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                correctOptionId={correctOptionId}
                disabled={status !== "none"}
                type={challenge.type}
              />
            </div>

            {hasNotes && status === "none" && (
              <div className="flex justify-end">
                <button
                  onClick={() => setNotesOverlay({ sectionId: "", highlightTerm: "" })}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-brand-600"
                >
                  <BookOpen size={13} />
                  Open notes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer
        disabled={!selectedOption && status === "none"}
        status={status}
        onCheck={onContinue}
        correctAnswerText={correctAnswerText}
      />
    </>
  );
};
