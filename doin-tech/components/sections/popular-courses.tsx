"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/section-header";
import { CourseCard } from "@/components/course-card";
import { COURSES, CATEGORIES } from "@/lib/data";
import { IconArrowRight } from "@tabler/icons-react";

export function PopularCourses() {
  const [activeCategory, setActiveCategory] =
    React.useState<string>("All Courses");

  const filteredCourses =
    activeCategory === "All Courses"
      ? COURSES
      : COURSES.filter((c) => c.category === activeCategory);

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={
            <>
              Discover Your Passion, Build Your Skills
            </>
          }
          description="At Bytespace Courses, we bring you closer to life-changing knowledge. Explore a variety of courses across different fields, from technology to the arts, and make a difference in your career and life."
          align="center"
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mt-8">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-brand-lime text-black shadow-md scale-105"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </SectionHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
