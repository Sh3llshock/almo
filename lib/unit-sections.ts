// Maps (unit title, lesson order) → notes section id used in lib/anatomy-notes.ts.
// Lessons whose unit / order is not in the map have no associated notes section
// and their preceding rectangle becomes a non-clickable label.

const sectionsByUnit: Record<string, string[]> = {
  "Unit 1: Skeletal System": [
    "skull",
    "spine",
    "upper-limb",
    "lower-limb",
    "thorax",
  ],
  "Unit 2: Joints & Movement": [
    "joint-types",
    "shoulder",
    "elbow-wrist",
    "hip",
    "knee-ankle",
  ],
  "Unit 1: Muscles & Contraction": [
    "upper-body-muscles",
    "lower-body-muscles",
    "core-muscles",
    "muscle-contraction",
  ],
  "Unit 2: Movement Science": [
    "forces-levers",
    "gait",
    "exercise-physiology",
    "rehab-principles",
  ],
};

export const getSectionId = (
  unitTitle: string,
  lessonOrder: number
): string | undefined => sectionsByUnit[unitTitle]?.[lessonOrder - 1];

export const unitHasNotes = (unitTitle: string): boolean =>
  unitTitle in sectionsByUnit;

export const getLessonOrderForSection = (
  unitTitle: string,
  sectionId: string
): number | undefined => {
  const sections = sectionsByUnit[unitTitle];
  if (!sections) return undefined;
  const idx = sections.indexOf(sectionId);
  return idx === -1 ? undefined : idx + 1;
};
