import { lessons, units } from "@/db/schema";
import { getSectionId } from "@/lib/unit-sections";

import { LessonButton } from "./lesson-button";
import { buildNodes, PATH_WIDTH } from "./path-layout";
import { PathSvg } from "./path-svg";
import { SectionRectangle } from "./section-rectangle";
import { UnitBanner } from "./unit-banner";

type UnitProps = {
  id: number;
  order: number;
  title: string;
  description: string;
  lessons: (typeof lessons.$inferSelect & {
    completed: boolean;
  })[];
  activeLesson:
    | (typeof lessons.$inferSelect & {
        unit: typeof units.$inferSelect;
      })
    | undefined;
  activeLessonPercentage: number;
};

export const Unit = ({
  id,
  title,
  description,
  lessons,
  activeLesson,
  activeLessonPercentage,
}: UnitProps) => {
  const { nodes, height } = buildNodes(
    lessons,
    activeLesson?.id,
    title,
    getSectionId
  );

  return (
    <>
      <UnitBanner title={title} description={description} unitId={id} />

      <div className="relative mx-auto mt-8" style={{ width: PATH_WIDTH, height }}>
        <PathSvg nodes={nodes} height={height} />

        {nodes.map((node) => {
          if (node.kind === "rect") {
            return (
              <SectionRectangle
                key={node.key}
                title={node.title}
                unitId={id}
                sectionId={node.sectionId}
                completed={node.completed}
                showStart={node.showStart}
                x={node.x}
                y={node.y}
              />
            );
          }
          return (
            <LessonButton
              key={node.key}
              id={node.lessonId}
              isFinal={node.isFinal}
              locked={node.locked}
              current={node.isCurrent}
              showStart={node.showStart}
              completed={node.completed}
              percentage={activeLessonPercentage}
              x={node.x}
              y={node.y}
            />
          );
        })}
      </div>
    </>
  );
};
