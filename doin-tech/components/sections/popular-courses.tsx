"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { COURSES, CATEGORIES } from "@/lib/data";
import {
  IconStarFilled,
  IconClock,
  IconBook2,
  IconBookmark,
  IconArrowRight,
  IconUsers,
} from "@tabler/icons-react";

export function PopularCourses() {
  const [activeCategory, setActiveCategory] = React.useState<string>("All Courses");
  const [bookmarked, setBookmarked] = React.useState<Record<string, boolean>>({});

  const filteredCourses =
    activeCategory === "All Courses"
      ? COURSES
      : COURSES.filter((c) => c.category === activeCategory);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-20 bg-slate-50/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge
            variant="outline"
            className="mb-3 px-3 py-1 font-semibold text-blue-700 bg-blue-50/70 border-blue-200"
          >
            TOP RATED PROGRAMS
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Browse Our Popular Best Courses
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Curated, industry-aligned curricula designed to take you from foundational
            concepts to real-world job readiness.
          </p>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mt-8">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#ccfc00] text-black shadow-md scale-105"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* 6 Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => {
            const isSaved = bookmarked[course.id];
            return (
              <Card
                key={course.id}
                className="overflow-hidden bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail Container */}
                  <div className="relative w-full h-52 overflow-hidden bg-slate-100">
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                    {/* Category Tag */}
                    <div className="absolute top-3 left-3">
                      <Badge
                        variant="secondary"
                        className="bg-[#ccfc00] text-black font-extrabold text-[11px] px-2.5 py-0.5 border-none shadow-sm"
                      >
                        {course.category}
                      </Badge>
                    </div>

                    {/* Bookmark action */}
                    <button
                      type="button"
                      onClick={(e) => toggleBookmark(course.id, e)}
                      aria-label="Save Course"
                      className={`absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer ${
                        isSaved
                          ? "bg-[#ccfc00] text-black"
                          : "bg-white/80 hover:bg-white text-slate-700"
                      }`}
                    >
                      <IconBookmark className={`size-4.5 ${isSaved ? "fill-current" : ""}`} />
                    </button>

                    {/* Meta stats overlay */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
                      <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-md">
                        <IconClock className="size-3.5 text-[#ccfc00]" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-md">
                        <IconBook2 className="size-3.5 text-[#ccfc00]" />
                        <span>{course.lessonsCount} Lessons</span>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    {/* Rating & Reviews */}
                    <div className="flex items-center justify-between mb-3 text-xs">
                      <div className="flex items-center gap-1">
                        <div className="flex text-amber-500">
                          <IconStarFilled className="size-4 fill-amber-400" />
                        </div>
                        <span className="font-extrabold text-slate-900 text-sm">
                          {course.rating.toFixed(1)}
                        </span>
                        <span className="text-slate-500">
                          ({course.reviewsCount.toLocaleString()})
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-slate-500 text-xs">
                        <IconUsers className="size-3.5" />
                        <span>{course.studentsCount.toLocaleString()} learners</span>
                      </div>
                    </div>

                    {/* Title */}
                    <Link href={`/courses/${course.id}`}>
                      <h3 className="font-bold text-lg text-slate-900 leading-snug line-clamp-2 hover:text-[#003be2] transition-colors mb-4">
                        {course.title}
                      </h3>
                    </Link>

                    {/* Instructor Info */}
                    <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                      <div className="relative w-9 h-9 rounded-full overflow-hidden bg-slate-200 shrink-0">
                        <Image
                          src={course.instructor.avatar}
                          alt={course.instructor.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="text-xs">
                        <div className="font-bold text-slate-900">
                          {course.instructor.name}
                        </div>
                        <div className="text-slate-500 text-[11px]">
                          {course.instructor.role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>

                {/* Pricing & Actions */}
                <div className="px-6 pb-6 pt-2 flex items-center justify-between gap-3 border-t border-slate-100/80 bg-slate-50/50">
                  <div className="flex items-baseline gap-2">
                    <span className="font-black text-2xl text-slate-900">
                      ${course.price}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      ${course.originalPrice}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link href={`/courses/${course.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs font-semibold cursor-pointer"
                      >
                        Preview
                      </Button>
                    </Link>
                    <Link href={`/courses/${course.id}`}>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-[#ccfc00] text-black font-bold hover:bg-[#b8e600] text-xs shadow-xs cursor-pointer"
                      >
                        Enroll Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="mt-14 text-center">
          <Link href="/courses">
            <Button
              variant="outline"
              size="lg"
              className="font-bold text-base px-8 border-slate-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white transition-all shadow-xs gap-2 cursor-pointer"
            >
              <span>Explore All 12,000+ Courses</span>
              <IconArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
