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
        { title: "Anatomy", imageSrc: "/anatomy.png" },
        { title: "Kinesiology", imageSrc: "/kinesiology.png" },
      ])
      .returning();

    for (const course of courses) {
      if (course.title === "Anatomy") {
        await seedAnatomy(course.id);
      } else if (course.title === "Kinesiology") {
        await seedKinesiology(course.id);
      }
    }

    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
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

// ══════════════════════════════════════════════════════════════════════════════
// KINESIOLOGY
// ══════════════════════════════════════════════════════════════════════════════

const seedKinesiology = async (courseId: number) => {
  const units = await db
    .insert(schema.units)
    .values([
      {
        courseId,
        title: "Unit 1: Muscles & Contraction",
        description: "Upper body, lower body, core muscles and contraction mechanics",
        order: 1,
      },
      {
        courseId,
        title: "Unit 2: Movement Science",
        description: "Forces, levers, gait, exercise physiology and rehabilitation",
        order: 2,
      },
    ])
    .returning();

  for (const unit of units) {
    if (unit.order === 1) await seedKinesiologyUnit1(unit.id);
    else if (unit.order === 2) await seedKinesiologyUnit2(unit.id);
  }
};

const seedKinesiologyUnit1 = async (unitId: number) => {
  const lessons = await db
    .insert(schema.lessons)
    .values([
      { unitId, title: "Upper Body Muscles", order: 1 },
      { unitId, title: "Lower Body Muscles", order: 2 },
      { unitId, title: "Core Muscles", order: 3 },
      { unitId, title: "Muscle Contraction", order: 4 },
      { unitId, title: "Unit Recap", order: 5 },
    ])
    .returning();

  for (const lesson of lessons) {
    if (lesson.order === 1) await seedUpperBodyMusclesLesson(lesson.id);
    if (lesson.order === 2) await seedLowerBodyMusclesLesson(lesson.id);
    if (lesson.order === 3) await seedCoreMusclesLesson(lesson.id);
    if (lesson.order === 4) await seedMuscleContractionLesson(lesson.id);
    if (lesson.order === 5) await seedKinUnit1Recap(lesson.id);
  }
};

const seedKinesiologyUnit2 = async (unitId: number) => {
  const lessons = await db
    .insert(schema.lessons)
    .values([
      { unitId, title: "Forces & Levers", order: 1 },
      { unitId, title: "Gait Analysis", order: 2 },
      { unitId, title: "Exercise Physiology", order: 3 },
      { unitId, title: "Rehabilitation Principles", order: 4 },
      { unitId, title: "Unit Recap", order: 5 },
    ])
    .returning();

  for (const lesson of lessons) {
    if (lesson.order === 1) await seedForcesLeversLesson(lesson.id);
    if (lesson.order === 2) await seedGaitLesson(lesson.id);
    if (lesson.order === 3) await seedExercisePhysiologyLesson(lesson.id);
    if (lesson.order === 4) await seedRehabPrinciplesLesson(lesson.id);
    if (lesson.order === 5) await seedKinUnit2Recap(lesson.id);
  }
};

// ── Upper Body Muscles ────────────────────────────────────────────────────────
const seedUpperBodyMusclesLesson = async (lessonId: number) => {
  const challenges = await db
    .insert(schema.challenges)
    .values([
      { lessonId, type: "SELECT", question: "Which muscle is the primary shoulder abductor?", order: 1 },
      { lessonId, type: "SELECT", question: "The biceps brachii performs which action at the elbow?", order: 2 },
      { lessonId, type: "ASSIST", question: "Name the largest muscle of the back.", order: 3 },
      { lessonId, type: "SELECT", question: "Which rotator cuff muscle internally rotates the humerus?", order: 4 },
      { lessonId, type: "TRUE_FALSE", question: "The trapezius muscle is located on the anterior chest.", order: 5 },
      { lessonId, type: "SELECT", question: "The pectoralis major's primary action is:", order: 6 },
      { lessonId, type: "ASSIST", question: "Which muscle elevates and retracts the scapula?", order: 7 },
      { lessonId, type: "TRUE_FALSE", question: "The deltoid has three distinct parts: anterior, middle, and posterior.", order: 8 },
      { lessonId, type: "FILL_BLANK", question: "The ___ brachii flexes the elbow and supinates the forearm.", order: 9 },
      { lessonId, type: "FILL_BLANK", question: "The ___ is the primary shoulder abductor.", order: 10 },
    ])
    .returning();

  const opts: Record<number, { text: string; correct: boolean }[]> = {
    1: [
      { text: "Deltoid", correct: true },
      { text: "Pectoralis major", correct: false },
      { text: "Trapezius", correct: false },
      { text: "Biceps brachii", correct: false },
    ],
    2: [
      { text: "Flexion and supination", correct: true },
      { text: "Extension and pronation", correct: false },
      { text: "Abduction", correct: false },
      { text: "Internal rotation", correct: false },
    ],
    3: [
      { text: "Latissimus dorsi", correct: true },
      { text: "Trapezius", correct: false },
      { text: "Rhomboid major", correct: false },
      { text: "Teres major", correct: false },
    ],
    4: [
      { text: "Subscapularis", correct: true },
      { text: "Infraspinatus", correct: false },
      { text: "Supraspinatus", correct: false },
      { text: "Teres minor", correct: false },
    ],
    5: [
      { text: "True", correct: false },
      { text: "False", correct: true },
    ],
    6: [
      { text: "Horizontal adduction and flexion", correct: true },
      { text: "Shoulder abduction", correct: false },
      { text: "Elbow extension", correct: false },
      { text: "Scapular retraction", correct: false },
    ],
    7: [
      { text: "Trapezius", correct: true },
      { text: "Serratus anterior", correct: false },
      { text: "Rhomboid minor", correct: false },
      { text: "Levator scapulae", correct: false },
    ],
    8: [
      { text: "True", correct: true },
      { text: "False", correct: false },
    ],
    9: [
      { text: "Biceps", correct: true },
      { text: "Triceps", correct: false },
      { text: "Brachialis", correct: false },
      { text: "Coracobrachialis", correct: false },
    ],
    10: [
      { text: "Deltoid", correct: true },
      { text: "Supraspinatus", correct: false },
      { text: "Trapezius", correct: false },
      { text: "Biceps", correct: false },
    ],
  };

  for (const c of challenges) {
    await db.insert(schema.challengeOptions).values(opts[c.order].map((o) => ({ challengeId: c.id, ...o })));
  }
};

// ── Lower Body Muscles ────────────────────────────────────────────────────────
const seedLowerBodyMusclesLesson = async (lessonId: number) => {
  const challenges = await db
    .insert(schema.challenges)
    .values([
      { lessonId, type: "SELECT", question: "Which muscle group is primarily responsible for knee extension?", order: 1 },
      { lessonId, type: "SELECT", question: "The gluteus maximus primarily performs which action?", order: 2 },
      { lessonId, type: "ASSIST", question: "Name the muscle that plantarflexes the ankle and flexes the knee.", order: 3 },
      { lessonId, type: "SELECT", question: "Which muscle is the primary hip flexor?", order: 4 },
      { lessonId, type: "TRUE_FALSE", question: "The hamstrings both flex the knee and extend the hip.", order: 5 },
      { lessonId, type: "SELECT", question: "The tibialis anterior performs which action?", order: 6 },
      { lessonId, type: "ASSIST", question: "Which muscle group adducts the hip?", order: 7 },
      { lessonId, type: "TRUE_FALSE", question: "The soleus crosses the knee joint.", order: 8 },
      { lessonId, type: "FILL_BLANK", question: "The ___ maximus is the largest muscle in the body.", order: 9 },
      { lessonId, type: "FILL_BLANK", question: "The quadriceps femoris is the primary ___ extensor.", order: 10 },
    ])
    .returning();

  const opts: Record<number, { text: string; correct: boolean }[]> = {
    1: [
      { text: "Quadriceps femoris", correct: true },
      { text: "Hamstrings", correct: false },
      { text: "Gastrocnemius", correct: false },
      { text: "Adductors", correct: false },
    ],
    2: [
      { text: "Hip extension", correct: true },
      { text: "Hip flexion", correct: false },
      { text: "Knee flexion", correct: false },
      { text: "Hip abduction", correct: false },
    ],
    3: [
      { text: "Gastrocnemius", correct: true },
      { text: "Soleus", correct: false },
      { text: "Tibialis anterior", correct: false },
      { text: "Peroneus longus", correct: false },
    ],
    4: [
      { text: "Iliopsoas", correct: true },
      { text: "Rectus femoris", correct: false },
      { text: "Sartorius", correct: false },
      { text: "Tensor fasciae latae", correct: false },
    ],
    5: [
      { text: "True", correct: true },
      { text: "False", correct: false },
    ],
    6: [
      { text: "Dorsiflexion and foot inversion", correct: true },
      { text: "Plantarflexion", correct: false },
      { text: "Knee extension", correct: false },
      { text: "Foot eversion", correct: false },
    ],
    7: [
      { text: "Adductor group", correct: true },
      { text: "Abductor group", correct: false },
      { text: "Quadriceps", correct: false },
      { text: "Hamstrings", correct: false },
    ],
    8: [
      { text: "True", correct: false },
      { text: "False", correct: true },
    ],
    9: [
      { text: "Gluteus", correct: true },
      { text: "Rectus", correct: false },
      { text: "Vastus", correct: false },
      { text: "Iliacus", correct: false },
    ],
    10: [
      { text: "Knee", correct: true },
      { text: "Hip", correct: false },
      { text: "Ankle", correct: false },
      { text: "Foot", correct: false },
    ],
  };

  for (const c of challenges) {
    await db.insert(schema.challengeOptions).values(opts[c.order].map((o) => ({ challengeId: c.id, ...o })));
  }
};

// ── Core Muscles ──────────────────────────────────────────────────────────────
const seedCoreMusclesLesson = async (lessonId: number) => {
  const challenges = await db
    .insert(schema.challenges)
    .values([
      { lessonId, type: "SELECT", question: "Which muscle is considered the deepest layer of the abdominal wall?", order: 1 },
      { lessonId, type: "SELECT", question: "The erector spinae group primarily performs which action?", order: 2 },
      { lessonId, type: "ASSIST", question: "Name the muscle that forms the 'six-pack' appearance.", order: 3 },
      { lessonId, type: "TRUE_FALSE", question: "The diaphragm plays a role in core stability.", order: 4 },
      { lessonId, type: "SELECT", question: "Which muscle compresses the abdominal contents and assists forced expiration?", order: 5 },
      { lessonId, type: "ASSIST", question: "What is the name of the flat tendinous region connecting left and right abdominals?", order: 6 },
      { lessonId, type: "TRUE_FALSE", question: "The multifidus muscle runs along the entire length of the spine.", order: 7 },
      { lessonId, type: "SELECT", question: "The quadratus lumborum performs which action?", order: 8 },
      { lessonId, type: "FILL_BLANK", question: "The ___ abdominis is the deepest abdominal muscle.", order: 9 },
      { lessonId, type: "FILL_BLANK", question: "The rectus abdominis is enclosed in a fibrous ___ sheath.", order: 10 },
    ])
    .returning();

  const opts: Record<number, { text: string; correct: boolean }[]> = {
    1: [
      { text: "Transversus abdominis", correct: true },
      { text: "Rectus abdominis", correct: false },
      { text: "Internal oblique", correct: false },
      { text: "External oblique", correct: false },
    ],
    2: [
      { text: "Trunk extension and lateral flexion", correct: true },
      { text: "Trunk flexion", correct: false },
      { text: "Hip flexion", correct: false },
      { text: "Shoulder stabilisation", correct: false },
    ],
    3: [
      { text: "Rectus abdominis", correct: true },
      { text: "External oblique", correct: false },
      { text: "Transversus abdominis", correct: false },
      { text: "Internal oblique", correct: false },
    ],
    4: [
      { text: "True", correct: true },
      { text: "False", correct: false },
    ],
    5: [
      { text: "Transversus abdominis", correct: true },
      { text: "Rectus abdominis", correct: false },
      { text: "Erector spinae", correct: false },
      { text: "Multifidus", correct: false },
    ],
    6: [
      { text: "Linea alba", correct: true },
      { text: "Inguinal ligament", correct: false },
      { text: "Iliotibial band", correct: false },
      { text: "Thoracolumbar fascia", correct: false },
    ],
    7: [
      { text: "True", correct: true },
      { text: "False", correct: false },
    ],
    8: [
      { text: "Lateral flexion and hip elevation", correct: true },
      { text: "Hip extension", correct: false },
      { text: "Trunk rotation", correct: false },
      { text: "Ankle plantarflexion", correct: false },
    ],
    9: [
      { text: "Transversus", correct: true },
      { text: "Rectus", correct: false },
      { text: "Oblique", correct: false },
      { text: "Multifidus", correct: false },
    ],
    10: [
      { text: "Rectus", correct: true },
      { text: "Linea", correct: false },
      { text: "Fascial", correct: false },
      { text: "Oblique", correct: false },
    ],
  };

  for (const c of challenges) {
    await db.insert(schema.challengeOptions).values(opts[c.order].map((o) => ({ challengeId: c.id, ...o })));
  }
};

// ── Muscle Contraction ────────────────────────────────────────────────────────
const seedMuscleContractionLesson = async (lessonId: number) => {
  const challenges = await db
    .insert(schema.challenges)
    .values([
      { lessonId, type: "SELECT", question: "What is the functional unit of a muscle called?", order: 1 },
      { lessonId, type: "SELECT", question: "During a concentric contraction, the muscle:", order: 2 },
      { lessonId, type: "ASSIST", question: "Name the protein that forms the thin filaments of a sarcomere.", order: 3 },
      { lessonId, type: "TRUE_FALSE", question: "An eccentric contraction occurs when the muscle lengthens under load.", order: 4 },
      { lessonId, type: "SELECT", question: "Which ion triggers muscle contraction by binding to troponin?", order: 5 },
      { lessonId, type: "SELECT", question: "An isometric contraction produces:", order: 6 },
      { lessonId, type: "ASSIST", question: "What is the all-or-none principle in muscle physiology?", order: 7 },
      { lessonId, type: "TRUE_FALSE", question: "Myosin forms the thin filaments of the sarcomere.", order: 8 },
      { lessonId, type: "FILL_BLANK", question: "The ___ is the functional unit of the muscle fibre.", order: 9 },
      { lessonId, type: "FILL_BLANK", question: "Calcium binds to ___ to initiate cross-bridge cycling.", order: 10 },
      { lessonId, type: "SELECT", question: "Which type of muscle fibre fatigue most quickly?", order: 11 },
    ])
    .returning();

  const opts: Record<number, { text: string; correct: boolean }[]> = {
    1: [
      { text: "Sarcomere", correct: true },
      { text: "Motor unit", correct: false },
      { text: "Myofibril", correct: false },
      { text: "Fascicle", correct: false },
    ],
    2: [
      { text: "Shortens and generates force", correct: true },
      { text: "Lengthens under load", correct: false },
      { text: "Generates no movement", correct: false },
      { text: "Relaxes completely", correct: false },
    ],
    3: [
      { text: "Actin", correct: true },
      { text: "Myosin", correct: false },
      { text: "Titin", correct: false },
      { text: "Tropomyosin", correct: false },
    ],
    4: [
      { text: "True", correct: true },
      { text: "False", correct: false },
    ],
    5: [
      { text: "Calcium", correct: true },
      { text: "Sodium", correct: false },
      { text: "Potassium", correct: false },
      { text: "Magnesium", correct: false },
    ],
    6: [
      { text: "No joint movement", correct: true },
      { text: "Muscle shortening", correct: false },
      { text: "Muscle lengthening", correct: false },
      { text: "Relaxation of the muscle", correct: false },
    ],
    7: [
      { text: "Each motor neuron either fires completely or not at all", correct: true },
      { text: "Muscles contract proportionally to stimulus strength", correct: false },
      { text: "All fibres in a muscle fire simultaneously", correct: false },
      { text: "Larger muscles contract before smaller ones", correct: false },
    ],
    8: [
      { text: "True", correct: false },
      { text: "False", correct: true },
    ],
    9: [
      { text: "Sarcomere", correct: true },
      { text: "Myofibril", correct: false },
      { text: "Motor unit", correct: false },
      { text: "Fascicle", correct: false },
    ],
    10: [
      { text: "Troponin", correct: true },
      { text: "Tropomyosin", correct: false },
      { text: "Actin", correct: false },
      { text: "Myosin", correct: false },
    ],
    11: [
      { text: "Type II b (fast-twitch glycolytic)", correct: true },
      { text: "Type I (slow-twitch oxidative)", correct: false },
      { text: "Type II a (fast-twitch oxidative)", correct: false },
      { text: "All fatigue at the same rate", correct: false },
    ],
  };

  for (const c of challenges) {
    await db.insert(schema.challengeOptions).values(opts[c.order].map((o) => ({ challengeId: c.id, ...o })));
  }
};

// ── Unit 1 Recap ─────────────────────────────────────────────────────────────
const seedKinUnit1Recap = async (lessonId: number) => {
  const challenges = await db
    .insert(schema.challenges)
    .values([
      { lessonId, type: "SELECT", question: "Which muscle is the primary shoulder abductor?", order: 1 },
      { lessonId, type: "SELECT", question: "The hamstrings perform what two actions?", order: 2 },
      { lessonId, type: "TRUE_FALSE", question: "The transversus abdominis is the deepest abdominal muscle.", order: 3 },
      { lessonId, type: "SELECT", question: "A concentric contraction involves:", order: 4 },
      { lessonId, type: "FILL_BLANK", question: "The ___ is the functional unit of a muscle fibre.", order: 5 },
      { lessonId, type: "SELECT", question: "Which muscle performs hip extension?", order: 6 },
      { lessonId, type: "TRUE_FALSE", question: "Myosin forms the thin filaments of the sarcomere.", order: 7 },
      { lessonId, type: "FILL_BLANK", question: "The ___ abdominis forms the 'six-pack'.", order: 8 },
      { lessonId, type: "SELECT", question: "Calcium triggers contraction by binding to:", order: 9 },
      { lessonId, type: "ASSIST", question: "Which muscle group extends the knee?", order: 10 },
    ])
    .returning();

  const opts: Record<number, { text: string; correct: boolean }[]> = {
    1: [
      { text: "Deltoid", correct: true },
      { text: "Pectoralis major", correct: false },
      { text: "Trapezius", correct: false },
      { text: "Supraspinatus", correct: false },
    ],
    2: [
      { text: "Knee flexion and hip extension", correct: true },
      { text: "Knee extension and hip flexion", correct: false },
      { text: "Ankle plantarflexion and knee flexion", correct: false },
      { text: "Hip abduction and knee extension", correct: false },
    ],
    3: [
      { text: "True", correct: true },
      { text: "False", correct: false },
    ],
    4: [
      { text: "Muscle shortening under load", correct: true },
      { text: "Muscle lengthening under load", correct: false },
      { text: "No change in muscle length", correct: false },
      { text: "Complete muscle relaxation", correct: false },
    ],
    5: [
      { text: "Sarcomere", correct: true },
      { text: "Myofibril", correct: false },
      { text: "Motor unit", correct: false },
      { text: "Fascicle", correct: false },
    ],
    6: [
      { text: "Gluteus maximus", correct: true },
      { text: "Iliopsoas", correct: false },
      { text: "Rectus femoris", correct: false },
      { text: "Adductor magnus", correct: false },
    ],
    7: [
      { text: "True", correct: false },
      { text: "False", correct: true },
    ],
    8: [
      { text: "Rectus", correct: true },
      { text: "Transversus", correct: false },
      { text: "External oblique", correct: false },
      { text: "Internal oblique", correct: false },
    ],
    9: [
      { text: "Troponin", correct: true },
      { text: "Tropomyosin", correct: false },
      { text: "Actin", correct: false },
      { text: "Myosin", correct: false },
    ],
    10: [
      { text: "Quadriceps femoris", correct: true },
      { text: "Hamstrings", correct: false },
      { text: "Gastrocnemius", correct: false },
      { text: "Adductors", correct: false },
    ],
  };

  for (const c of challenges) {
    await db.insert(schema.challengeOptions).values(opts[c.order].map((o) => ({ challengeId: c.id, ...o })));
  }
};

// ── Forces & Levers ───────────────────────────────────────────────────────────
const seedForcesLeversLesson = async (lessonId: number) => {
  const challenges = await db
    .insert(schema.challenges)
    .values([
      { lessonId, type: "SELECT", question: "In a first-class lever, where is the fulcrum located?", order: 1 },
      { lessonId, type: "SELECT", question: "Which class of lever provides the greatest mechanical advantage?", order: 2 },
      { lessonId, type: "ASSIST", question: "Name the type of force that acts perpendicular to a joint surface.", order: 3 },
      { lessonId, type: "TRUE_FALSE", question: "The elbow during bicep curl is an example of a third-class lever.", order: 4 },
      { lessonId, type: "SELECT", question: "Torque is calculated as:", order: 5 },
      { lessonId, type: "ASSIST", question: "Define ground reaction force.", order: 6 },
      { lessonId, type: "TRUE_FALSE", question: "A second-class lever always has the load between the fulcrum and effort.", order: 7 },
      { lessonId, type: "SELECT", question: "The moment arm is the:", order: 8 },
      { lessonId, type: "FILL_BLANK", question: "Torque equals force multiplied by the ___ arm.", order: 9 },
      { lessonId, type: "FILL_BLANK", question: "A ___ class lever has the fulcrum between the effort and load.", order: 10 },
    ])
    .returning();

  const opts: Record<number, { text: string; correct: boolean }[]> = {
    1: [
      { text: "Between the effort and load", correct: true },
      { text: "At one end", correct: false },
      { text: "At the load end", correct: false },
      { text: "Beyond the load", correct: false },
    ],
    2: [
      { text: "Second class", correct: true },
      { text: "First class", correct: false },
      { text: "Third class", correct: false },
      { text: "All are equal", correct: false },
    ],
    3: [
      { text: "Compressive force", correct: true },
      { text: "Shear force", correct: false },
      { text: "Tensile force", correct: false },
      { text: "Torsional force", correct: false },
    ],
    4: [
      { text: "True", correct: true },
      { text: "False", correct: false },
    ],
    5: [
      { text: "Force × moment arm", correct: true },
      { text: "Force × velocity", correct: false },
      { text: "Mass × acceleration", correct: false },
      { text: "Force / distance", correct: false },
    ],
    6: [
      { text: "The equal and opposite force the ground exerts on the body", correct: true },
      { text: "The force of gravity on the body", correct: false },
      { text: "Muscle force during stance", correct: false },
      { text: "Joint contact force during walking", correct: false },
    ],
    7: [
      { text: "True", correct: true },
      { text: "False", correct: false },
    ],
    8: [
      { text: "Perpendicular distance from the axis to the line of force", correct: true },
      { text: "Length of the limb segment", correct: false },
      { text: "Distance between two joints", correct: false },
      { text: "Magnitude of the applied force", correct: false },
    ],
    9: [
      { text: "Moment", correct: true },
      { text: "Velocity", correct: false },
      { text: "Angular", correct: false },
      { text: "Gravity", correct: false },
    ],
    10: [
      { text: "First", correct: true },
      { text: "Second", correct: false },
      { text: "Third", correct: false },
      { text: "Fourth", correct: false },
    ],
  };

  for (const c of challenges) {
    await db.insert(schema.challengeOptions).values(opts[c.order].map((o) => ({ challengeId: c.id, ...o })));
  }
};

// ── Gait Analysis ─────────────────────────────────────────────────────────────
const seedGaitLesson = async (lessonId: number) => {
  const challenges = await db
    .insert(schema.challenges)
    .values([
      { lessonId, type: "SELECT", question: "The gait cycle begins and ends with:", order: 1 },
      { lessonId, type: "SELECT", question: "What percentage of the gait cycle is the stance phase?", order: 2 },
      { lessonId, type: "ASSIST", question: "Name the point in the gait cycle when both feet are on the ground.", order: 3 },
      { lessonId, type: "TRUE_FALSE", question: "Heel strike marks the beginning of the swing phase.", order: 4 },
      { lessonId, type: "SELECT", question: "Cadence is defined as:", order: 5 },
      { lessonId, type: "ASSIST", question: "What is the term for walking speed expressed as distance per unit time?", order: 6 },
      { lessonId, type: "TRUE_FALSE", question: "During double support, body weight is transferred between feet.", order: 7 },
      { lessonId, type: "SELECT", question: "Trendelenburg gait results from weakness in which muscle?", order: 8 },
      { lessonId, type: "FILL_BLANK", question: "The ___ phase of gait accounts for approximately 60% of the cycle.", order: 9 },
      { lessonId, type: "FILL_BLANK", question: "Step length is the distance from one ___ strike to the contralateral heel strike.", order: 10 },
    ])
    .returning();

  const opts: Record<number, { text: string; correct: boolean }[]> = {
    1: [
      { text: "Heel strike of the same foot", correct: true },
      { text: "Toe off of either foot", correct: false },
      { text: "Mid-stance", correct: false },
      { text: "Swing phase initiation", correct: false },
    ],
    2: [
      { text: "60%", correct: true },
      { text: "40%", correct: false },
      { text: "50%", correct: false },
      { text: "70%", correct: false },
    ],
    3: [
      { text: "Double support", correct: true },
      { text: "Single support", correct: false },
      { text: "Swing phase", correct: false },
      { text: "Terminal stance", correct: false },
    ],
    4: [
      { text: "True", correct: false },
      { text: "False", correct: true },
    ],
    5: [
      { text: "Number of steps per minute", correct: true },
      { text: "Distance walked per minute", correct: false },
      { text: "Number of strides per minute", correct: false },
      { text: "Time for one gait cycle", correct: false },
    ],
    6: [
      { text: "Gait velocity", correct: true },
      { text: "Cadence", correct: false },
      { text: "Stride frequency", correct: false },
      { text: "Step rate", correct: false },
    ],
    7: [
      { text: "True", correct: true },
      { text: "False", correct: false },
    ],
    8: [
      { text: "Gluteus medius", correct: true },
      { text: "Gluteus maximus", correct: false },
      { text: "Iliopsoas", correct: false },
      { text: "Quadriceps", correct: false },
    ],
    9: [
      { text: "Stance", correct: true },
      { text: "Swing", correct: false },
      { text: "Double support", correct: false },
      { text: "Terminal", correct: false },
    ],
    10: [
      { text: "Heel", correct: true },
      { text: "Toe", correct: false },
      { text: "Mid", correct: false },
      { text: "Foot", correct: false },
    ],
  };

  for (const c of challenges) {
    await db.insert(schema.challengeOptions).values(opts[c.order].map((o) => ({ challengeId: c.id, ...o })));
  }
};

// ── Exercise Physiology ───────────────────────────────────────────────────────
const seedExercisePhysiologyLesson = async (lessonId: number) => {
  const challenges = await db
    .insert(schema.challenges)
    .values([
      { lessonId, type: "SELECT", question: "VO2 max measures:", order: 1 },
      { lessonId, type: "SELECT", question: "The anaerobic threshold is the exercise intensity at which:", order: 2 },
      { lessonId, type: "ASSIST", question: "Name the energy system that provides ATP without oxygen.", order: 3 },
      { lessonId, type: "TRUE_FALSE", question: "Heart rate decreases linearly as exercise intensity increases.", order: 4 },
      { lessonId, type: "SELECT", question: "EPOC refers to:", order: 5 },
      { lessonId, type: "ASSIST", question: "What does RPE stand for in exercise testing?", order: 6 },
      { lessonId, type: "TRUE_FALSE", question: "Slow-twitch fibres are more fatigue-resistant than fast-twitch fibres.", order: 7 },
      { lessonId, type: "SELECT", question: "The primary fuel source during low-intensity prolonged exercise is:", order: 8 },
      { lessonId, type: "FILL_BLANK", question: "The maximum oxygen uptake during exercise is called ___.", order: 9 },
      { lessonId, type: "FILL_BLANK", question: "Lactic acid accumulates above the ___ threshold.", order: 10 },
    ])
    .returning();

  const opts: Record<number, { text: string; correct: boolean }[]> = {
    1: [
      { text: "Maximum oxygen consumption during exercise", correct: true },
      { text: "Resting oxygen consumption", correct: false },
      { text: "Carbon dioxide produced during exercise", correct: false },
      { text: "Heart rate at maximum effort", correct: false },
    ],
    2: [
      { text: "Lactate accumulates faster than it can be cleared", correct: true },
      { text: "Oxygen consumption peaks", correct: false },
      { text: "Heart rate plateaus", correct: false },
      { text: "Muscles switch to aerobic metabolism only", correct: false },
    ],
    3: [
      { text: "Anaerobic glycolysis", correct: true },
      { text: "Oxidative phosphorylation", correct: false },
      { text: "Beta oxidation", correct: false },
      { text: "Krebs cycle", correct: false },
    ],
    4: [
      { text: "True", correct: false },
      { text: "False", correct: true },
    ],
    5: [
      { text: "Excess post-exercise oxygen consumption", correct: true },
      { text: "Exercise-induced peripheral occlusion", correct: false },
      { text: "Expected peak oxygen capacity", correct: false },
      { text: "Elevated post-exercise cortisol", correct: false },
    ],
    6: [
      { text: "Rating of Perceived Exertion", correct: true },
      { text: "Respiratory Performance Evaluation", correct: false },
      { text: "Rate of Physical Effort", correct: false },
      { text: "Relative Physiological Exhaustion", correct: false },
    ],
    7: [
      { text: "True", correct: true },
      { text: "False", correct: false },
    ],
    8: [
      { text: "Fat (free fatty acids)", correct: true },
      { text: "Glycogen", correct: false },
      { text: "Protein", correct: false },
      { text: "Glucose", correct: false },
    ],
    9: [
      { text: "VO2 max", correct: true },
      { text: "EPOC", correct: false },
      { text: "Lactate threshold", correct: false },
      { text: "Aerobic capacity", correct: false },
    ],
    10: [
      { text: "Anaerobic", correct: true },
      { text: "Aerobic", correct: false },
      { text: "Ventilatory", correct: false },
      { text: "Lactate", correct: false },
    ],
  };

  for (const c of challenges) {
    await db.insert(schema.challengeOptions).values(opts[c.order].map((o) => ({ challengeId: c.id, ...o })));
  }
};

// ── Rehabilitation Principles ─────────────────────────────────────────────────
const seedRehabPrinciplesLesson = async (lessonId: number) => {
  const challenges = await db
    .insert(schema.challenges)
    .values([
      { lessonId, type: "SELECT", question: "RICE stands for:", order: 1 },
      { lessonId, type: "SELECT", question: "The inflammatory phase of tissue healing typically lasts:", order: 2 },
      { lessonId, type: "ASSIST", question: "Name the principle that states rehabilitation exercises should mimic functional demands.", order: 3 },
      { lessonId, type: "TRUE_FALSE", question: "Pain during rehabilitation always indicates tissue damage.", order: 4 },
      { lessonId, type: "SELECT", question: "Proprioception training primarily improves:", order: 5 },
      { lessonId, type: "ASSIST", question: "What does progressive overload mean in rehabilitation?", order: 6 },
      { lessonId, type: "TRUE_FALSE", question: "Scar tissue has the same tensile strength as original tissue.", order: 7 },
      { lessonId, type: "SELECT", question: "The remodelling phase of healing is characterised by:", order: 8 },
      { lessonId, type: "FILL_BLANK", question: "The ___ phase of healing involves collagen deposition.", order: 9 },
      { lessonId, type: "FILL_BLANK", question: "Functional rehabilitation aims to restore ___ movement patterns.", order: 10 },
    ])
    .returning();

  const opts: Record<number, { text: string; correct: boolean }[]> = {
    1: [
      { text: "Rest, Ice, Compression, Elevation", correct: true },
      { text: "Resistance, Intensity, Cardio, Exercise", correct: false },
      { text: "Rest, Immobilise, Cool, Elevate", correct: false },
      { text: "Range, Ice, Compression, Endurance", correct: false },
    ],
    2: [
      { text: "0–5 days", correct: true },
      { text: "2–4 weeks", correct: false },
      { text: "6–12 weeks", correct: false },
      { text: "Up to 1 year", correct: false },
    ],
    3: [
      { text: "Specificity of training", correct: true },
      { text: "Progressive overload", correct: false },
      { text: "SAID principle", correct: false },
      { text: "Periodisation", correct: false },
    ],
    4: [
      { text: "True", correct: false },
      { text: "False", correct: true },
    ],
    5: [
      { text: "Joint position sense and balance", correct: true },
      { text: "Muscle hypertrophy", correct: false },
      { text: "Cardiovascular endurance", correct: false },
      { text: "Flexibility", correct: false },
    ],
    6: [
      { text: "Gradually increasing exercise demands over time", correct: true },
      { text: "Starting at maximal load immediately", correct: false },
      { text: "Reducing rest periods each week", correct: false },
      { text: "Alternating muscle groups each session", correct: false },
    ],
    7: [
      { text: "True", correct: false },
      { text: "False", correct: true },
    ],
    8: [
      { text: "Collagen fibre realignment along stress lines", correct: true },
      { text: "Acute inflammation and swelling", correct: false },
      { text: "Angiogenesis and granulation tissue", correct: false },
      { text: "Immediate haemostasis", correct: false },
    ],
    9: [
      { text: "Proliferative", correct: true },
      { text: "Inflammatory", correct: false },
      { text: "Remodelling", correct: false },
      { text: "Haemostasis", correct: false },
    ],
    10: [
      { text: "Functional", correct: true },
      { text: "Isolated", correct: false },
      { text: "Passive", correct: false },
      { text: "Static", correct: false },
    ],
  };

  for (const c of challenges) {
    await db.insert(schema.challengeOptions).values(opts[c.order].map((o) => ({ challengeId: c.id, ...o })));
  }
};

// ── Unit 2 Recap ─────────────────────────────────────────────────────────────
const seedKinUnit2Recap = async (lessonId: number) => {
  const challenges = await db
    .insert(schema.challenges)
    .values([
      { lessonId, type: "SELECT", question: "Torque is calculated as force multiplied by the:", order: 1 },
      { lessonId, type: "TRUE_FALSE", question: "Stance phase accounts for 60% of the gait cycle.", order: 2 },
      { lessonId, type: "SELECT", question: "VO2 max measures:", order: 3 },
      { lessonId, type: "FILL_BLANK", question: "The ___ phase of tissue healing involves collagen remodelling.", order: 4 },
      { lessonId, type: "SELECT", question: "Trendelenburg gait results from weakness of:", order: 5 },
      { lessonId, type: "TRUE_FALSE", question: "A third-class lever has the effort between the fulcrum and load.", order: 6 },
      { lessonId, type: "SELECT", question: "The primary fuel during prolonged low-intensity exercise is:", order: 7 },
      { lessonId, type: "FILL_BLANK", question: "RICE stands for Rest, Ice, ___, Elevation.", order: 8 },
      { lessonId, type: "SELECT", question: "Cadence refers to:", order: 9 },
      { lessonId, type: "ASSIST", question: "What is the anaerobic threshold?", order: 10 },
    ])
    .returning();

  const opts: Record<number, { text: string; correct: boolean }[]> = {
    1: [
      { text: "Moment arm", correct: true },
      { text: "Velocity", correct: false },
      { text: "Mass", correct: false },
      { text: "Acceleration", correct: false },
    ],
    2: [
      { text: "True", correct: true },
      { text: "False", correct: false },
    ],
    3: [
      { text: "Maximum oxygen consumption during exercise", correct: true },
      { text: "Resting heart rate", correct: false },
      { text: "Carbon dioxide output", correct: false },
      { text: "Blood lactate at rest", correct: false },
    ],
    4: [
      { text: "Remodelling", correct: true },
      { text: "Inflammatory", correct: false },
      { text: "Proliferative", correct: false },
      { text: "Haemostasis", correct: false },
    ],
    5: [
      { text: "Gluteus medius", correct: true },
      { text: "Gluteus maximus", correct: false },
      { text: "Quadriceps", correct: false },
      { text: "Iliopsoas", correct: false },
    ],
    6: [
      { text: "True", correct: true },
      { text: "False", correct: false },
    ],
    7: [
      { text: "Fat", correct: true },
      { text: "Carbohydrate", correct: false },
      { text: "Protein", correct: false },
      { text: "Glycogen only", correct: false },
    ],
    8: [
      { text: "Compression", correct: true },
      { text: "Circulation", correct: false },
      { text: "Cardio", correct: false },
      { text: "Cold", correct: false },
    ],
    9: [
      { text: "Number of steps per minute", correct: true },
      { text: "Distance per minute", correct: false },
      { text: "Stride length", correct: false },
      { text: "Speed of walking", correct: false },
    ],
    10: [
      { text: "The intensity at which lactate accumulates faster than it can be cleared", correct: true },
      { text: "The point of maximum heart rate", correct: false },
      { text: "When muscles switch entirely to fat burning", correct: false },
      { text: "The maximum sustainable exercise intensity", correct: false },
    ],
  };

  for (const c of challenges) {
    await db.insert(schema.challengeOptions).values(opts[c.order].map((o) => ({ challengeId: c.id, ...o })));
  }
};

void main();

