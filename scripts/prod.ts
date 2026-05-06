import { neon } from "@neondatabase/serverless";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL);

const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    await Promise.all([
      db.delete(schema.userProgress),
      db.delete(schema.challenges),
      db.delete(schema.units),
      db.delete(schema.lessons),
      db.delete(schema.courses),
      db.delete(schema.challengeOptions),
      db.delete(schema.userSubscription),
    ]);

    const courses = await db
      .insert(schema.courses)
      .values([
        { title: "Spanish", imageSrc: "/es.svg" },
        { title: "Anatomy", imageSrc: "/anatomy.png" },
      ])
      .returning();

    for (const course of courses) {
      if (course.title === "Spanish") {
        await seedSpanish(course.id);
      } else if (course.title === "Anatomy") {
        await seedAnatomy(course.id);
      }
    }

    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

const seedSpanish = async (courseId: number) => {
  const units = await db
    .insert(schema.units)
    .values([
      {
        courseId,
        title: "Unit 1",
        description: "Learn the basics of Spanish",
        order: 1,
      },
      {
        courseId,
        title: "Unit 2",
        description: "Learn intermediate Spanish",
        order: 2,
      },
    ])
    .returning();

  for (const unit of units) {
    const lessons = await db
      .insert(schema.lessons)
      .values([
        { unitId: unit.id, title: "Nouns", order: 1 },
        { unitId: unit.id, title: "Verbs", order: 2 },
        { unitId: unit.id, title: "Adjectives", order: 3 },
        { unitId: unit.id, title: "Phrases", order: 4 },
        { unitId: unit.id, title: "Sentences", order: 5 },
      ])
      .returning();

    for (const lesson of lessons) {
      const challenges = await db
        .insert(schema.challenges)
        .values([
          {
            lessonId: lesson.id,
            type: "SELECT",
            question: 'Which one of these is "the man"?',
            order: 1,
          },
          {
            lessonId: lesson.id,
            type: "SELECT",
            question: 'Which one of these is "the woman"?',
            order: 2,
          },
          {
            lessonId: lesson.id,
            type: "SELECT",
            question: 'Which one of these is "the boy"?',
            order: 3,
          },
          {
            lessonId: lesson.id,
            type: "ASSIST",
            question: '"the man"',
            order: 4,
          },
          {
            lessonId: lesson.id,
            type: "SELECT",
            question: 'Which one of these is "the zombie"?',
            order: 5,
          },
          {
            lessonId: lesson.id,
            type: "SELECT",
            question: 'Which one of these is "the robot"?',
            order: 6,
          },
          {
            lessonId: lesson.id,
            type: "SELECT",
            question: 'Which one of these is "the girl"?',
            order: 7,
          },
          {
            lessonId: lesson.id,
            type: "ASSIST",
            question: '"the zombie"',
            order: 8,
          },
        ])
        .returning();

      for (const challenge of challenges) {
        if (challenge.order === 1) {
          await db.insert(schema.challengeOptions).values([
            {
              challengeId: challenge.id,
              correct: true,
              text: "el hombre",
              imageSrc: "/man.svg",
              audioSrc: "/es_man.mp3",
            },
            {
              challengeId: challenge.id,
              correct: false,
              text: "la mujer",
              imageSrc: "/woman.svg",
              audioSrc: "/es_woman.mp3",
            },
            {
              challengeId: challenge.id,
              correct: false,
              text: "el chico",
              imageSrc: "/boy.svg",
              audioSrc: "/es_boy.mp3",
            },
          ]);
        }

        if (challenge.order === 2) {
          await db.insert(schema.challengeOptions).values([
            {
              challengeId: challenge.id,
              correct: true,
              text: "la mujer",
              imageSrc: "/woman.svg",
              audioSrc: "/es_woman.mp3",
            },
            {
              challengeId: challenge.id,
              correct: false,
              text: "el chico",
              imageSrc: "/boy.svg",
              audioSrc: "/es_boy.mp3",
            },
            {
              challengeId: challenge.id,
              correct: false,
              text: "el hombre",
              imageSrc: "/man.svg",
              audioSrc: "/es_man.mp3",
            },
          ]);
        }

        if (challenge.order === 3) {
          await db.insert(schema.challengeOptions).values([
            {
              challengeId: challenge.id,
              correct: false,
              text: "la mujer",
              imageSrc: "/woman.svg",
              audioSrc: "/es_woman.mp3",
            },
            {
              challengeId: challenge.id,
              correct: false,
              text: "el hombre",
              imageSrc: "/man.svg",
              audioSrc: "/es_man.mp3",
            },
            {
              challengeId: challenge.id,
              correct: true,
              text: "el chico",
              imageSrc: "/boy.svg",
              audioSrc: "/es_boy.mp3",
            },
          ]);
        }

        if (challenge.order === 4) {
          await db.insert(schema.challengeOptions).values([
            {
              challengeId: challenge.id,
              correct: false,
              text: "la mujer",
              audioSrc: "/es_woman.mp3",
            },
            {
              challengeId: challenge.id,
              correct: true,
              text: "el hombre",
              audioSrc: "/es_man.mp3",
            },
            {
              challengeId: challenge.id,
              correct: false,
              text: "el chico",
              audioSrc: "/es_boy.mp3",
            },
          ]);
        }

        if (challenge.order === 5) {
          await db.insert(schema.challengeOptions).values([
            {
              challengeId: challenge.id,
              correct: false,
              text: "el hombre",
              imageSrc: "/man.svg",
              audioSrc: "/es_man.mp3",
            },
            {
              challengeId: challenge.id,
              correct: false,
              text: "la mujer",
              imageSrc: "/woman.svg",
              audioSrc: "/es_woman.mp3",
            },
            {
              challengeId: challenge.id,
              correct: true,
              text: "el zombie",
              imageSrc: "/zombie.svg",
              audioSrc: "/es_zombie.mp3",
            },
          ]);
        }

        if (challenge.order === 6) {
          await db.insert(schema.challengeOptions).values([
            {
              challengeId: challenge.id,
              correct: true,
              text: "el robot",
              imageSrc: "/robot.svg",
              audioSrc: "/es_robot.mp3",
            },
            {
              challengeId: challenge.id,
              correct: false,
              text: "el zombie",
              imageSrc: "/zombie.svg",
              audioSrc: "/es_zombie.mp3",
            },
            {
              challengeId: challenge.id,
              correct: false,
              text: "el chico",
              imageSrc: "/boy.svg",
              audioSrc: "/es_boy.mp3",
            },
          ]);
        }

        if (challenge.order === 7) {
          await db.insert(schema.challengeOptions).values([
            {
              challengeId: challenge.id,
              correct: true,
              text: "la nina",
              imageSrc: "/girl.svg",
              audioSrc: "/es_girl.mp3",
            },
            {
              challengeId: challenge.id,
              correct: false,
              text: "el zombie",
              imageSrc: "/zombie.svg",
              audioSrc: "/es_zombie.mp3",
            },
            {
              challengeId: challenge.id,
              correct: false,
              text: "el hombre",
              imageSrc: "/man.svg",
              audioSrc: "/es_man.mp3",
            },
          ]);
        }

        if (challenge.order === 8) {
          await db.insert(schema.challengeOptions).values([
            {
              challengeId: challenge.id,
              correct: false,
              text: "la mujer",
              audioSrc: "/es_woman.mp3",
            },
            {
              challengeId: challenge.id,
              correct: true,
              text: "el zombie",
              audioSrc: "/es_zombie.mp3",
            },
            {
              challengeId: challenge.id,
              correct: false,
              text: "el chico",
              audioSrc: "/es_boy.mp3",
            },
          ]);
        }
      }
    }
  }
};

const seedAnatomy = async (courseId: number) => {
  const units = await db
    .insert(schema.units)
    .values([
      {
        courseId,
        title: "Unit 1: Skeletal System",
        description: "Bones, landmarks, and the axial skeleton",
        order: 1,
      },
      {
        courseId,
        title: "Unit 2: Joints & Movement",
        description: "Articulations, ranges of motion, and joint mechanics",
        order: 2,
      },
    ])
    .returning();

  for (const unit of units) {
    if (unit.order === 1) {
      await seedSkeletalUnit(unit.id);
    } else if (unit.order === 2) {
      await seedJointsUnit(unit.id);
    }
  }
};

const seedSkeletalUnit = async (unitId: number) => {
  const lessons = await db
    .insert(schema.lessons)
    .values([
      { unitId, title: "Cranial & Facial Bones", order: 1 },
      { unitId, title: "The Vertebral Column", order: 2 },
      { unitId, title: "Upper Limb Bones", order: 3 },
      { unitId, title: "Lower Limb Bones", order: 4 },
      { unitId, title: "Thorax & Pelvis", order: 5 },
      { unitId, title: "Unit Recap", order: 6 },
    ])
    .returning();

  for (const lesson of lessons) {
    if (lesson.order === 1) await seedCranialLesson(lesson.id);
    if (lesson.order === 2) await seedSpineLesson(lesson.id);
    if (lesson.order === 3) await seedUpperLimbLesson(lesson.id);
    if (lesson.order === 4) await seedLowerLimbLesson(lesson.id);
    if (lesson.order === 5) await seedThoraxLesson(lesson.id);
    if (lesson.order === 6) await seedSkeletalRecap(lesson.id);
  }
};

const seedJointsUnit = async (unitId: number) => {
  const lessons = await db
    .insert(schema.lessons)
    .values([
      { unitId, title: "Types of Joints", order: 1 },
      { unitId, title: "Shoulder Complex", order: 2 },
      { unitId, title: "Elbow & Wrist", order: 3 },
      { unitId, title: "Hip Joint", order: 4 },
      { unitId, title: "Knee & Ankle", order: 5 },
      { unitId, title: "Unit Recap", order: 6 },
    ])
    .returning();

  for (const lesson of lessons) {
    if (lesson.order === 1) await seedJointTypesLesson(lesson.id);
    if (lesson.order === 2) await seedShoulderLesson(lesson.id);
    if (lesson.order === 3) await seedElbowLesson(lesson.id);
    if (lesson.order === 4) await seedHipLesson(lesson.id);
    if (lesson.order === 5) await seedKneeLesson(lesson.id);
    if (lesson.order === 6) await seedJointsRecap(lesson.id);
  }
};

// ── Cranial & Facial Bones ───────────────────────────────────────────────────
const seedCranialLesson = async (lessonId: number) => {
  const challenges = await db
    .insert(schema.challenges)
    .values([
      {
        lessonId,
        type: "SELECT",
        question: "How many bones make up the adult human skull?",
        order: 1,
      },
      {
        lessonId,
        type: "SELECT",
        question: "Which bone forms the forehead (frontal region)?",
        order: 2,
      },
      {
        lessonId,
        type: "SELECT",
        question: "The zygomatic bone forms part of which structure?",
        order: 3,
      },
      {
        lessonId,
        type: "ASSIST",
        question: "Name the large bone at the back and base of the skull.",
        order: 4,
      },
      {
        lessonId,
        type: "SELECT",
        question: "Which cranial bone contains the foramen magnum?",
        order: 5,
      },
      {
        lessonId,
        type: "SELECT",
        question: "The mandible is the only moveable bone of the skull. Where is it located?",
        order: 6,
      },
      {
        lessonId,
        type: "ASSIST",
        question: "Which paired bones form the sides and roof of the cranium?",
        order: 7,
      },
      {
        lessonId,
        type: "SELECT",
        question: "Which bone houses the inner ear structures?",
        order: 8,
      },
      {
        lessonId,
        type: "TRUE_FALSE",
        question: "The frontal bone forms the forehead.",
        order: 9,
      },
      {
        lessonId,
        type: "TRUE_FALSE",
        question: "The mandible is a fixed bone that cannot move.",
        order: 10,
      },
      {
        lessonId,
        type: "FILL_BLANK",
        question: "The ___ bone contains the foramen magnum.",
        order: 11,
      },
      {
        lessonId,
        type: "FILL_BLANK",
        question: "The ___ is the only moveable bone of the skull.",
        order: 12,
      },
    ])
    .returning();

  const opts: Record<number, { correct: boolean; text: string }[]> = {
    1: [
      { correct: true, text: "22" },
      { correct: false, text: "14" },
      { correct: false, text: "28" },
    ],
    2: [
      { correct: true, text: "Frontal bone" },
      { correct: false, text: "Parietal bone" },
      { correct: false, text: "Occipital bone" },
    ],
    3: [
      { correct: true, text: "The cheekbone (zygomatic arch)" },
      { correct: false, text: "The eye socket only" },
      { correct: false, text: "The nasal bridge" },
    ],
    4: [
      { correct: true, text: "Occipital bone" },
      { correct: false, text: "Temporal bone" },
      { correct: false, text: "Sphenoid bone" },
    ],
    5: [
      { correct: true, text: "Occipital bone" },
      { correct: false, text: "Temporal bone" },
      { correct: false, text: "Frontal bone" },
    ],
    6: [
      { correct: true, text: "Lower jaw" },
      { correct: false, text: "Upper jaw" },
      { correct: false, text: "Temple" },
    ],
    7: [
      { correct: true, text: "Parietal bones" },
      { correct: false, text: "Temporal bones" },
      { correct: false, text: "Frontal bones" },
    ],
    8: [
      { correct: true, text: "Temporal bone" },
      { correct: false, text: "Parietal bone" },
      { correct: false, text: "Sphenoid bone" },
    ],
    9: [
      { correct: true, text: "True" },
      { correct: false, text: "False" },
    ],
    10: [
      { correct: false, text: "True" },
      { correct: true, text: "False" },
    ],
    11: [
      { correct: true, text: "Occipital" },
      { correct: false, text: "Frontal" },
      { correct: false, text: "Parietal" },
      { correct: false, text: "Temporal" },
    ],
    12: [
      { correct: true, text: "Mandible" },
      { correct: false, text: "Maxilla" },
      { correct: false, text: "Zygomatic" },
      { correct: false, text: "Temporal" },
    ],
  };

  for (const c of challenges) {
    await db
      .insert(schema.challengeOptions)
      .values(opts[c.order].map((o) => ({ challengeId: c.id, ...o })));
  }
};

// ── Vertebral Column ─────────────────────────────────────────────────────────
const seedSpineLesson = async (lessonId: number) => {
  const challenges = await db
    .insert(schema.challenges)
    .values([
      {
        lessonId,
        type: "SELECT",
        question: "How many vertebrae are in the cervical region?",
        order: 1,
      },
      {
        lessonId,
        type: "SELECT",
        question: "Which spinal region has 12 vertebrae that articulate with ribs?",
        order: 2,
      },
      {
        lessonId,
        type: "SELECT",
        question: "The atlas (C1) articulates with which structure above it?",
        order: 3,
      },
      {
        lessonId,
        type: "ASSIST",
        question: "What is the name of the fused bones that form the tailbone?",
        order: 4,
      },
      {
        lessonId,
        type: "SELECT",
        question: "How many lumbar vertebrae does the human spine have?",
        order: 5,
      },
      {
        lessonId,
        type: "SELECT",
        question: "What is the normal curvature of the lumbar spine called?",
        order: 6,
      },
      {
        lessonId,
        type: "ASSIST",
        question: "Which region of the spine is associated with the sacrum?",
        order: 7,
      },
      {
        lessonId,
        type: "SELECT",
        question: "The intervertebral disc is composed mainly of which tissue?",
        order: 8,
      },
      {
        lessonId,
        type: "TRUE_FALSE",
        question: "The cervical spine has 7 vertebrae.",
        order: 9,
      },
      {
        lessonId,
        type: "TRUE_FALSE",
        question: "The thoracic region of the spine has 5 vertebrae.",
        order: 10,
      },
      {
        lessonId,
        type: "FILL_BLANK",
        question: "The ___ (C1) allows nodding movements at the head.",
        order: 11,
      },
      {
        lessonId,
        type: "FILL_BLANK",
        question: "The lumbar spine consists of ___ vertebrae.",
        order: 12,
      },
    ])
    .returning();

  const opts: Record<number, { correct: boolean; text: string }[]> = {
    1: [
      { correct: true, text: "7" },
      { correct: false, text: "5" },
      { correct: false, text: "12" },
    ],
    2: [
      { correct: true, text: "Thoracic" },
      { correct: false, text: "Lumbar" },
      { correct: false, text: "Cervical" },
    ],
    3: [
      { correct: true, text: "Occipital condyles of the skull" },
      { correct: false, text: "The axis (C2)" },
      { correct: false, text: "The clavicle" },
    ],
    4: [
      { correct: true, text: "Coccyx" },
      { correct: false, text: "Sacrum" },
      { correct: false, text: "Ilium" },
    ],
    5: [
      { correct: true, text: "5" },
      { correct: false, text: "7" },
      { correct: false, text: "4" },
    ],
    6: [
      { correct: true, text: "Lordosis" },
      { correct: false, text: "Kyphosis" },
      { correct: false, text: "Scoliosis" },
    ],
    7: [
      { correct: true, text: "Sacral / pelvic region" },
      { correct: false, text: "Lumbar region" },
      { correct: false, text: "Thoracic region" },
    ],
    8: [
      { correct: true, text: "Fibrocartilage (annulus fibrosus & nucleus pulposus)" },
      { correct: false, text: "Hyaline cartilage" },
      { correct: false, text: "Compact bone" },
    ],
    9: [
      { correct: true, text: "True" },
      { correct: false, text: "False" },
    ],
    10: [
      { correct: false, text: "True" },
      { correct: true, text: "False" },
    ],
    11: [
      { correct: true, text: "Atlas" },
      { correct: false, text: "Axis" },
      { correct: false, text: "C3" },
      { correct: false, text: "Sacrum" },
    ],
    12: [
      { correct: true, text: "5" },
      { correct: false, text: "7" },
      { correct: false, text: "12" },
      { correct: false, text: "4" },
    ],
  };

  for (const c of challenges) {
    await db
      .insert(schema.challengeOptions)
      .values(opts[c.order].map((o) => ({ challengeId: c.id, ...o })));
  }
};

// ── Upper Limb Bones ─────────────────────────────────────────────────────────
const seedUpperLimbLesson = async (lessonId: number) => {
  const challenges = await db
    .insert(schema.challenges)
    .values([
      {
        lessonId,
        type: "SELECT",
        question: "Which bone is the upper arm (humerus) found in?",
        order: 1,
      },
      {
        lessonId,
        type: "SELECT",
        question: "The radius and ulna form which part of the upper limb?",
        order: 2,
      },
      {
        lessonId,
        type: "SELECT",
        question: "How many carpal (wrist) bones are there in one hand?",
        order: 3,
      },
      {
        lessonId,
        type: "ASSIST",
        question: "Which forearm bone is on the medial (little finger) side?",
        order: 4,
      },
      {
        lessonId,
        type: "SELECT",
        question: "The scapula is commonly known as the…",
        order: 5,
      },
      {
        lessonId,
        type: "SELECT",
        question: "Which bony landmark of the humerus can be palpated at the shoulder tip?",
        order: 6,
      },
      {
        lessonId,
        type: "ASSIST",
        question: "What is the medical term for the collarbone?",
        order: 7,
      },
      {
        lessonId,
        type: "SELECT",
        question: "The metacarpals form which part of the hand?",
        order: 8,
      },
    ])
    .returning();

  const opts: Record<number, { correct: boolean; text: string }[]> = {
    1: [
      { correct: true, text: "Upper arm / brachium" },
      { correct: false, text: "Forearm / antebrachium" },
      { correct: false, text: "Shoulder girdle" },
    ],
    2: [
      { correct: true, text: "Forearm" },
      { correct: false, text: "Upper arm" },
      { correct: false, text: "Hand" },
    ],
    3: [
      { correct: true, text: "8" },
      { correct: false, text: "5" },
      { correct: false, text: "14" },
    ],
    4: [
      { correct: true, text: "Ulna" },
      { correct: false, text: "Radius" },
      { correct: false, text: "Fibula" },
    ],
    5: [
      { correct: true, text: "Shoulder blade" },
      { correct: false, text: "Collarbone" },
      { correct: false, text: "Breastbone" },
    ],
    6: [
      { correct: true, text: "Greater tubercle" },
      { correct: false, text: "Medial epicondyle" },
      { correct: false, text: "Olecranon" },
    ],
    7: [
      { correct: true, text: "Clavicle" },
      { correct: false, text: "Scapula" },
      { correct: false, text: "Coracoid" },
    ],
    8: [
      { correct: true, text: "Palm of the hand" },
      { correct: false, text: "Fingers (digits)" },
      { correct: false, text: "Wrist" },
    ],
  };

  for (const c of challenges) {
    await db
      .insert(schema.challengeOptions)
      .values(opts[c.order].map((o) => ({ challengeId: c.id, ...o })));
  }
};

// ── Lower Limb Bones ─────────────────────────────────────────────────────────
const seedLowerLimbLesson = async (lessonId: number) => {
  const challenges = await db
    .insert(schema.challenges)
    .values([
      {
        lessonId,
        type: "SELECT",
        question: "Which bone is the longest in the human body?",
        order: 1,
      },
      {
        lessonId,
        type: "SELECT",
        question: "The patella is found at which joint?",
        order: 2,
      },
      {
        lessonId,
        type: "SELECT",
        question: "Which two bones make up the lower leg?",
        order: 3,
      },
      {
        lessonId,
        type: "ASSIST",
        question: "What is the medical name for the heel bone?",
        order: 4,
      },
      {
        lessonId,
        type: "SELECT",
        question: "How many tarsal bones are in the foot?",
        order: 5,
      },
      {
        lessonId,
        type: "SELECT",
        question: "The medial malleolus is the bony bump on which side of the ankle?",
        order: 6,
      },
      {
        lessonId,
        type: "ASSIST",
        question: "Which bone is on the lateral side of the lower leg?",
        order: 7,
      },
      {
        lessonId,
        type: "SELECT",
        question: "The femoral head articulates with which structure to form the hip joint?",
        order: 8,
      },
    ])
    .returning();

  const opts: Record<number, { correct: boolean; text: string }[]> = {
    1: [
      { correct: true, text: "Femur (thigh bone)" },
      { correct: false, text: "Tibia" },
      { correct: false, text: "Humerus" },
    ],
    2: [
      { correct: true, text: "Knee joint" },
      { correct: false, text: "Hip joint" },
      { correct: false, text: "Ankle joint" },
    ],
    3: [
      { correct: true, text: "Tibia and fibula" },
      { correct: false, text: "Femur and tibia" },
      { correct: false, text: "Radius and ulna" },
    ],
    4: [
      { correct: true, text: "Calcaneus" },
      { correct: false, text: "Talus" },
      { correct: false, text: "Navicular" },
    ],
    5: [
      { correct: true, text: "7" },
      { correct: false, text: "8" },
      { correct: false, text: "5" },
    ],
    6: [
      { correct: true, text: "Medial (inner) side" },
      { correct: false, text: "Lateral (outer) side" },
      { correct: false, text: "Posterior side" },
    ],
    7: [
      { correct: true, text: "Fibula" },
      { correct: false, text: "Tibia" },
      { correct: false, text: "Femur" },
    ],
    8: [
      { correct: true, text: "Acetabulum of the pelvis" },
      { correct: false, text: "Glenoid fossa of the scapula" },
      { correct: false, text: "Condyle of the tibia" },
    ],
  };

  for (const c of challenges) {
    await db
      .insert(schema.challengeOptions)
      .values(opts[c.order].map((o) => ({ challengeId: c.id, ...o })));
  }
};

// ── Thorax & Pelvis ──────────────────────────────────────────────────────────
const seedThoraxLesson = async (lessonId: number) => {
  const challenges = await db
    .insert(schema.challenges)
    .values([
      {
        lessonId,
        type: "SELECT",
        question: "How many pairs of ribs does the human thoracic cage have?",
        order: 1,
      },
      {
        lessonId,
        type: "SELECT",
        question: 'The "floating ribs" are ribs number…',
        order: 2,
      },
      {
        lessonId,
        type: "SELECT",
        question: "Which bone runs down the centre of the chest?",
        order: 3,
      },
      {
        lessonId,
        type: "ASSIST",
        question: "Name the three parts of the sternum from top to bottom.",
        order: 4,
      },
      {
        lessonId,
        type: "SELECT",
        question: "The pelvis is formed by how many hip bones (os coxae)?",
        order: 5,
      },
      {
        lessonId,
        type: "SELECT",
        question: "Which three bones fuse to form the adult os coxae (hip bone)?",
        order: 6,
      },
      {
        lessonId,
        type: "ASSIST",
        question: "What is the name of the superior rim of the pelvis used as a landmark?",
        order: 7,
      },
      {
        lessonId,
        type: "SELECT",
        question: "The xiphoid process is located at which end of the sternum?",
        order: 8,
      },
    ])
    .returning();

  const opts: Record<number, { correct: boolean; text: string }[]> = {
    1: [
      { correct: true, text: "12 pairs" },
      { correct: false, text: "10 pairs" },
      { correct: false, text: "14 pairs" },
    ],
    2: [
      { correct: true, text: "11 and 12" },
      { correct: false, text: "9 and 10" },
      { correct: false, text: "8 and 9" },
    ],
    3: [
      { correct: true, text: "Sternum (breastbone)" },
      { correct: false, text: "Vertebral column" },
      { correct: false, text: "Clavicle" },
    ],
    4: [
      { correct: true, text: "Manubrium, body (gladiolus), xiphoid process" },
      { correct: false, text: "Xiphoid, body, manubrium" },
      { correct: false, text: "Clavicle, body, xiphoid" },
    ],
    5: [
      { correct: true, text: "2 (left and right)" },
      { correct: false, text: "1" },
      { correct: false, text: "4" },
    ],
    6: [
      { correct: true, text: "Ilium, ischium, and pubis" },
      { correct: false, text: "Sacrum, ilium, and femur" },
      { correct: false, text: "Ilium, femur, and pubis" },
    ],
    7: [
      { correct: true, text: "Iliac crest" },
      { correct: false, text: "Ischial tuberosity" },
      { correct: false, text: "Pubic symphysis" },
    ],
    8: [
      { correct: true, text: "Inferior (lower) end" },
      { correct: false, text: "Superior (upper) end" },
      { correct: false, text: "Middle" },
    ],
  };

  for (const c of challenges) {
    await db
      .insert(schema.challengeOptions)
      .values(opts[c.order].map((o) => ({ challengeId: c.id, ...o })));
  }
};

// ── Joint Types ──────────────────────────────────────────────────────────────
const seedJointTypesLesson = async (lessonId: number) => {
  const challenges = await db
    .insert(schema.challenges)
    .values([
      {
        lessonId,
        type: "SELECT",
        question: "A synovial joint with movement in all planes is called a…",
        order: 1,
      },
      {
        lessonId,
        type: "SELECT",
        question: "Which type of joint allows no movement (e.g., skull sutures)?",
        order: 2,
      },
      {
        lessonId,
        type: "SELECT",
        question: "A hinge joint allows movement primarily in which plane?",
        order: 3,
      },
      {
        lessonId,
        type: "ASSIST",
        question: "What lubricates synovial joints?",
        order: 4,
      },
      {
        lessonId,
        type: "SELECT",
        question: "The atlantoaxial joint (C1–C2) is an example of which joint type?",
        order: 5,
      },
      {
        lessonId,
        type: "SELECT",
        question: "Slightly moveable joints (e.g., pubic symphysis) are called…",
        order: 6,
      },
      {
        lessonId,
        type: "ASSIST",
        question: "Name the tough fibrous tissue that holds bones together at a joint.",
        order: 7,
      },
      {
        lessonId,
        type: "SELECT",
        question: "Which joint type is found at the thumb carpometacarpal joint?",
        order: 8,
      },
    ])
    .returning();

  const opts: Record<number, { correct: boolean; text: string }[]> = {
    1: [
      { correct: true, text: "Ball-and-socket joint" },
      { correct: false, text: "Hinge joint" },
      { correct: false, text: "Pivot joint" },
    ],
    2: [
      { correct: true, text: "Synarthrosis (fibrous joint)" },
      { correct: false, text: "Amphiarthrosis" },
      { correct: false, text: "Diarthrosis" },
    ],
    3: [
      { correct: true, text: "Sagittal plane (flexion/extension)" },
      { correct: false, text: "Frontal plane (abduction/adduction)" },
      { correct: false, text: "Transverse plane (rotation)" },
    ],
    4: [
      { correct: true, text: "Synovial fluid" },
      { correct: false, text: "Lymphatic fluid" },
      { correct: false, text: "Interstitial fluid" },
    ],
    5: [
      { correct: true, text: "Pivot joint" },
      { correct: false, text: "Hinge joint" },
      { correct: false, text: "Saddle joint" },
    ],
    6: [
      { correct: true, text: "Amphiarthrosis (cartilaginous joint)" },
      { correct: false, text: "Synarthrosis" },
      { correct: false, text: "Diarthrosis" },
    ],
    7: [
      { correct: true, text: "Ligament" },
      { correct: false, text: "Tendon" },
      { correct: false, text: "Fascia" },
    ],
    8: [
      { correct: true, text: "Saddle joint" },
      { correct: false, text: "Condyloid joint" },
      { correct: false, text: "Gliding joint" },
    ],
  };

  for (const c of challenges) {
    await db
      .insert(schema.challengeOptions)
      .values(opts[c.order].map((o) => ({ challengeId: c.id, ...o })));
  }
};

// ── Shoulder Complex ─────────────────────────────────────────────────────────
const seedShoulderLesson = async (lessonId: number) => {
  const challenges = await db
    .insert(schema.challenges)
    .values([
      {
        lessonId,
        type: "SELECT",
        question: "The glenohumeral joint is what type of synovial joint?",
        order: 1,
      },
      {
        lessonId,
        type: "SELECT",
        question: "Which four muscles form the rotator cuff?",
        order: 2,
      },
      {
        lessonId,
        type: "SELECT",
        question: "Normal shoulder abduction range of motion is approximately…",
        order: 3,
      },
      {
        lessonId,
        type: "ASSIST",
        question: "What is the shallow socket of the shoulder joint called?",
        order: 4,
      },
      {
        lessonId,
        type: "SELECT",
        question: "The acromioclavicular (AC) joint connects which two structures?",
        order: 5,
      },
      {
        lessonId,
        type: "SELECT",
        question: "Which movement brings the arm across the body in front of the chest?",
        order: 6,
      },
      {
        lessonId,
        type: "ASSIST",
        question: "Which rotator cuff muscle initiates shoulder abduction (first 15°)?",
        order: 7,
      },
      {
        lessonId,
        type: "SELECT",
        question: "The scapulohumeral rhythm describes the coordinated movement of the scapula and humerus in a ratio of…",
        order: 8,
      },
    ])
    .returning();

  const opts: Record<number, { correct: boolean; text: string }[]> = {
    1: [
      { correct: true, text: "Ball-and-socket joint" },
      { correct: false, text: "Hinge joint" },
      { correct: false, text: "Saddle joint" },
    ],
    2: [
      { correct: true, text: "Supraspinatus, infraspinatus, teres minor, subscapularis" },
      { correct: false, text: "Deltoid, biceps, triceps, teres major" },
      { correct: false, text: "Trapezius, rhomboid, serratus anterior, pectoralis" },
    ],
    3: [
      { correct: true, text: "0–180°" },
      { correct: false, text: "0–90°" },
      { correct: false, text: "0–120°" },
    ],
    4: [
      { correct: true, text: "Glenoid fossa" },
      { correct: false, text: "Acetabulum" },
      { correct: false, text: "Olecranon fossa" },
    ],
    5: [
      { correct: true, text: "Acromion of the scapula and the clavicle" },
      { correct: false, text: "Clavicle and sternum" },
      { correct: false, text: "Humerus and scapula" },
    ],
    6: [
      { correct: true, text: "Horizontal adduction (cross-body adduction)" },
      { correct: false, text: "Abduction" },
      { correct: false, text: "Internal rotation" },
    ],
    7: [
      { correct: true, text: "Supraspinatus" },
      { correct: false, text: "Deltoid" },
      { correct: false, text: "Infraspinatus" },
    ],
    8: [
      { correct: true, text: "2:1 (glenohumeral : scapulothoracic)" },
      { correct: false, text: "1:1" },
      { correct: false, text: "3:1" },
    ],
  };

  for (const c of challenges) {
    await db
      .insert(schema.challengeOptions)
      .values(opts[c.order].map((o) => ({ challengeId: c.id, ...o })));
  }
};

// ── Elbow & Wrist ────────────────────────────────────────────────────────────
const seedElbowLesson = async (lessonId: number) => {
  const challenges = await db
    .insert(schema.challenges)
    .values([
      {
        lessonId,
        type: "SELECT",
        question: "The elbow joint (humeroulnar) is classified as which type?",
        order: 1,
      },
      {
        lessonId,
        type: "SELECT",
        question: "Turning the palm upward is called…",
        order: 2,
      },
      {
        lessonId,
        type: "SELECT",
        question: "Normal elbow flexion range of motion is approximately…",
        order: 3,
      },
      {
        lessonId,
        type: "ASSIST",
        question: "Which bony prominence can be felt at the back of the elbow?",
        order: 4,
      },
      {
        lessonId,
        type: "SELECT",
        question: "Pronation of the forearm is mainly produced by which muscle?",
        order: 5,
      },
      {
        lessonId,
        type: "SELECT",
        question: "The wrist joint (radiocarpal) is what type of synovial joint?",
        order: 6,
      },
      {
        lessonId,
        type: "ASSIST",
        question: "Bending the wrist toward the little finger side is called…",
        order: 7,
      },
      {
        lessonId,
        type: "SELECT",
        question: "Which nerve, if compressed at the medial epicondyle, causes 'funny bone' sensation?",
        order: 8,
      },
    ])
    .returning();

  const opts: Record<number, { correct: boolean; text: string }[]> = {
    1: [
      { correct: true, text: "Hinge joint" },
      { correct: false, text: "Pivot joint" },
      { correct: false, text: "Condyloid joint" },
    ],
    2: [
      { correct: true, text: "Supination" },
      { correct: false, text: "Pronation" },
      { correct: false, text: "Dorsiflexion" },
    ],
    3: [
      { correct: true, text: "0–145°" },
      { correct: false, text: "0–90°" },
      { correct: false, text: "0–180°" },
    ],
    4: [
      { correct: true, text: "Olecranon (of the ulna)" },
      { correct: false, text: "Medial epicondyle" },
      { correct: false, text: "Radial head" },
    ],
    5: [
      { correct: true, text: "Pronator teres and pronator quadratus" },
      { correct: false, text: "Biceps brachii" },
      { correct: false, text: "Brachioradialis" },
    ],
    6: [
      { correct: true, text: "Condyloid (ellipsoid) joint" },
      { correct: false, text: "Hinge joint" },
      { correct: false, text: "Saddle joint" },
    ],
    7: [
      { correct: true, text: "Ulnar deviation" },
      { correct: false, text: "Radial deviation" },
      { correct: false, text: "Ulnar flexion" },
    ],
    8: [
      { correct: true, text: "Ulnar nerve" },
      { correct: false, text: "Median nerve" },
      { correct: false, text: "Radial nerve" },
    ],
  };

  for (const c of challenges) {
    await db
      .insert(schema.challengeOptions)
      .values(opts[c.order].map((o) => ({ challengeId: c.id, ...o })));
  }
};

// ── Hip Joint ────────────────────────────────────────────────────────────────
const seedHipLesson = async (lessonId: number) => {
  const challenges = await db
    .insert(schema.challenges)
    .values([
      {
        lessonId,
        type: "SELECT",
        question: "The hip joint is classified as which type of synovial joint?",
        order: 1,
      },
      {
        lessonId,
        type: "SELECT",
        question: "Normal hip flexion (with knee bent) range of motion is approximately…",
        order: 2,
      },
      {
        lessonId,
        type: "SELECT",
        question: "Which large muscle group extends the hip and is important for walking?",
        order: 3,
      },
      {
        lessonId,
        type: "ASSIST",
        question: "What is the name of the bony prominence you sit on?",
        order: 4,
      },
      {
        lessonId,
        type: "SELECT",
        question: "The iliotibial (IT) band connects the hip to which structure?",
        order: 5,
      },
      {
        lessonId,
        type: "SELECT",
        question: "Which muscle abducts the hip and is essential for single-leg stance?",
        order: 6,
      },
      {
        lessonId,
        type: "ASSIST",
        question: "What is the socket of the hip joint called?",
        order: 7,
      },
      {
        lessonId,
        type: "SELECT",
        question: "A positive Trendelenburg sign indicates weakness of which muscle?",
        order: 8,
      },
    ])
    .returning();

  const opts: Record<number, { correct: boolean; text: string }[]> = {
    1: [
      { correct: true, text: "Ball-and-socket joint" },
      { correct: false, text: "Hinge joint" },
      { correct: false, text: "Condyloid joint" },
    ],
    2: [
      { correct: true, text: "0–120°" },
      { correct: false, text: "0–90°" },
      { correct: false, text: "0–150°" },
    ],
    3: [
      { correct: true, text: "Gluteus maximus (and hamstrings)" },
      { correct: false, text: "Quadriceps" },
      { correct: false, text: "Hip flexors (iliopsoas)" },
    ],
    4: [
      { correct: true, text: "Ischial tuberosity" },
      { correct: false, text: "Greater trochanter" },
      { correct: false, text: "Iliac crest" },
    ],
    5: [
      { correct: true, text: "Lateral knee (Gerdy's tubercle on tibia)" },
      { correct: false, text: "Patella" },
      { correct: false, text: "Fibula head" },
    ],
    6: [
      { correct: true, text: "Gluteus medius" },
      { correct: false, text: "Gluteus maximus" },
      { correct: false, text: "Tensor fasciae latae" },
    ],
    7: [
      { correct: true, text: "Acetabulum" },
      { correct: false, text: "Glenoid fossa" },
      { correct: false, text: "Condyle" },
    ],
    8: [
      { correct: true, text: "Gluteus medius (hip abductors)" },
      { correct: false, text: "Gluteus maximus" },
      { correct: false, text: "Iliopsoas" },
    ],
  };

  for (const c of challenges) {
    await db
      .insert(schema.challengeOptions)
      .values(opts[c.order].map((o) => ({ challengeId: c.id, ...o })));
  }
};

// ── Knee & Ankle ─────────────────────────────────────────────────────────────
const seedKneeLesson = async (lessonId: number) => {
  const challenges = await db
    .insert(schema.challenges)
    .values([
      {
        lessonId,
        type: "SELECT",
        question: "The knee joint is primarily classified as which type?",
        order: 1,
      },
      {
        lessonId,
        type: "SELECT",
        question: "The ACL (anterior cruciate ligament) primarily prevents…",
        order: 2,
      },
      {
        lessonId,
        type: "SELECT",
        question: "The medial and lateral menisci of the knee are made of…",
        order: 3,
      },
      {
        lessonId,
        type: "ASSIST",
        question: "Which four muscles make up the quadriceps group?",
        order: 4,
      },
      {
        lessonId,
        type: "SELECT",
        question: "Dorsiflexion of the ankle moves the foot in which direction?",
        order: 5,
      },
      {
        lessonId,
        type: "SELECT",
        question: "Normal ankle plantarflexion range of motion is approximately…",
        order: 6,
      },
      {
        lessonId,
        type: "ASSIST",
        question: "What is the Achilles tendon the distal attachment of?",
        order: 7,
      },
      {
        lessonId,
        type: "SELECT",
        question: "Inversion of the foot is controlled primarily by muscles on which side?",
        order: 8,
      },
    ])
    .returning();

  const opts: Record<number, { correct: boolean; text: string }[]> = {
    1: [
      { correct: true, text: "Modified hinge joint" },
      { correct: false, text: "Ball-and-socket joint" },
      { correct: false, text: "Pivot joint" },
    ],
    2: [
      { correct: true, text: "Anterior translation of the tibia on the femur" },
      { correct: false, text: "Posterior translation of the tibia" },
      { correct: false, text: "Lateral rotation of the knee" },
    ],
    3: [
      { correct: true, text: "Fibrocartilage" },
      { correct: false, text: "Hyaline cartilage" },
      { correct: false, text: "Elastic cartilage" },
    ],
    4: [
      { correct: true, text: "Rectus femoris, vastus lateralis, vastus medialis, vastus intermedius" },
      { correct: false, text: "Biceps femoris, semitendinosus, semimembranosus, gracilis" },
      { correct: false, text: "Sartorius, tensor fascia latae, iliopsoas, rectus femoris" },
    ],
    5: [
      { correct: true, text: "Toes point upward (foot toward shin)" },
      { correct: false, text: "Toes point downward (foot away from shin)" },
      { correct: false, text: "Foot turns inward" },
    ],
    6: [
      { correct: true, text: "0–50°" },
      { correct: false, text: "0–20°" },
      { correct: false, text: "0–90°" },
    ],
    7: [
      { correct: true, text: "Gastrocnemius and soleus (triceps surae)" },
      { correct: false, text: "Tibialis anterior" },
      { correct: false, text: "Peroneus longus" },
    ],
    8: [
      { correct: true, text: "Medial (tibialis posterior, tibialis anterior)" },
      { correct: false, text: "Lateral (peroneals)" },
      { correct: false, text: "Posterior (gastrocnemius)" },
    ],
  };

  for (const c of challenges) {
    await db
      .insert(schema.challengeOptions)
      .values(opts[c.order].map((o) => ({ challengeId: c.id, ...o })));
  }
};

// ── Unit 1 Recap (Skeletal System) ───────────────────────────────────────────
const seedSkeletalRecap = async (lessonId: number) => {
  const challenges = await db
    .insert(schema.challenges)
    .values([
      {
        lessonId,
        type: "SELECT",
        question: "How many bones make up the adult human skull?",
        order: 1,
      },
      {
        lessonId,
        type: "SELECT",
        question: "How many vertebrae are in the cervical region?",
        order: 2,
      },
      {
        lessonId,
        type: "ASSIST",
        question: "Which forearm bone is on the medial (little finger) side?",
        order: 3,
      },
      {
        lessonId,
        type: "SELECT",
        question: "Which bone is the longest in the human body?",
        order: 4,
      },
      {
        lessonId,
        type: "SELECT",
        question: "How many pairs of ribs does the human thoracic cage have?",
        order: 5,
      },
      {
        lessonId,
        type: "ASSIST",
        question: "What is the name of the fused bones that form the tailbone?",
        order: 6,
      },
      {
        lessonId,
        type: "SELECT",
        question: "Which three bones fuse to form the adult os coxae (hip bone)?",
        order: 7,
      },
      {
        lessonId,
        type: "SELECT",
        question: "Which cranial bone contains the foramen magnum?",
        order: 8,
      },
    ])
    .returning();

  const opts: Record<number, { correct: boolean; text: string }[]> = {
    1: [
      { correct: true, text: "22" },
      { correct: false, text: "14" },
      { correct: false, text: "28" },
    ],
    2: [
      { correct: true, text: "7" },
      { correct: false, text: "5" },
      { correct: false, text: "12" },
    ],
    3: [
      { correct: true, text: "Ulna" },
      { correct: false, text: "Radius" },
      { correct: false, text: "Fibula" },
    ],
    4: [
      { correct: true, text: "Femur (thigh bone)" },
      { correct: false, text: "Tibia" },
      { correct: false, text: "Humerus" },
    ],
    5: [
      { correct: true, text: "12 pairs" },
      { correct: false, text: "10 pairs" },
      { correct: false, text: "14 pairs" },
    ],
    6: [
      { correct: true, text: "Coccyx" },
      { correct: false, text: "Sacrum" },
      { correct: false, text: "Ilium" },
    ],
    7: [
      { correct: true, text: "Ilium, ischium, and pubis" },
      { correct: false, text: "Sacrum, ilium, and femur" },
      { correct: false, text: "Ilium, femur, and pubis" },
    ],
    8: [
      { correct: true, text: "Occipital bone" },
      { correct: false, text: "Temporal bone" },
      { correct: false, text: "Frontal bone" },
    ],
  };

  for (const c of challenges) {
    await db
      .insert(schema.challengeOptions)
      .values(opts[c.order].map((o) => ({ challengeId: c.id, ...o })));
  }
};

// ── Unit 2 Recap (Joints & Movement) ─────────────────────────────────────────
const seedJointsRecap = async (lessonId: number) => {
  const challenges = await db
    .insert(schema.challenges)
    .values([
      {
        lessonId,
        type: "SELECT",
        question: "Which type of joint allows no movement (e.g., skull sutures)?",
        order: 1,
      },
      {
        lessonId,
        type: "SELECT",
        question: "The glenohumeral joint is what type of synovial joint?",
        order: 2,
      },
      {
        lessonId,
        type: "ASSIST",
        question: "Which rotator cuff muscle initiates shoulder abduction (first 15°)?",
        order: 3,
      },
      {
        lessonId,
        type: "SELECT",
        question: "The elbow joint (humeroulnar) is classified as which type?",
        order: 4,
      },
      {
        lessonId,
        type: "SELECT",
        question: "The hip joint is classified as which type of synovial joint?",
        order: 5,
      },
      {
        lessonId,
        type: "ASSIST",
        question: "What is the socket of the hip joint called?",
        order: 6,
      },
      {
        lessonId,
        type: "SELECT",
        question: "The ACL (anterior cruciate ligament) primarily prevents…",
        order: 7,
      },
      {
        lessonId,
        type: "SELECT",
        question: "Dorsiflexion of the ankle moves the foot in which direction?",
        order: 8,
      },
    ])
    .returning();

  const opts: Record<number, { correct: boolean; text: string }[]> = {
    1: [
      { correct: true, text: "Synarthrosis (fibrous joint)" },
      { correct: false, text: "Amphiarthrosis" },
      { correct: false, text: "Diarthrosis" },
    ],
    2: [
      { correct: true, text: "Ball-and-socket joint" },
      { correct: false, text: "Hinge joint" },
      { correct: false, text: "Saddle joint" },
    ],
    3: [
      { correct: true, text: "Supraspinatus" },
      { correct: false, text: "Deltoid" },
      { correct: false, text: "Infraspinatus" },
    ],
    4: [
      { correct: true, text: "Hinge joint" },
      { correct: false, text: "Pivot joint" },
      { correct: false, text: "Condyloid joint" },
    ],
    5: [
      { correct: true, text: "Ball-and-socket joint" },
      { correct: false, text: "Hinge joint" },
      { correct: false, text: "Condyloid joint" },
    ],
    6: [
      { correct: true, text: "Acetabulum" },
      { correct: false, text: "Glenoid fossa" },
      { correct: false, text: "Condyle" },
    ],
    7: [
      { correct: true, text: "Anterior translation of the tibia on the femur" },
      { correct: false, text: "Posterior translation of the tibia" },
      { correct: false, text: "Lateral rotation of the knee" },
    ],
    8: [
      { correct: true, text: "Toes point upward (foot toward shin)" },
      { correct: false, text: "Toes point downward (foot away from shin)" },
      { correct: false, text: "Foot turns inward" },
    ],
  };

  for (const c of challenges) {
    await db
      .insert(schema.challengeOptions)
      .values(opts[c.order].map((o) => ({ challengeId: c.id, ...o })));
  }
};

void main();
