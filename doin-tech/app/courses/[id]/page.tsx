"use client";

import * as React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { COURSES } from "@/lib/data";
import { CourseAboutTab } from "@/components/course/course-about-tab";
import { CourseLessonsTab } from "@/components/course/course-lessons-tab";
import { CourseReviewsTab } from "@/components/course/course-reviews-tab";
import { CourseSidebar } from "@/components/course/course-sidebar";
import {
  IconShare,
  IconStarFilled,
  IconUsers,
  IconChartBar,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";

export default function CourseDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const course = COURSES.find((c) => c.id === id) || COURSES[1] || COURSES[0];

  const [activeTab, setActiveTab] = React.useState<
    "About" | "Lesson" | "Reviews"
  >("About");

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
                  <IconChartBar className="size-4 text-[#003be2] stroke-[2]" />
                  <span>{course.level || "Intermediate"}</span>
                </div>
                <div className="bg-white text-slate-800 rounded-full px-4 py-1.5 text-xs font-semibold flex items-center gap-1.5 shadow-xs">
                  <IconStarFilled className="size-3.5 text-[#003be2] fill-[#003be2]" />
                  <span>
                    {course.rating.toFixed(1)} ({course.reviewsCount || 172} reviews)
                  </span>
                </div>
                <div className="bg-white text-slate-800 rounded-full px-4 py-1.5 text-xs font-semibold flex items-center gap-1.5 shadow-xs">
                  <IconUsers className="size-4 text-[#003be2] stroke-[2]" />
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
              {(["About", "Lesson", "Reviews"] as const).map((tab) => {
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

            {activeTab === "About" && (
              <CourseAboutTab
                courseTitle={
                  course.title.includes(":")
                    ? course.title
                    : `${course.title}: A Comprehensive Guide`
                }
              />
            )}

            {activeTab === "Lesson" && <CourseLessonsTab />}

            {activeTab === "Reviews" && <CourseReviewsTab />}
          </div>

          <div className="lg:col-span-4 lg:-mt-[340px] relative z-20">
            <CourseSidebar course={course} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
