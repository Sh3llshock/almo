import Image from "next/image";
import { redirect } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Progress } from "@/components/ui/progress";
import { UserProgress } from "@/components/user-progress";
import { DAILY_QUESTS } from "@/constants";
import { getUserProgress, getUserSubscription } from "@/db/queries";

const QuestsPage = async () => {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();

  const [userProgress, userSubscription] = await Promise.all([
    userProgressData,
    userSubscriptionData,
  ]);

  if (!userProgress || !userProgress.activeCourse) redirect("/courses");

  const isPro = !!userSubscription?.isActive;
  const todayStr = new Date().toISOString().slice(0, 10);
  const isToday = userProgress.dailyQuestDate === todayStr;

  const questProgress = [
    {
      ...DAILY_QUESTS[0],
      current: isToday ? userProgress.dailyXpEarned : 0,
      claimed: isToday ? userProgress.dailyXpQuestClaimed : false,
    },
    {
      ...DAILY_QUESTS[1],
      current: isToday ? userProgress.dailyQuizzesCompleted : 0,
      claimed: isToday ? userProgress.dailyQuizQuestClaimed : false,
    },
  ];

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          streak={userProgress.streak}
          lastActivityDate={userProgress.lastActivityDate ?? null}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
      </StickyWrapper>

      <FeedWrapper>
        <div className="flex w-full flex-col items-center">
          <Image src="/quests.svg" alt="Quests" height={90} width={90} />

          <h1 className="my-6 text-center text-2xl font-bold text-neutral-800">
            Daily Quests
          </h1>
          <p className="mb-6 text-center text-lg text-muted-foreground">
            Complete daily quests to earn bonus XP. Resets every day.
          </p>

          <ul className="w-full space-y-4">
            {questProgress.map((quest) => {
              const pct = Math.min((quest.current / quest.goal) * 100, 100);
              const done = quest.current >= quest.goal;

              return (
                <div
                  key={quest.id}
                  className="flex w-full items-center gap-x-4 rounded-xl border-2 p-4"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center">
                    {done ? (
                      <CheckCircle2 className="h-12 w-12 text-green-500" />
                    ) : (
                      <Image
                        src="/points.svg"
                        alt="XP"
                        width={52}
                        height={52}
                      />
                    )}
                  </div>

                  <div className="flex w-full flex-col gap-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-neutral-700">{quest.title}</p>
                      <span className="text-sm font-semibold text-orange-500">
                        {quest.claimed ? (
                          <span className="text-green-600">+{quest.reward} XP claimed!</span>
                        ) : (
                          `+${quest.reward} XP`
                        )}
                      </span>
                    </div>
                    <Progress value={pct} className="h-3" />
                    <p className="text-xs text-muted-foreground">
                      {quest.current} / {quest.goal}
                    </p>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default QuestsPage;
