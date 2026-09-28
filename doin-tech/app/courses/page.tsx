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
            {filteredCourses.map((course) => {
              const isSaved = bookmarked[course.id];
              return (
                <Card
                  key={course.id}
                  className="overflow-hidden bg-white border border-slate-200/80 rounded-2xl shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="relative w-full h-52 overflow-hidden bg-slate-100">
                      <Image
                        src={course.thumbnail}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                      <div className="absolute top-3 left-3">
                        <Badge
                          variant="secondary"
                          className="bg-[#ccfc00] text-black font-extrabold text-[11px] px-2.5 py-0.5 border-none shadow-sm"
                        >
                          {course.category}
                        </Badge>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => toggleBookmark(course.id, e)}
                        className={`absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer ${
                          isSaved
                            ? "bg-[#ccfc00] text-black"
                            : "bg-white/80 hover:bg-white text-slate-700"
                        }`}
                      >
                        <IconBookmark className={`size-4.5 ${isSaved ? "fill-current" : ""}`} />
                      </button>

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
                      <div className="flex items-center justify-between mb-3 text-xs">
                        <div className="flex items-center gap-1">
                          <IconStarFilled className="size-4 fill-amber-400 text-amber-500" />
                          <span className="font-extrabold text-slate-900 text-sm">
                            {course.rating.toFixed(1)}
                          </span>
                          <span className="text-slate-500">
                            ({course.reviewsCount.toLocaleString()})
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-500 text-xs">
                          <IconUsers className="size-3.5" />
                          <span>{course.studentsCount.toLocaleString()}</span>
                        </div>
                      </div>

                      <Link href={`/courses/${course.id}`}>
                        <h3 className="font-bold text-lg text-slate-900 leading-snug line-clamp-2 hover:text-[#003be2] transition-colors mb-4">
                          {course.title}
                        </h3>
                      </Link>

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
                          Details
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
        )}
      </main>

      <Footer />
    </div>
  );
}
