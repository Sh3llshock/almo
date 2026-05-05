"use client";

import { useTransition } from "react";

import Image from "next/image";
import { toast } from "sonner";

import { purchaseStreakFreeze } from "@/actions/streak";
import { Button } from "@/components/ui/button";
import { MAX_STREAK_FREEZES, STREAK_FREEZE_COST } from "@/constants";

type ItemsProps = {
  streakFreezes: number;
  points: number;
  hasActiveSubscription: boolean;
};

export const Items = ({ streakFreezes, points }: ItemsProps) => {
  const [pending, startTransition] = useTransition();

  const atMax = streakFreezes >= MAX_STREAK_FREEZES;
  const canAfford = points >= STREAK_FREEZE_COST;

  const onPurchaseFreeze = () => {
    if (pending || atMax || !canAfford) return;

    startTransition(() => {
      purchaseStreakFreeze().catch(() => toast.error("Something went wrong."));
    });
  };

  return (
    <ul className="w-full">
      <div className="flex w-full items-center gap-x-4 border-t-2 p-4">
        <Image src="/streakFreeze.png" alt="Streak Freeze" height={60} width={60} />

        <div className="flex-1">
          <p className="text-base font-bold text-neutral-700 lg:text-xl">
            Streak Freeze
          </p>
          <p className="text-sm text-muted-foreground">
            Protects your streak for one missed day.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-500">
            {streakFreezes}/{MAX_STREAK_FREEZES}
          </span>
          <Button
            onClick={onPurchaseFreeze}
            disabled={pending || atMax || !canAfford}
            aria-disabled={pending || atMax || !canAfford}
          >
            {atMax ? (
              "max"
            ) : (
              <div className="flex items-center gap-1">
                <Image src="/points.svg" alt="Points" height={20} width={20} />
                <p>{STREAK_FREEZE_COST}</p>
              </div>
            )}
          </Button>
        </div>
      </div>
    </ul>
  );
};
