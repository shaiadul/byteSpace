"use client";

import Image from "next/image";
import Link from "next/link";
import { Course } from "@/lib/data";
import { IconStarFilled } from "@tabler/icons-react";

export interface CourseCardProps {
  course: Course;
  className?: string;
}

const DEFAULT_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80",
];

export function CourseCard({ course, className = "" }: CourseCardProps) {
  const commentsCount =
    course.commentsCount ||
    (course.reviewsCount ? Math.max(12, Math.round(course.reviewsCount / 16)) : 59);

  return (
    <Link
      href={`/courses/${course.id}`}
      className={`group bg-white rounded-[28px] border border-slate-200/90 p-3.5 sm:p-4 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between ${className}`}
    >
      <div>
        <div className="relative w-full aspect-[16/10] rounded-[20px] overflow-hidden bg-slate-100">
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1 sm:gap-1.5 pointer-events-none">
            <span className="bg-white/75 backdrop-blur-md text-slate-800 font-medium text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-xs whitespace-nowrap">
              {course.lessonsCount} Lessons
            </span>
            <span className="bg-white/75 backdrop-blur-md text-slate-800 font-medium text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-xs whitespace-nowrap">
              {course.duration}
            </span>
            <span className="bg-white/75 backdrop-blur-md text-slate-800 font-medium text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-xs whitespace-nowrap">
              {commentsCount} Comments
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg sm:text-[20px] text-slate-900 tracking-tight leading-snug line-clamp-1 group-hover:text-brand-blue transition-colors">
              {course.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-normal truncate">
              by{" "}
              <span className="text-brand-blue font-medium hover:underline">
                {course.instructor.name}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-1 shrink-0 pt-0.5">
            <span className="font-bold text-slate-800 text-base sm:text-lg leading-none">
              {course.rating.toFixed(1)}
            </span>
            <IconStarFilled className="size-4 text-slate-300 fill-slate-300" />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-start gap-2">
          <div className="bg-muted px-3.5 py-1.5 rounded-full flex items-center gap-2 text-slate-700 font-semibold text-xs sm:text-[13px]">
            <div className="flex items-end gap-[2px] h-3.5 w-3.5 shrink-0" aria-hidden="true">
              <span className="w-[3px] h-1.5 bg-slate-700 rounded-full" />
              <span className="w-[3px] h-2.5 bg-slate-700 rounded-full" />
              <span className="w-[3px] h-3.5 bg-slate-700 rounded-full" />
            </div>
            <span>{course.level}</span>
          </div>

          <div className="flex items-center -space-x-2 shrink-0">
            {DEFAULT_AVATARS.map((avatar, idx) => (
              <div
                key={idx}
                className="relative size-7 sm:size-7.5 rounded-full ring-2 ring-white overflow-hidden shrink-0 bg-slate-200"
              >
                <Image
                  src={avatar}
                  alt="Student"
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              </div>
            ))}
            <div className="size-7 sm:size-7.5 rounded-full bg-brand-lime text-slate-950 font-bold text-[11px] sm:text-xs flex items-center justify-center ring-2 ring-white shrink-0">
              26+
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-1 flex items-baseline gap-1">
        <span className="text-brand-blue font-black text-2xl sm:text-[26px] tracking-tight leading-none">
          ${course.price}
        </span>
        <span className="text-xs sm:text-sm text-slate-500 font-normal">
          /lifetime
        </span>
      </div>
    </Link>
  );
}
