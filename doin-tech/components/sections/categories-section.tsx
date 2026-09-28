"use client";

import Link from "next/link";
import { FEATURE_TOPICS } from "@/lib/data";
import {
  IconPalette,
  IconCode,
  IconChartBar,
  IconBrain,
  IconCloud,
  IconBriefcase,
  IconArrowUpRight,
} from "@tabler/icons-react";

export function CategoriesSection() {
  const iconMap: Record<string, React.ElementType> = {
    palette: IconPalette,
    code: IconCode,
    chart: IconChartBar,
    brain: IconBrain,
    cloud: IconCloud,
    briefcase: IconBriefcase,
  };

  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
            Exploration with our diverse skill topics
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Choose your specialization and follow structured pathways verified by top engineering teams.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {FEATURE_TOPICS.map((topic) => {
            const Icon = iconMap[topic.icon] || IconCode;
            return (
              <Link
                key={topic.id}
                href={`/courses?category=${encodeURIComponent(topic.name)}`}
                className="group p-6 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-[#003be2]/40 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center cursor-pointer relative"
              >
                {/* Neon Lime Circle Icon Badge */}
                <div className="w-16 h-16 rounded-full bg-[#ccfc00] text-black flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md">
                  <Icon className="size-8" />
                </div>

                <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-[#003be2] transition-colors">
                  {topic.name}
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  {topic.coursesCount}
                </span>

                <div className="mt-4 w-7 h-7 rounded-full bg-white group-hover:bg-[#003be2] text-slate-400 group-hover:text-white flex items-center justify-center transition-colors shadow-xs">
                  <IconArrowUpRight className="size-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
