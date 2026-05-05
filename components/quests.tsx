import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DAILY_QUESTS } from "@/constants";
import { getUserProgress } from "@/db/queries";

export const Quests = async () => {
  const userProgress = await getUserProgress();
  if (!userProgress) return null;

  const todayStr = new Date().toISOString().slice(0, 10);
  const isToday = userProgress.dailyQuestDate === todayStr;

  const questProgress = [
    {
      ...DAILY_QUESTS[0],
      current: isToday ? userProgress.dailyXpEarned : 0,
    },
    {
      ...DAILY_QUESTS[1],
      current: isToday ? userProgress.dailyQuizzesCompleted : 0,
    },
  ];

  return (
    <div className="space-y-4 rounded-xl border-2 p-4">
      <div className="flex w-full items-center justify-between">
        <h3 className="text-lg font-bold">Daily Quests</h3>
        <Link href="/quests">
          <Button size="sm" variant="primaryOutline">
            View all
          </Button>
        </Link>
      </div>

      <ul className="w-full space-y-4">
        {questProgress.map((quest) => {
          const pct = Math.min((quest.current / quest.goal) * 100, 100);
          return (
            <div key={quest.id} className="flex w-full flex-col gap-y-1 pb-2">
              <div className="flex items-center justify-between text-sm">
                <p className="font-bold text-neutral-700">{quest.title}</p>
                <span className="text-xs text-muted-foreground">
                  {quest.current}/{quest.goal}
                </span>
              </div>
              <Progress value={pct} className="h-2" />
            </div>
          );
        })}
      </ul>
    </div>
  );
};
