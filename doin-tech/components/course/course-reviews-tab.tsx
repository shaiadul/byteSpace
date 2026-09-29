"use client";

import * as React from "react";
import Image from "next/image";
import { IconStarFilled } from "@tabler/icons-react";

interface Review {
  id: string;
  name: string;
  role: string;
  date: string;
  avatar: string;
  rating: number;
  comment: string;
}

const REVIEWS: Review[] = [
  {
    id: "1",
    name: "PurePearl Studio",
    role: "UI/UX Designer",
    date: "a year ago",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    rating: 5,
    comment:
      "The course provided me with a comprehensive understanding of digital asset creation. The lessons were in-depth, practical, and immediately applicable to my work. Highly recommended!",
  },
  {
    id: "2",
    name: "Albert Flores",
    role: "UI/UX Designer",
    date: "a year ago",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    rating: 5,
    comment:
      "This course transformed my approach to digital design. The combination of theory, hands-on exercises, and real-world applications made it a truly enriching experience. Excited to implement what I've learned!",
  },
  {
    id: "3",
    name: "Cody Fisher",
    role: "UI/UX Designer",
    date: "a year ago",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    rating: 5,
    comment:
      "Exceptional quality and clear explanations throughout. The practical insights gave me the confidence to take on more complex digital creation projects with ease.",
  },
];

const RATING_BREAKDOWN = [
  { stars: 5, percent: 85, count: 720 },
  { stars: 4, percent: 35, count: 120 },
  { stars: 3, percent: 10, count: 21 },
  { stars: 2, percent: 5, count: 12 },
  { stars: 1, percent: 6, count: 16 },
];

export function CourseReviewsTab() {
  const [selectedFilter, setSelectedFilter] = React.useState<number | "all">("all");

  const filteredReviews =
    selectedFilter === "all"
      ? REVIEWS
      : REVIEWS.filter((r) => r.rating === selectedFilter);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-3">What Learners Are Saying</h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl font-normal">
          Discover what our learners have to say about their experience with &apos;Build Digital
          Assets: A Comprehensive Guide.&apos; Read reviews and ratings from individuals who have
          embarked on the transformative journey of mastering digital asset creation.
        </p>
      </div>

      <div className="border border-slate-200/90 rounded-2xl p-6 bg-white shadow-xs flex flex-col sm:flex-row items-center gap-6 sm:gap-8 max-w-2xl">
        <div className="size-28 sm:size-32 rounded-2xl bg-brand-lime flex flex-col items-center justify-center text-center shrink-0 shadow-xs">
          <span className="text-xs font-semibold text-slate-800 mb-0.5">Ratings</span>
          <span className="text-4xl font-extrabold text-slate-900 tracking-tight leading-none">
            4.7
          </span>
        </div>

        <div className="flex-1 w-full space-y-2.5">
          {RATING_BREAKDOWN.map((row) => (
            <div key={row.stars} className="flex items-center gap-3 text-xs">
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-lime rounded-full"
                  style={{ width: `${row.percent}%` }}
                />
              </div>

              <div className="flex items-center gap-0.5 shrink-0 text-slate-700">
                {[...Array(5)].map((_, i) => (
                  <IconStarFilled key={i} className="size-3 fill-slate-700 text-slate-700" />
                ))}
              </div>

              <span className="text-xs text-slate-500 font-mono w-7 text-right shrink-0">
                {row.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">Individual Reviews:</h3>

        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap mb-6">
          <button
            type="button"
            onClick={() => setSelectedFilter("all")}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              selectedFilter === "all"
                ? "bg-brand-lime text-slate-950 shadow-xs"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
            }`}
          >
            All rating
          </button>

          {[5, 4, 3, 2, 1].map((stars) => {
            const isActive = selectedFilter === stars;
            return (
              <button
                key={stars}
                type="button"
                onClick={() => setSelectedFilter(stars)}
                className={`px-3.5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1 ${
                  isActive
                    ? "bg-brand-lime text-slate-950 font-semibold shadow-xs"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                <IconStarFilled
                  className={`size-3 ${
                    isActive ? "text-slate-950 fill-slate-950" : "text-slate-700 fill-slate-700"
                  }`}
                />
                <span>{stars}</span>
              </button>
            );
          })}
        </div>

        <div className="space-y-4">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="border border-slate-200/90 rounded-2xl p-6 bg-white space-y-3.5 shadow-xs"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative size-10 rounded-full overflow-hidden bg-slate-100 shrink-0">
                    <Image src={rev.avatar} alt={rev.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">{rev.name}</h4>
                    <p className="text-xs text-slate-500 font-normal">{rev.role}</p>
                  </div>
                </div>

                <span className="text-xs text-slate-400 font-normal shrink-0">{rev.date}</span>
              </div>

              <div className="flex items-center gap-1">
                {[...Array(rev.rating)].map((_, i) => (
                  <IconStarFilled key={i} className="size-3.5 fill-slate-800 text-slate-800" />
                ))}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                &quot;{rev.comment}&quot;
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
