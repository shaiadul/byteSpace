export interface Course {
  id: string;
  title: string;
  category: "Design" | "Development" | "Marketing" | "Business" | "Data & AI";
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  duration: string;
  lessonsCount: number;
  commentsCount?: number;
  level: "All Levels" | "Beginner" | "Intermediate" | "Advanced";
  price: number;
  originalPrice: number;
  instructor: {
    name: string;
    role: string;
    avatar: string;
  };
  thumbnail: string;
  description: string;
  curriculum: {
    title: string;
    lessons: { title: string; duration: string; isFree?: boolean }[];
  }[];
}

export const CATEGORIES = [
  "All Courses",
  "Design",
  "Development",
  "Marketing",
  "Business",
  "Data & AI",
] as const;

export const FEATURE_TOPICS = [
  {
    id: "design",
    name: "UI/UX Design",
    coursesCount: "320+ Courses",
    icon: "palette",
    color: "#ccfc00",
  },
  {
    id: "development",
    name: "Web & Mobile Dev",
    coursesCount: "580+ Courses",
    icon: "code",
    color: "#ccfc00",
  },
  {
    id: "marketing",
    name: "Digital Marketing",
    coursesCount: "210+ Courses",
    icon: "chart",
    color: "#ccfc00",
  },
  {
    id: "data-ai",
    name: "Data Science & AI",
    coursesCount: "440+ Courses",
    icon: "brain",
    color: "#ccfc00",
  },
  {
    id: "cloud",
    name: "Cloud & DevOps",
    coursesCount: "190+ Courses",
    icon: "cloud",
    color: "#ccfc00",
  },
  {
    id: "business",
    name: "Business & Startup",
    coursesCount: "160+ Courses",
    icon: "briefcase",
    color: "#ccfc00",
  },
];

export const COURSES: Course[] = [
  {
    id: "1",
    title: "Full-Stack Web Development: Modern Next.js, React & Node",
    category: "Development",
    rating: 4.9,
    reviewsCount: 1420,
    studentsCount: 12400,
    duration: "42 Hours",
    lessonsCount: 88,
    level: "All Levels",
    price: 49.99,
    originalPrice: 89.99,
    instructor: {
      name: "Marcus Vance",
      role: "Lead Software Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
    description: "Master modern web development from ground up. Build end-to-end full stack web applications with Next.js 16, TypeScript, Tailwind CSS, PostgreSQL and deploy to production.",
    curriculum: [
      {
        title: "Section 1: Modern JavaScript & TypeScript Foundations",
        lessons: [
          { title: "Course Introduction & Setup", duration: "12:45", isFree: true },
          { title: "TypeScript In-Depth for React Developers", duration: "24:10", isFree: true },
          { title: "Asynchronous JavaScript & Event Loop", duration: "18:30" },
        ],
      },
      {
        title: "Section 2: Next.js Architecture & Server Components",
        lessons: [
          { title: "Understanding App Router & Server Actions", duration: "31:20" },
          { title: "Data Fetching & Dynamic Routing", duration: "22:15" },
          { title: "State Management with Zustand", duration: "19:40" },
        ],
      },
      {
        title: "Section 3: Database & Production Deployment",
        lessons: [
          { title: "Database Modeling with Prisma ORM", duration: "28:50" },
          { title: "Authentication & Role-Based Access", duration: "34:00" },
          { title: "CI/CD Pipeline & Production Launch", duration: "20:15" },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Learn Figma from Basic",
    category: "Design",
    rating: 4.5,
    reviewsCount: 980,
    commentsCount: 59,
    studentsCount: 26,
    duration: "2 hours 16 mins",
    lessonsCount: 17,
    level: "Beginner",
    price: 25,
    originalPrice: 49.99,
    instructor: {
      name: "purepearl studio",
      role: "Digital Design Studio",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    },
    thumbnail: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80",
    description: "Learn UX research, wireframing, typography, color harmony, auto-layout mastery, interactive prototyping, and design system creation in Figma.",
    curriculum: [
      {
        title: "Section 1: Design Thinking & Wireframing",
        lessons: [
          { title: "Introduction to Design Systems", duration: "14:20", isFree: true },
          { title: "User Flows and Information Architecture", duration: "22:10" },
        ],
      },
      {
        title: "Section 2: Figma Mastery & Auto-Layout 5.0",
        lessons: [
          { title: "Advanced Auto-Layout & Constraints", duration: "29:45", isFree: true },
          { title: "Variables, Color Modes & Tokens", duration: "35:10" },
        ],
      },
    ],
  },
  {
    id: "3",
    title: "Cyber Security & Ethical Hacking: Network Defense 2026",
    category: "Development",
    rating: 4.9,
    reviewsCount: 850,
    studentsCount: 7600,
    duration: "48 Hours",
    lessonsCount: 92,
    level: "Intermediate",
    price: 69.99,
    originalPrice: 119.99,
    instructor: {
      name: "David Kross",
      role: "Security Consultant & CISSP",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
    thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80",
    description: "Hands-on penetration testing, ethical hacking, vulnerability scanning, security audits, and defensive infrastructure engineering.",
    curriculum: [
      {
        title: "Section 1: Network Fundamentals & Reconnaissance",
        lessons: [
          { title: "Setting Up Your Kali Linux Lab", duration: "18:00", isFree: true },
          { title: "Network Scanning with Nmap", duration: "26:30" },
        ],
      },
    ],
  },
  {
    id: "4",
    title: "Architectural 3D Modeling & Lighting with Blender",
    category: "Design",
    rating: 4.7,
    reviewsCount: 620,
    studentsCount: 5400,
    duration: "28 Hours",
    lessonsCount: 52,
    level: "Intermediate",
    price: 39.99,
    originalPrice: 79.99,
    instructor: {
      name: "Elena Rostova",
      role: "3D Visualizer & Architect",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    },
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    description: "Craft photorealistic interior and exterior renders using Blender Cycles, geometry nodes, procedural materials, and HDRI lighting.",
    curriculum: [
      {
        title: "Section 1: Blender Workspace & Modeling",
        lessons: [
          { title: "Precision Architectural Modeling", duration: "25:00", isFree: true },
        ],
      },
    ],
  },
  {
    id: "5",
    title: "Quantitative Financial Analysis & Python Algorithmic Trading",
    category: "Business",
    rating: 4.8,
    reviewsCount: 1100,
    studentsCount: 9200,
    duration: "38 Hours",
    lessonsCount: 75,
    level: "Advanced",
    price: 54.99,
    originalPrice: 94.99,
    instructor: {
      name: "Julian Rivera",
      role: "Quant Trader & Financial Analyst",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    },
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80",
    description: "Analyze financial market data, backtest trading strategies, portfolio optimization, and risk management using Python, Pandas, and NumPy.",
    curriculum: [
      {
        title: "Section 1: Data Gathering & Time-Series",
        lessons: [
          { title: "Market Data APIs & Cleaning", duration: "20:15", isFree: true },
        ],
      },
    ],
  },
  {
    id: "6",
    title: "Growth Marketing Strategy & Data-Driven SEO 2026",
    category: "Marketing",
    rating: 4.9,
    reviewsCount: 1380,
    studentsCount: 11800,
    duration: "30 Hours",
    lessonsCount: 58,
    level: "All Levels",
    price: 44.99,
    originalPrice: 79.99,
    instructor: {
      name: "Hannah Schmidt",
      role: "VP of Growth @ ScaleUp",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    },
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    description: "Scale organic customer acquisition channels, implement high-converting SEO strategies, viral loops, and conversion rate optimization.",
    curriculum: [
      {
        title: "Section 1: Modern SEO & Content Engine",
        lessons: [
          { title: "Search Intent & Topical Authority", duration: "16:40", isFree: true },
        ],
      },
    ],
  },
];

export const TESTIMONIALS = [
  {
    id: "1",
    name: "Alex Thorne",
    role: "Frontend Engineer at Stripe",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    quote: "ByteSpace completely transformed how I learn. The projects are realistic, the mentors give constructive feedback, and the community is super motivating.",
  },
  {
    id: "2",
    name: "Maya Patel",
    role: "Product Designer at Linear",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    quote: "The Figma masterclass course allowed me to transition into product design in just 4 months. The interactive design exercises were phenomenal!",
  },
  {
    id: "3",
    name: "Liam O'Connor",
    role: "DevOps Engineer at Datadog",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    quote: "Top-tier quality curriculum with zero fluff. Every lesson directly teaches you real-world patterns you will actually write in a production codebase.",
  },
];
