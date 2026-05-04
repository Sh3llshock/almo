export type GlossaryEntry = {
  term: string;
  definition: string;
  sectionId: string;
};

// Unit 1 — Skeletal System
const unit1Glossary: GlossaryEntry[] = [
  {
    term: "foramen magnum",
    definition: "The large opening at the base of the occipital bone through which the spinal cord passes to connect with the brainstem.",
    sectionId: "skull",
  },
  {
    term: "cranium",
    definition: "The 8 bones that form the braincase: frontal, 2 parietal, occipital, 2 temporal, sphenoid, and ethmoid.",
    sectionId: "skull",
  },
  {
    term: "zygomatic bone",
    definition: "The cheekbone. It forms the zygomatic arch (with the temporal bone) and contributes to the lateral wall of the eye socket.",
    sectionId: "skull",
  },
  {
    term: "mandible",
    definition: "The lower jaw — the only moveable bone of the skull. It articulates with the temporal bones at the temporomandibular joint (TMJ).",
    sectionId: "skull",
  },
  {
    term: "vertebrae",
    definition: "The individual bones of the spinal column. The adult spine has 26 moveable vertebrae across five regions: cervical, thoracic, lumbar, sacral (fused), and coccygeal (fused).",
    sectionId: "spine",
  },
  {
    term: "cervical region",
    definition: "The neck section of the spine (C1–C7), containing 7 vertebrae. C1 (atlas) supports the skull; C2 (axis) allows rotation.",
    sectionId: "spine",
  },
  {
    term: "lumbar",
    definition: "The lower back region of the spine (L1–L5), containing 5 large vertebrae that bear most of the body's weight.",
    sectionId: "spine",
  },
  {
    term: "sacrum",
    definition: "The triangular bone at the base of the spine formed by the fusion of 5 sacral vertebrae. It connects the spine to the pelvis.",
    sectionId: "spine",
  },
  {
    term: "intervertebral disc",
    definition: "A fibrocartilage cushion between adjacent vertebrae. The outer ring (annulus fibrosus) is tough; the inner core (nucleus pulposus) is gel-like and absorbs shock.",
    sectionId: "spine",
  },
  {
    term: "scapula",
    definition: "The shoulder blade — a flat triangular bone on the posterior thorax. It contains the glenoid fossa (shoulder socket) and the acromion (bony roof of the shoulder).",
    sectionId: "upper-limb",
  },
  {
    term: "humerus",
    definition: "The single bone of the upper arm. Its rounded head articulates with the glenoid fossa at the shoulder; its lower end forms the elbow joint with the radius and ulna.",
    sectionId: "upper-limb",
  },
  {
    term: "radius",
    definition: "The lateral (thumb-side) forearm bone. Its head articulates with the humerus; its distal end forms the radiocarpal (wrist) joint.",
    sectionId: "upper-limb",
  },
  {
    term: "ulna",
    definition: "The medial (little finger-side) forearm bone. Its olecranon process forms the tip of the elbow; its trochlear notch articulates with the humerus.",
    sectionId: "upper-limb",
  },
  {
    term: "carpal",
    definition: "One of the 8 small wrist bones arranged in two rows. They include the scaphoid, lunate, triquetrum, pisiform (proximal) and trapezium, trapezoid, capitate, hamate (distal).",
    sectionId: "upper-limb",
  },
  {
    term: "metacarpals",
    definition: "The 5 palm bones between the wrist (carpals) and the fingers (phalanges), numbered I (thumb) to V (little finger).",
    sectionId: "upper-limb",
  },
  {
    term: "patella",
    definition: "The kneecap — a sesamoid bone embedded in the quadriceps tendon. It protects the front of the knee joint and improves the mechanical advantage of the quadriceps.",
    sectionId: "lower-limb",
  },
  {
    term: "tarsal",
    definition: "One of the 7 ankle and foot bones: calcaneus (heel), talus, navicular, cuboid, and 3 cuneiforms. They form the ankle and proximal foot.",
    sectionId: "lower-limb",
  },
  {
    term: "medial malleolus",
    definition: "The bony prominence on the inner (medial) side of the ankle — it is the distal end of the tibia. The lateral malleolus on the outer side is the distal end of the fibula.",
    sectionId: "lower-limb",
  },
  {
    term: "femoral head",
    definition: "The rounded, spherical superior end of the femur that fits into the acetabulum of the pelvis to form the hip joint.",
    sectionId: "lower-limb",
  },
  {
    term: "thoracic cage",
    definition: "The bony cage formed by 12 pairs of ribs, the sternum, and 12 thoracic vertebrae. It protects the heart and lungs and assists with breathing.",
    sectionId: "thorax",
  },
  {
    term: "floating ribs",
    definition: "Ribs 11 and 12, which have no anterior attachment — their costal cartilage does not connect to the sternum or other ribs. They 'float' freely.",
    sectionId: "thorax",
  },
  {
    term: "sternum",
    definition: "The breastbone — a flat bone in the centre of the anterior chest. It has three parts: the manubrium (top), the body (middle), and the xiphoid process (tip).",
    sectionId: "thorax",
  },
  {
    term: "xiphoid process",
    definition: "The small, inferior cartilaginous tip of the sternum. It is the landmark for correct hand placement in CPR and the lower boundary of the thoracic cage.",
    sectionId: "thorax",
  },
  {
    term: "os coxae",
    definition: "The hip bone, formed by the fusion of three bones during adolescence: the ilium (top), ischium (back-bottom), and pubis (front). Two os coxae plus the sacrum form the pelvis.",
    sectionId: "thorax",
  },
  {
    term: "ilium",
    definition: "The large, wing-shaped superior portion of the hip bone. The iliac crest is its superior rim — a key palpation landmark at the level of L4.",
    sectionId: "thorax",
  },
  {
    term: "ischium",
    definition: "The posterior-inferior portion of the hip bone. The ischial tuberosity (sitting bone) bears the body's weight when seated and is the proximal attachment of the hamstrings.",
    sectionId: "thorax",
  },
];

// Unit 2 — Joints & Movement
const unit2Glossary: GlossaryEntry[] = [
  {
    term: "synovial joint",
    definition: "A freely moveable joint with a fluid-filled joint cavity lined by a synovial membrane. The synovial fluid lubricates and nourishes the articular cartilage. Most limb joints are synovial.",
    sectionId: "joint-types",
  },
  {
    term: "hinge joint",
    definition: "A synovial joint that allows movement in only one plane — flexion and extension. Examples: elbow (humeroulnar), knee (tibiofemoral), and ankle talocrural joints.",
    sectionId: "joint-types",
  },
  {
    term: "atlantoaxial joint",
    definition: "The pivot joint between C1 (atlas) and C2 (axis). The dens of C2 rotates within the ring of C1, allowing approximately 50° of head rotation to each side ('no' movement).",
    sectionId: "joint-types",
  },
  {
    term: "pubic symphysis",
    definition: "A cartilaginous (amphiarthrosis) joint where the left and right pubic bones meet anteriorly, united by a fibrocartilage disc. It is slightly moveable.",
    sectionId: "joint-types",
  },
  {
    term: "carpometacarpal joint",
    definition: "The joint connecting the carpal (wrist) bones to the metacarpal (palm) bones. The thumb's CMC joint is a saddle joint — giving the thumb its unique multiplanar mobility and ability to oppose the fingers.",
    sectionId: "joint-types",
  },
  {
    term: "glenohumeral joint",
    definition: "The shoulder's main ball-and-socket joint between the humeral head and the shallow glenoid fossa of the scapula. The most mobile joint in the body, but relatively unstable.",
    sectionId: "shoulder",
  },
  {
    term: "rotator cuff",
    definition: "A group of four muscles (SITS: Supraspinatus, Infraspinatus, Teres minor, Subscapularis) that stabilise the humeral head in the glenoid fossa and control rotation.",
    sectionId: "shoulder",
  },
  {
    term: "abduction",
    definition: "Movement of a limb away from the midline of the body. At the shoulder, abduction is moving the arm out to the side — normal range is 0–180°.",
    sectionId: "shoulder",
  },
  {
    term: "acromioclavicular",
    definition: "The AC joint — a gliding synovial joint between the acromion of the scapula and the lateral end of the clavicle. Commonly injured in contact sports ('shoulder separation').",
    sectionId: "shoulder",
  },
  {
    term: "scapulohumeral rhythm",
    definition: "The coordinated 2:1 movement ratio between the glenohumeral joint and the scapulothoracic joint during arm elevation: for every 3° of shoulder abduction, 2° occurs at the GH joint and 1° at the scapulothoracic joint.",
    sectionId: "shoulder",
  },
  {
    term: "humeroulnar",
    definition: "The main elbow joint between the trochlea of the humerus and the trochlear notch of the ulna. It is classified as a hinge joint, allowing flexion and extension (0–145°).",
    sectionId: "elbow-wrist",
  },
  {
    term: "pronation",
    definition: "Rotation of the forearm so the palm faces downward (posteriorly when arm at side). Produced primarily by pronator teres and pronator quadratus.",
    sectionId: "elbow-wrist",
  },
  {
    term: "supination",
    definition: "Rotation of the forearm so the palm faces upward (anteriorly when arm at side). Produced by the supinator muscle and biceps brachii.",
    sectionId: "elbow-wrist",
  },
  {
    term: "radiocarpal",
    definition: "The wrist joint formed between the distal radius and the proximal row of carpal bones (scaphoid, lunate, triquetrum). It is classified as a condyloid/ellipsoid joint.",
    sectionId: "elbow-wrist",
  },
  {
    term: "medial epicondyle",
    definition: "The medial bony prominence at the lower end of the humerus. The ulnar nerve passes directly behind it — compression here causes the 'funny bone' sensation (tingling to ring and little fingers).",
    sectionId: "elbow-wrist",
  },
  {
    term: "olecranon",
    definition: "The posterior bony projection of the ulna that forms the point of the elbow. It fits into the olecranon fossa of the humerus during full extension.",
    sectionId: "elbow-wrist",
  },
  {
    term: "iliotibial band",
    definition: "A thick band of fascia lata running from the iliac crest (and tensor fasciae latae) down the lateral thigh to Gerdy's tubercle on the lateral tibia. It is a passive stabiliser of the lateral knee.",
    sectionId: "hip",
  },
  {
    term: "Trendelenburg sign",
    definition: "A positive clinical sign where the pelvis drops toward the non-stance leg during single-leg standing — indicating weakness of the hip abductors (primarily gluteus medius) on the stance leg.",
    sectionId: "hip",
  },
  {
    term: "ACL",
    definition: "Anterior Cruciate Ligament — runs diagonally inside the knee joint, preventing the tibia from sliding forward on the femur and resisting knee hyperextension. One of the most commonly injured ligaments in sport.",
    sectionId: "knee-ankle",
  },
  {
    term: "menisci",
    definition: "The medial and lateral C-shaped wedges of fibrocartilage inside the knee joint. They absorb shock, deepen the tibial surface, and distribute compressive forces across a larger area.",
    sectionId: "knee-ankle",
  },
  {
    term: "dorsiflexion",
    definition: "Ankle movement that brings the top of the foot toward the shin (decreases the angle between foot and leg). Normal range: 0–20°. Essential for normal walking and stair climbing.",
    sectionId: "knee-ankle",
  },
  {
    term: "plantarflexion",
    definition: "Ankle movement that points the foot downward, away from the shin (increases the angle between foot and leg). Normal range: 0–50°. Produced mainly by the gastrocnemius and soleus via the Achilles tendon.",
    sectionId: "knee-ankle",
  },
  {
    term: "Achilles tendon",
    definition: "The largest and strongest tendon in the body — the combined distal attachment of the gastrocnemius and soleus muscles to the posterior calcaneus (heel bone). Essential for plantarflexion.",
    sectionId: "knee-ankle",
  },
  {
    term: "inversion",
    definition: "Movement that turns the sole of the foot inward (medially). Controlled mainly by tibialis posterior and tibialis anterior. Excessive inversion during ankle sprains can tear the lateral ligaments.",
    sectionId: "knee-ankle",
  },
];

export const glossary: GlossaryEntry[] = [...unit1Glossary, ...unit2Glossary];

// Pre-sorted longest-first for greedy matching
export const sortedGlossary = [...glossary].sort(
  (a, b) => b.term.length - a.term.length
);
