import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { Quests } from "@/components/quests";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import {
  getCourseProgress,
  getLessonPercentage,
  getUnits,
  getUserProgress,
  getUserSubscription,
} from "@/db/queries";

import { Header } from "./header";
import { StreakNotifier } from "./streak-notifier";
import { Unit } from "./unit";

const LearnPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ newStreak?: string }>;
}) => {
  const { newStreak } = await searchParams;
  const userProgressData = getUserProgress();
  const courseProgressData = getCourseProgress();
  const lessonPercentageData = getLessonPercentage();
  const unitsData = getUnits();
  const userSubscriptionData = getUserSubscription();

  const [
    userProgress,
    units,
    courseProgress,
    lessonPercentage,
    userSubscription,
  ] = await Promise.all([
    userProgressData,
    unitsData,
    courseProgressData,
    lessonPercentageData,
    userSubscriptionData,
  ]);

  if (!courseProgress || !userProgress || !userProgress.activeCourse)
    redirect("/courses");

  const isPro = !!userSubscription?.isActive;

  const newStreakNum = newStreak ? parseInt(newStreak) : undefined;

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      {newStreakNum && <StreakNotifier streak={newStreakNum} />}
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          streak={userProgress.streak}
          lastActivityDate={userProgress.lastActivityDate ?? null}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />

        <Quests />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            <Unit
              id={unit.id}
              order={unit.order}
              description={unit.description}
              title={unit.title}
              lessons={unit.lessons}
              activeLesson={courseProgress.activeLesson}
              activeLessonPercentage={lessonPercentage}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
