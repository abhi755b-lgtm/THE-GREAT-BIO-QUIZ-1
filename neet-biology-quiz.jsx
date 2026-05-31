import { useState, useEffect, useRef } from "react";

const FUNNY_REACTIONS = [
  "Classic overthinking detected 🧠",
  "Abhinav would've got this instantly 😎",
  "Bold strategy… let's see 🎲",
  "Your neurons are trying their best 💪",
  "NCERT page 47, my friend 📖",
  "Even Mendel would be confused 🤷",
  "The mitochondria approves this choice 🔋",
  "That's… one way to answer it 😂",
  "Interesting… very interesting 🤔",
  "Peak biology brain moment right here 🧬",
  "Are you sure? Are you SURE sure? 👀",
  "Gut feeling activated 🍕",
];

const ABHINAV_HINTS = [
  "Bro just eliminate two and guess 💀",
  "Did you even read NCERT? 😭",
  "Flip a coin. Seriously. 🪙",
  "It was on page 142. Or 143. You skipped it 📚",
  "Abhinav says: C. It's always C. 🤞",
  "Take a deep breath. Now guess. 🧘",
  "Your gut says A. Trust the gut. 🍕",
  "The answer is definitely not D. Probably. 🤔",
  "Have you tried just… knowing the answer? 🤡",
  "This is fine. Everything is fine. 🔥",
];

const ABHINAV_TIPS = [
  "💡 Pro tip: Sleep is for people who don't want NEET AIR 1",
  "📖 Abhinav's wisdom: Read NCERT. Then read it again. Then cry.",
  "🧬 Fun fact: Abhinav once memorized all 90 answers in his sleep",
  "⚡ Motivation: You're one right answer away from not failing",
  "🎯 Abhinav's strategy: When in doubt, it's always B",
  "🏆 Remember: The mitochondria is ALWAYS the powerhouse. Always.",
  "💀 Hard truth: Your competition slept 4 hours last night and is fine",
  "🌱 Growth mindset: Wrong answers are just right answers in disguise",
];

const questions = [
  // ── DIVERSITY IN LIVING WORLD (1–10) ──
  { id: 1, topic: "Diversity in Living World", q: "Who is known as the 'Father of Taxonomy'?", opts: ["Aristotle", "Carolus Linnaeus", "R.H. Whittaker", "Ernst Haeckel"], ans: 1 },
  { id: 2, topic: "Diversity in Living World", q: "The binomial nomenclature was introduced by:", opts: ["John Ray", "Carolus Linnaeus", "Robert Brown", "Darwin"], ans: 1 },
  { id: 3, topic: "Diversity in Living World", q: "Which kingdom contains only prokaryotic organisms?", opts: ["Protista", "Fungi", "Monera", "Plantae"], ans: 2 },
  { id: 4, topic: "Diversity in Living World", q: "Five kingdom classification was proposed by:", opts: ["Haeckel", "Linnaeus", "R.H. Whittaker", "Woese"], ans: 2 },
  { id: 5, topic: "Diversity in Living World", q: "Satellite DNA is used in DNA fingerprinting because it is:", opts: ["Located near centromeres only", "Highly repetitive and shows individual-specific variation", "Present only in male organisms", "Codes for specific structural proteins"], ans: 1, handpicked: true },
  { id: 6, topic: "Diversity in Living World", q: "Correct sequence of taxonomic hierarchy (highest → lowest):", opts: ["Kingdom→Phylum→Class→Order→Family→Genus→Species", "Phylum→Kingdom→Class→Order→Family→Genus→Species", "Kingdom→Class→Phylum→Order→Family→Genus→Species", "Kingdom→Phylum→Order→Class→Family→Genus→Species"], ans: 0 },
  { id: 7, topic: "Diversity in Living World", q: "Scientific names are written in:", opts: ["English", "Latin or Latinized form", "Greek", "Sanskrit"], ans: 1 },
  { id: 8, topic: "Diversity in Living World", q: "The basic unit of biological classification is:", opts: ["Genus", "Family", "Species", "Order"], ans: 2 },
  { id: 9, topic: "Diversity in Living World", q: "ICBN stands for:", opts: ["International Code of Botanical Nomenclature", "Indian Code of Botanical Names", "International Committee of Biological Nomenclature", "Indian Congress of Botanical Names"], ans: 0 },
  { id: 10, topic: "Diversity in Living World", q: "Which of the following correctly gives the full classification of Panthera leo?", opts: ["Animalia-Chordata-Mammalia-Carnivora-Felidae-Panthera-leo", "Animalia-Chordata-Reptilia-Carnivora-Felidae-Panthera-leo", "Animalia-Arthropoda-Mammalia-Carnivora-Felidae-Panthera-leo", "Animalia-Chordata-Mammalia-Primates-Felidae-Panthera-leo"], ans: 0, handpicked: true },

  // ── STRUCTURAL ORGANISATION (11–18) ──
  { id: 11, topic: "Structural Organisation", q: "Meristematic tissue is characterized by:", opts: ["Dead cells with thick walls", "Actively dividing cells with dense cytoplasm", "Large central vacuoles", "Heavily lignified walls"], ans: 1 },
  { id: 12, topic: "Structural Organisation", q: "Which tissue provides mechanical support in young parts of plant?", opts: ["Parenchyma", "Collenchyma", "Sclerenchyma", "Xylem"], ans: 1 },
  { id: 13, topic: "Structural Organisation", q: "Cork cambium produces cork outward and ___ inward:", opts: ["Xylem", "Phloem", "Phelloderm (secondary cortex)", "Pith"], ans: 2 },
  { id: 14, topic: "Structural Organisation", q: "Malpighian tubules in cockroach are associated with:", opts: ["Digestion", "Respiration", "Excretion", "Reproduction"], ans: 2 },
  { id: 15, topic: "Structural Organisation", q: "Ligament connects:", opts: ["Muscle to bone", "Bone to bone", "Muscle to muscle", "Cartilage to muscle"], ans: 1, handpicked: true },
  { id: 16, topic: "Structural Organisation", q: "The number of abdominal segments in cockroach is:", opts: ["8", "10", "11", "6"], ans: 1 },
  { id: 17, topic: "Structural Organisation", q: "Earthworm belongs to which phylum?", opts: ["Arthropoda", "Annelida", "Nematoda", "Platyhelminthes"], ans: 1 },
  { id: 18, topic: "Structural Organisation", q: "Book lung is the respiratory organ found in:", opts: ["Cockroach", "Prawn", "Scorpion", "Earthworm"], ans: 2, handpicked: true },

  // ── CELL STRUCTURE AND FUNCTION (19–28) ──
  { id: 19, topic: "Cell Structure & Function", q: "Fluid mosaic model of cell membrane was proposed by:", opts: ["Watson & Crick", "Singer & Nicolson", "Schleiden & Schwann", "Robert Hooke"], ans: 1 },
  { id: 20, topic: "Cell Structure & Function", q: "Which organelle is called the 'powerhouse of the cell'?", opts: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"], ans: 2 },
  { id: 21, topic: "Cell Structure & Function", q: "DNA replication occurs during which phase of the cell cycle?", opts: ["G1 phase", "S phase", "G2 phase", "M phase"], ans: 1 },
  { id: 22, topic: "Cell Structure & Function", q: "Ribosomes are composed of:", opts: ["DNA and protein", "rRNA and protein", "mRNA and protein", "DNA and lipid"], ans: 1 },
  { id: 23, topic: "Cell Structure & Function", q: "Which of the following is absent in plant cells?", opts: ["Cell wall", "Chloroplast", "Centriole", "Large vacuole"], ans: 2 },
  { id: 24, topic: "Cell Structure & Function", q: "Signal Recognition Particle (SRP) is involved in:", opts: ["Initiating DNA replication at ori site", "Targeting newly synthesized proteins to the ER", "Post-translational glycosylation in Golgi", "Degrading misfolded proteins in proteasome"], ans: 1, handpicked: true },
  { id: 25, topic: "Cell Structure & Function", q: "Centromere is the region of chromosome where:", opts: ["Spindle fibres attach", "DNA replication begins", "Crossing over occurs", "Nucleolus is formed"], ans: 0 },
  { id: 26, topic: "Cell Structure & Function", q: "Which division reduces chromosome number to half?", opts: ["Mitosis", "Amitosis", "Meiosis", "Endomitosis"], ans: 2 },
  { id: 27, topic: "Cell Structure & Function", q: "Lysosomes contain:", opts: ["Digestive (hydrolytic) enzymes", "Respiratory enzymes", "Photosynthetic pigments", "Replication enzymes"], ans: 0 },
  { id: 28, topic: "Cell Structure & Function", q: "DNA gyrase (used by bacteria to relieve supercoiling) belongs to which enzyme class?", opts: ["Helicase", "Type II Topoisomerase", "Ligase", "Primase"], ans: 1, handpicked: true },

  // ── PLANT PHYSIOLOGY (29–38) ──
  { id: 29, topic: "Plant Physiology", q: "Light reactions of photosynthesis occur in:", opts: ["Stroma", "Grana (thylakoid membrane)", "Cytoplasm", "Outer chloroplast membrane"], ans: 1 },
  { id: 30, topic: "Plant Physiology", q: "Which gas is evolved during the light reactions of photosynthesis?", opts: ["CO2", "N2", "O2", "H2"], ans: 2 },
  { id: 31, topic: "Plant Physiology", q: "RuBisCO enzyme fixes:", opts: ["O2 only", "CO2", "N2", "H2O"], ans: 1 },
  { id: 32, topic: "Plant Physiology", q: "Bundle sheath cells in C4 plants are characterized by:", opts: ["Presence of RuBisCO and absence of Photosystem II", "Absence of RuBisCO and presence of Photosystem II", "Presence of both RuBisCO and Photosystem II", "Absence of both RuBisCO and Photosystem II"], ans: 0, handpicked: true },
  { id: 33, topic: "Plant Physiology", q: "Which plant hormone promotes cell elongation and apical dominance?", opts: ["Cytokinin", "Abscisic acid", "Ethylene", "Auxin (IAA)"], ans: 3 },
  { id: 34, topic: "Plant Physiology", q: "Vernalization refers to:", opts: ["Flowering induced by day length", "Promotion of flowering by low temperature", "Vegetative reproduction", "Seed dormancy"], ans: 1 },
  { id: 35, topic: "Plant Physiology", q: "The cohesion-tension theory of water ascent was proposed by:", opts: ["Munch", "Dixon & Joly", "Strasburger", "Priestley"], ans: 1 },
  { id: 36, topic: "Plant Physiology", q: "Which mineral element is the central atom of chlorophyll?", opts: ["Iron", "Manganese", "Magnesium", "Zinc"], ans: 2 },
  { id: 37, topic: "Plant Physiology", q: "In Short Day Plants, flowering is INHIBITED by the ___ form of phytochrome:", opts: ["Pr (red-absorbing)", "Pfr (far-red absorbing)", "Both Pr and Pfr equally", "Neither — phytochrome promotes flowering only"], ans: 1, handpicked: true },
  { id: 38, topic: "Plant Physiology", q: "Ethylene hormone is used commercially to:", opts: ["Promote root growth", "Ripen fruits", "Prevent leaf fall", "Promote flowering"], ans: 1 },

  // ── HUMAN PHYSIOLOGY (39–45) ──
  { id: 39, topic: "Human Physiology", q: "Normal resting heart rate (bpm) in adult humans is:", opts: ["50–60", "70–80", "90–100", "100–110"], ans: 1 },
  { id: 40, topic: "Human Physiology", q: "Which enzyme of the stomach acts on proteins?", opts: ["Amylase", "Lipase", "Pepsin", "Trypsin"], ans: 2 },
  { id: 41, topic: "Human Physiology", q: "The functional unit of the kidney is:", opts: ["Alveolus", "Nephron", "Neuron", "Acinus"], ans: 1 },
  { id: 42, topic: "Human Physiology", q: "Normal systolic/diastolic blood pressure is:", opts: ["80/120 mmHg", "120/80 mmHg", "100/70 mmHg", "140/90 mmHg"], ans: 1 },
  { id: 43, topic: "Human Physiology", q: "Juxtaglomerular (JG) cells in the kidney produce:", opts: ["Aldosterone", "Renin", "Erythropoietin", "ADH (Vasopressin)"], ans: 1, handpicked: true },
  { id: 44, topic: "Human Physiology", q: "Oxygen is transported in blood mainly by:", opts: ["Plasma", "WBCs", "Haemoglobin in RBCs", "Platelets"], ans: 2 },
  { id: 45, topic: "Human Physiology", q: "Peristalsis in the alimentary canal is caused by:", opts: ["Voluntary muscles only", "Cardiac muscles", "Involuntary smooth muscles", "Striated muscles"], ans: 2 },

  // ── REPRODUCTION (46–53) ──
  { id: 46, topic: "Reproduction", q: "Double fertilization is a characteristic of:", opts: ["Gymnosperms", "Bryophytes", "Angiosperms", "Pteridophytes"], ans: 2 },
  { id: 47, topic: "Reproduction", q: "The female gametophyte in angiosperms is called:", opts: ["Pollen grain", "Embryo sac", "Nucellus", "Endosperm"], ans: 1 },
  { id: 48, topic: "Reproduction", q: "Acrosome is present on the ___ of a sperm:", opts: ["Middle piece", "Tail", "Head", "Neck"], ans: 2 },
  { id: 49, topic: "Reproduction", q: "Normal duration of the human menstrual cycle is:", opts: ["21 days", "14 days", "35 days", "28 days"], ans: 3 },
  { id: 50, topic: "Reproduction", q: "HCG (Human Chorionic Gonadotropin) is secreted by:", opts: ["Anterior pituitary", "Corpus luteum", "Placenta", "Ovary"], ans: 2 },
  { id: 51, topic: "Reproduction", q: "Correct sequence of events during human fertilization:", opts: ["Capacitation → Acrosomal reaction → Zona pellucida penetration → Cortical reaction", "Acrosomal reaction → Capacitation → Cortical reaction → Zona penetration", "Zona penetration → Acrosomal reaction → Cortical reaction → Capacitation", "Capacitation → Cortical reaction → Acrosomal reaction → Zona penetration"], ans: 0, handpicked: true },
  { id: 52, topic: "Reproduction", q: "Triple fusion in angiosperms produces:", opts: ["Zygote (2n)", "Endosperm nucleus (3n)", "Embryo (2n)", "Seed coat (2n)"], ans: 1 },
  { id: 53, topic: "Reproduction", q: "Endosperm in gymnosperms is:", opts: ["Triploid (3n)", "Haploid (n) — it's the female gametophyte", "Diploid (2n)", "Tetraploid (4n)"], ans: 1, handpicked: true },

  // ── GENETICS AND EVOLUTION (54–63) ──
  { id: 54, topic: "Genetics & Evolution", q: "Mendel's Law of Segregation states:", opts: ["Genes assort independently", "Two alleles of a gene separate during gamete formation", "Dominant allele always suppresses recessive", "Genes are located on chromosomes"], ans: 1 },
  { id: 55, topic: "Genetics & Evolution", q: "Phenotypic ratio of F2 in a monohybrid cross is:", opts: ["1:2:1", "3:1", "9:3:3:1", "1:1:1:1"], ans: 1 },
  { id: 56, topic: "Genetics & Evolution", q: "DNA double helix model was proposed by:", opts: ["Griffith & Avery", "Watson & Crick", "Hershey & Chase", "Meselson & Stahl"], ans: 1 },
  { id: 57, topic: "Genetics & Evolution", q: "The genetic code is:", opts: ["Doublet, overlapping", "Triplet, overlapping", "Triplet, non-overlapping and degenerate", "Quadruplet, non-overlapping"], ans: 2 },
  { id: 58, topic: "Genetics & Evolution", q: "Shine-Dalgarno sequence in prokaryotes is located:", opts: ["At the 3' end of mRNA near stop codon", "On the 5' UTR of mRNA upstream of AUG (start codon)", "On 23S rRNA of large ribosomal subunit", "On tRNA anticodon loop"], ans: 1, handpicked: true },
  { id: 59, topic: "Genetics & Evolution", q: "Sickle cell anaemia is caused by:", opts: ["Deletion mutation", "Point mutation (Glu→Val in β-globin)", "Frame-shift mutation", "Chromosomal translocation"], ans: 1 },
  { id: 60, topic: "Genetics & Evolution", q: "Theory of Natural Selection was proposed by:", opts: ["Lamarck", "Hugo de Vries", "Charles Darwin", "Mendel"], ans: 2 },
  { id: 61, topic: "Genetics & Evolution", q: "Analogous organs indicate:", opts: ["Common ancestry", "Convergent evolution", "Divergent evolution", "Coevolution"], ans: 1 },
  { id: 62, topic: "Genetics & Evolution", q: "Down syndrome is caused by trisomy of chromosome:", opts: ["13", "18", "21", "23"], ans: 2 },
  { id: 63, topic: "Genetics & Evolution", q: "The Wobble Hypothesis (explaining degeneracy of genetic code) was proposed by:", opts: ["James Watson", "Francis Crick", "Marshall Nirenberg", "Har Gobind Khorana"], ans: 1, handpicked: true },

  // ── BIOLOGY AND HUMAN WELFARE (64–71) ──
  { id: 64, topic: "Biology & Human Welfare", q: "Penicillin is produced by:", opts: ["Aspergillus niger", "Penicillium notatum", "Rhizopus stolonifer", "Streptomyces griseus"], ans: 1 },
  { id: 65, topic: "Biology & Human Welfare", q: "Recombinant human insulin is commercially produced using:", opts: ["Saccharomyces cerevisiae", "Agrobacterium tumefaciens", "Escherichia coli", "Lactobacillus acidophilus"], ans: 2 },
  { id: 66, topic: "Biology & Human Welfare", q: "BCG vaccine provides immunity against:", opts: ["Typhoid", "Cholera", "Tuberculosis", "Polio"], ans: 2 },
  { id: 67, topic: "Biology & Human Welfare", q: "Which of the following is an opioid narcotic?", opts: ["Aspirin", "Morphine", "Paracetamol", "Ibuprofen"], ans: 1 },
  { id: 68, topic: "Biology & Human Welfare", q: "Biogas is mainly composed of:", opts: ["Hydrogen", "Carbon dioxide", "Methane", "Nitrogen"], ans: 2 },
  { id: 69, topic: "Biology & Human Welfare", q: "Which is an autoimmune disease?", opts: ["AIDS", "Malaria", "Type-1 Diabetes mellitus", "Typhoid"], ans: 2 },
  { id: 70, topic: "Biology & Human Welfare", q: "Streptomycin antibiotic is derived from:", opts: ["Penicillium chrysogenum", "Streptomyces griseus", "Bacillus subtilis", "Clostridium botulinum"], ans: 1 },
  { id: 71, topic: "Biology & Human Welfare", q: "Widal test is used to diagnose:", opts: ["Malaria", "Typhoid", "Tuberculosis", "AIDS"], ans: 1 },

  // ── BIOTECHNOLOGY (72–79) ──
  { id: 72, topic: "Biotechnology", q: "Taq polymerase used in PCR is derived from:", opts: ["Thermus aquaticus", "Thermophilus acidophilus", "Bacillus thermophilus", "Pyrococcus furiosus"], ans: 0, handpicked: true },
  { id: 73, topic: "Biotechnology", q: "Restriction endonucleases cut DNA at:", opts: ["Random sites", "Specific palindromic sequences", "Start codons only", "AT-rich regions"], ans: 1 },
  { id: 74, topic: "Biotechnology", q: "In gel electrophoresis, DNA fragments migrate based on:", opts: ["Colour", "Shape", "Size (smaller fragments move faster toward +ve pole)", "Charge alone"], ans: 2 },
  { id: 75, topic: "Biotechnology", q: "The most common vector in plant genetic engineering is:", opts: ["λ-bacteriophage", "Ti plasmid of Agrobacterium tumefaciens", "Cosmid", "BAC (Bacterial Artificial Chromosome)"], ans: 1 },
  { id: 76, topic: "Biotechnology", q: "Bt toxin gene is derived from:", opts: ["Bacillus subtilis", "Bacillus thuringiensis", "E. coli", "Pseudomonas fluorescens"], ans: 1 },
  { id: 77, topic: "Biotechnology", q: "Golden Rice is enriched with:", opts: ["Vitamin C", "Vitamin D", "β-carotene (provitamin A)", "Iron"], ans: 2 },
  { id: 78, topic: "Biotechnology", q: "Dolly (first cloned sheep) was produced by:", opts: ["IVF (In-vitro fertilization)", "Somatic Cell Nuclear Transfer (SCNT)", "Embryo splitting", "Parthenogenesis"], ans: 1 },
  { id: 79, topic: "Biotechnology", q: "RNAi (RNA interference) silences genes by:", opts: ["siRNA that cleaves complementary mRNA in RISC complex", "miRNA that promotes target mRNA translation", "dsRNA that enhances transcription factor binding", "tRNA that physically blocks the ribosome A-site"], ans: 0, handpicked: true },

  // ── ECOLOGY AND ENVIRONMENT (80–90) ──
  { id: 80, topic: "Ecology & Environment", q: "The term 'ecology' was coined by:", opts: ["Darwin", "Tansley", "Ernst Haeckel", "Odum"], ans: 2 },
  { id: 81, topic: "Ecology & Environment", q: "Which of the following is NOT a greenhouse gas?", opts: ["CO2", "Methane", "Nitrous oxide", "Molecular nitrogen (N2)"], ans: 3 },
  { id: 82, topic: "Ecology & Environment", q: "The energy pyramid is always:", opts: ["Inverted", "Upright", "Spindle-shaped", "Variable by ecosystem"], ans: 1 },
  { id: 83, topic: "Ecology & Environment", q: "Ozone layer depletion is primarily caused by:", opts: ["CO2", "Methane", "Chlorofluorocarbons (CFCs)", "SO2"], ans: 2 },
  { id: 84, topic: "Ecology & Environment", q: "BOD (Biochemical Oxygen Demand) measures:", opts: ["Air pollution level", "Organic pollution in water bodies", "Soil fertility index", "Noise pollution intensity"], ans: 1 },
  { id: 85, topic: "Ecology & Environment", q: "Maximum biodiversity is found in:", opts: ["Temperate deciduous forests", "Polar tundra", "Tropical rainforests", "Temperate grasslands"], ans: 2 },
  { id: 86, topic: "Ecology & Environment", q: "Mycorrhizal association between fungi and plant roots is:", opts: ["Parasitism", "Commensalism", "Mutualism", "Amensalism"], ans: 2 },
  { id: 87, topic: "Ecology & Environment", q: "Ex-situ conservation includes:", opts: ["Wildlife sanctuaries", "Biosphere reserves", "Seed banks and zoological parks", "National parks"], ans: 2 },
  { id: 88, topic: "Ecology & Environment", q: "The Gaia Hypothesis — that Earth functions as a self-regulating living system — was proposed by:", opts: ["James Lovelock", "Charles Darwin", "Ernst Haeckel", "Eugene Odum"], ans: 0, handpicked: true },
  { id: 89, topic: "Ecology & Environment", q: "Which level of biodiversity refers to the variety of ecosystems?", opts: ["Genetic diversity", "Species diversity", "Ecosystem diversity", "Community diversity"], ans: 2 },
  { id: 90, topic: "Ecology & Environment", q: "Ecological succession beginning on a bare rock is called:", opts: ["Secondary succession", "Primary succession (Lithosere)", "Hydrosere", "Xerosere on a water body"], ans: 1 },
];

const TOTAL_TIME = 90 * 60;

const topicColors = {
  "Diversity in Living World": "#10b981",
  "Structural Organisation": "#3b82f6",
  "Cell Structure & Function": "#8b5cf6",
  "Plant Physiology": "#22c55e",
  "Human Physiology": "#ef4444",
  "Reproduction": "#f59e0b",
  "Genetics & Evolution": "#06b6d4",
  "Biology & Human Welfare": "#ec4899",
  "Biotechnology": "#f97316",
  "Ecology & Environment": "#84cc16",
};

function formatTime(secs) {
  const m = Math.floor(secs / 60).toString().padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function AbhinavQuiz() {
  const [screen, setScreen] = useState("start");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(90).fill(null));
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [submitted, setSubmitted] = useState(false);
  const [reviewQ, setReviewQ] = useState(0);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [reaction, setReaction] = useState(null);
  const [hintText, setHintText] = useState(null);
  const [tipIdx, setTipIdx] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showStreakBanner, setShowStreakBanner] = useState(false);
  const [luckyFlash, setLuckyFlash] = useState(false);
  const timerRef = useRef(null);
  const reactionTimer = useRef(null);
  const hintTimer = useRef(null);

  useEffect(() => {
    if (screen === "quiz" && !submitted) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => { if (t <= 1) { clearInterval(timerRef.current); handleSubmit(); return 0; } return t - 1; });
      }, 1000);
      const tipInterval = setInterval(() => setTipIdx(i => (i + 1) % ABHINAV_TIPS.length), 6000);
      return () => { clearInterval(timerRef.current); clearInterval(tipInterval); };
    }
  }, [screen, submitted]);

  const handleSubmit = () => { clearInterval(timerRef.current); setSubmitted(true); setScreen("result"); };

  const selectAnswer = (optIdx) => {
    if (submitted) return;
    const updated = [...answers];
    const wasAnswered = updated[current] !== null;
    updated[current] = updated[current] === optIdx ? null : optIdx;
    setAnswers(updated);

    if (updated[current] !== null) {
      const msg = FUNNY_REACTIONS[Math.floor(Math.random() * FUNNY_REACTIONS.length)];
      setReaction(msg);
      clearTimeout(reactionTimer.current);
      reactionTimer.current = setTimeout(() => setReaction(null), 2000);

      if (!wasAnswered) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        if (newStreak > 0 && newStreak % 5 === 0) {
          setShowStreakBanner(true);
          setTimeout(() => setShowStreakBanner(false), 2500);
        }
      }
    }
  };

  const luckyGuess = () => {
    if (submitted) return;
    const rand = Math.floor(Math.random() * 4);
    const updated = [...answers];
    updated[current] = rand;
    setAnswers(updated);
    setLuckyFlash(true);
    setTimeout(() => setLuckyFlash(false), 600);
    setReaction("🎲 Abhinav's Lucky Pick! Option " + ["A","B","C","D"][rand] + " selected!");
    clearTimeout(reactionTimer.current);
    reactionTimer.current = setTimeout(() => setReaction(null), 2500);
  };

  const askAbhinav = () => {
    const hint = ABHINAV_HINTS[Math.floor(Math.random() * ABHINAV_HINTS.length)];
    setHintText(hint);
    clearTimeout(hintTimer.current);
    hintTimer.current = setTimeout(() => setHintText(null), 3500);
  };

  const calcScore = () => {
    let score = 0, correct = 0, wrong = 0, skipped = 0;
    answers.forEach((a, i) => {
      if (a === null) skipped++;
      else if (a === questions[i].ans) { score += 4; correct++; }
      else { score -= 1; wrong++; }
    });
    return { score, correct, wrong, skipped };
  };

  const answered = answers.filter(a => a !== null).length;
  const timerDanger = timeLeft < 300;

  const getRoast = (score) => {
    if (score >= 340) return { text: "ABHINAV HIMSELF would cry tears of joy 🏆 Absolute legend.", emoji: "👑" };
    if (score >= 280) return { text: "Solid! You clearly opened NCERT at least once. Respect. 📚", emoji: "🎉" };
    if (score >= 200) return { text: "Not bad! You'll get into... some college. Somewhere. 🏫", emoji: "😊" };
    if (score >= 100) return { text: "Hey, at least you tried! Negative marking is a feature, not a bug. 😅", emoji: "💪" };
    if (score >= 0)   return { text: "Your biology teacher is somewhere sighing deeply right now. 😭", emoji: "😬" };
    return { text: "You scored NEGATIVE. Statistically impossible AND yet here we are. 💀", emoji: "☠️" };
  };

  // ── START SCREEN ──
  if (screen === "start") return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#0a0a0f 0%,#1a0a2e 40%,#0a1628 100%)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Georgia,serif", padding:"20px" }}>
      <div style={{ maxWidth:560, width:"100%", textAlign:"center" }}>
        <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:24, padding:"44px 36px", backdropFilter:"blur(16px)", boxShadow:"0 32px 80px rgba(0,0,0,0.5)" }}>

          <div style={{ fontSize:54, marginBottom:4 }}>🧬</div>
          <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"linear-gradient(90deg,#f59e0b,#ef4444)", padding:"5px 16px", borderRadius:20, marginBottom:14 }}>
            <span style={{ fontSize:14 }}>👑</span>
            <span style={{ color:"#fff", fontSize:11, fontWeight:900, letterSpacing:2 }}>ABHINAV'S SPECIAL QUIZ</span>
          </div>

          <h1 style={{ color:"#fff", fontSize:30, margin:"0 0 4px", fontWeight:800, letterSpacing:-1 }}>NEET Biology</h1>
          <p style={{ color:"#94a3b8", fontSize:14, marginBottom:6 }}>Full Syllabus — Handcrafted with ❤️ (and suffering)</p>
          <p style={{ color:"#f59e0b", fontSize:12, marginBottom:28, fontStyle:"italic" }}>"If you fail this, LAVESH failed too. We're in this together." 🤝</p>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:24 }}>
            {[["90","Questions"],["360","Max Marks"],["90 min","Duration"]].map(([v,l]) => (
              <div key={l} style={{ background:"rgba(99,102,241,0.12)", border:"1px solid rgba(99,102,241,0.25)", borderRadius:12, padding:"14px 8px" }}>
                <div style={{ color:"#a5b4fc", fontSize:20, fontWeight:800 }}>{v}</div>
                <div style={{ color:"#475569", fontSize:10, letterSpacing:1, marginTop:2 }}>{l}</div>
              </div>
            ))}
          </div>

          <div style={{ background:"rgba(245,158,11,0.08)", border:"1px solid rgba(245,158,11,0.2)", borderRadius:12, padding:"12px 16px", marginBottom:16, textAlign:"left" }}>
            <div style={{ color:"#fbbf24", fontWeight:800, marginBottom:8, fontSize:13 }}>🎯 ABHINAV'S HANDPICKED — 16 Special Qs</div>
            <div style={{ color:"#94a3b8", fontSize:12, lineHeight:1.7 }}>
              These are harder questions personally selected by Abhinav.<br/>
              <span style={{ color:"#fbbf24" }}>⚡ Extra difficult. No mercy. Godspeed.</span>
            </div>
          </div>

          <div style={{ background:"rgba(16,185,129,0.07)", border:"1px solid rgba(16,185,129,0.18)", borderRadius:12, padding:"12px 16px", marginBottom:24, textAlign:"left" }}>
            <div style={{ color:"#6ee7b7", fontWeight:700, marginBottom:6, fontSize:12 }}>📋 MARKING SCHEME</div>
            <div style={{ color:"#94a3b8", fontSize:12, lineHeight:1.8 }}>
              ✅ Correct: <span style={{ color:"#4ade80", fontWeight:700 }}>+4</span> &nbsp;|&nbsp;
              ❌ Wrong: <span style={{ color:"#f87171", fontWeight:700 }}>−1</span> &nbsp;|&nbsp;
              ⬜ Skipped: <span style={{ color:"#64748b" }}>0</span>
            </div>
          </div>

          <button onClick={() => setScreen("quiz")} style={{ width:"100%", padding:"16px", background:"linear-gradient(135deg,#f59e0b,#ef4444)", color:"#fff", border:"none", borderRadius:14, fontSize:17, fontWeight:800, cursor:"pointer", letterSpacing:0.5, boxShadow:"0 8px 32px rgba(245,158,11,0.35)" }}>
            Let's Go! 🚀
          </button>
          <p style={{ color:"#334155", fontSize:11, marginTop:12 }}>Side effects: brain pain, existential crisis, sudden NCERT love</p>
        </div>
      </div>
    </div>
  );

  // ── RESULT SCREEN ──
  if (screen === "result") {
    const { score, correct, wrong, skipped } = calcScore();
    const pct = Math.round((correct / 90) * 100);
    const roast = getRoast(score);
    const grade = score >= 300 ? "LEGEND 🏆" : score >= 200 ? "Solid 💪" : score >= 100 ? "Average 😐" : score >= 0 ? "Needs Work 😬" : "Yikes 💀";
    const gradeColor = score >= 300 ? "#4ade80" : score >= 200 ? "#facc15" : score >= 100 ? "#fb923c" : "#f87171";

    return (
      <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#0a0a0f,#1a0a2e,#0a1628)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Georgia,serif", padding:"20px" }}>
        <div style={{ maxWidth:600, width:"100%" }}>
          <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:24, padding:"36px 32px", backdropFilter:"blur(12px)" }}>

            <div style={{ textAlign:"center", marginBottom:24 }}>
              <div style={{ fontSize:52, marginBottom:6 }}>{roast.emoji}</div>
              <h2 style={{ color:"#fff", fontSize:26, margin:0, fontWeight:800 }}>Results are in!</h2>
              <div style={{ background:"rgba(245,158,11,0.1)", border:"1px solid rgba(245,158,11,0.25)", borderRadius:10, padding:"10px 16px", margin:"14px 0 0", color:"#fde68a", fontSize:13, fontStyle:"italic", lineHeight:1.5 }}>
                {roast.text}
              </div>
            </div>

            <div style={{ textAlign:"center", marginBottom:24 }}>
              <div style={{ display:"inline-block", background:"rgba(99,102,241,0.15)", border:"2px solid rgba(99,102,241,0.4)", borderRadius:18, padding:"20px 44px" }}>
                <div style={{ color:"#a5b4fc", fontSize:12, letterSpacing:2, marginBottom:4 }}>TOTAL SCORE</div>
                <div style={{ color:"#fff", fontSize:56, fontWeight:900, lineHeight:1 }}>{score}</div>
                <div style={{ color:"#475569", fontSize:13 }}>out of 360</div>
                <div style={{ color:gradeColor, fontWeight:800, fontSize:16, marginTop:8 }}>{grade}</div>
              </div>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:22 }}>
              {[
                { l:"Correct", v:correct, c:"#4ade80", bg:"rgba(74,222,128,0.1)", b:"rgba(74,222,128,0.3)", i:"✅" },
                { l:"Wrong", v:wrong, c:"#f87171", bg:"rgba(248,113,113,0.1)", b:"rgba(248,113,113,0.3)", i:"❌" },
                { l:"Skipped", v:skipped, c:"#94a3b8", bg:"rgba(148,163,184,0.09)", b:"rgba(148,163,184,0.2)", i:"⬜" },
              ].map(({ l, v, c, bg, b, i }) => (
                <div key={l} style={{ background:bg, border:`1px solid ${b}`, borderRadius:12, padding:"14px 8px", textAlign:"center" }}>
                  <div style={{ fontSize:20 }}>{i}</div>
                  <div style={{ color:c, fontSize:24, fontWeight:800 }}>{v}</div>
                  <div style={{ color:"#475569", fontSize:10, marginTop:2 }}>{l.toUpperCase()}</div>
                </div>
              ))}
            </div>

            <div style={{ marginBottom:22 }}>
              <div style={{ display:"flex", justifyContent:"space-between", color:"#94a3b8", fontSize:12, marginBottom:5 }}>
                <span>Accuracy</span><span style={{ color:"#a5b4fc" }}>{pct}%</span>
              </div>
              <div style={{ background:"rgba(255,255,255,0.07)", borderRadius:8, height:8, overflow:"hidden" }}>
                <div style={{ height:"100%", width:`${pct}%`, background:"linear-gradient(90deg,#f59e0b,#ef4444)", borderRadius:8 }} />
              </div>
            </div>

            <div style={{ background:"rgba(245,158,11,0.07)", border:"1px solid rgba(245,158,11,0.2)", borderRadius:12, padding:"12px 16px", marginBottom:20 }}>
              <div style={{ color:"#fbbf24", fontSize:12, fontWeight:700, marginBottom:4 }}>👑 Abhinav's Verdict</div>
              <div style={{ color:"#94a3b8", fontSize:12, lineHeight:1.6 }}>
                {score >= 280 ? "You might actually survive NEET. Abhinav approves. 📖" :
                 score >= 160 ? "Decent effort. Now go re-read those 16 handpicked questions. 🎯" :
                 "Abhinav is personally disappointed. NCERT. Now. Immediately. 🔥"}
              </div>
            </div>

            <div style={{ display:"flex", gap:10 }}>
              <button onClick={() => { setReviewQ(0); setScreen("review"); }} style={{ flex:1, padding:"13px", background:"rgba(99,102,241,0.15)", color:"#a5b4fc", border:"1px solid rgba(99,102,241,0.3)", borderRadius:12, fontSize:13, fontWeight:700, cursor:"pointer" }}>
                📖 Review Answers
              </button>
              <button onClick={() => { setAnswers(Array(90).fill(null)); setTimeLeft(TOTAL_TIME); setSubmitted(false); setCurrent(0); setStreak(0); setScreen("start"); }} style={{ flex:1, padding:"13px", background:"linear-gradient(135deg,#f59e0b,#ef4444)", color:"#fff", border:"none", borderRadius:12, fontSize:13, fontWeight:700, cursor:"pointer" }}>
                🔄 Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── REVIEW SCREEN ──
  if (screen === "review") {
    const q = questions[reviewQ];
    const userAns = answers[reviewQ];
    return (
      <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#0a0a0f,#1a0a2e,#0a1628)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Georgia,serif", padding:"16px" }}>
        <div style={{ maxWidth:660, width:"100%" }}>
          <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:20, padding:"28px 24px", backdropFilter:"blur(12px)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
              <button onClick={() => setScreen("result")} style={{ background:"none", border:"none", color:"#94a3b8", cursor:"pointer", fontSize:13 }}>← Back to Results</button>
              <span style={{ color:"#475569", fontSize:12 }}>{reviewQ + 1} / 90</span>
            </div>

            <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:14 }}>
              <span style={{ background:`${topicColors[q.topic]}22`, border:`1px solid ${topicColors[q.topic]}44`, color:topicColors[q.topic], fontSize:10, padding:"3px 10px", borderRadius:20, fontFamily:"monospace" }}>{q.topic}</span>
              {q.handpicked && <span style={{ background:"rgba(245,158,11,0.15)", border:"1px solid rgba(245,158,11,0.4)", color:"#fbbf24", fontSize:10, padding:"3px 10px", borderRadius:20, fontWeight:700 }}>👑 Abhinav's Handpicked</span>}
            </div>

            <div style={{ color:"#e2e8f0", fontSize:16, lineHeight:1.65, marginBottom:18, fontWeight:600 }}>Q{q.id}. {q.q}</div>

            <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:20 }}>
              {q.opts.map((opt, i) => {
                const isCorrect = i === q.ans;
                const isUser = i === userAns;
                let bg = "rgba(255,255,255,0.04)", border = "rgba(255,255,255,0.1)", color = "#64748b";
                if (isCorrect) { bg = "rgba(74,222,128,0.12)"; border = "#4ade80"; color = "#4ade80"; }
                else if (isUser && !isCorrect) { bg = "rgba(248,113,113,0.12)"; border = "#f87171"; color = "#f87171"; }
                return (
                  <div key={i} style={{ background:bg, border:`1.5px solid ${border}`, borderRadius:10, padding:"11px 14px", color, fontSize:13, display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ fontWeight:700, minWidth:18 }}>{["A","B","C","D"][i]}.</span>
                    <span>{opt}</span>
                    {isCorrect && <span style={{ marginLeft:"auto" }}>✅</span>}
                    {isUser && !isCorrect && <span style={{ marginLeft:"auto" }}>❌</span>}
                  </div>
                );
              })}
            </div>

            {userAns === null && <div style={{ background:"rgba(148,163,184,0.08)", border:"1px solid rgba(148,163,184,0.2)", borderRadius:10, padding:"9px 14px", color:"#64748b", fontSize:12, marginBottom:14 }}>⬜ Not attempted — Abhinav silently judged you</div>}

            <div style={{ display:"flex", gap:10 }}>
              <button onClick={() => setReviewQ(Math.max(0, reviewQ-1))} disabled={reviewQ===0} style={{ flex:1, padding:"11px", background:"rgba(99,102,241,0.12)", color:reviewQ===0?"#334155":"#a5b4fc", border:"1px solid rgba(99,102,241,0.25)", borderRadius:10, cursor:reviewQ===0?"not-allowed":"pointer", fontWeight:700 }}>← Prev</button>
              <button onClick={() => setReviewQ(Math.min(89, reviewQ+1))} disabled={reviewQ===89} style={{ flex:1, padding:"11px", background:"linear-gradient(135deg,#f59e0b,#ef4444)", color:"#fff", border:"none", borderRadius:10, cursor:reviewQ===89?"not-allowed":"pointer", fontWeight:700 }}>Next →</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── QUIZ SCREEN ──
  const q = questions[current];
  const selectedOpt = answers[current];

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#0a0a0f,#1a0a2e,#0a1628)", fontFamily:"Georgia,serif", display:"flex", flexDirection:"column", position:"relative" }}>

      {/* ── STREAK BANNER ── */}
      {showStreakBanner && (
        <div style={{ position:"fixed", top:70, left:"50%", transform:"translateX(-50%)", zIndex:200, background:"linear-gradient(135deg,#f59e0b,#ef4444)", color:"#fff", padding:"10px 24px", borderRadius:20, fontWeight:800, fontSize:15, boxShadow:"0 8px 32px rgba(245,158,11,0.5)", whiteSpace:"nowrap" }}>
          🔥 {streak} Question Streak! Abhinav is shook!
        </div>
      )}

      {/* ── REACTION TOAST ── */}
      {reaction && (
        <div style={{ position:"fixed", bottom:100, left:"50%", transform:"translateX(-50%)", zIndex:200, background:"rgba(15,23,42,0.95)", border:"1px solid rgba(99,102,241,0.4)", color:"#c7d2fe", padding:"10px 22px", borderRadius:20, fontSize:13, fontWeight:600, boxShadow:"0 8px 32px rgba(0,0,0,0.5)", whiteSpace:"nowrap", backdropFilter:"blur(12px)" }}>
          {reaction}
        </div>
      )}

      {/* ── HINT TOAST ── */}
      {hintText && (
        <div style={{ position:"fixed", bottom:140, left:"50%", transform:"translateX(-50%)", zIndex:200, background:"rgba(245,158,11,0.15)", border:"1px solid rgba(245,158,11,0.5)", color:"#fde68a", padding:"10px 22px", borderRadius:20, fontSize:13, fontWeight:600, boxShadow:"0 8px 32px rgba(0,0,0,0.5)", whiteSpace:"nowrap", backdropFilter:"blur(12px)" }}>
          👑 {hintText}
        </div>
      )}

      {/* ── TOP BAR ── */}
      <div style={{ position:"sticky", top:0, zIndex:50, background:"rgba(10,10,15,0.94)", borderBottom:"1px solid rgba(255,255,255,0.07)", backdropFilter:"blur(20px)", padding:"9px 16px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
        <div>
          <div style={{ background:"linear-gradient(90deg,#f59e0b,#ef4444)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", fontWeight:900, fontSize:14, letterSpacing:0.3 }}>👑 Abhinav's Special Quiz</div>
          <div style={{ color:"#334155", fontSize:10 }}>NEET Biology · Full Syllabus</div>
        </div>
        <div style={{ display:"flex", gap:12, alignItems:"center" }}>
          <div style={{ textAlign:"center" }}>
            <div style={{ color:timerDanger?"#f87171":"#6ee7b7", fontWeight:800, fontSize:17, fontFamily:"monospace" }}>{formatTime(timeLeft)}</div>
            <div style={{ color:"#334155", fontSize:9 }}>LEFT</div>
          </div>
          <div style={{ textAlign:"center" }}>
            <div style={{ color:"#a5b4fc", fontWeight:800, fontSize:17 }}>{answered}/90</div>
            <div style={{ color:"#334155", fontSize:9 }}>DONE</div>
          </div>
          {streak >= 3 && <div style={{ color:"#f59e0b", fontSize:13, fontWeight:700 }}>🔥{streak}</div>}
          <button onClick={() => setShowSubmitModal(true)} style={{ padding:"8px 16px", background:"linear-gradient(135deg,#ef4444,#b91c1c)", color:"#fff", border:"none", borderRadius:8, fontSize:12, fontWeight:700, cursor:"pointer", boxShadow:"0 4px 14px rgba(239,68,68,0.4)" }}>
            Submit Test
          </button>
        </div>
      </div>

      {/* progress bar */}
      <div style={{ height:3, background:"rgba(255,255,255,0.05)" }}>
        <div style={{ height:"100%", width:`${((current+1)/90)*100}%`, background:"linear-gradient(90deg,#f59e0b,#ef4444)", transition:"width 0.3s" }} />
      </div>

      <div style={{ flex:1, padding:"18px 16px 24px", maxWidth:760, margin:"0 auto", width:"100%", boxSizing:"border-box" }}>

        {/* topic + handpicked badges */}
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:14 }}>
          <span style={{ background:`${topicColors[q.topic]}20`, border:`1px solid ${topicColors[q.topic]}44`, color:topicColors[q.topic], fontSize:10, padding:"3px 12px", borderRadius:20, fontFamily:"monospace", letterSpacing:0.5 }}>{q.topic}</span>
          {q.handpicked && (
            <span style={{ background:"rgba(245,158,11,0.15)", border:"1px solid rgba(245,158,11,0.45)", color:"#fbbf24", fontSize:10, padding:"3px 12px", borderRadius:20, fontWeight:800, letterSpacing:0.5 }}>
              👑 Abhinav's Handpicked
            </span>
          )}
        </div>

        {/* question card */}
        <div style={{ background: q.handpicked ? "rgba(245,158,11,0.05)" : "rgba(255,255,255,0.04)", border:`1px solid ${q.handpicked ? "rgba(245,158,11,0.2)" : "rgba(255,255,255,0.09)"}`, borderRadius:16, padding:"20px 20px 16px", marginBottom:14 }}>
          <div style={{ color:"#475569", fontSize:11, marginBottom:8, fontFamily:"monospace" }}>Q {current+1} of 90 {q.handpicked ? "· ⚡ Extra Hard" : ""}</div>
          <div style={{ color:"#f1f5f9", fontSize:16, lineHeight:1.65, fontWeight:600 }}>{q.q}</div>
        </div>

        {/* options */}
        <div style={{ display:"flex", flexDirection:"column", gap:9, marginBottom:18 }}>
          {q.opts.map((opt, i) => {
            const isSel = selectedOpt === i;
            return (
              <button key={i} onClick={() => selectAnswer(i)} style={{
                textAlign:"left", padding:"13px 15px", borderRadius:12, cursor:"pointer",
                background: luckyFlash && isSel ? "rgba(245,158,11,0.25)" : isSel ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.04)",
                border: isSel ? `2px solid ${luckyFlash ? "#f59e0b" : "#818cf8"}` : "1.5px solid rgba(255,255,255,0.08)",
                color: isSel ? "#e0e7ff" : "#94a3b8", fontSize:14, lineHeight:1.4,
                display:"flex", alignItems:"center", gap:12, transition:"all 0.15s", boxSizing:"border-box"
              }}>
                <span style={{ minWidth:26, height:26, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", background:isSel?"#6366f1":"rgba(255,255,255,0.07)", color:isSel?"#fff":"#475569", fontWeight:800, fontSize:11 }}>{["A","B","C","D"][i]}</span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        {/* fun action buttons row */}
        <div style={{ display:"flex", gap:8, marginBottom:14 }}>
          <button onClick={askAbhinav} style={{ flex:1, padding:"10px", background:"rgba(245,158,11,0.1)", border:"1px solid rgba(245,158,11,0.3)", color:"#fbbf24", borderRadius:10, fontSize:12, fontWeight:700, cursor:"pointer" }}>
            👑 Ask Ha Yoon 
          </button>
          <button onClick={luckyGuess} style={{ flex:1, padding:"10px", background:"rgba(139,92,246,0.12)", border:"1px solid rgba(139,92,246,0.3)", color:"#c4b5fd", borderRadius:10, fontSize:12, fontWeight:700, cursor:"pointer" }}>
            🎲 Lucky Guess
          </button>
          <button onClick={() => { const updated=[...answers]; updated[current]=null; setAnswers(updated); setStreak(0); }} style={{ flex:1, padding:"10px", background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", color:"#f87171", borderRadius:10, fontSize:12, fontWeight:700, cursor:"pointer" }}>
            🗑️ Clear
          </button>
        </div>

        {/* nav buttons */}
        <div style={{ display:"flex", gap:10, marginBottom:16 }}>
          <button onClick={() => setCurrent(Math.max(0,current-1))} disabled={current===0} style={{ flex:1, padding:"12px", background:"rgba(99,102,241,0.1)", color:current===0?"#334155":"#a5b4fc", border:"1px solid rgba(99,102,241,0.2)", borderRadius:10, cursor:current===0?"not-allowed":"pointer", fontWeight:700, fontSize:13 }}>← Prev</button>
          <button onClick={() => setCurrent(Math.min(89,current+1))} disabled={current===89} style={{ flex:1, padding:"12px", background:current===89?"rgba(99,102,241,0.1)":"linear-gradient(135deg,#6366f1,#8b5cf6)", color:current===89?"#334155":"#fff", border:"none", borderRadius:10, cursor:current===89?"not-allowed":"pointer", fontWeight:700, fontSize:13 }}>Next →</button>
        </div>

        {/* palette */}
        <div style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:14, padding:"14px", marginBottom:16 }}>
          <div style={{ color:"#334155", fontSize:10, letterSpacing:1, marginBottom:8 }}>QUESTION PALETTE</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
            {questions.map((qq, i) => {
              const isAns = answers[i] !== null;
              const isCur = i === current;
              const isHP = qq.handpicked;
              return (
                <button key={i} onClick={() => setCurrent(i)} style={{ width:28, height:28, borderRadius:6, border:isCur?"2px solid #f59e0b":isHP?"1.5px solid rgba(245,158,11,0.35)":"1.5px solid transparent", background:isAns?(isHP?"rgba(245,158,11,0.5)":"rgba(99,102,241,0.55)"):"rgba(255,255,255,0.06)", color:isAns?"#fff":"#334155", fontSize:10, fontWeight:700, cursor:"pointer", position:"relative" }}>
                  {i+1}
                </button>
              );
            })}
          </div>
          <div style={{ display:"flex", gap:14, marginTop:8, flexWrap:"wrap" }}>
            <div style={{ display:"flex", alignItems:"center", gap:5, color:"#475569", fontSize:10 }}><div style={{ width:10, height:10, borderRadius:3, background:"rgba(99,102,241,0.55)" }} />Answered</div>
            <div style={{ display:"flex", alignItems:"center", gap:5, color:"#475569", fontSize:10 }}><div style={{ width:10, height:10, borderRadius:3, background:"rgba(245,158,11,0.5)" }} />Handpicked + Answered</div>
            <div style={{ display:"flex", alignItems:"center", gap:5, color:"#475569", fontSize:10 }}><div style={{ width:10, height:10, borderRadius:3, border:"1px solid rgba(245,158,11,0.4)", background:"rgba(255,255,255,0.06)" }} />Handpicked</div>
          </div>
        </div>

        {/* Abhinav's rotating tip */}
        <div style={{ background:"rgba(245,158,11,0.06)", border:"1px solid rgba(245,158,11,0.15)", borderRadius:12, padding:"10px 14px", display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
          <span style={{ fontSize:16 }}>👑</span>
          <span style={{ color:"#92400e", fontSize:11, fontStyle:"italic", flex:1 }}>{ABHINAV_TIPS[tipIdx]}</span>
        </div>

        {/* big submit button */}
        <button onClick={() => setShowSubmitModal(true)} style={{ width:"100%", padding:"15px", background:"linear-gradient(135deg,#ef4444,#b91c1c)", color:"#fff", border:"none", borderRadius:12, fontSize:15, fontWeight:800, cursor:"pointer", letterSpacing:0.5, boxShadow:"0 6px 24px rgba(239,68,68,0.35)" }}>
          🏁 Submit Test Now
        </button>
      </div>

      {/* ── SUBMIT MODAL ── */}
      {showSubmitModal && (() => {
        const att = answers.filter(a => a !== null).length;
        const skp = 90 - att;
        const timeUsed = TOTAL_TIME - timeLeft;
        const pctDone = Math.round((att / 90) * 100);
        const circ = 2 * Math.PI * 28;
        const dashOff = circ - (pctDone / 100) * circ;
        const hasWarn = skp > 10;
        return (
          <div style={{ position:"fixed", inset:0, zIndex:1000, background:"rgba(0,0,0,0.8)", backdropFilter:"blur(10px)", display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
            <div style={{ background:"linear-gradient(160deg,#0a0a0f,#1a0a2e)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:24, padding:"34px 30px", maxWidth:460, width:"100%", boxShadow:"0 32px 80px rgba(0,0,0,0.7)" }}>

              <div style={{ textAlign:"center", marginBottom:24 }}>
                <div style={{ fontSize:40, marginBottom:8 }}>🏁</div>
                <h2 style={{ color:"#fff", margin:0, fontSize:21, fontWeight:800 }}>Submit Test?</h2>
                <p style={{ color:"#475569", margin:"6px 0 0", fontSize:12 }}>Abhinav is watching. Choose wisely.</p>
              </div>

              <div style={{ display:"flex", alignItems:"center", gap:18, marginBottom:22 }}>
                <div style={{ position:"relative", flexShrink:0 }}>
                  <svg width={72} height={72} style={{ transform:"rotate(-90deg)" }}>
                    <circle cx={36} cy={36} r={28} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={6} />
                    <circle cx={36} cy={36} r={28} fill="none" stroke={pctDone>=80?"#4ade80":pctDone>=50?"#f59e0b":"#f87171"} strokeWidth={6} strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={dashOff} />
                  </svg>
                  <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
                    <span style={{ color:"#fff", fontWeight:800, fontSize:15 }}>{pctDone}%</span>
                    <span style={{ color:"#475569", fontSize:9 }}>done</span>
                  </div>
                </div>
                <div style={{ flex:1, display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                  {[
                    { l:"Attempted", v:att, c:"#a5b4fc", bg:"rgba(99,102,241,0.1)", b:"rgba(99,102,241,0.2)" },
                    { l:"Unattempted", v:skp, c:skp>10?"#fbbf24":"#64748b", bg:skp>10?"rgba(251,191,36,0.09)":"rgba(255,255,255,0.04)", b:skp>10?"rgba(251,191,36,0.3)":"rgba(255,255,255,0.07)" },
                    { l:"Time Used", v:formatTime(timeUsed), c:"#6ee7b7", bg:"rgba(16,185,129,0.09)", b:"rgba(16,185,129,0.2)" },
                    { l:"Remaining", v:formatTime(timeLeft), c:timeLeft<300?"#f87171":"#64748b", bg:timeLeft<300?"rgba(248,113,113,0.09)":"rgba(255,255,255,0.04)", b:timeLeft<300?"rgba(248,113,113,0.25)":"rgba(255,255,255,0.07)" },
                  ].map(({ l, v, c, bg, b }) => (
                    <div key={l} style={{ background:bg, border:`1px solid ${b}`, borderRadius:10, padding:"9px 11px" }}>
                      <div style={{ color:c, fontWeight:800, fontSize:14, fontFamily:"monospace" }}>{v}</div>
                      <div style={{ color:"#334155", fontSize:9, marginTop:2, letterSpacing:0.5 }}>{l.toUpperCase()}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background:"rgba(99,102,241,0.08)", border:"1px solid rgba(99,102,241,0.18)", borderRadius:10, padding:"9px 13px", marginBottom:14, display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:16 }}>🎯</span>
                <div>
                  <span style={{ color:"#64748b", fontSize:11 }}>Max possible score: </span>
                  <span style={{ color:"#a5b4fc", fontWeight:800, fontSize:13 }}>+{att*4}</span>
                  <span style={{ color:"#334155", fontSize:11 }}> · Min possible: </span>
                  <span style={{ color:"#f87171", fontWeight:700, fontSize:12 }}>−{att}</span>
                </div>
              </div>

              {hasWarn && (
                <div style={{ background:"rgba(251,191,36,0.07)", border:"1px solid rgba(251,191,36,0.25)", borderRadius:10, padding:"9px 13px", marginBottom:14, display:"flex", gap:8 }}>
                  <span style={{ fontSize:14 }}>⚠️</span>
                  <div style={{ color:"#fde68a", fontSize:11, lineHeight:1.5 }}><strong>{skp} unanswered</strong> questions remain. Skipped = 0 marks, wrong = −1. Go back!</div>
                </div>
              )}

              {skp > 0 && skp <= 15 && (
                <div style={{ marginBottom:14 }}>
                  <div style={{ color:"#334155", fontSize:10, letterSpacing:1, marginBottom:6 }}>JUMP TO UNANSWERED</div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                    {answers.map((a, i) => a === null ? (
                      <button key={i} onClick={() => { setShowSubmitModal(false); setCurrent(i); }} style={{ width:27, height:27, borderRadius:6, background:"rgba(251,191,36,0.12)", border:"1px solid rgba(251,191,36,0.35)", color:"#fbbf24", fontSize:10, fontWeight:700, cursor:"pointer" }}>{i+1}</button>
                    ) : null)}
                  </div>
                </div>
              )}

              <div style={{ background:"rgba(245,158,11,0.07)", border:"1px solid rgba(245,158,11,0.18)", borderRadius:10, padding:"9px 13px", marginBottom:18 }}>
                <span style={{ color:"#f59e0b", fontSize:12, fontStyle:"italic" }}>👑 "{skp === 0 ? "Full attempt! Abhinav is proud. Now pray. 🙏" : `You left ${skp} blank. Abhinav left ${skp} sighs. Just saying. 💀`}"</span>
              </div>

              <div style={{ display:"flex", gap:10 }}>
                <button onClick={() => setShowSubmitModal(false)} style={{ flex:1, padding:"13px", background:"rgba(255,255,255,0.05)", color:"#64748b", border:"1px solid rgba(255,255,255,0.09)", borderRadius:12, fontSize:13, fontWeight:700, cursor:"pointer" }}>← Keep Going</button>
                <button onClick={() => { setShowSubmitModal(false); handleSubmit(); }} style={{ flex:1, padding:"13px", background:"linear-gradient(135deg,#ef4444,#b91c1c)", color:"#fff", border:"none", borderRadius:12, fontSize:13, fontWeight:800, cursor:"pointer", boxShadow:"0 6px 20px rgba(239,68,68,0.4)" }}>Submit ✓</button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
