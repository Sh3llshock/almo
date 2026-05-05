"use server";

import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { MAX_STREAK_FREEZES, STREAK_FREEZE_COST } from "@/constants";
import db from "@/db/drizzle";
import { getUserProgress } from "@/db/queries";
import { userProgress } from "@/db/schema";
import { computeNewStreak } from "@/lib/streak";

export const updateStreakOnActivity = async (): Promise<{
  streakIncremented: boolean;
  newStreak: number;
}> => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized.");

  const progress = await getUserProgress();
  if (!progress) throw new Error("User progress not found.");

  const today = new Date();
  const { streak, streakFreezes, lastActivityDate } = computeNewStreak(
    progress.streak,
    progress.lastActivityDate,
    progress.streakFreezes,
    today
  );

  const streakIncremented = streak > progress.streak;

  if (
    streak !== progress.streak ||
    streakFreezes !== progress.streakFreezes ||
    lastActivityDate !== progress.lastActivityDate
  ) {
    await db
      .update(userProgress)
      .set({ streak, streakFreezes, lastActivityDate })
      .where(eq(userProgress.userId, userId));
  }

  return { streakIncremented, newStreak: streak };
};

export const purchaseStreakFreeze = async () => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized.");

  const progress = await getUserProgress();
  if (!progress) throw new Error("User progress not found.");

  if (progress.streakFreezes >= MAX_STREAK_FREEZES)
    throw new Error("Already at max streak freezes.");
  if (progress.points < STREAK_FREEZE_COST)
    throw new Error("Not enough points.");

  await db
    .update(userProgress)
    .set({
      streakFreezes: progress.streakFreezes + 1,
      points: progress.points - STREAK_FREEZE_COST,
    })
    .where(eq(userProgress.userId, userId));

  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
};
