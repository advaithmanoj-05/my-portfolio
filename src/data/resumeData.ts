export interface Experience {
  id: string;
  company: string;
  role: string;
  timeline: string;
  location: string;
  badge: string;
  highlights: string[];
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string; // e.g. "featured ai-cloud python", "featured fullstack", etc.
  badge: string;
  description: string;
  tech: string[];
  githubUrl: string;
  highlightText: string;
}

export interface LeadershipRole {
  id: string;
  title: string;
  organization: string;
  unit: string;
  highlights: string[];
}

export interface Achievement {
  id: string;
  title: string;
  badge: string;
  badgeType: 'winner' | 'national';
  description: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  detail: string;
}

export const RESUME_DATA = {
  personal: {
    name: "ADVAITH MANOJ",
    shortName: "AM4",
    title: "Software Development Engineer",
    subtitle: "Full-Stack & Systems Architecture",
    location: "Trivandrum, Kerala",
    email: "advaithmanojkumar@gmail.com",
    phone: "+91 8281352990",
    github: "https://github.com/advaithmanoj-05",
    githubHandle: "advaithmanoj-05",
    linkedin: "https://www.linkedin.com/in/advaith-manoj-023b12291",
    leetcode: "https://leetcode.com/u/advaithmanoj-05/",
    leetcodeHandle: "advaithmanoj-05",
    statusText: "STATUS::AVAILABLE",
    availability: "P1 :: OPEN TO ROLES",
    bio: "Computer Science major with hands-on experience designing and shipping backend systems and full-stack applications across Python (FastAPI, Flask), Java (Spring Boot), and JavaScript/TypeScript (React, Next.js). Built production REST APIs, authentication systems, and relational database schemas spanning internship, freelance, and academic engagements, with a focus on clean state management and system design.",
    activeStack: [
      "Python",
      "FastAPI",
      "Spring Boot",
      "React",
      "Next.js",
      "PostgreSQL",
      "MySQL",
      "Supabase",
      "Docker",
      "Cloudflare",
      "Hugging Face",
      "Linux"
    ],
    photoUrl: "/images/avatar-real.jpg",
    avatar8BitUrl: "/images/avatar-8bit.png"
  },
  aiChat: {
    enabled: process.env.NEXT_PUBLIC_ENABLE_AI_CHAT !== 'false',
    cfAccountId: process.env.NEXT_PUBLIC_CF_ACCOUNT_ID || '',
    cfApiToken: process.env.NEXT_PUBLIC_CF_API_TOKEN || '',
    apiUrl: process.env.NEXT_PUBLIC_AI_API_URL || '',
    apiKey: process.env.NEXT_PUBLIC_AI_API_KEY || '',
  },
  metrics: [
    {
      label: "B.TECH CSE CGPA",
      value: "7.80",
      unit: "/10",
      description: "Mar Baselios College // S6 2026",
      icon: "school"
    },
    {
      label: "DSA MENTORSHIP",
      value: "50+",
      unit: "PEERS",
      description: "LeetCode & Algorithmic Patterns",
      icon: "group"
    },
    {
      label: "HACKATHONS",
      value: "2x",
      unit: "WINNER",
      description: "Sphota 24h & SIH 24/25 Qualifier",
      icon: "emoji_events"
    },
    {
      label: "IEDC COO IMPACT",
      value: "500+",
      unit: "DEV",
      description: "Directed Boot Camps & Mr. Inceptra",
      icon: "workspace_premium"
    }
  ],
  experiences: [
    {
      id: "obsidyne",
      company: "Obsidyne",
      role: "Software Developer",
      timeline: "Mar 2025 – Present",
      location: "Trivandrum, Kerala",
      badge: "Production E-Commerce",
      highlights: [
        "Developed RESTful APIs with FastAPI powering the production e-commerce backend for the Lytemaster brand, serving live customer traffic.",
        "Built a MySQL-backed inventory management service, streamlining stock-tracking workflows for the operations team.",
        "Delivered front-end UI components end-to-end, partnering across the stack to ship production-ready features on tight timelines."
      ],
      skills: ["FastAPI", "Python", "MySQL", "REST APIs", "Inventory Systems"]
    },
    {
      id: "cdc-medical",
      company: "Child Development Centre, Medical College Trivandrum",
      role: "System Architect & Software Developer — Freelance",
      timeline: "Sep 2025 – Present",
      location: "Trivandrum, Kerala",
      badge: "LAN-First Healthcare",
      highlights: [
        "Architected a localized, LAN-first deployment strategy ensuring offline reliability and strict patient data privacy without dependency on external cloud infrastructure.",
        "Built a responsive React frontend backed by FastAPI REST APIs, with a PostgreSQL schema architecture supporting historical medical records.",
        "Extending the system's data model and infrastructure to support broader patient history tracking as the client's needs scale."
      ],
      skills: ["React", "FastAPI", "PostgreSQL", "LAN-First Architecture", "Healthcare EHR"]
    },
    {
      id: "hrblock",
      company: "H&R Block (Technopark)",
      role: "Software Development Intern",
      timeline: "Dec 2024 – Jan 2025",
      location: "Trivandrum, Kerala",
      badge: "Enterprise Fintech",
      highlights: [
        "Developed a .NET API controller managing a 30+ configurable options checklist backed by a JSON data store.",
        "Built an Angular front-end delivering the checklist experience, with all 30+ options synced to the backend via REST endpoints.",
        "Refined the Angular application's CSS layout, improving usability and consistency across all option panels."
      ],
      skills: [".NET API", "Angular", "JSON Data Store", "REST Endpoints", "CSS Layout"]
    }
  ] as Experience[],
  projects: [
    {
      id: "ai-resume",
      title: "AI Resume Screening Cloud API Module",
      category: "featured ai-cloud python",
      badge: "QWEN LLM",
      description: "Built a semantic matching and parsing pipeline integrating the Qwen LLM to score resume–job description compatibility beyond basic keyword overlap. Deployed inference on Hugging Face with Cloudflare Workers/Tunnels.",
      tech: ["Python", "FastAPI", "Qwen LLM", "Hugging Face", "Cloudflare"],
      githubUrl: "https://github.com/advaithmanoj-05",
      highlightText: "Low-Latency Edge"
    },
    {
      id: "nexstep",
      title: "NexStep Placement Training Platform",
      category: "featured fullstack",
      badge: "SUPABASE + REACT",
      description: "Full-stack placement platform with role-based auth (Student/Alumni/Admin) & PostgreSQL triggers automating profile creation for TPO. Integrated Google Drive OAuth and QR-code attendance tracking.",
      tech: ["React", "Supabase", "PostgreSQL", "Google Drive OAuth", "QR Code"],
      githubUrl: "https://github.com/advaithmanoj-05",
      highlightText: "200+ Students"
    },
    {
      id: "sentry-kmrl",
      title: "Sentry — Kochi Metro Rail Document Arch.",
      category: "featured systems",
      badge: "SIH 2025 NATIONAL",
      description: "Proposed and architected a centralized, intelligent document management solution for Kochi Metro Rail Limited (KMRL), streamlining administrative workflows with minimal UI/UX overhead. Advanced to SIH 2025 National Pool.",
      tech: ["System Architecture", "FastAPI", "PostgreSQL", "KMRL Enterprise"],
      githubUrl: "https://github.com/advaithmanoj-05",
      highlightText: "SIH 2025 Qualifier"
    },
    {
      id: "aegis",
      title: "Aegis — Smart Helmet Navigation & Telemetry",
      category: "featured systems",
      badge: "EMBEDDED IOT",
      description: "Embedded IoT driving-assistance system for smart helmets featuring integrated Heads-Up Display (HUD), automated crash/SOS emergency alerts, and real-time Google Maps telemetry integration.",
      tech: ["Embedded IoT", "C++ / Python", "Google Maps API", "SOS Telemetry"],
      githubUrl: "https://github.com/advaithmanoj-05",
      highlightText: "HUD Telemetry"
    },
    {
      id: "dungeon-engine",
      title: "Dungeon Engine — Turn-Based State Machine",
      category: "systems python",
      badge: "STATE MACHINE",
      description: "Built a deterministic, headless turn-based game engine modelling room resolution, hero equipment logic, and round states using Python dataclasses and OOP contracts with rigorous unit tests.",
      tech: ["Python", "Dataclasses", "OOP Contract", "Unit Tests"],
      githubUrl: "https://github.com/advaithmanoj-05",
      highlightText: "100% Deterministic"
    },
    {
      id: "file-organizer",
      title: "Automated File Organizer Script",
      category: "python systems",
      badge: "DAEMON SCRIPT",
      description: "Background file-automation script that monitors directories using OS/Shutil modules to sort downloads by MIME type and extension, handling name collisions and duplicate files seamlessly.",
      tech: ["Python", "OS / Shutil", "MIME Parsing", "File Automation"],
      githubUrl: "https://github.com/advaithmanoj-05",
      highlightText: "Directory Daemon"
    },
    {
      id: "tax-calc",
      title: "Income Tax & Slab Calculator",
      category: "python",
      badge: "CLI ENGINE",
      description: "CLI tool computing progressive tax brackets, deductions, and exemptions across new and old Indian fiscal regimes, with input validation and clean slab breakdowns.",
      tech: ["Python", "CLI Tool", "Financial Math", "Tax Engine"],
      githubUrl: "https://github.com/advaithmanoj-05",
      highlightText: "Dual Regime Engine"
    }
  ] as Project[],
  leadership: [
    {
      id: "tpu",
      title: "Student Placement Coordinator & Mentor",
      organization: "Training and Placement Unit",
      unit: "TPU",
      highlights: [
        "Recognized as Most Active Student Placement Coordinator for orchestrating recruitment drives for 200+ students.",
        "DSA & LeetCode Mentorship: Mentored 50+ peers on two-pointers, dynamic programming, and graphs with practice sheets and code reviews.",
        "Mock Technical Interviews: Conducted 5-criteria standardized evaluation interviews assessing live coding, system design, and communication."
      ]
    },
    {
      id: "iedc",
      title: "Chief Operating Officer (COO) / Co-Lead",
      organization: "Innovation and Entrepreneurship Development Centre",
      unit: "IEDC",
      highlights: [
        "Directed entrepreneurship boot camps and hackathons for 500+ participants.",
        "Awarded Mr. Inceptra at IEDC Inceptra for technical pitch and leadership."
      ]
    },
    {
      id: "ieee-sight",
      title: "Division Lead",
      organization: "IEEE SIGHT (Special Interest Group on Humanitarian Technology)",
      unit: "IEEE SIGHT",
      highlights: [
        "Led student engineering teams building community-focused humanitarian solutions and organized technical workshops."
      ]
    }
  ] as LeadershipRole[],
  achievements: [
    {
      id: "trydan",
      title: "Market Masters — Trydan'25",
      badge: "WINNER",
      badgeType: "winner",
      description: "Secured first position with a cash prize for outstanding performance in marketing and innovation."
    },
    {
      id: "sphota",
      title: "Sphota 24-Hour Hackathon",
      badge: "WINNER",
      badgeType: "winner",
      description: "Secured first place in the 24-hour hackathon (Team Synapse, IEEE)."
    },
    {
      id: "sih",
      title: "Smart India Hackathon (SIH) 2024 & 2025",
      badge: "NATIONAL",
      badgeType: "national",
      description: "Qualified for both 2024 and 2025 editions at internal college level, advancing to the national-level hackathon pool."
    }
  ] as Achievement[],
  education: {
    institution: "Mar Baselios College of Engineering and Technology",
    degree: "B.Tech in Computer Science & Engineering",
    location: "Trivandrum, Kerala",
    timeline: "2022 – 2026",
    cgpa: "7.80 / 10",
    semester: "S6 2026",
    details: "Specializing in Data Structures, System Design, Relational Database Systems, Object-Oriented Programming, and Web Architectures."
  },
  certifications: [
    {
      id: "nptel",
      title: "Programming, Data Structures and Algorithms using Python",
      issuer: "NPTEL (IIT Madras)",
      detail: "8-Week Certification Course"
    },
    {
      id: "infosys",
      title: "Java Programming (2022)",
      issuer: "Infosys Springboard",
      detail: "Verified Certification"
    },
    {
      id: "scaler",
      title: "Python and MySQL for Data Science",
      issuer: "Scaler Topics",
      detail: "Spec Verified"
    }
  ] as Certification[]
};
