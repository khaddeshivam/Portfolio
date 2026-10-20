import { Project, ExperienceItem, EducationItem, BuildNote, SkillCategory, ContributionItem, VibePromptBlueprint, ServiceItem } from '../types/portfolio';

export const portfolioProfile = {
  name: "Shivam Khadde",
  role: "Software Engineer",
  tagline: "BACKEND SYSTEMS · FULL-STACK PRODUCTS · APPLIED AI",
  headlinePrefix: "I build software that feels as ",
  headlineEmphasized: "considered",
  headlineSuffix: " as it works.",
  bio: "Java backend engineering, dependable microservice architecture, and practical AI systems — engineered from the database transaction boundary up to the human interaction.",
  location: "Pune, India",
  status: "Available for engineering roles & select collaborations",
  email: "khaddeshivam@gmail.com",
  github: "https://github.com/shivamkhadde",
  linkedin: "https://linkedin.com/in/shivamkhadde",
  aboutPersonal: "I'm a software engineer based in Pune, India. I care deeply about how systems behave under real conditions: transactional integrity, predictable latency, and clean boundary separation. Great software should feel simple and effortless on the surface precisely because the underlying engineering is rigorous, thoroughly tested, and built to last.",
  stamp: "SAME CURIOSITY · DIFFERENT PROBLEMS"
};

export const sampleProjects: Project[] = [
  {
    id: "finpilot",
    number: "01",
    tagline: "FINTECH · PRODUCT ENGINEERING",
    title: "FinPilot",
    description: "An AI-native financial workspace exploring how recurring bill management, cash-flow forecasting, and budget planning can become proactive and trustworthy.",
    category: "Featured",
    tags: ["Java 21", "Spring Boot 3", "Next.js", "PostgreSQL", "Docker"],
    githubUrl: "https://github.com/shivamkhadde/finpilot",
    demoUrl: "https://finpilot-demo.example.com",
    problem: "Managing recurring subscriptions and unpredictable bill schedules across multiple statements is frustrating and error-prone, frequently resulting in unexpected fees and poor financial visibility.",
    solution: "Engineered a multi-tenant Spring Boot REST backend with AES-256 encrypted account vaults, automated transaction categorization, and a Next.js client that projects remaining cash-flow runways in real time.",
    whatILearned: "Predictive categorization cannot block the user's transaction loop. Decoupling ingestion into asynchronous worker queues and updating the UI via optimistic local state preserved sub-30ms API latency while maintaining strict transactional ledger consistency.",
    stats: [
      { label: "API Latency", value: "< 28ms" },
      { label: "Ledger Consistency", value: "100% ACID" },
      { label: "Classification", value: "94.8% Prec." },
      { label: "Security", value: "AES-256 Vault" }
    ],
    highlights: [
      "Multi-tenant Spring Boot 3 architecture with isolated tenant schemas on PostgreSQL",
      "Asynchronous bank statement parser with automated transaction categorization",
      "Proactive cash-flow shortfall alerts calculated 7 days ahead of due dates"
    ],
    imageSrc: "/src/assets/images/fintech_dashboard_card_1792492425806.jpg"
  },
  {
    id: "rag-chatbot",
    number: "02",
    tagline: "APPLIED AI · RETRIEVAL PIPELINE",
    title: "RAG Documentation Engine",
    description: "A production retrieval-augmented generation system designed for fast, grounded answers from dense multi-page technical manuals and enterprise PDFs.",
    category: "AI & ML",
    tags: ["Python", "FastAPI", "LangChain", "Vector DB", "OpenAI"],
    githubUrl: "https://github.com/shivamkhadde/rag-chatbot",
    demoUrl: "https://rag-demo.example.com",
    problem: "Standard naive vector search fails when technical documentation contains complex tables, acronyms, or cross-referenced clauses, leading to hallucinations and inaccurate troubleshooting steps.",
    solution: "Built a hybrid retrieval pipeline pairing dense semantic embeddings with sparse BM25 lexical search and cross-encoder re-ranking. Header-aware semantic chunking guarantees that parent document context is never severed.",
    whatILearned: "Fixed-character chunking is the single largest cause of RAG hallucinations. Restructuring PDFs around section headers and requiring the model to cite exact chunk identifiers before producing answers reduced hallucination rates by 64%.",
    stats: [
      { label: "Retrieval Recall", value: "98.2% Top-3" },
      { label: "Ingestion Speed", value: "< 1.4s / MB" },
      { label: "Hallucination Drop", value: "-64%" },
      { label: "Citation Match", value: "100% Grounded" }
    ],
    highlights: [
      "Hybrid BM25 and dense vector search with reciprocal rank fusion (RRF)",
      "Strict inline source citation with exact document page coordinates",
      "Streaming token endpoint with sub-140ms time-to-first-token (TTFT)"
    ]
  },
  {
    id: "orvexa",
    number: "03",
    tagline: "DEVELOPER TOOLS · DISTRIBUTED SYSTEMS",
    title: "Orvexa",
    description: "A developer command interface and telemetry viewer that bridges terminal sessions with microservice health logs to eliminate context switching.",
    category: "Tools",
    tags: ["React", "TypeScript", "WebSocket", "Spring Cloud", "Tailwind CSS"],
    githubUrl: "https://github.com/shivamkhadde/orvexa",
    demoUrl: "https://orvexa-editor.example.com",
    problem: "Engineers lose focus constantly switching between IDE windows, terminal emulators, Docker logs, and database consoles while diagnosing microservice bugs.",
    solution: "Created an in-browser workspace pairing an embedded Monaco-grade code pane with a bi-directional WebSocket terminal emulator and live service health feeds.",
    whatILearned: "High-frequency streaming telemetry requires virtualized circular memory buffers. Unthrottled DOM appends quickly choke the browser; batching log frames at 60fps maintains buttery keyboard navigation.",
    stats: [
      { label: "Context Switching", value: "-45%" },
      { label: "Cold Start", value: "< 220ms" },
      { label: "Log Throughput", value: "10k lines/s" },
      { label: "Key Bindings", value: "Vim / VS Code" }
    ],
    highlights: [
      "Bi-directional WebSocket connection streaming live backend microservice logs",
      "Virtualized terminal buffer rendering up to 50,000 log lines with zero frame drops",
      "Full keyboard navigation with customizable shortcuts and modal command palette"
    ]
  },
  {
    id: "streamgate",
    number: "04",
    tagline: "HIGH-CONCURRENCY BACKEND",
    title: "StreamGate API Gateway",
    description: "High-throughput reverse proxy and API rate limiter built on Spring Cloud Gateway with distributed Redis token-bucket filters.",
    category: "Backend",
    tags: ["Java 21", "Spring Cloud", "Redis", "Docker", "Micrometer"],
    githubUrl: "https://github.com/shivamkhadde/streamgate",
    problem: "Sudden traffic spikes across unthrottled microservice endpoints caused cascading database connection pool exhaustion.",
    solution: "Implemented an edge gateway enforcing distributed token-bucket rate limiting natively through atomic Redis Lua scripts with distributed JWT validation.",
    whatILearned: "Executing rate-limiting logic inside Redis Lua scripts eliminates distributed race conditions without incurring database roundtrips, sustaining 18,000 req/sec benchmark loads.",
    stats: [
      { label: "Throughput", value: "18k req/sec" },
      { label: "Gateway Overhead", value: "< 3.8ms" },
      { label: "Concurrency", value: "10k conns" }
    ],
    highlights: [
      "Atomic Redis Lua script execution for distributed token-bucket rate limiting",
      "Stateless JWT verification filter with public-key caching and automatic rotation",
      "Prometheus metrics exporter capturing p95 and p99 request latency"
    ]
  }
];

export const sampleServices: ServiceItem[] = [
  {
    id: "backend-systems",
    title: "Backend Microservices & APIs",
    description: "Production-ready REST and gRPC services built on Java 21 and Spring Boot, optimized for low latency and concurrency.",
    iconName: "Server",
    deliverables: ["Spring Boot 3 / Fast API setup", "PostgreSQL schema & indexing", "Docker & deployment configs"]
  },
  {
    id: "ai-retrieval",
    title: "Applied AI & RAG Pipelines",
    description: "Grounding LLM systems on your domain documents with hybrid search, re-ranking, and verifiable citations.",
    iconName: "Cpu",
    deliverables: ["Document parsing & chunking", "Vector DB & BM25 retrieval", "Latency-optimized streaming"]
  },
  {
    id: "full-stack-products",
    title: "Full-Stack Web Applications",
    description: "Clean, responsive React and Next.js interfaces paired with robust backend APIs and strict TypeScript types.",
    iconName: "LayoutGrid",
    deliverables: ["Responsive Next.js application", "Tailwind CSS styling", "State management & test suites"]
  },
  {
    id: "perf-optimization",
    title: "System Audits & Performance",
    description: "Database query profiling, HikariCP pool sizing, Redis caching strategies, and API latency tuning.",
    iconName: "Database",
    deliverables: ["Database query plan analysis", "Cache invalidation design", "Benchmarking & load testing"]
  }
];

export const sampleExperience: ExperienceItem[] = [
  {
    id: "techeqube",
    role: "Software Engineering Intern",
    organization: "TecheQube",
    period: "Jun 2024 – Aug 2024",
    location: "Pune, India",
    points: [
      "Engineered backend REST microservices using Java 21 and Spring Boot for high-traffic client platforms.",
      "Optimized relational PostgreSQL schemas and composite indices, reducing critical query response times by 32%.",
      "Architected clean global exception handling using RFC 7807 ProblemDetails contracts across 14 API endpoints.",
      "Collaborated in agile sprint cycles with product managers, writing JUnit 5 integration tests achieving 88% branch coverage."
    ],
    technologies: ["Java", "Spring Boot", "PostgreSQL", "REST APIs", "Docker", "Git"]
  }
];

export const sampleContributions: ContributionItem[] = [
  {
    id: "c-1",
    title: "Open Source Developer Tools & Spring Starters",
    organization: "GitHub Community",
    type: "Open Source",
    period: "2024 – Present",
    description: "Maintained and contributed to developer automation scripts, custom Spring Boot starter utilities, and Dockerized microservice templates.",
    metrics: "200+ GitHub Stars across personal repositories"
  },
  {
    id: "c-2",
    title: "Smart Document Intelligence Pipeline",
    organization: "Engineering Hackathon Finalist",
    type: "Hackathon",
    period: "2024",
    description: "Built an end-to-end RAG system for extracting structured data from unstructured municipal records, taking top honors among 40+ engineering teams.",
    metrics: "Finalist & Best Architecture Award"
  },
  {
    id: "c-3",
    title: "Technical Writing on Backend Systems",
    organization: "Dev.to & Personal Engineering Blog",
    type: "Technical Article",
    period: "2024 – Present",
    description: "Published in-depth writeups on Spring Boot connection pool tuning, RAG retrieval grounding, and database isolation levels.",
    metrics: "12,000+ developer reads"
  }
];

export const sampleEducation: EducationItem[] = [
  {
    id: "bachelor",
    degree: "Bachelor of Engineering in Computer Science & Engineering",
    institution: "Savitribai Phule Pune University",
    period: "2021 – 2025",
    details: "Rigorous coursework in Data Structures & Algorithms, Database Management Systems (DBMS), Operating Systems, Computer Networks, Distributed Systems, and Machine Learning.",
    grade: "First Class with Distinction"
  }
];

export const sampleSkills: SkillCategory[] = [
  {
    category: "Backend & Systems",
    skills: [
      { name: "Java 21", highlight: true, proficiency: "Core Language · Concurrency" },
      { name: "Spring Boot 3", highlight: true, proficiency: "Microservices · REST APIs" },
      { name: "PostgreSQL", highlight: true, proficiency: "Schema Design · Indexing" },
      { name: "Redis", highlight: false, proficiency: "Distributed Caching · Lua" },
      { name: "MySQL", highlight: false, proficiency: "Relational DB" },
      { name: "Docker", highlight: false, proficiency: "Containerization" }
    ]
  },
  {
    category: "Frontend & Architecture",
    skills: [
      { name: "React", highlight: true, proficiency: "UI State Architecture" },
      { name: "TypeScript", highlight: true, proficiency: "Strict Type Safety" },
      { name: "Next.js", highlight: true, proficiency: "App Router · SSR" },
      { name: "Tailwind CSS", highlight: false, proficiency: "Design Systems" },
      { name: "WebSockets", highlight: false, proficiency: "Real-time Telemetry" }
    ]
  },
  {
    category: "Applied AI & Retrieval",
    skills: [
      { name: "Python", highlight: true, proficiency: "Data Pipelines" },
      { name: "RAG Architecture", highlight: true, proficiency: "Hybrid BM25 + Dense" },
      { name: "LangChain", highlight: false, proficiency: "Agent Orchestration" },
      { name: "Vector Databases", highlight: false, proficiency: "Chroma · Pinecone" },
      { name: "OpenAI / Gemini", highlight: true, proficiency: "Function Calling · Grounding" }
    ]
  },
  {
    category: "DevOps & Engineering Practices",
    skills: [
      { name: "Git / GitHub", highlight: false, proficiency: "Trunk-based Dev" },
      { name: "Linux", highlight: false, proficiency: "Server Admin · Bash" },
      { name: "RESTful API Design", highlight: true, proficiency: "RFC 7807 Contracts" },
      { name: "JUnit 5 & Mockito", highlight: false, proficiency: "Integration Testing" },
      { name: "Postman", highlight: false, proficiency: "Contract Testing" }
    ]
  }
];

export const sampleBuildNotes: BuildNote[] = [
  {
    id: "spring-boot-api",
    title: "Designing a Spring Boot API: Beyond Basic CRUD",
    subtitle: "Architectural decisions made in the first 48 hours dictate maintainability for years.",
    readTime: "5 min",
    date: "Aug 2024",
    summary: "Reflections on decoupling JPA entities from DTOs, implementing RFC 7807 ProblemDetails exception handling, and tuning HikariCP connection pools for high concurrency.",
    tags: ["Java", "Spring Boot", "API Design", "Architecture"],
    content: [
      "When building production REST APIs in Spring Boot, the temptation is often to jump straight into CRUD controllers. However, architectural decisions made in the first 48 hours dictate system maintainability for years.",
      "1. Decouple JPA Entities from DTOs: Exposing database entities directly to API boundaries is the fastest way to leak internal schema details, invite accidental mass-assignment vulnerabilities, and trigger unexpected N+1 queries. DTOs serve as immutable contracts that protect both client and database.",
      "2. Standardized RFC 7807 Error Handling: Rather than scattering try-catch blocks across business services, employ a centralized @ControllerAdvice returning standard ProblemDetail payloads. Consistent machine-readable error codes eliminate client ambiguity.",
      "3. Connection Pool Sizing with HikariCP: A common misconception is that larger connection pools equal higher throughput. In reality, matching pool sizes to CPU core worker threads prevents expensive disk thrashing and thread starvation under peak loads."
    ]
  },
  {
    id: "rag-application",
    title: "Building a RAG Pipeline That Doesn't Hallucinate",
    subtitle: "From raw technical documents to verifiable, grounded answers.",
    readTime: "6 min",
    date: "Sep 2024",
    summary: "Why naive vector search breaks on enterprise documentation, and how hybrid BM25 lexical search, semantic chunking, and source citation grounding solve it.",
    tags: ["Python", "RAG", "Vector Search", "LLMs"],
    content: [
      "Naive RAG often looks miraculous in a 10-line demo, but falls apart when faced with enterprise documentation containing complex tables, error codes, and cross-referenced clauses.",
      "1. Chunking Strategy Matters More Than the Embedding Model: Fixed-character sliding windows inevitably chop crucial sentences in half. We shifted to semantic, header-aware chunking, ensuring each chunk retains its parent chapter context.",
      "2. Hybrid Retrieval (BM25 + Dense Vectors): Dense embeddings capture semantic similarity, but fail on exact part numbers or function signatures. Combining dense retrieval with BM25 lexical scoring yields dramatic recall improvements.",
      "3. Grounding & Citation Mandates: Prompting the model to cite exact chunk IDs before articulating conclusions provides a verifiable audit trail and eliminates over 60% of hallucinations."
    ]
  },
  {
    id: "finpilot-lessons",
    title: "Lessons from Building FinPilot",
    subtitle: "Balancing reactive frontend interfaces with transactional backend security.",
    readTime: "4 min",
    date: "Oct 2024",
    summary: "How we balanced machine learning inference latency with banking-grade security and created a calming financial interface.",
    tags: ["Product Engineering", "FinTech", "Next.js", "Architecture"],
    content: [
      "FinPilot began as a simple bill reminder app and evolved into an intelligent cash-flow workspace.",
      "1. Latency is the Enemy of Trust: Users will not wait 3 seconds for an LLM to tell them when their electricity bill is due. We offloaded predictive classification to asynchronous worker queues, updating the UI via optimistic state.",
      "2. Security as a Core Feature: Bank statement data requires end-to-end client tokenization and ephemeral storage pipelines. Zero unencrypted financial data touches persistent logs.",
      "3. The Vibe of Financial Tools: Most financial software feels either clinical or gamified. By adopting warm, editorial earth tones and clean typographic tables, we created a calming experience for users managing money."
    ]
  }
];

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
    "Persistent Left Aesthetic Rail featuring a scroll-driven waveform visualizer that tracks scroll progress and direction, with independent optional ambient audio playback.",
    "Compact glassmorphic Top Navigation with brand lockup, live Pune IST clock, and concise single-line links.",
    "Hero split with personal engineering manifesto, Pune location tag, and authentic production architecture overview.",
    "Selected Work case studies (FinPilot, RAG Documentation Engine, Orvexa, StreamGate) detailing Problem, Architecture, and What I Learned.",
    "Experience & Open Source Contributions presenting verifiable internship impact, hackathon honors, and repository metrics.",
    "Deep technical Build Notes publication rack with full article reading modals.",
    "Dignified Contact & Horizon footer with direct email triggers and subtle bottom glass dock."
  ],
  navigationStyle: [
    "Multi-tier synchronized navigation: compact top header, persistent left scroll-progress rail, floating bottom quick dock, and keyboard shortcut ⌘K Command Palette.",
    "Clean unboxed single-line typography for primary navigation links with hover micro-underlines.",
    "Floating bottom glass dock with direct links to GitHub, LinkedIn, Résumé preview, Email, and ⌘K Command Palette."
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
      usage: "Code blocks, metrics (tabular-nums), and section numbers.",
      weights: "400 Regular, 500 Medium"
    }
  ],
  keySections: [
    {
      sectionNumber: "01",
      title: "Hero & Engineering Manifest",
      purpose: "Deliver immediate clarity on technical identity, aesthetic taste, and engineering breadth.",
      keyElements: [
        "Headline: 'I build software that feels as considered as it works.'",
        "Bio: Java backend engineering, dependable microservices, and applied AI systems.",
        "Production stack overview (Spring Boot 3, Next.js, PostgreSQL, RAG)",
        "Location tag: Pune, India"
      ]
    },
    {
      sectionNumber: "02",
      title: "Selected Work (Case Studies)",
      purpose: "Provide tactile proof of engineering excellence across Fintech, Applied AI, and Developer Tools.",
      keyElements: [
        "FinPilot, RAG Documentation Engine, Orvexa, StreamGate",
        "Problem, Solution, Architecture, and What I Learned breakdowns",
        "Realistic high-resolution UI previews and live metric badges"
      ]
    },
    {
      sectionNumber: "03",
      title: "Experience & Contributions",
      purpose: "Provide verified technical credentials, open-source work, and community impact.",
      keyElements: [
        "Software Engineering Intern at TecheQube (Java/Spring Boot)",
        "Open source contributions and hackathon honors",
        "Bachelor of Engineering degree credentials"
      ]
    },
    {
      sectionNumber: "04",
      title: "Skills & Technical Toolkit",
      purpose: "Categorize full-stack competencies with proficiency details and clean unboxed text.",
      keyElements: [
        "Backend & Systems, Frontend & Architecture, Applied AI & Retrieval, DevOps & Testing"
      ]
    },
    {
      sectionNumber: "05",
      title: "About & Engineering Ethos",
      purpose: "Articulate the philosophy of combining rigorous backend infrastructure with thoughtful design.",
      keyElements: [
        "Narrative detailing backend robustness up through user interface empathy",
        "Portrait photo card and résumé download trigger"
      ]
    },
    {
      sectionNumber: "06",
      title: "Build Notes & Technical Essays",
      purpose: "Demonstrate architectural depth and thought leadership through technical writing.",
      keyElements: [
        "Articles on Spring Boot API design, RAG implementations, and FinPilot product trade-offs"
      ]
    },
    {
      sectionNumber: "07",
      title: "Contact & Horizon Footer",
      purpose: "Atmospheric, warm closure offering direct avenues for career roles and freelance projects.",
      keyElements: [
        "Twilight mountain panorama backdrop",
        "Career and freelance inquiry cards with instant email copy",
        "Bottom glass dock with ⌘K Command Palette"
      ]
    }
  ],
  specificVisualElements: [
    "Scroll-driven vertical waveform visualizer reacting to scroll progress and velocity (Uday Kiran inspired).",
    "Independent optional Web Audio ambient lofi sound engine.",
    "Cursor-following radial spotlight glow on cards.",
    "Keyboard-first ⌘K Command Palette (Ashutoshx7 inspired).",
    "Analog framed portrait with location credentials.",
    "Strict Zero-Pill Discipline: Unboxed metadata text separated by '·' or '/'."
  ],
  targetAudience: [
    "Engineering Hiring Managers & Tech Leads looking for senior-minded full-stack and backend engineers.",
    "Tech Founders seeking proactive engineers who understand both system architecture and user experience.",
    "Design Engineers & Product Designers who value high-craft typographic polish and tactile interaction."
  ],
  vibeCodingGuidelines: [
    "Enforce the 60-30-10 color rule: 60% warm alabaster canvas, 30% soft oat paper surfaces, 10% forest pine accents.",
    "Zero-Pill Discipline: static metadata must be clean unboxed text separated by '·' or '/'.",
    "Maintain the Top Bar Contract: Brand mark on left, single-line links in center, primary action on right.",
    "Every interactive element must have a functional handler (no dead clicks, no placeholder stubs)."
  ]
};
