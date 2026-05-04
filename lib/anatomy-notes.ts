export type Block =
  | { t: "h3"; text: string }
  | { t: "p"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  | { t: "table"; headers: string[]; rows: string[][] }
  | { t: "key"; text: string };

export type Section = {
  id: string;
  title: string;
  blocks: Block[];
};

export type UnitNotes = {
  unitTitle: string;
  intro: string;
  sections: Section[];
};

export const anatomyNotes: UnitNotes[] = [
  {
    unitTitle: "Unit 1: Skeletal System",
    intro:
      "The skeletal system provides the structural framework of the body. The adult human skeleton contains 206 bones divided into two groups: the axial skeleton (skull, vertebral column, thoracic cage — 80 bones) and the appendicular skeleton (limbs and girdles — 126 bones).",
    sections: [
      {
        id: "skull",
        title: "1.1 Cranial & Facial Bones",
        blocks: [
          {
            t: "p",
            text: "The skull contains 22 bones: 8 cranial bones that protect the brain and 14 facial bones. At birth, cranial bones are separated by soft fontanelles that fuse by age 2.",
          },
          { t: "h3", text: "Cranial Bones (8 total)" },
          {
            t: "ul",
            items: [
              "Frontal bone (1) — forms the forehead and superior orbit (eye socket).",
              "Parietal bones (2) — form the sides and roof of the cranium.",
              "Occipital bone (1) — forms the back and base of the skull; contains the foramen magnum, the large opening through which the spinal cord passes.",
              "Temporal bones (2) — form the sides of the skull; house the inner and middle ear structures; contain the external auditory meatus (ear canal).",
              "Sphenoid bone (1) — bat-shaped bone at the base of the skull; contains the sella turcica (pituitary gland seat).",
              "Ethmoid bone (1) — located between the orbits; forms part of the nasal cavity.",
            ],
          },
          { t: "h3", text: "Key Facial Bones" },
          {
            t: "ul",
            items: [
              "Mandible — the lower jaw; the ONLY moveable bone of the skull; articulates with the temporal bones at the temporomandibular joint (TMJ).",
              "Maxillae (2) — upper jaw; form the hard palate and floor of the orbits.",
              "Zygomatic bones (2) — cheekbones; form the zygomatic arch with the temporal bone; contribute to the lateral orbital wall.",
              "Nasal bones (2) — form the bridge of the nose.",
            ],
          },
          {
            t: "key",
            text: "Clinical note: The foramen magnum in the occipital bone is a critical landmark — herniation of brain tissue through it (tonsillar herniation) is life-threatening.",
          },
          {
            t: "table",
            headers: ["Bone", "Number", "Location / Function"],
            rows: [
              ["Frontal", "1", "Forehead; roof of orbits"],
              ["Parietal", "2", "Crown and sides of skull"],
              ["Occipital", "1", "Posterior skull; foramen magnum"],
              ["Temporal", "2", "Lateral skull; houses inner ear"],
              ["Sphenoid", "1", "Skull base; sella turcica"],
              ["Ethmoid", "1", "Nasal cavity; between orbits"],
              ["Mandible", "1", "Lower jaw; only moveable skull bone"],
              ["Zygomatic", "2", "Cheekbones; zygomatic arch"],
            ],
          },
        ],
      },
      {
        id: "spine",
        title: "1.2 The Vertebral Column",
        blocks: [
          {
            t: "p",
            text: "The vertebral column (spine) consists of 33 vertebrae in five regions. In adults, 26 moveable segments remain because the sacral and coccygeal vertebrae fuse. It supports the body's weight, protects the spinal cord, and provides attachment for muscles.",
          },
          { t: "h3", text: "Regions of the Spine" },
          {
            t: "table",
            headers: ["Region", "Count", "Label", "Key features"],
            rows: [
              ["Cervical", "7", "C1–C7", "Neck; smallest vertebrae; C1 = atlas, C2 = axis"],
              ["Thoracic", "12", "T1–T12", "Articulate with the 12 pairs of ribs"],
              ["Lumbar", "5", "L1–L5", "Lower back; largest vertebrae; bear most body weight"],
              ["Sacral", "5 (fused)", "S1–S5", "Fuse to form the sacrum; articulates with pelvis"],
              ["Coccygeal", "4 (fused)", "Co1–Co4", "Tailbone (coccyx); vestigial tail"],
            ],
          },
          { t: "h3", text: "Special Vertebrae" },
          {
            t: "ul",
            items: [
              "Atlas (C1) — ring-shaped; no vertebral body; supports the skull by articulating with the occipital condyles; allows nodding ('yes' movement).",
              "Axis (C2) — has a superior bony peg called the dens (odontoid process) that the atlas pivots around; allows rotation ('no' movement).",
              "The atlantoaxial joint is a pivot joint between C1 and C2.",
            ],
          },
          { t: "h3", text: "Normal Spinal Curves" },
          {
            t: "ul",
            items: [
              "Lordosis — concave posterior (inward) curve; normal in cervical and lumbar regions.",
              "Kyphosis — convex posterior (outward) curve; normal in thoracic and sacral regions.",
              "Scoliosis — abnormal lateral curvature; not a normal curve.",
            ],
          },
          { t: "h3", text: "Intervertebral Discs" },
          {
            t: "p",
            text: "Intervertebral discs sit between C2 and the sacrum (23 discs total). Each disc has two parts:",
          },
          {
            t: "ul",
            items: [
              "Annulus fibrosus — tough outer ring of fibrocartilage that resists compression and twisting.",
              "Nucleus pulposus — gel-like inner core; absorbs shock; can herniate ('slipped disc') through tears in the annulus.",
            ],
          },
          {
            t: "key",
            text: "Physiotherapy key fact: Lumbar vertebrae are the most common site of disc herniation, typically at L4–L5 or L5–S1, often causing sciatica (pain radiating down the leg).",
          },
        ],
      },
      {
        id: "upper-limb",
        title: "1.3 Upper Limb Bones",
        blocks: [
          {
            t: "p",
            text: "The upper limb consists of the shoulder girdle (clavicle and scapula) and the arm proper (humerus, radius, ulna, carpals, metacarpals, phalanges).",
          },
          { t: "h3", text: "Shoulder Girdle" },
          {
            t: "ul",
            items: [
              "Clavicle (collarbone) — S-shaped bone connecting the sternum to the scapula; the only bony connection between the upper limb and the axial skeleton; most commonly fractured bone.",
              "Scapula (shoulder blade) — flat, triangular bone on the posterior thorax; contains the glenoid fossa (shallow socket for the shoulder joint) and the acromion (bony roof of the shoulder).",
            ],
          },
          { t: "h3", text: "Arm Bones" },
          {
            t: "ul",
            items: [
              "Humerus — single bone of the upper arm (brachium); the greater tubercle (lateral) and lesser tubercle are palpable landmarks at the shoulder; the medial and lateral epicondyles are palpable at the elbow.",
              "Radius — lateral forearm bone (thumb side); head articulates with the humerus; distal end forms the radiocarpal (wrist) joint.",
              "Ulna — medial forearm bone (little finger side); olecranon process forms the tip of the elbow; trochlear notch articulates with the humerus at the humeroulnar joint.",
            ],
          },
          { t: "h3", text: "Hand Bones" },
          {
            t: "ul",
            items: [
              "Carpals (8) — wrist bones arranged in two rows of four; include the scaphoid, lunate, triquetrum, pisiform (proximal row) and trapezium, trapezoid, capitate, hamate (distal row).",
              "Metacarpals (5) — palm bones numbered I (thumb) to V (little finger).",
              "Phalanges (14 per hand) — finger bones; thumb has 2 (proximal, distal); fingers 2–5 have 3 each (proximal, middle, distal).",
            ],
          },
          {
            t: "key",
            text: "Palpation landmarks: Greater tubercle of humerus at shoulder tip; lateral epicondyle and medial epicondyle at elbow; radial styloid (lateral) and ulnar styloid (medial) at wrist.",
          },
        ],
      },
      {
        id: "lower-limb",
        title: "1.4 Lower Limb Bones",
        blocks: [
          {
            t: "p",
            text: "The lower limb is adapted for weight-bearing and locomotion. It consists of the pelvic girdle (os coxae), thigh (femur), leg (tibia and fibula), and foot (tarsals, metatarsals, phalanges).",
          },
          { t: "h3", text: "Thigh" },
          {
            t: "ul",
            items: [
              "Femur — longest and strongest bone in the body; the femoral head (rounded superior end) articulates with the acetabulum of the pelvis to form the hip joint; the greater trochanter is a large lateral prominence for gluteal muscle attachment.",
              "Patella (kneecap) — sesamoid bone embedded in the quadriceps tendon; protects the knee joint; articulates with the anterior femur.",
            ],
          },
          { t: "h3", text: "Leg (below knee)" },
          {
            t: "ul",
            items: [
              "Tibia — larger, medial leg bone; the shin; bears the body's weight; medial malleolus is the bony bump on the inner ankle.",
              "Fibula — slender lateral leg bone; does not bear significant body weight; lateral malleolus is the bony bump on the outer ankle.",
            ],
          },
          { t: "h3", text: "Foot Bones" },
          {
            t: "ul",
            items: [
              "Tarsals (7) — ankle/foot bones: calcaneus (heel bone; largest tarsal), talus (ankle bone; articulates with tibia/fibula), navicular, cuboid, and 3 cuneiforms.",
              "Metatarsals (5) — numbered I–V; form the sole/arch of the foot.",
              "Phalanges (14) — big toe has 2; toes 2–5 have 3.",
            ],
          },
          {
            t: "key",
            text: "Palpation landmarks: Greater trochanter (lateral hip); medial malleolus (inner ankle); lateral malleolus (outer ankle); calcaneus (heel); base of 5th metatarsal (lateral foot).",
          },
        ],
      },
      {
        id: "thorax",
        title: "1.5 Thoracic Cage & Pelvis",
        blocks: [
          {
            t: "p",
            text: "The thoracic cage protects the heart and lungs and assists breathing. The pelvis transfers weight from the axial skeleton to the lower limbs and protects pelvic organs.",
          },
          { t: "h3", text: "Thoracic Cage" },
          {
            t: "ul",
            items: [
              "12 pairs of ribs (24 total); each pair articulates posteriorly with a thoracic vertebra.",
              "True ribs (1–7) — attach directly to the sternum via their own costal cartilage.",
              "False ribs (8–10) — costal cartilage joins the cartilage of rib 7, not directly to sternum.",
              "Floating ribs (11–12) — short; have NO anterior attachment (no costal cartilage reaches sternum).",
            ],
          },
          { t: "h3", text: "Sternum (Breastbone)" },
          {
            t: "p",
            text: "The sternum is a flat bone in the centre of the anterior chest wall with three parts:",
          },
          {
            t: "ol",
            items: [
              "Manubrium — superior portion; articulates with clavicles and ribs 1–2; sternal notch is palpable at its superior edge.",
              "Body (gladiolus) — middle portion; articulates with ribs 2–7.",
              "Xiphoid process — inferior cartilaginous tip; does not articulate with ribs; landmark for CPR hand placement.",
            ],
          },
          { t: "h3", text: "Pelvis" },
          {
            t: "p",
            text: "The bony pelvis is formed by two os coxae (hip bones) joined anteriorly at the pubic symphysis and posteriorly at the sacrum.",
          },
          {
            t: "p",
            text: "Each os coxae is formed by the fusion of three bones during adolescence:",
          },
          {
            t: "ul",
            items: [
              "Ilium — superior, blade-like portion; iliac crest (superior rim) is a key palpation landmark; anterior superior iliac spine (ASIS) is another important landmark.",
              "Ischium — posterior-inferior portion; ischial tuberosity ('sitting bone') bears body weight when seated; hamstrings attach here.",
              "Pubis — anterior portion; the two pubic bones meet at the pubic symphysis (cartilaginous joint).",
            ],
          },
          {
            t: "p",
            text: "Where all three bones meet, the acetabulum forms — the deep socket of the hip joint that receives the femoral head.",
          },
          {
            t: "key",
            text: "The iliac crest is level with the L4 vertebra — a landmark used to locate the L4–L5 intervertebral space for lumbar puncture and epidural procedures.",
          },
        ],
      },
    ],
  },
  {
    unitTitle: "Unit 2: Joints & Movement",
    intro:
      "A joint (articulation) is where two or more bones meet. Joints are classified by structure (fibrous, cartilaginous, synovial) and by the movement they permit. Understanding joint mechanics is fundamental to physiotherapy assessment and treatment.",
    sections: [
      {
        id: "joint-types",
        title: "2.1 Classification of Joints",
        blocks: [
          { t: "h3", text: "Structural Classification" },
          {
            t: "table",
            headers: ["Type", "Movement", "Tissue", "Example"],
            rows: [
              ["Fibrous (synarthrosis)", "None", "Fibrous connective tissue", "Skull sutures"],
              ["Cartilaginous (amphiarthrosis)", "Slight", "Cartilage", "Pubic symphysis, intervertebral discs"],
              ["Synovial (diarthrosis)", "Free", "Synovial fluid in joint cavity", "Most limb joints"],
            ],
          },
          { t: "h3", text: "Synovial Joint Subtypes" },
          {
            t: "p",
            text: "Synovial joints have a joint cavity filled with synovial fluid (produced by the synovial membrane) that lubricates and nourishes the articular cartilage.",
          },
          {
            t: "table",
            headers: ["Subtype", "Movements", "Example"],
            rows: [
              ["Hinge", "Flexion / Extension only", "Elbow (humeroulnar), knee, ankle talocrural"],
              ["Pivot", "Rotation only", "Atlantoaxial (C1–C2), proximal radioulnar"],
              ["Ball-and-socket", "All planes (multiaxial)", "Glenohumeral (shoulder), hip"],
              ["Condyloid / Ellipsoid", "Flex, ext, abd, add (biaxial)", "Radiocarpal (wrist), metacarpophalangeal"],
              ["Saddle", "Biaxial + rotation", "Carpometacarpal joint of thumb"],
              ["Gliding / Plane", "Sliding (translation)", "Acromioclavicular, intercarpal, intertarsal"],
            ],
          },
          { t: "h3", text: "Key Supporting Structures" },
          {
            t: "ul",
            items: [
              "Ligaments — fibrous bands connecting bone to bone; provide passive joint stability; do not contract.",
              "Tendons — connect muscle to bone; transmit muscle force across a joint.",
              "Joint capsule — fibrous sleeve surrounding synovial joints; outer layer is fibrous, inner layer is synovial membrane.",
              "Bursae — fluid-filled sacs reducing friction between tendons, bones, or skin.",
            ],
          },
          { t: "h3", text: "Special Joints to Know" },
          {
            t: "ul",
            items: [
              "Atlantoaxial joint (C1–C2) — pivot joint; the dens of C2 rotates within the ring of C1; allows approximately 50° of cervical rotation each side.",
              "Pubic symphysis — secondary cartilaginous joint (fibrocartilage disc); slightly moveable; allows slight movement during childbirth.",
              "Carpometacarpal (CMC) joint of thumb — saddle joint; unique multiplanar mobility enables opposition (thumb to fingers); critical for hand function.",
            ],
          },
          {
            t: "key",
            text: "Physiotherapy note: Skull sutures (synarthroses) are fibrous joints. In adults they are completely fused. The slight movement of cartilaginous joints (amphiarthroses) such as the pubic symphysis can become painful during pregnancy due to ligamentous laxity (pubic symphysis dysfunction).",
          },
        ],
      },
      {
        id: "shoulder",
        title: "2.2 Shoulder Complex",
        blocks: [
          {
            t: "p",
            text: "The shoulder complex is the most mobile region of the body. It comprises four joints that work in concert:",
          },
          {
            t: "ol",
            items: [
              "Glenohumeral (GH) joint — ball-and-socket joint between the humeral head and the glenoid fossa of the scapula; most mobile joint in the body but least stable.",
              "Acromioclavicular (AC) joint — gliding joint between the acromion and the lateral clavicle; commonly injured in contact sports.",
              "Sternoclavicular (SC) joint — only true synovial joint connecting the upper limb to the axial skeleton; very stable.",
              "Scapulothoracic (ST) joint — not a true synovial joint; the scapula glides over the posterior rib cage.",
            ],
          },
          { t: "h3", text: "Rotator Cuff (SITS muscles)" },
          {
            t: "p",
            text: "The rotator cuff is a group of four muscles that stabilise the glenohumeral joint and control rotation:",
          },
          {
            t: "table",
            headers: ["Muscle", "Action", "Clinical note"],
            rows: [
              ["Supraspinatus", "Initiates abduction (first 0–15°)", "Most commonly torn rotator cuff muscle"],
              ["Infraspinatus", "External rotation", "Tests for posterior impingement"],
              ["Teres minor", "External rotation", "Works with infraspinatus"],
              ["Subscapularis", "Internal rotation", "Only anterior rotator cuff muscle"],
            ],
          },
          { t: "h3", text: "Normal Range of Motion (Shoulder)" },
          {
            t: "table",
            headers: ["Movement", "Normal ROM"],
            rows: [
              ["Flexion (arm forward)", "0–180°"],
              ["Extension (arm back)", "0–60°"],
              ["Abduction (arm out to side)", "0–180°"],
              ["Internal rotation", "0–70°"],
              ["External rotation", "0–90°"],
              ["Horizontal adduction", "0–130°"],
            ],
          },
          { t: "h3", text: "Scapulohumeral Rhythm" },
          {
            t: "p",
            text: "During full arm elevation (180°), the glenohumeral joint contributes 120° and the scapulothoracic joint contributes 60° — a 2:1 ratio of glenohumeral to scapulothoracic movement. This coordinated motion is called scapulohumeral rhythm.",
          },
          {
            t: "key",
            text: "If scapulohumeral rhythm is disrupted (e.g., by rotator cuff weakness or scapular dyskinesis), shoulder impingement syndrome can develop — compression of the subacromial structures during arm elevation.",
          },
        ],
      },
      {
        id: "elbow-wrist",
        title: "2.3 Elbow & Wrist",
        blocks: [
          {
            t: "p",
            text: "The elbow is a compound joint formed by three articulations within a single joint capsule:",
          },
          {
            t: "ul",
            items: [
              "Humeroulnar joint — hinge joint between the trochlea of the humerus and the trochlear notch of the ulna; responsible for flexion/extension (0–145°).",
              "Humeroradial joint — between the capitulum of the humerus and the head of the radius; contributes to flexion/extension and forearm rotation.",
              "Proximal radioulnar joint — pivot joint between the radial head and the radial notch of the ulna; responsible for pronation/supination.",
            ],
          },
          { t: "h3", text: "Forearm Rotation" },
          {
            t: "ul",
            items: [
              "Supination — rotating the forearm so the palm faces upward (or anteriorly when arm at side); produced by the supinator and biceps brachii.",
              "Pronation — rotating the forearm so the palm faces downward (or posteriorly); produced by pronator teres and pronator quadratus.",
            ],
          },
          { t: "h3", text: "Key Elbow Landmarks" },
          {
            t: "ul",
            items: [
              "Olecranon — posterior bony prominence of the ulna (tip of elbow); olecranon bursitis = 'student's elbow.'",
              "Medial epicondyle — medial bony prominence of the humerus; ulnar nerve passes in a groove behind it — compression causes 'funny bone' sensation (tingling to ring and little fingers); medial epicondylitis = 'golfer's elbow.'",
              "Lateral epicondyle — lateral bony prominence; lateral epicondylitis = 'tennis elbow.'",
            ],
          },
          { t: "h3", text: "Wrist (Radiocarpal Joint)" },
          {
            t: "p",
            text: "The wrist (radiocarpal joint) is a condyloid/ellipsoid joint formed between the distal radius and the proximal row of carpal bones (scaphoid, lunate, triquetrum). Movements include:",
          },
          {
            t: "table",
            headers: ["Movement", "Normal ROM", "Primary muscles"],
            rows: [
              ["Flexion", "0–80°", "Flexor carpi radialis, flexor carpi ulnaris"],
              ["Extension", "0–70°", "Extensor carpi radialis longus/brevis, extensor carpi ulnaris"],
              ["Radial deviation", "0–20°", "Abductor pollicis longus, flexor carpi radialis"],
              ["Ulnar deviation", "0–30°", "Flexor and extensor carpi ulnaris"],
            ],
          },
          {
            t: "key",
            text: "Clinical tip: The ulnar nerve lies directly behind the medial epicondyle in the cubital tunnel. Prolonged elbow flexion (e.g., sleeping with elbows bent) can compress the nerve, causing cubital tunnel syndrome — numbness in the ring and little fingers.",
          },
        ],
      },
      {
        id: "hip",
        title: "2.4 Hip Joint",
        blocks: [
          {
            t: "p",
            text: "The hip joint is a ball-and-socket joint formed by the spherical femoral head and the deep acetabulum of the pelvis. Unlike the shoulder, the hip sacrifices mobility for stability and weight-bearing capacity.",
          },
          { t: "h3", text: "Normal Range of Motion (Hip)" },
          {
            t: "table",
            headers: ["Movement", "Normal ROM"],
            rows: [
              ["Flexion (knee bent)", "0–120°"],
              ["Flexion (knee extended)", "0–90°"],
              ["Extension", "0–20°"],
              ["Abduction", "0–45°"],
              ["Adduction", "0–30°"],
              ["Internal rotation", "0–45°"],
              ["External rotation", "0–45°"],
            ],
          },
          { t: "h3", text: "Key Muscles of the Hip" },
          {
            t: "table",
            headers: ["Group", "Muscles", "Function"],
            rows: [
              ["Hip flexors", "Iliopsoas (iliacus + psoas major), rectus femoris", "Flex hip; critical for walking, stair climbing"],
              ["Hip extensors", "Gluteus maximus, hamstrings (biceps femoris, semitendinosus, semimembranosus)", "Extend hip; propulsion in gait"],
              ["Hip abductors", "Gluteus medius, gluteus minimus, TFL", "Stabilise pelvis in single-leg stance"],
              ["Hip adductors", "Adductor longus, brevis, magnus; gracilis", "Bring leg toward midline"],
              ["External rotators", "Deep six: piriformis, obturators, gemelli, quadratus femoris", "Rotate femur outward"],
            ],
          },
          { t: "h3", text: "Iliotibial (IT) Band" },
          {
            t: "p",
            text: "The iliotibial band is a thick band of fascia lata running from the iliac crest (and tensor fasciae latae muscle) to Gerdy's tubercle on the lateral tibia. It is NOT a muscle but acts as a passive stabiliser of the lateral knee. IT band syndrome causes lateral knee pain in runners.",
          },
          { t: "h3", text: "Trendelenburg Sign" },
          {
            t: "p",
            text: "During single-leg stance, the hip abductors (primarily gluteus medius) must contract to prevent the pelvis from dropping on the non-standing side. A positive Trendelenburg sign (pelvis drops to the opposite side during single-leg stance) indicates weakness of the stance-leg's gluteus medius.",
          },
          {
            t: "key",
            text: "The greater trochanter of the femur is an important palpation landmark on the lateral hip. It can be used to estimate the length of the femoral neck and detect leg-length discrepancy.",
          },
        ],
      },
      {
        id: "knee-ankle",
        title: "2.5 Knee & Ankle",
        blocks: [
          {
            t: "p",
            text: "The knee is the largest joint in the body. It is a modified hinge joint (tibiofemoral and patellofemoral) that allows primarily flexion/extension with slight rotation in the unlocked position.",
          },
          { t: "h3", text: "Knee Ligaments" },
          {
            t: "table",
            headers: ["Ligament", "Function", "Test"],
            rows: [
              ["ACL (anterior cruciate)", "Prevents anterior translation of tibia on femur; resists hyperextension", "Lachman test, anterior drawer"],
              ["PCL (posterior cruciate)", "Prevents posterior translation of tibia; resists hyperflexion", "Posterior drawer"],
              ["MCL (medial collateral)", "Resists valgus (knock-knee) stress", "Valgus stress test"],
              ["LCL (lateral collateral)", "Resists varus (bow-leg) stress", "Varus stress test"],
            ],
          },
          { t: "h3", text: "Menisci" },
          {
            t: "p",
            text: "The medial and lateral menisci are C-shaped wedges of fibrocartilage between the femoral condyles and the tibial plateau. Functions:",
          },
          {
            t: "ul",
            items: [
              "Shock absorption — distribute compressive forces across a larger surface area.",
              "Joint stability — deepen the tibial surface to better accommodate femoral condyles.",
              "Lubrication — assist in distributing synovial fluid.",
              "The medial meniscus is more firmly attached and therefore more commonly torn (especially with combined valgus + external rotation injuries — the 'terrible triad').",
            ],
          },
          { t: "h3", text: "Quadriceps Group" },
          {
            t: "ul",
            items: [
              "Rectus femoris — crosses both hip and knee; hip flexion + knee extension.",
              "Vastus lateralis — lateral knee extension.",
              "Vastus medialis — medial knee extension; VMO (oblique portion) stabilises patella.",
              "Vastus intermedius — deep; knee extension.",
              "All four converge on the quadriceps tendon → patella → patellar tendon → tibial tuberosity.",
            ],
          },
          { t: "h3", text: "Ankle Movements" },
          {
            t: "table",
            headers: ["Movement", "Direction", "ROM", "Primary muscles"],
            rows: [
              ["Dorsiflexion", "Foot toward shin", "0–20°", "Tibialis anterior, extensor digitorum longus"],
              ["Plantarflexion", "Foot pointing down", "0–50°", "Gastrocnemius + soleus (via Achilles tendon)"],
              ["Inversion", "Sole turns inward", "0–35°", "Tibialis posterior, tibialis anterior"],
              ["Eversion", "Sole turns outward", "0–25°", "Peroneals (fibularis longus and brevis)"],
            ],
          },
          { t: "h3", text: "Achilles Tendon" },
          {
            t: "p",
            text: "The Achilles tendon is the thickest and strongest tendon in the body. It is the distal attachment of the triceps surae (gastrocnemius + soleus) to the posterior calcaneus (heel bone). It produces plantarflexion and is critical for walking, running, and jumping.",
          },
          {
            t: "key",
            text: "Achilles tendon rupture most commonly occurs 2–6 cm above the calcaneal insertion (watershed zone of poor vascularity). Diagnosed clinically with the Thompson (calf squeeze) test — absence of plantarflexion indicates complete rupture.",
          },
        ],
      },
    ],
  },
];
