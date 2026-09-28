"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { COURSES } from "@/lib/data";
import {
  IconShare,
  IconStarFilled,
  IconUsers,
  IconChartBar,
  IconPlayerPlayFilled,
  IconCircleCheckFilled,
  IconFolder,
  IconVideo,
  IconCertificate,
  IconHeadset,
} from "@tabler/icons-react";

const SNEAK_PEAK_IMAGES = [
  "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=80",
];

const KEY_POINTS = [
  "Foundational Concepts",
  "Design Principles Mastery",
  "Advanced Techniques in Digital Creation",
  "Project Showcase and Critique",
  "Optimizing for Various Platforms",
  "Digital Asset Management Best Practices",
  "Monetization Strategies",
  "Capstone Project: Building Your Portfolio",
];

const LESSONS_PREVIEW = [
  { id: "01", title: "Introduction to Digital Assets", duration: "12 mins" },
  { id: "02", title: "Design Principles for Impacts", duration: "21 mins" },
  { id: "03", title: "Advanced Techniques in Digital Creation", duration: "16 mins" },
];

export default function CourseDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const course = COURSES.find((c) => c.id === id) || COURSES[1] || COURSES[0];

  const [activeTab, setActiveTab] = React.useState<"About" | "Lessons" | "Reviews">("About");

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div
        className="bg-brand-blue text-white relative"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "85.33px 85.33px",
          backgroundPosition: "center top",
        }}
      >
        <Navbar variant="hero" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-8 pb-14 lg:pb-20">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
            <div className="max-w-3xl">
              <h1 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-white tracking-tight leading-tight">
                {course.title.includes(":")
                  ? course.title
                  : `${course.title}: A Comprehensive Guide`}
              </h1>
              <p className="text-white/90 text-sm sm:text-base font-normal mt-2 mb-3">
                Unlock the Power of Digital Creation with Expert Guidance
              </p>
              <p className="text-xs sm:text-sm text-white/90 mb-5">
                by{" "}
                <span className="text-[#D4FB20] font-semibold hover:underline cursor-pointer">
                  {course.instructor.name || "purepearl studio"}
                </span>
              </p>

              <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                <div className="bg-white text-slate-800 rounded-full px-4 py-1.5 text-xs font-semibold flex items-center gap-1.5 shadow-xs">
                  <IconChartBar className="size-4 text-slate-700 stroke-[2]" />
                  <span>{course.level || "Intermediate"}</span>
                </div>
                <div className="bg-white text-slate-800 rounded-full px-4 py-1.5 text-xs font-semibold flex items-center gap-1.5 shadow-xs">
                  <IconStarFilled className="size-3.5 text-amber-400 fill-amber-400" />
                  <span>
                    {course.rating.toFixed(1)} ({course.reviewsCount || 172} reviews)
                  </span>
                </div>
                <div className="bg-white text-slate-800 rounded-full px-4 py-1.5 text-xs font-semibold flex items-center gap-1.5 shadow-xs">
                  <IconUsers className="size-4 text-slate-700 stroke-[2]" />
                  <span>{course.studentsCount || 199} Students</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="self-start lg:self-auto bg-[#D4FB20] hover:bg-[#c6eb1b] text-slate-900 font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-full flex items-center gap-2 shadow-xs transition-colors cursor-pointer shrink-0"
            >
              <IconShare className="size-4 stroke-[2]" />
              <span>Share</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-8">
              <div className="relative w-full aspect-[16/10] rounded-[24px] overflow-hidden bg-slate-900 shadow-xl group border border-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1000&auto=format&fit=crop&q=80"
                  alt={course.title}
                  fill
                  priority
                  className="object-cover object-top group-hover:scale-102 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                <div className="absolute inset-0 bg-black/10" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    type="button"
                    aria-label="Play Course Video Preview"
                    className="size-16 sm:size-20 rounded-full bg-black/40 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-2xl hover:scale-110 hover:bg-black/55 transition-all cursor-pointer"
                  >
                    <IconPlayerPlayFilled className="size-7 sm:size-8 ml-1" />
                  </button>
                </div>
              </div>
            </div>

            <div className="hidden lg:block lg:col-span-4" />
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 flex-1 w-full relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center gap-3">
              {(["About", "Lessons", "Reviews"] as const).map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#D4FB20] text-slate-950 shadow-xs"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Description</h2>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-4 font-normal">
                <p>
                  Embark on an enlightening exploration into the world of digital creation with
                  our comprehensive course, &quot;Build Digital Assets: A Comprehensive
                  Guide.&quot; This transformative learning experience invites you to delve deep
                  into the intricacies of crafting impactful digital content. From laying the
                  groundwork with foundational concepts to mastering advanced techniques, this
                  guide is meticulously curated to empower you with the skills essential for
                  navigating the dynamic landscape of digital asset creation.
                </p>
                <p>
                  In the initial modules, you&apos;ll establish a solid foundation by immersing
                  yourself in the foundational concepts that form the backbone of digital asset
                  creation. Understand the fundamental elements that constitute compelling digital
                  content and gain proficiency in leveraging these elements to communicate
                  effectively in the digital realm.
                </p>
                <p>
                  As you progress through the course, you&apos;ll ascend to higher levels of
                  expertise, delving into the nuances of design principles that drive impactful
                  creations. Uncover the secrets behind effective visual communication, exploring
                  color theory, typography, and layout strategies that elevate your digital assets to
                  new heights. Engage in hands-on exercises that reinforce your understanding,
                  allowing you to apply these principles in practical scenarios.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Sneak Peak</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {SNEAK_PEAK_IMAGES.map((src, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-xs border border-slate-100 hover:shadow-md transition-shadow"
                  >
                    <Image
                      src={src}
                      alt={`Course Sneak Peak ${idx + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Key Points</h2>
              <div className="space-y-3">
                {KEY_POINTS.map((point, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <IconCircleCheckFilled className="size-5 text-[#003be2] shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-800">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 lg:-mt-[340px] relative z-20">
            <div className="bg-white rounded-[28px] border border-slate-200/90 shadow-2xl p-6 sm:p-7 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  112 Lessons (24 hours)
                </h3>
                <div className="space-y-3">
                  {LESSONS_PREVIEW.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex items-start justify-between gap-3 text-xs"
                    >
                      <span className="text-slate-400 font-mono shrink-0">{lesson.id}</span>
                      <span className="font-semibold text-slate-800 flex-1 leading-snug">
                        {lesson.title}
                      </span>
                      <span className="text-[#003be2] font-semibold shrink-0">
                        {lesson.duration}
                      </span>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="text-xs text-slate-400 hover:text-slate-600 font-medium pt-1 cursor-pointer transition-colors block"
                  >
                    99 more videos
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Ready to Dive In? Enroll Now and Start Building Your Digital Future!
                </p>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-black text-[#003be2] tracking-tight">
                    ${course.price || 25}
                  </span>
                  <span className="text-xs text-slate-400 font-normal">/lifetime</span>
                </div>
                <button
                  type="button"
                  className="w-full bg-[#D4FB20] hover:bg-[#c6eb1b] text-slate-900 font-bold text-sm py-3.5 rounded-full transition-colors shadow-xs cursor-pointer text-center"
                >
                  Enroll Now
                </button>
              </div>

              <div className="border-t border-slate-100 pt-5">
                <h4 className="text-sm font-bold text-slate-900 mb-3.5">This course include</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-700">
                    <IconFolder className="size-4 text-[#003be2] stroke-[1.8]" />
                    <span className="font-medium">Learning Resources</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-700">
                    <IconVideo className="size-4 text-[#003be2] stroke-[1.8]" />
                    <span className="font-medium">Quality Lesson Videos</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-700">
                    <IconCertificate className="size-4 text-[#003be2] stroke-[1.8]" />
                    <span className="font-medium">Certificate of Completion</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-700">
                    <IconHeadset className="size-4 text-[#003be2] stroke-[1.8]" />
                    <span className="font-medium">Private Consultation</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative size-10 rounded-full overflow-hidden bg-slate-100 shrink-0">
                    <Image
                      src={
                        course.instructor.avatar ||
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                      }
                      alt={course.instructor.name || "PurePearl Studio"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-slate-900 leading-tight">
                      {course.instructor.name || "PurePearl Studio"}
                    </h5>
                    <p className="text-xs text-slate-500">
                      {course.instructor.role || "Professional Creator"}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Ready to Dive In? Enroll Now and Start Building Your Digital Future!
                </p>

                <Link
                  href="/creators"
                  className="inline-block border border-slate-200 hover:border-slate-300 text-slate-700 font-medium text-xs px-5 py-2 rounded-full cursor-pointer transition-colors"
                >
                  See Full Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
