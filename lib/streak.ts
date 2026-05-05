export const computeNewStreak = (
  currentStreak: number,
  lastActivityDate: string | null,
  streakFreezes: number,
  today: Date
): { streak: number; streakFreezes: number; lastActivityDate: string } => {
  const todayStr = today.toISOString().slice(0, 10);

  if (!lastActivityDate) {
    return { streak: 1, streakFreezes, lastActivityDate: todayStr };
  }

  const last = new Date(lastActivityDate + "T00:00:00Z");
  const todayUtc = new Date(todayStr + "T00:00:00Z");
  const daysSince = Math.round(
    (todayUtc.getTime() - last.getTime()) / 86_400_000
  );

  if (daysSince === 0) {
    return { streak: currentStreak, streakFreezes, lastActivityDate };
  }
  if (daysSince === 1) {
    return { streak: currentStreak + 1, streakFreezes, lastActivityDate: todayStr };
  }

  const missedDays = daysSince - 1;
  if (streakFreezes >= missedDays) {
    return {
      streak: currentStreak + 1,
      streakFreezes: streakFreezes - missedDays,
      lastActivityDate: todayStr,
    };
  }

  return { streak: 1, streakFreezes: 0, lastActivityDate: todayStr };
};

export const isActiveToday = (
  lastActivityDate: string | null,
  today: Date
): boolean => {
  if (!lastActivityDate) return false;
  return lastActivityDate === today.toISOString().slice(0, 10);
};
