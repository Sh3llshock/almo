"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { courses } from "@/db/schema";
import { isActiveToday } from "@/lib/streak";
import { useStreakModal } from "@/store/use-streak-modal";

type UserProgressProps = {
  activeCourse: typeof courses.$inferSelect;
  streak: number;
  lastActivityDate: string | null;
  points: number;
  hasActiveSubscription: boolean;
};

export const UserProgress = ({
  activeCourse,
  streak,
  lastActivityDate,
  points,
}: UserProgressProps) => {
  const { open: openStreakModal } = useStreakModal();
  const active = isActiveToday(lastActivityDate, new Date());

  return (
    <div className="flex w-full items-center justify-between gap-x-2">
      <Link href="/courses">
        <Button variant="ghost">
          <Image
            src={activeCourse.imageSrc}
            alt={activeCourse.title}
            className="rounded-md border"
            width={32}
            height={32}
          />
        </Button>
      </Link>

      <Link href="/shop">
        <Button variant="ghost" className="text-orange-500">
          <Image
            src="/points.svg"
            height={28}
            width={28}
            alt="Points"
            className="mr-2"
          />
          {points}
        </Button>
      </Link>

      <Button
        variant="ghost"
        className="text-brand-600"
        onClick={() => openStreakModal(streak)}
      >
        <Image
          src="/streak.png"
          height={22}
          width={22}
          alt="Streak"
          className={`mr-2 ${active ? "" : "grayscale opacity-50"}`}
        />
        {streak}
      </Button>
    </div>
  );
};
