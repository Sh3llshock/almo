export const STREAK_FREEZE_COST = 200;
export const MAX_STREAK_FREEZES = 2;

export const DAILY_QUESTS = [
  {
    id: "xp",
    title: "Earn 50 XP",
    description: "Answer challenges correctly to earn XP.",
    goal: 50,
    reward: 20,
  },
  {
    id: "quizzes",
    title: "Complete 3 lessons",
    description: "Finish 3 full lessons today.",
    goal: 3,
    reward: 30,
  },
] as const;
