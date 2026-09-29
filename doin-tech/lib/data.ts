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
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    },
    thumbnail:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80",
    description:
      "Learn UX research, wireframing, typography, color harmony, auto-layout mastery, interactive prototyping, and design system creation in Figma.",
    curriculum: [
      {
        title: "Section 1: Design Thinking & Wireframing",
        lessons: [
          {
            title: "Introduction to Design Systems",
            duration: "14:20",
            isFree: true,
          },
          {
            title: "User Flows and Information Architecture",
            duration: "22:10",
          },
        ],
      },
      {
        title: "Section 2: Figma Mastery & Auto-Layout 5.0",
        lessons: [
          {
            title: "Advanced Auto-Layout & Constraints",
            duration: "29:45",
            isFree: true,
          },
          { title: "Variables, Color Modes & Tokens", duration: "35:10" },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Build Digital Asset",
    category: "Design",
    rating: 4.5,
    reviewsCount: 840,
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
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    },
    thumbnail:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    description:
      "Build robust digital assets, scale design systems, manage reusable token libraries, and publish digital asset packs.",
    curriculum: [
      {
        title: "Section 1: Digital Asset Creation",
        lessons: [
          {
            title: "Asset Architecture & Systemization",
            duration: "18:00",
            isFree: true,
          },
          { title: "Exporting & Optimization Pipelines", duration: "26:30" },
        ],
      },
    ],
  },
  {
    id: "3",
    title: "the Power of Big Data",
    category: "Data & AI",
    rating: 4.5,
    reviewsCount: 920,
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
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    },
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    description:
      "Harness the power of data visualization, exploratory analytics, metric dashboards, and data-driven insights.",
    curriculum: [
      {
        title: "Section 1: Big Data Fundamentals",
        lessons: [
          {
            title: "Data Pipelines and Warehousing",
            duration: "25:00",
            isFree: true,
          },
        ],
      },
    ],
  },
  {
    id: "4",
    title: "Balancing Productivity and Life",
    category: "Business",
    rating: 4.5,
    reviewsCount: 760,
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
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    },
    thumbnail:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=80",
    description:
      "Develop intentional daily routines, manage deep work schedules, prevent creative burnout, and boost sustained output.",
    curriculum: [
      {
        title: "Section 1: Intentional Productivity",
        lessons: [
          {
            title: "Deep Work Protocols & Time Boxing",
            duration: "20:15",
            isFree: true,
          },
        ],
      },
    ],
  },
  {
    id: "5",
    title: "Mastering Money Management",
    category: "Business",
    rating: 4.5,
    reviewsCount: 880,
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
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    },
    thumbnail:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80",
    description:
      "Master personal finance, investment fundamentals, cash flow management, budgeting strategies, and long-term wealth building.",
    curriculum: [
      {
        title: "Section 1: Financial Intelligence",
        lessons: [
          {
            title: "Cash Flow & Capital Allocation",
            duration: "24:10",
            isFree: true,
          },
        ],
      },
    ],
  },
  {
    id: "6",
    title: "From Idea to Startup Success",
    category: "Business",
    rating: 4.5,
    reviewsCount: 940,
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
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    },
    thumbnail:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
    description:
      "Validate startup concepts, conduct customer discovery interviews, build minimum viable products, and execute go-to-market strategies.",
    curriculum: [
      {
        title: "Section 1: Discovery & MVP Launch",
        lessons: [
          {
            title: "Idea Validation & Rapid Prototyping",
            duration: "19:40",
            isFree: true,
          },
        ],
      },
    ],
  },
];

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating?: number;
  quote: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Sarah M.",
    role: "Enthusiastic Learner",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    rating: 5,
    quote:
      "ByteSpace has transformed my approach to learning. The diverse range of courses and the quality of content provided by creators have exceeded my expectations. The platform truly fosters a sense of community and lifelong learning.",
  },
  {
    id: "2",
    name: "James L.",
    role: "Lifelong Learner",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    rating: 5,
    quote:
      "ByteSpace has transformed my approach to learning. The diverse range of courses and the quality of content provided by creators have exceeded my expectations. The platform truly fosters a sense of community and lifelong learning.",
  },
  {
    id: "3",
    name: "Alex B.",
    role: "Inspired Creator",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    rating: 5,
    quote:
      "ByteSpace has transformed my approach to learning. The diverse range of courses and the quality of content provided by creators have exceeded my expectations. The platform truly fosters a sense of community and lifelong learning.",
  },
];
