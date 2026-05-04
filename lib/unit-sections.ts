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
};

export const getSectionId = (
  unitTitle: string,
  lessonOrder: number
): string | undefined => sectionsByUnit[unitTitle]?.[lessonOrder - 1];

export const unitHasNotes = (unitTitle: string): boolean =>
  unitTitle in sectionsByUnit;
