import type { lessons } from "@/db/schema";

type Lesson = typeof lessons.$inferSelect & { completed: boolean };

export type PathNode =
  | {
      kind: "rect";
      key: string;
      lessonId: number;
      title: string;
      sectionId?: string;
      completed: boolean;
      x: number;
      y: number;
    }
  | {
      kind: "circle";
      key: string;
      lessonId: number;
      title: string;
      isFinal: boolean;
      isCurrent: boolean;
      locked: boolean;
      completed: boolean;
      x: number;
      y: number;
    };

export const PATH_WIDTH = 320;
export const RECT_WIDTH = 220;
export const RECT_HEIGHT = 72;
export const CIRCLE_DIAM = 102;
const NODE_SPACING = 100;
const TOP_PADDING = 50;
const BOTTOM_PADDING = 60;

// Symmetric zigzag: rectangles swing wider than circles so they read as the
// "headers" of each section and the circles sit between them.
const xForIndex = (index: number, kind: "rect" | "circle"): number => {
  const center = PATH_WIDTH / 2;
  if (kind === "rect") {
    // alternate: 0, 1, 2, 3, 4 → left, right, left, right, left
    const side = index % 2 === 0 ? -1 : 1;
    return center + side * 28;
  }
  // circles weave in the middle, gently offset opposite to their preceding rect
  const side = index % 2 === 0 ? 1 : -1;
  return center + side * 50;
};

export const buildNodes = (
  lessons: Lesson[],
  activeLessonId: number | undefined,
  unitTitle: string,
  getSectionId: (unitTitle: string, order: number) => string | undefined
): { nodes: PathNode[]; height: number } => {
  // Last lesson by order is the final/recap quiz (crown).
  // Preceding lessons each get a rectangle (section header) + circle (quiz).
  const sorted = [...lessons].sort((a, b) => a.order - b.order);
  const finalLesson = sorted[sorted.length - 1];
  const sectionLessons = sorted.slice(0, -1);

  const nodes: PathNode[] = [];
  let y = TOP_PADDING;
  let nodeIndex = 0;

  sectionLessons.forEach((lesson, sectionIdx) => {
    nodes.push({
      kind: "rect",
      key: `rect-${lesson.id}`,
      lessonId: lesson.id,
      title: lesson.title,
      sectionId: getSectionId(unitTitle, lesson.order),
      completed: lesson.completed,
      x: xForIndex(sectionIdx, "rect"),
      y,
    });
    y += NODE_SPACING;
    nodeIndex++;

    nodes.push({
      kind: "circle",
      key: `circle-${lesson.id}`,
      lessonId: lesson.id,
      title: lesson.title,
      isFinal: false,
      isCurrent: lesson.id === activeLessonId,
      locked: !lesson.completed && lesson.id !== activeLessonId,
      completed: lesson.completed,
      x: xForIndex(sectionIdx, "circle"),
      y,
    });
    y += NODE_SPACING;
    nodeIndex++;
  });

  if (finalLesson) {
    nodes.push({
      kind: "circle",
      key: `circle-${finalLesson.id}`,
      lessonId: finalLesson.id,
      title: finalLesson.title,
      isFinal: true,
      isCurrent: finalLesson.id === activeLessonId,
      locked: !finalLesson.completed && finalLesson.id !== activeLessonId,
      completed: finalLesson.completed,
      x: PATH_WIDTH / 2,
      y,
    });
    y += NODE_SPACING;
    nodeIndex++;
  }

  return { nodes, height: y - NODE_SPACING + BOTTOM_PADDING };
};

// Build a smooth quadratic Bézier between two node centres. Control point sits
// perpendicular to the segment so the line gently curves rather than going
// straight, matching the hand-drawn snake feel.
export const segmentPath = (
  from: { x: number; y: number },
  to: { x: number; y: number }
): string => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  const offset = 22;
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  // perpendicular unit vector, alternated so the curve "snakes"
  const perpX = (-dy / len) * offset;
  const perpY = (dx / len) * offset;
  const cx = midX + perpX;
  const cy = midY + perpY;
  return `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`;
};
