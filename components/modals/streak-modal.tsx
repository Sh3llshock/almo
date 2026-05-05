"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useStreakModal } from "@/store/use-streak-modal";
import { cn } from "@/lib/utils";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

function buildWeekGrid(streak: number) {
  const today = new Date();
  const todayIdx = today.getDay();
  return DAYS.map((day, i) => {
    const daysAgo = (todayIdx - i + 7) % 7;
    return { day, active: daysAgo < streak };
  });
}

export const StreakModal = () => {
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close, streak } = useStreakModal();

  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;

  const grid = buildWeekGrid(streak);

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mb-2 flex w-full items-center justify-center">
            <Image
              src="/streak.png"
              alt="Streak"
              height={80}
              width={80}
              className="drop-shadow-md"
            />
          </div>
          <DialogTitle className="text-center text-3xl font-extrabold text-brand-700">
            {streak} DAY STREAK
          </DialogTitle>
          <p className="text-center text-sm text-slate-500">
            Welcome back. Keep going — every day counts!
          </p>
        </DialogHeader>

        <div className="my-2 flex justify-center gap-2">
          {grid.map(({ day, active }) => (
            <div key={day} className="flex flex-col items-center gap-1">
              {active ? (
                <Image
                  src="/streak.png"
                  alt={day}
                  width={32}
                  height={32}
                  className="drop-shadow-sm"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                  <span className="text-xs text-slate-400">—</span>
                </div>
              )}
              <span
                className={cn(
                  "text-[10px] font-semibold",
                  active ? "text-brand-600" : "text-slate-400"
                )}
              >
                {day}
              </span>
            </div>
          ))}
        </div>

        <DialogFooter className="mb-4">
          <Button
            variant="primary"
            className="w-full"
            size="lg"
            onClick={close}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
