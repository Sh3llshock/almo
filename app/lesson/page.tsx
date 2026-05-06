import { redirect } from "next/navigation";

import { getLesson, getUserProgress, getUserSubscription } from "@/db/queries";

import { Quiz } from "./quiz";

function interleaveByType<T extends { type: string; completed: boolean }>(items: T[]): T[] {
  // Separate completed (already done) from pending
  const completed = items.filter((c) => c.completed);
  const pending = items.filter((c) => !c.completed);

  // Group pending by type
  const groups = new Map<string, T[]>();
  for (const item of pending) {
    const arr = groups.get(item.type) ?? [];
    arr.push(item);
    groups.set(item.type, arr);
  }

  const result: T[] = [];
  let lastType: string | null = null;
  let secondLastType: string | null = null;

  while (groups.size > 0) {
    // Pick the type with most remaining that isn't the last two used
    let best: string | null = null;
    let bestCount = -1;
    for (const [type, arr] of groups) {
      const blocked = arr.length > 0 && type === lastType && type === secondLastType;
      if (!blocked && arr.length > bestCount) {
        bestCount = arr.length;
        best = type;
      }
    }
    // Fallback: if all remaining share the last type, just pick the largest
    if (!best) {
      for (const [type, arr] of groups) {
        if (arr.length > bestCount) { bestCount = arr.length; best = type; }
      }
    }
    if (!best) break;

    const arr = groups.get(best)!;
    result.push(arr.shift()!);
    if (arr.length === 0) groups.delete(best);

    secondLastType = lastType;
    lastType = best;
  }

  return [...completed, ...result];
}

const LessonPage = async () => {
  const lessonData = getLesson();
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();

  const [lesson, userProgress, userSubscription] = await Promise.all([
    lessonData,
    userProgressData,
    userSubscriptionData,
  ]);

  if (!lesson || !userProgress) return redirect("/learn");

  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100;

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={interleaveByType(lesson.challenges)}
      initialStreak={userProgress.streak}
      initialPercentage={initialPercentage}
      userSubscription={userSubscription}
      unitId={lesson.unitId}
      unitTitle={lesson.unit?.title ?? ""}
    />
  );
};

export default LessonPage;
