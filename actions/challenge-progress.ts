"use server";

import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { DAILY_QUESTS } from "@/constants";
import db from "@/db/drizzle";
import { getUserProgress } from "@/db/queries";
import { challengeProgress, challenges, userProgress } from "@/db/schema";
import { updateStreakOnActivity } from "./streak";

export const upsertChallengeProgress = async (
  challengeId: number
): Promise<{ streakIncremented: boolean; newStreak: number } | undefined> => {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized.");

  const currentUserProgress = await getUserProgress();

  if (!currentUserProgress) throw new Error("User progress not found.");

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });

  if (!challenge) throw new Error("Challenge not found.");

  const lessonId = challenge.lessonId;

  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeId)
    ),
  });

  const isPractice = !!existingChallengeProgress;

  if (isPractice) {
    await db
      .update(challengeProgress)
      .set({ completed: true })
      .where(eq(challengeProgress.id, existingChallengeProgress.id));

    await db
      .update(userProgress)
      .set({ points: currentUserProgress.points + 10 })
      .where(eq(userProgress.userId, userId));

    revalidatePath("/learn");
    revalidatePath("/lesson");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
    revalidatePath(`/lesson/${lessonId}`);
    return;
  }

  await db.insert(challengeProgress).values({
    challengeId,
    userId,
    completed: true,
  });

  // ── Daily quest tracking ────────────────────────────────────────────────
  const todayStr = new Date().toISOString().slice(0, 10);
  const isNewDay = currentUserProgress.dailyQuestDate !== todayStr;

  let dailyXpEarned = isNewDay ? 10 : currentUserProgress.dailyXpEarned + 10;
  let dailyQuizzesCompleted = isNewDay ? 0 : currentUserProgress.dailyQuizzesCompleted;
  let dailyXpQuestClaimed = isNewDay ? false : currentUserProgress.dailyXpQuestClaimed;
  let dailyQuizQuestClaimed = isNewDay ? false : currentUserProgress.dailyQuizQuestClaimed;

  // Check if this challenge completion finishes the lesson
  const allLessonChallenges = await db.query.challenges.findMany({
    where: eq(challenges.lessonId, lessonId),
    with: {
      challengeProgress: {
        where: eq(challengeProgress.userId, userId),
      },
    },
  });

  const lessonNowComplete = allLessonChallenges.every(
    (c) => c.challengeProgress.length > 0 && c.challengeProgress.some((p) => p.completed)
  );

  if (lessonNowComplete) {
    dailyQuizzesCompleted += 1;
  }

  // Auto-claim quest rewards when thresholds hit
  let bonusXp = 10; // base XP for this challenge
  const xpQuest = DAILY_QUESTS.find((q) => q.id === "xp")!;
  const quizQuest = DAILY_QUESTS.find((q) => q.id === "quizzes")!;

  if (dailyXpEarned >= xpQuest.goal && !dailyXpQuestClaimed) {
    bonusXp += xpQuest.reward;
    dailyXpQuestClaimed = true;
  }
  if (dailyQuizzesCompleted >= quizQuest.goal && !dailyQuizQuestClaimed) {
    bonusXp += quizQuest.reward;
    dailyQuizQuestClaimed = true;
  }

  await db
    .update(userProgress)
    .set({
      points: currentUserProgress.points + bonusXp,
      dailyQuestDate: todayStr,
      dailyXpEarned,
      dailyQuizzesCompleted,
      dailyXpQuestClaimed,
      dailyQuizQuestClaimed,
    })
    .where(eq(userProgress.userId, userId));

  const streakResult = await updateStreakOnActivity();

  revalidatePath("/learn");
  revalidatePath("/lesson");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
  revalidatePath(`/lesson/${lessonId}`);

  return streakResult;
};
