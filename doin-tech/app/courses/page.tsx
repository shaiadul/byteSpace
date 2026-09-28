"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CourseCard } from "@/components/course-card";
import { COURSES, CATEGORIES } from "@/lib/data";
import {
  IconSearch,
  IconStarFilled,
  IconClock,
  IconBook2,
  IconFilter,
  IconBookmark,
  IconChevronRight,
  IconUsers,
} from "@tabler/icons-react";

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All Courses");
  const [selectedLevel, setSelectedLevel] = React.useState<string>("All");
  const [bookmarked, setBookmarked] = React.useState<Record<string, boolean>>({});

  const filteredCourses = COURSES.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All Courses" || course.category === selectedCategory;

    const matchesLevel =
      selectedLevel === "All" || course.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar variant="default" />

      {/* Course Catalog Hero Banner with Brand Theme */}
      <div className="bg-[#003be2] text-white py-16 px-4 relative overflow-hidden">
        {/* Subtle decorative accents */}
        <div className="absolute top-4 right-10 w-24 h-24 rounded-full border-4 border-[#ccfc00]/30 pointer-events-none" />
        <div className="absolute -bottom-6 left-12 w-20 h-20 bg-[#ccfc00] opacity-80 rounded-2xl rotate-12 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-200 mb-3">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <IconChevronRight className="size-3.5" />
            <span className="text-[#ccfc00]">Courses</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4">
            Explore All 12,000+ Courses
          </h1>
          <p className="text-blue-100 text-base sm:text-lg max-w-2xl leading-relaxed mb-8">
            Upgrade your tech abilities with project-driven video courses, interactive
            exercises, and certificates recognized by top global employers.
          </p>

          {/* Search bar */}
          <div className="max-w-2xl bg-white rounded-full p-2 pl-5 shadow-2xl flex items-center gap-2">
            <IconSearch className="size-5 text-slate-400 shrink-0" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, instructor, or technology..."
              className="border-none shadow-none text-slate-900 placeholder:text-slate-400 focus-visible:ring-0 text-sm sm:text-base px-2 h-10 bg-transparent flex-1"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery("")}
                className="text-xs text-slate-500 hover:text-slate-900"
              >
                Clear
              </Button>
            )}
            <Button
              type="button"
              variant="secondary"
              className="rounded-full bg-[#ccfc00] text-black hover:bg-[#b8e600] font-bold px-6 text-sm shrink-0 cursor-pointer"
            >
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Main Listing Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#ccfc00] text-black shadow-xs scale-102"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Level Filter */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <IconFilter className="size-3.5" />
              Level:
            </span>
            {["All", "Beginner", "Intermediate", "Advanced"].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  selectedLevel === level
                    ? "bg-[#003be2] text-white"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 text-xs text-slate-500">
          <div>
            Showing <span className="font-bold text-slate-900">{filteredCourses.length}</span>{" "}
            courses available
          </div>
          <div className="flex items-center gap-2">
            <span>Sort by:</span>
            <select className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-medium text-slate-700 outline-none">
              <option>Most Popular</option>
              <option>Highest Rated</option>
              <option>Newest Release</option>
              <option>Price: Low to High</option>
            </select>
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 p-8">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-4">
              <IconSearch className="size-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              No matching courses found
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              Try adjusting your search query or reset your category filter.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All Courses");
                setSelectedLevel("All");
              }}
            >
              Reset All Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
