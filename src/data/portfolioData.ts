import { Project, ServiceItem, ExperienceItem, EducationItem, BuildNote, SkillCategory, VibePromptBlueprint } from '../types/portfolio';

export const portfolioProfile = {
  name: "Shivam Khadde",
  role: "Software Engineer",
  tagline: "BACKEND SYSTEMS / FULL-STACK PRODUCTS / APPLIED AI",
  headlinePrefix: "I build software that feels as ",
  headlineEmphasized: "considered",
  headlineSuffix: " as it works.",
  bio: "Java backend engineering, thoughtful web experiences, and practical AI — from the first API to the final interaction.",
  location: "Pune, India",
  status: "Available for opportunities",
  currentlyExploring: [
    "Scalable Backend Systems (Spring Boot 3, Reactive Microservices)",
    "AI-Powered Products (RAG Architecture, Function Calling)",
    "Better Developer Tools & Workflow Automation"
  ],
  codeSnippet: `// Spring Boot 3 REST API Controller
@RestController
public class ApiController {
  @GetMapping("/api")
  public ResponseEntity<String> greet() {
    return ResponseEntity.ok(
      "Building useful things"
    );
  }
}`,
  aboutLong: "I'm a software developer interested in building products that work well from the interface all the way down to the backend. My work spans Java and Spring Boot, modern web applications, and applied AI. I enjoy understanding how a system fits together, making technical decisions that solve the actual problem, and improving the experience for the person using it.",
  creed: "Building a more meaningful internet, one project at a time.",
  stamp: "SAME CURIOSITY DIFFERENT PROBLEMS"
};

export const sampleProjects: Project[] = [
  {
    id: "finpilot",
    number: "01",
    tagline: "FINTECH / PRODUCT ENGINEERING",
    title: "FinPilot",
    description: "An AI-native financial workspace exploring how bill management, recurring expenses, and budget planning can become proactive and intelligent.",
    category: "Featured",
    tags: ["Next.js", "Spring Boot", "PostgreSQL", "AI/ML"],
    githubUrl: "https://github.com/shivamkhadde/finpilot",
    demoUrl: "https://finpilot-demo.example.com",
    type: "finpilot",
    stats: [
      { label: "Total Net Worth", value: "₹84,210.55" },
      { label: "Upcoming Bills", value: "3 due this week" },
      { label: "Monthly Budget", value: "₹40,000 (68% used)" },
      { label: "Prediction Accuracy", value: "94.8%" }
    ],
    highlights: [
      "Categorizes automated recurring payments via bank statement parsing",
      "Proactive cash-flow shortfall alerts before billing dates occur",
      "Multi-tenant Spring Boot REST architecture with AES-256 encrypted vaults"
    ]
  },
  {
    id: "rag-chatbot",
    number: "02",
    tagline: "APPLIED AI / RAG",
    title: "RAG Chatbot",
    description: "A retrieval-augmented generation application for fast, verifiable answers from complex enterprise PDF collections and technical documentation.",
    category: "AI & ML",
    tags: ["Python", "LangChain", "Vector DB", "OpenAI"],
    githubUrl: "https://github.com/shivamkhadde/rag-chatbot",
    demoUrl: "https://rag-demo.example.com",
    type: "rag",
    stats: [
      { label: "Document Ingestion", value: "< 1.4s per MB" },
      { label: "Retrieval Recall", value: "98.2% Top-K" },
      { label: "Hallucination Drop", value: "-64% vs Zero-shot" }
    ],
    highlights: [
      "Hybrid dense & sparse BM25 retrieval pipeline with re-ranking",
      "Explicit chunk source citations with page numbers and confidence scores",
      "Streaming token output with real-time markdown and code block rendering"
    ]
  },
  {
    id: "orvexa",
    number: "03",
    tagline: "DEVELOPER TOOLS",
    title: "Orvexa",
    description: "A coding-focused workspace and command interface exploring how developers navigate microservices, telemetry, and synthetic testing seamlessly.",
    category: "Tools",
    tags: ["React", "TypeScript", "Next.js", "AI"],
    githubUrl: "https://github.com/shivamkhadde/orvexa",
    demoUrl: "https://orvexa-editor.example.com",
    type: "orvexa",
    stats: [
      { label: "Context Switching", value: "-45% reduction" },
      { label: "Key Bindings", value: "Vim / VS Code parity" },
      { label: "Startup Latency", value: "< 240ms cold start" }
    ],
    highlights: [
      "Embedded monaco-grade syntax highlighter with multi-tab workspace",
      "Integrated terminal emulator simulating live build triggers",
      "In-situ contextual AI diff suggestions without switching windows"
    ]
  },
  {
    id: "stream-gate",
    number: "04",
    tagline: "DISTRIBUTED SYSTEMS",
    title: "StreamGate Microservice",
    description: "High-throughput API gateway with token-bucket rate limiting, distributed caching with Redis, and JWT verification filters built on Spring Cloud.",
    category: "Backend",
    tags: ["Java 21", "Spring Cloud", "Redis", "Docker"],
    githubUrl: "https://github.com/shivamkhadde/streamgate",
    type: "standard",
    highlights: [
      "Sustained 18,000 req/sec benchmark on standard cloud instances",
      "Distributed token bucket algorithm implemented over Redis Lua scripts"
    ]
  },
  {
    id: "zenith-ui",
    number: "05",
    tagline: "FRONTEND SYSTEMS",
    title: "Zenith Design System",
    description: "Accessible, zero-pill modern design component system tailored for data-dense engineering dashboards and editorial technical publications.",
    category: "Web Apps",
    tags: ["React", "Tailwind CSS", "TypeScript", "WCAG 2.1"],
    githubUrl: "https://github.com/shivamkhadde/zenith-ui",
    type: "standard",
    highlights: [
      "100% keyboard navigable with strict focus-visible styling",
      "Zero bundle-bloat, composable primitive design methodology"
    ]
  }
];

export const sampleServices: ServiceItem[] = [
  {
    id: "biz-web",
    iconName: "Monitor",
    title: "Business Websites",
    description: "Responsive websites, landing pages, portfolio sites, and high-conversion client contact flows crafted with intentional aesthetic restraint.",
    deliverables: ["Responsive Multi-Device Layouts", "SEO & OpenGraph Meta", "Fast Load Times & Core Web Vitals", "Custom CMS Integration"]
  },
  {
    id: "web-apps",
    iconName: "LayoutGrid",
    title: "Web Applications",
    description: "Intuitive dashboards, admin interfaces, robust authentication flows, and polished product features engineered with clean state management.",
    deliverables: ["Role-Based Access Control", "State Synchronization", "Data Grid & Table Views", "Frictionless Onboarding"]
  },
  {
    id: "backend-apis",
    iconName: "Database",
    title: "Backend APIs",
    description: "Java and Spring Boot APIs, transactional database integrations, caching layers, and third-party webhooks engineered for longevity.",
    deliverables: ["REST & GraphQL Endpoints", "PostgreSQL & MySQL Schema Design", "JWT / OAuth2 Auth Pipelines", "Dockerized Deployments"]
  },
  {
    id: "ai-prototypes",
    iconName: "Cpu",
    title: "AI Prototypes",
    description: "Document Q&A engines, RAG pipelines, semantic search, and LLM-powered features brought from proof-of-concept to working web interfaces.",
    deliverables: ["Retrieval-Augmented Generation", "Vector Store Chunking & Search", "Prompt Engineering & Grounding", "Streaming Token Interfaces"]
  }
];

export const sampleExperience: ExperienceItem[] = [
  {
    id: "techeqube",
    role: "Software Engineering Intern",
    organization: "TecheQube",
    period: "Jun 2024 – Aug 2024",
    points: [
      "Engineered backend microservices and REST endpoints using Java and Spring Boot for high-traffic client platforms.",
      "Contributed to database optimization and schema indexing on PostgreSQL, improving query response by 32%.",
      "Collaborated closely with cross-functional product and frontend teams on full-stack feature releases."
    ]
  },
  {
    id: "bachelor",
    role: "Bachelor of Engineering",
    organization: "Computer Science & Engineering",
    period: "2021 – 2025",
    points: [
      "Rigorous coursework in Data Structures, Algorithms, Database Management Systems (DBMS), Operating Systems, Computer Networks, and AI/ML.",
      "Graduated with top academic standing and active participation in engineering hackathons."
    ]
  },
  {
    id: "continuous",
    role: "Continuous Learning & Research",
    organization: "Independent Engineering",
    period: "2025 – Present",
    points: [
      "Deep exploration of Generative AI systems, RAG architecture, vector search spaces, and reactive microservices.",
      "Building and shipping open-source developer tooling and contributing to technical developer publications."
    ]
  }
];

export const sampleSkills: SkillCategory[] = [
  {
    category: "Backend",
    skills: [
      { name: "Java", highlight: true, proficiency: "Core Language" },
      { name: "Spring Boot", highlight: true, proficiency: "Microservices & REST" },
      { name: "REST APIs", highlight: true, proficiency: "Architecture & Design" },
      { name: "PostgreSQL", highlight: false, proficiency: "Relational DB" },
      { name: "MySQL", highlight: false, proficiency: "Relational DB" },
      { name: "Docker", highlight: false, proficiency: "Containerization" }
    ]
  },
  {
    category: "Frontend",
    skills: [
      { name: "React", highlight: true, proficiency: "UI Architecture" },
      { name: "Next.js", highlight: true, proficiency: "Full-Stack Web" },
      { name: "TypeScript", highlight: true, proficiency: "Strict Type Safety" },
      { name: "Tailwind CSS", highlight: false, proficiency: "Modern Styling" }
    ]
  },
  {
    category: "AI / ML",
    skills: [
      { name: "Python", highlight: true, proficiency: "Scripting & AI" },
      { name: "LangChain", highlight: false, proficiency: "Agent Orchestration" },
      { name: "RAG", highlight: true, proficiency: "Hybrid Retrieval" },
      { name: "OpenAI / Gemini", highlight: true, proficiency: "Model Integration" },
      { name: "Vector DB", highlight: false, proficiency: "Pinecone / Chroma" }
    ]
  },
  {
    category: "Tools & Others",
    skills: [
      { name: "Git", highlight: false, proficiency: "Version Control" },
      { name: "Linux", highlight: false, proficiency: "Server Environments" },
      { name: "Postman", highlight: false, proficiency: "API Testing" },
      { name: "VS Code", highlight: false, proficiency: "IDE" },
      { name: "Figma", highlight: false, proficiency: "UI Specification" }
    ]
  }
];

export const sampleBuildNotes: BuildNote[] = [
  {
    id: "spring-boot-api",
    title: "Designing a Spring Boot API",
    subtitle: "Key decisions for a maintainable, high-concurrency API structure.",
    readTime: "5 min",
    date: "Aug 2024",
    summary: "Reflections on structuring controller-service-repository patterns, global exception handlers, and avoiding leaky DTO abstractions.",
    tags: ["Java", "Spring Boot", "API Design", "Architecture"],
    content: [
      "When building production REST APIs in Spring Boot, the temptation is often to jump straight into CRUD controllers. However, the architectural decisions made in the first 48 hours dictate maintainability for years.",
      "1. Decouple Entities from DTOs: Never expose JPA entities directly to the API boundary. DTOs act as strict contracts that shield your database schema from external consumers and prevent unintended over-fetching.",
      "2. Centralized Exception Handling with @ControllerAdvice: Rather than try-catch blocks cluttering business services, use a standardized ProblemDetail structure with consistent RFC 7807 error codes.",
      "3. Connection Pool Sizing: Using HikariCP effectively requires matching pool sizes with available database worker threads, avoiding thread starvation under peak loads."
    ]
  },
  {
    id: "rag-application",
    title: "Building a RAG Application",
    subtitle: "From raw technical documents to useful, verifiable answers.",
    readTime: "6 min",
    date: "Sep 2024",
    summary: "How to eliminate hallucinations in document question answering through semantic chunking, metadata filtering, and re-ranking.",
    tags: ["Python", "LangChain", "Vector Search", "LLMs"],
    content: [
      "Naive RAG often falls flat when documents contain complex tables, technical specifications, or cross-referenced clauses.",
      "1. Chunking Strategy Matters Most: Fixed-character sliding windows chop important sentences in half. We shifted to semantic header-aware chunking, ensuring each passage retains its parent context.",
      "2. Hybrid Search (Dense + BM25): Dense vector embeddings capture semantic meaning, but miss exact part numbers or acronyms. Combining dense retrieval with lexical BM25 scores yields optimal precision.",
      "3. Grounding & Inline Citations: Prompting the model to cite exact chunk IDs before articulating conclusions drastically reduces hallucination rates."
    ]
  },
  {
    id: "finpilot-lessons",
    title: "Lessons from Building FinPilot",
    subtitle: "Product decisions and technical trade-offs in an AI-native financial workspace.",
    readTime: "4 min",
    date: "Oct 2024",
    summary: "Balancing reactive frontend interfaces with transactional backend security and machine learning inference latency.",
    tags: ["Product Engineering", "FinTech", "Next.js", "UX"],
    content: [
      "FinPilot began as a simple bill reminder app and evolved into an intelligent cash-flow workspace.",
      "1. Latency is the Enemy of Trust: Users will not wait 4 seconds for an LLM to tell them when their electricity bill is due. We offloaded predictive classification to asynchronous worker queues, updating the UI via optimistic state.",
      "2. Security as a Core Feature: Bank statement data requires end-to-end client tokenization and ephemeral storage pipelines. Zero unencrypted financial data touches persistent logs.",
      "3. The Vibe of Financial Tools: Most financial software feels either clinical or gamified. By adopting warm, editorial earth tones and clean typographic tables, we created a calming experience for users managing money."
    ]
  }
];

// The comprehensive blueprint that answers the user's prompt in exhaustive detail
export const masterVibePromptBlueprint: VibePromptBlueprint = {
  overallTheme: "Considered Software Craftsmanship & Organic Modernism (Warm Editorial + High-Tech Precision)",
  colorPalette: [
    { name: "Alabaster Oat Canvas", hex: "#F8F6F0", role: "Primary background canvas (60% budget)", percentage: "60%" },
    { name: "Deep Forest Pine", hex: "#1E382B", role: "Primary brand accent, main buttons & active states", percentage: "10%" },
    { name: "Paper Card Surface", hex: "#EFECE6", role: "Secondary card surfaces and subtle borders", percentage: "15%" },
    { name: "Warm Charcoal Slate", hex: "#1E2522", role: "High-contrast primary typography", percentage: "10%" },
    { name: "Terracotta & Moss", hex: "#D97746 / #3A6351", role: "Micro-accents, code highlights & status markers", percentage: "5%" }
  ],
  layoutStructure: [
    "Full-width desktop canvas (1440px baseline) with an architectural two-axis structure.",
    "Persistent Left Aesthetic Rail (width ~72px to 96px) featuring live audio waveform synthesizer, volume control, track info ('Chasing Better Days'), and scroll-spy section jump indicators (01 to 08).",
    "Fluid Top Navigation conforming strictly to the Top Bar Contract (Wordmark + 5 text links + Opportunity Status + Primary CTA).",
    "Hero split viewport with left typographic hierarchy, interactive Spring Boot code card, floating 'Currently exploring' cards, and natural light mountain photography.",
    "Bento grid for Selected Work (3 featured product cards with interactive live previews, category filter pills, and technology tags).",
    "Two-column split for About section (editorial manifesto on left, framed portrait polaroid on right).",
    "Side-by-side Experience Timeline and Skills Matrix.",
    "Horizontal 3-card Build Notes publishing rack with reading modals.",
    "Full-bleed twilight horizon footer with dual action cards (Career vs Freelance) and floating glass dock."
  ],
  navigationStyle: [
    "Multi-tier synchronized navigation: top header, persistent left scroll-spy rail, floating bottom quick dock, and keyboard shortcut ⌘K Command Palette.",
    "Clean unboxed single-line typography for primary navigation links with hover micro-underlines.",
    "Floating bottom glass dock with direct links to GitHub, LinkedIn, Résumé preview, Email, and ⌘K Command Palette.",
    "Smooth scroll anchor behavior coupled with URL hash synchronization."
  ],
  typographyPreferences: [
    {
      role: "Display & Emotional Emphasis",
      fontFamily: "'Instrument Serif' / 'Playfair Display' italic",
      usage: "Key emotive words in headlines (e.g. 'considered'), section titles, and pull quotes.",
      weights: "400 Italic & Regular"
    },
    {
      role: "Interface & Primary Body",
      fontFamily: "'Plus Jakarta Sans'",
      usage: "Headlines, navigation links, descriptive prose, button labels, and card content.",
      weights: "400 Regular, 500 Medium, 600 SemiBold"
    },
    {
      role: "Code, Numbers & Telemetry",
      fontFamily: "'JetBrains Mono'",
      usage: "Spring Boot code blocks, terminal tabs, metrics (tabular-nums), and section numbers.",
      weights: "400 Regular, 500 Medium"
    }
  ],
  keySections: [
    {
      sectionNumber: "01",
      title: "Hero & Engineering Manifest",
      purpose: "Deliver immediate clarity on technical identity, aesthetic taste, and engineering breadth.",
      keyElements: [
        "Tagline: BACKEND SYSTEMS / FULL-STACK PRODUCTS / APPLIED AI",
        "Headline: 'I build software that feels as considered as it works.'",
        "Action buttons: 'Explore my work →' and 'Discuss a project'",
        "Live interactive Spring Boot code snippet with copy affordance",
        "'Currently exploring' sticky note with interactive status items",
        "Golden-hour mountain hiker photograph with 'SAME CURIOSITY DIFFERENT PROBLEMS' badge",
        "Location tag: Pune, India"
      ]
    },
    {
      sectionNumber: "02",
      title: "Selected Work (Interactive Bento Showcase)",
      purpose: "Provide tactile proof of engineering excellence across Fintech, Applied AI, and Developer Tools.",
      keyElements: [
        "Category filter tabs: Featured, All Projects, Web Apps, AI & ML, Backend, Tools",
        "FinPilot card: Financial workspace with interactive dashboard mockup and metrics",
        "RAG Chatbot card: Interactive Q&A simulation with source citations",
        "Orvexa card: Developer tool with interactive Editor, Terminal, and AI tabs",
        "Clean unboxed tech stack metadata (Next.js · Spring Boot · PostgreSQL · AI/ML)"
      ]
    },
    {
      sectionNumber: "03",
      title: "About & Engineering Philosophy",
      purpose: "Articulate the philosophy of combining rigorous backend infrastructure with thoughtful design.",
      keyElements: [
        "Headline: 'Software, products and ideas that make a real difference.'",
        "Prose explaining full-stack breadth from API design to user empathy",
        "Mountain sunrise profile polaroid card with circular badge",
        "Action bar: Download Résumé, GitHub, LinkedIn, Email"
      ]
    },
    {
      sectionNumber: "04 & 05",
      title: "Experience, Education & Skills Matrix",
      purpose: "Provide verified technical credentials and categorize full-stack competencies.",
      keyElements: [
        "Timeline of Software Engineering Intern role at TecheQube, B.E. in Computer Science, and Continuous Learning",
        "Categorized skill matrices for Backend (Java, Spring Boot), Frontend (React, Next.js), AI/ML (Python, RAG), and Tools (Docker, Git)"
      ]
    },
    {
      sectionNumber: "06",
      title: "Services & Capabilities ('What I Can Help You Build')",
      purpose: "Convert visitors into clients or collaborators with concrete service offerings.",
      keyElements: [
        "Business Websites, Web Applications, Backend APIs, AI Prototypes",
        "Inquiry card: 'Have a different idea? Let's build something useful together.'",
        "Interactive Project Inquiry form modal"
      ]
    },
    {
      sectionNumber: "07",
      title: "Build Notes & Technical Essays",
      purpose: "Demonstrate architectural depth and thought leadership through technical writing.",
      keyElements: [
        "Articles on Spring Boot API design, RAG implementations, and FinPilot product trade-offs",
        "Interactive modal reader with full articles, reading times, and takeaways"
      ]
    },
    {
      sectionNumber: "08",
      title: "Contact & Horizon Footer",
      purpose: "Atmospheric, warm closure offering direct avenues for career roles and freelance projects.",
      keyElements: [
        "Twilight mountain panorama backdrop",
        "Two prominent cards: 'Career opportunities' and 'Freelance projects' with instant email triggers",
        "Bottom dock with GitHub, LinkedIn, Résumé modal, Email, and ⌘K Command Palette"
      ]
    }
  ],
  specificVisualElements: [
    "Generative Web Audio API ambient lofi synthesizer with live equalizer waveform bars ('Chasing Better Days - Lofi Study').",
    "Interactive Spring Boot 3 code card with syntax styling and live execution simulation.",
    "Interactive Orvexa workspace with switchable tabs: Editor, Terminal, and AI Assistant.",
    "Interactive RAG question simulation displaying real-time retrieval chunks and source confidence.",
    "Framed analog/polaroid photographic cards with subtle warm borders and natural mountain scenery.",
    "Rotated editorial stamps: 'SAME CURIOSITY DIFFERENT PROBLEMS' and 'BUILDING A MORE MEANINGFUL INTERNET'.",
    "Floating glassmorphic bottom dock with ⌘K Command Menu trigger.",
    "Atmospheric twilight alpine landscape scrim in the contact section."
  ],
  targetAudience: [
    "Engineering Hiring Managers & Tech Leads looking for senior-minded full-stack and backend engineers.",
    "Tech Founders seeking proactive engineers who understand both system architecture and user experience.",
    "Design Engineers & Product Designers who value high-craft typographic polish and tactile interaction.",
    "Enterprise Clients & Early-Stage Startups needing robust Spring Boot backends and modern AI/RAG prototypes."
  ],
  vibeCodingGuidelines: [
    "Enforce the 60-30-10 color rule: 60% warm alabaster canvas, 30% soft oat paper surfaces, 10% forest pine accents.",
    "Practice strict Zero-Pill Discipline: static metadata must be clean unboxed text separated by '·' or '/', reserving pill buttons strictly for interactive filter tabs.",
    "Maintain the Top Bar Contract: Brand mark on left, 4-5 text links in center, single primary action on right.",
    "Every interactive element must have a functional handler (no dead clicks, no placeholder stubs).",
    "Use Instrument Serif italic for evocative emphasis paired with Plus Jakarta Sans for structural clarity."
  ]
};
