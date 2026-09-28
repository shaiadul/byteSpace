"use client";

import * as React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/input";
import { CourseCard } from "@/components/course-card";
import { COURSES, Course } from "@/lib/data";
import {
  IconSearch,
  IconChevronDown,
  IconFilter,
  IconChartBar,
  IconCategory,
  IconAdjustmentsHorizontal,
  IconChevronLeft,
  IconChevronRight,
  IconCheck,
} from "@tabler/icons-react";

const CATEGORIES_LIST = [
  "Featured",
  "Music",
  "Drawing & Painting",
  "Marketing",
  "Animation",
  "Social Media",
  "UI/UX Design",
  "Creative Marketing",
  "Cooking",
];

const SORT_OPTIONS = [
  "Most relevant",
  "Most Popular",
  "Highest Rated",
  "Newest Release",
];

const LEVEL_OPTIONS = ["All", "Beginner", "Intermediate", "Advanced"];

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState("Featured");
  const [activeLevel, setActiveLevel] = React.useState("All");
  const [activeSort, setActiveSort] = React.useState("Most relevant");
  const [currentPage, setCurrentPage] = React.useState(2);

  const [sortDropdownOpen, setSortDropdownOpen] = React.useState(false);
  const [levelDropdownOpen, setLevelDropdownOpen] = React.useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = React.useState(false);
  const [searchTypeDropdownOpen, setSearchTypeDropdownOpen] = React.useState(false);
  const [searchType, setSearchType] = React.useState("Courses");

  const sortRef = React.useRef<HTMLDivElement>(null);
  const levelRef = React.useRef<HTMLDivElement>(null);
  const categoryRef = React.useRef<HTMLDivElement>(null);
  const searchTypeRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setSortDropdownOpen(false);
      }
      if (levelRef.current && !levelRef.current.contains(event.target as Node)) {
        setLevelDropdownOpen(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setCategoryDropdownOpen(false);
      }
      if (searchTypeRef.current && !searchTypeRef.current.contains(event.target as Node)) {
        setSearchTypeDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCourses = React.useMemo(() => {
    return COURSES.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLevel =
        activeLevel === "All" || course.level === activeLevel;

      const matchesCategory =
        activeCategory === "Featured" ||
        course.title.toLowerCase().includes(activeCategory.toLowerCase()) ||
        course.category.toLowerCase().includes(activeCategory.toLowerCase());

      return matchesSearch && matchesLevel && matchesCategory;
    });
  }, [searchQuery, activeLevel, activeCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar variant="hero" />

      {/* Hero Banner Section */}
      <section
        className="relative bg-[#003be2] text-white pt-10 pb-16 sm:pt-14 sm:pb-20 px-4 overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "85.33px 85.33px",
          backgroundPosition: "center top",
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-7 sm:mb-8">
            Find Your Next Course
          </h1>

          {/* Search Bar with Pill Input & Lime Dropdown Button */}
          <div className="w-full max-w-[560px] mx-auto bg-white rounded-full p-1.5 sm:p-2 pl-5 sm:pl-6 shadow-xl flex items-center justify-between gap-2 sm:gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <IconSearch className="size-5 text-slate-400 shrink-0" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="border-none shadow-none text-slate-900 placeholder:text-slate-400 focus-visible:ring-0 text-sm sm:text-base px-0 h-10 bg-transparent flex-1 outline-none"
              />
            </div>

            <div className="relative shrink-0" ref={searchTypeRef}>
              <button
                type="button"
                onClick={() => setSearchTypeDropdownOpen((prev) => !prev)}
                className="bg-[#D4FB20] text-slate-900 hover:bg-[#c6eb1b] font-semibold text-sm sm:text-[15px] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full flex items-center gap-2 cursor-pointer shadow-xs transition-colors shrink-0"
              >
                <span>{searchType}</span>
                <IconChevronDown className="size-4 stroke-[2.5]" />
              </button>

              {searchTypeDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-50 text-slate-900 text-left">
                  {["Courses", "Creators", "Articles"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        setSearchType(type);
                        setSearchTypeDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-sm text-left flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer ${
                        searchType === type ? "font-bold text-[#003be2]" : "font-medium text-slate-700"
                      }`}
                    >
                      <span>{type}</span>
                      {searchType === type && <IconCheck className="size-4 text-brand-blue" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-12 flex-1 w-full bg-white">
        {/* Top Control Bar: Filters Left, Sort Right */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-7">
          {/* Left Action Buttons */}
          <div className="flex items-center gap-3 sm:gap-3.5 flex-wrap">
            {/* Filter Button */}
            <button
              type="button"
              onClick={() => {
                setActiveCategory("Featured");
                setActiveLevel("All");
                setSearchQuery("");
              }}
              className="bg-white border border-slate-200 hover:border-slate-300 rounded-full px-4 sm:px-5 py-2.5 text-sm font-medium text-slate-800 flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <IconFilter className="size-4 text-slate-700 stroke-[1.8]" />
              <span>Filter</span>
            </button>

            {/* Level Button & Dropdown */}
            <div className="relative" ref={levelRef}>
              <button
                type="button"
                onClick={() => setLevelDropdownOpen((prev) => !prev)}
                className={`bg-white border rounded-full px-4 sm:px-5 py-2.5 text-sm font-medium flex items-center gap-2 shadow-xs transition-colors cursor-pointer ${
                  activeLevel !== "All"
                    ? "border-[#003be2] text-[#003be2]"
                    : "border-slate-200 hover:border-slate-300 text-slate-800"
                }`}
              >
                <IconChartBar className="size-4 text-slate-700 stroke-[1.8]" />
                <span>{activeLevel !== "All" ? `Level: ${activeLevel}` : "Level"}</span>
              </button>

              {levelDropdownOpen && (
                <div className="absolute left-0 top-full mt-2 w-44 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-50 text-slate-900">
                  {LEVEL_OPTIONS.map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => {
                        setActiveLevel(lvl);
                        setLevelDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-sm text-left flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer ${
                        activeLevel === lvl ? "font-bold text-[#003be2]" : "font-medium text-slate-700"
                      }`}
                    >
                      <span>{lvl}</span>
                      {activeLevel === lvl && <IconCheck className="size-4 text-[#003be2]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Category Button & Dropdown */}
            <div className="relative" ref={categoryRef}>
              <button
                type="button"
                onClick={() => setCategoryDropdownOpen((prev) => !prev)}
                className={`bg-white border rounded-full px-4 sm:px-5 py-2.5 text-sm font-medium flex items-center gap-2 shadow-xs transition-colors cursor-pointer ${
                  activeCategory !== "Featured"
                    ? "border-[#003be2] text-[#003be2]"
                    : "border-slate-200 hover:border-slate-300 text-slate-800"
                }`}
              >
                <IconCategory className="size-4 text-slate-700 stroke-[1.8]" />
                <span>{activeCategory !== "Featured" ? activeCategory : "Category"}</span>
              </button>

              {categoryDropdownOpen && (
                <div className="absolute left-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-50 text-slate-900 max-h-64 overflow-y-auto">
                  {CATEGORIES_LIST.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setActiveCategory(cat);
                        setCategoryDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-sm text-left flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer ${
                        activeCategory === cat ? "font-bold text-[#003be2]" : "font-medium text-slate-700"
                      }`}
                    >
                      <span>{cat}</span>
                      {activeCategory === cat && <IconCheck className="size-4 text-[#003be2]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Action: Most relevant sort dropdown */}
          <div className="relative" ref={sortRef}>
            <button
              type="button"
              onClick={() => setSortDropdownOpen((prev) => !prev)}
              className="bg-white border border-slate-200 hover:border-slate-300 rounded-full px-4 sm:px-5 py-2.5 text-sm font-medium text-slate-800 flex items-center gap-2 shadow-xs transition-colors cursor-pointer ml-auto"
            >
              <IconAdjustmentsHorizontal className="size-4 text-slate-700 stroke-[1.8]" />
              <span>{activeSort}</span>
            </button>

            {sortDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-50 text-slate-900">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setActiveSort(opt);
                      setSortDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-sm text-left flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer ${
                      activeSort === opt ? "font-bold text-[#003be2]" : "font-medium text-slate-700"
                    }`}
                  >
                    <span>{opt}</span>
                    {activeSort === opt && <IconCheck className="size-4 text-[#003be2]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Category Chips Bar */}
        <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto scrollbar-none pb-2 sm:pb-0 mb-10">
          {CATEGORIES_LIST.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#D4FB20] text-slate-950 font-semibold shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Courses 3-Column Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-200/80 p-8 my-6">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-4">
              <IconSearch className="size-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              No matching courses found
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              Try adjusting your search query or reset your filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("Featured");
                setActiveLevel("All");
              }}
              className="bg-[#D4FB20] text-slate-950 font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-[#c6eb1b] transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}

        {/* Pagination Section */}
        <div className="mt-14 sm:mt-16 mb-6 flex items-center justify-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            aria-label="Previous Page"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:border-slate-300 hover:text-slate-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <IconChevronLeft className="size-5" />
          </button>

          <div className="flex items-center gap-3 sm:gap-4 px-2">
            {[1, 2, 3, 4, 5].map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                onClick={() => setCurrentPage(pageNum)}
                className={`w-7 sm:w-8 text-center text-sm sm:text-base transition-colors cursor-pointer ${
                  currentPage === pageNum
                    ? "text-slate-900 font-bold"
                    : "text-slate-400 hover:text-slate-700 font-semibold"
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(5, p + 1))}
            disabled={currentPage === 5}
            aria-label="Next Page"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:border-slate-300 hover:text-slate-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <IconChevronRight className="size-5" />
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
