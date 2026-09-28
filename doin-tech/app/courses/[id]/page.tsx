import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { COURSES } from "@/lib/data";
import {
  IconStarFilled,
  IconClock,
  IconBook2,
  IconPlayerPlayFilled,
  IconCheck,
  IconShieldCheck,
  IconCertificate,
  IconDeviceLaptop,
  IconDownload,
  IconArrowLeft,
  IconShare,
  IconBookmark,
} from "@tabler/icons-react";

interface CoursePageProps {
  params: Promise<{ id: string }>;
}

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const { id } = await params;
  const course = COURSES.find((c) => c.id === id) || COURSES[0];

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar variant="default" />

      {/* Top Breadcrumb & Title Hero */}
      <div className="bg-slate-900 text-white py-12 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-[#ccfc00] transition-colors mb-4"
          >
            <IconArrowLeft className="size-4" />
            <span>Back to All Courses</span>
          </Link>

          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <Badge
                variant="secondary"
                className="bg-[#ccfc00] text-black font-extrabold text-xs px-2.5 py-0.5"
              >
                {course.category}
              </Badge>
              <Badge
                variant="outline"
                className="text-slate-300 border-slate-700 text-xs"
              >
                {course.level}
              </Badge>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight mb-4">
              {course.title}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              {course.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <IconStarFilled className="size-4 text-amber-400 fill-amber-400" />
                <span className="font-bold text-white text-sm">
                  {course.rating.toFixed(1)}
                </span>
                <span>({course.reviewsCount.toLocaleString()} reviews)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <IconClock className="size-4 text-[#ccfc00]" />
                <span>{course.duration} on-demand video</span>
              </div>
              <div className="flex items-center gap-1.5">
                <IconBook2 className="size-4 text-[#ccfc00]" />
                <span>{course.lessonsCount} lessons</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout with Sticky Sidebar */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column (2 Cols): Video Player Mockup & Syllabus */}
          <div className="lg:col-span-2 space-y-10">
            {/* Interactive Video Player Mockup */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 shadow-2xl border-4 border-slate-900 group">
              <Image
                src={course.thumbnail}
                alt="Course Video Preview"
                fill
                className="object-cover opacity-75 group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

              {/* Center Play Button */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <button
                  type="button"
                  aria-label="Play Course Trailer"
                  className="w-20 h-20 rounded-full bg-[#ccfc00] text-black flex items-center justify-center shadow-2xl shadow-[#ccfc00]/40 group-hover:scale-115 transition-transform cursor-pointer"
                >
                  <IconPlayerPlayFilled className="size-8 ml-1" />
                </button>
                <span className="text-white text-xs font-bold mt-4 tracking-wider uppercase bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm">
                  Preview Free Trailer (02:45)
                </span>
              </div>

              {/* Video Bottom Scrub Bar Mock */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden mb-2">
                  <div className="bg-[#ccfc00] h-full w-1/3" />
                </div>
                <div className="flex items-center justify-between text-white text-xs font-mono">
                  <span>01:12 / 02:45</span>
                  <span className="text-[#ccfc00] font-bold">1080p HD</span>
                </div>
              </div>
            </div>

            {/* What you'll learn */}
            <div className="p-8 rounded-2xl bg-blue-50/50 border border-blue-100">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                What you&apos;ll master in this course
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  "Architect full-scale production applications with Next.js & React",
                  "Write clean, type-safe TypeScript interfaces & generic utilities",
                  "Implement robust authentication, JWT, and session management",
                  "Design responsive design systems with Tailwind & shadcn/ui",
                  "Deploy serverless workloads with zero-downtime CI/CD workflows",
                  "Earn an industry-verified certification for your LinkedIn portfolio",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#ccfc00] text-black flex items-center justify-center shrink-0 mt-0.5">
                      <IconCheck className="size-3 stroke-[3]" />
                    </div>
                    <span className="text-sm text-slate-700 leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum Accordion */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-slate-900">
                  Course Curriculum
                </h2>
                <div className="text-xs text-slate-500 font-medium">
                  {course.curriculum.length} Sections • {course.lessonsCount} Total Lessons
                </div>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100">
                <Accordion defaultValue={["item-0"]}>
                  {course.curriculum.map((section, idx) => (
                    <AccordionItem key={idx} value={`item-${idx}`} className="px-6 py-2">
                      <AccordionTrigger className="text-base font-bold text-slate-900 hover:no-underline">
                        <span>{section.title}</span>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-4 space-y-2">
                        {section.lessons.map((lesson, lIdx) => (
                          <div
                            key={lIdx}
                            className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-sm transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#003be2] flex items-center justify-center text-xs font-bold shrink-0">
                                {lIdx + 1}
                              </div>
                              <span className="font-medium text-slate-800">
                                {lesson.title}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              {lesson.isFree && (
                                <Badge
                                  variant="secondary"
                                  className="bg-[#ccfc00] text-black text-[10px] font-bold"
                                >
                                  Free Preview
                                </Badge>
                              )}
                              <span className="text-xs text-slate-400 font-mono">
                                {lesson.duration}
                              </span>
                            </div>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            {/* Instructor Profile */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Your Instructor
              </h2>
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border-2 border-[#ccfc00]">
                  <Image
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">
                    {course.instructor.name}
                  </h3>
                  <div className="text-xs text-blue-600 font-semibold mb-3">
                    {course.instructor.role}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    Over 12 years of hands-on software development and engineering
                    leadership experience across high-scale Silicon Valley tech companies.
                    Dedicated to teaching practical, industry-grade architectures.
                  </p>
                  <div className="flex items-center gap-6 text-xs text-slate-500">
                    <div>
                      <strong className="text-slate-900">4.9</strong> Instructor Rating
                    </div>
                    <div>
                      <strong className="text-slate-900">32,000+</strong> Students
                    </div>
                    <div>
                      <strong className="text-slate-900">14</strong> Courses
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (1 Col): Sticky Enrollment Action Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-28 bg-white border border-slate-200/90 rounded-2xl shadow-xl overflow-hidden p-6 sm:p-7">
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-black text-slate-900">
                  ${course.price}
                </span>
                <span className="text-base text-slate-400 line-through">
                  ${course.originalPrice}
                </span>
                <Badge
                  variant="secondary"
                  className="bg-[#ccfc00] text-black font-extrabold text-xs ml-auto"
                >
                  45% OFF
                </Badge>
              </div>

              <div className="space-y-3 mb-6">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full bg-[#ccfc00] text-black hover:bg-[#b8e600] font-black text-base py-6 shadow-md cursor-pointer"
                >
                  Enroll Now in Course
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full font-bold text-sm cursor-pointer"
                >
                  Try 7-Day Free Trial
                </Button>
              </div>

              <div className="text-center text-xs text-slate-500 pb-6 border-b border-slate-100 flex items-center justify-center gap-1.5">
                <IconShieldCheck className="size-4 text-emerald-600" />
                <span>30-Day Money-Back Guarantee</span>
              </div>

              {/* This course includes */}
              <div className="pt-6 space-y-3.5">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  This course includes:
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-600">
                  <IconDeviceLaptop className="size-4 text-[#003be2]" />
                  <span>{course.duration} on-demand HD video</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-600">
                  <IconDownload className="size-4 text-[#003be2]" />
                  <span>18 downloadable project resources</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-600">
                  <IconBook2 className="size-4 text-[#003be2]" />
                  <span>Full lifetime access on mobile & desktop</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-600">
                  <IconCertificate className="size-4 text-[#003be2]" />
                  <span>Official Certificate of Completion</span>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <button
                  type="button"
                  className="flex items-center gap-1.5 hover:text-[#003be2] font-semibold cursor-pointer"
                >
                  <IconShare className="size-4" />
                  <span>Share Course</span>
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1.5 hover:text-[#003be2] font-semibold cursor-pointer"
                >
                  <IconBookmark className="size-4" />
                  <span>Save to Wishlist</span>
                </button>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
