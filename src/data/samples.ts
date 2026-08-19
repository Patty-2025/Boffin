export interface EssaySample {
  id: string;
  title: string;
  subject: string;
  course: string;
  description: string;
  previewText: string;
  fileUrl: string; // The URL to the full file in /public/samples
}

export const essaySamples: EssaySample[] = [
  {
    id: "hist-001",
    title: "The Industrial Revolution in Britain",
    subject: "History",
    course: "Western Civilization",
    description: "An in-depth analysis of the socio-economic impacts of the Industrial Revolution.",
    previewText: "The Industrial Revolution marked a major turning point in history; almost every aspect of daily life was influenced in some way. In particular, average income and population began to exhibit unprecedented sustained growth...",
    fileUrl: "/samples/industrial-revolution.pdf"
  },
  {
    id: "sci-002",
    title: "Quantum Entanglement and its Applications",
    subject: "Science",
    course: "Modern Physics",
    description: "Explaining the phenomenon of quantum entanglement and how it powers quantum computing.",
    previewText: "Quantum entanglement is a physical phenomenon that occurs when a pair or group of particles is generated, interact, or share spatial proximity in a way such that the quantum state of each particle...",
    fileUrl: "/samples/quantum-physics.pdf"
  },
  {
    id: "lit-003",
    title: "Symbolism in The Great Gatsby",
    subject: "Literature",
    course: "American Literature",
    description: "Decoding the valley of ashes, the green light, and the eyes of Doctor T.J. Eckleburg.",
    previewText: "F. Scott Fitzgerald's 'The Great Gatsby' is a masterpiece of American literature. The novel is rich with symbolism that reflects the crumbling social and moral values of the Jazz Age...",
    fileUrl: "/samples/great-gatsby-symbolism.pdf"
  },
  {
    id: "acad-004",
    title: "Dissertation on Modern Education Standards: A Glasgow Case Study",
    subject: "Education",
    course: "Postgraduate Research",
    description: "An extensive dissertation analyzing educational reforms in Scotland and their impact on global metrics.",
    previewText: "The landscape of higher education in the United Kingdom has undergone significant transformation over the last decade. This dissertation explores the specific pedagogical shifts within Glasgow's academic institutions...",
    fileUrl: "/samples/glasgow-dissertation.pdf"
  },
  {
    id: "econ-005",
    title: "Economic Impacts of Post-Brexit Trade Agreements",
    subject: "Economics",
    course: "International Relations",
    description: "Analyzing the shift in European trade dynamics following the UK's exit from the European Union.",
    previewText: "Since the formal execution of Brexit, trade patterns between the UK and the European Union have stabilized into a new norm. This paper evaluates the tariff structures and regulatory alignments that now define...",
    fileUrl: "/samples/brexit-economics.pdf"
  },
  {
    id: "eng-006",
    title: "The Future of Solar Energy in the Australian Outback",
    subject: "Engineering",
    course: "Sustainability",
    description: "Technical study on large-scale solar arrays in high-temperature arid environments.",
    previewText: "Australia's geographic advantage for solar harvesting is unparalleled. However, the extreme heat of the Outback presents unique engineering challenges for photovoltaic efficiency and storage...",
    fileUrl: "/samples/australian-solar.pdf"
  },
  {
    id: "bus-007",
    title: "Optimizing Supply Chains in South East Asian Markets",
    subject: "Business",
    course: "Global Logistics",
    description: "Case studies on logistics efficiency in Vietnam, Thailand, and Indonesia.",
    previewText: "The rapid industrialization of South East Asia has shifted the center of gravity for global manufacturing. Logistics firms must now navigate diverse maritime and land-based infrastructure challenges to maintain...",
    fileUrl: "/samples/asian-supply-chain.pdf"
  },
  {
    id: "law-008",
    title: "Comparative Analysis of European Union Legal Frameworks",
    subject: "Law",
    course: "International Law",
    description: "Exploring the nuances of judicial cooperation across EU member states.",
    previewText: "The integration of judicial systems within the European Union has reached an unprecedented level of complexity. This research paper evaluates the mechanisms of legal harmonization and the tension between national sovereignty and supranational directives...",
    fileUrl: "/samples/eu-law.pdf"
  },
  {
    id: "nurs-009",
    title: "Public Healthcare Challenges in Rural Australia",
    subject: "Nursing",
    course: "Community Health",
    description: "A clinical perspective on healthcare accessibility in the Australian Outback.",
    previewText: "In the Northern Territory and Western Australia, the vast distances between remote settlements and tertiary hospitals present significant clinical risks. Community nurses play a pivotal role in maintaining chronic disease management programs...",
    fileUrl: "/samples/australian-nursing.pdf"
  },
  {
    id: "soc-010",
    title: "Urban Sociology in Mumbai: Case Study on Socio-Spatial Dynamics",
    subject: "Sociology",
    course: "Urban Studies",
    description: "A deep dive into the housing and infrastructure challenges of Mumbai.",
    previewText: "Mumbai serves as a prime example of the complexities of South Asian urbanization. This study examines the socio-spatial segregation in the Dharavi region and the effectiveness of metropolitan redevelopment schemes...",
    fileUrl: "/samples/mumbai-urbanization.pdf"
  }
];
