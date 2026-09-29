"use client";

import Image from "next/image";
import Link from "next/link";
import { Course } from "@/lib/data";
import {
  IconFolder,
  IconVideo,
  IconCertificate,
  IconHeadset,
} from "@tabler/icons-react";

interface CourseSidebarProps {
  course: Course;
}

const LESSONS_PREVIEW = [
  { id: "01", title: "Introduction to Digital Assets", duration: "12 mins" },
  { id: "02", title: "Design Principles for Impacts", duration: "21 mins" },
  { id: "03", title: "Advanced Techniques in Digital Creation", duration: "16 mins" },
];

export function CourseSidebar({ course }: CourseSidebarProps) {
  return (
    <div className="bg-white rounded-[28px] border border-slate-200/90 shadow-2xl p-6 sm:p-7 space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">112 Lessons (24 hours)</h3>
        <div className="space-y-3">
          {LESSONS_PREVIEW.map((lesson) => (
            <div key={lesson.id} className="flex items-start justify-between gap-3 text-xs">
              <span className="text-slate-400 font-mono shrink-0">{lesson.id}</span>
              <span className="font-semibold text-slate-800 flex-1 leading-snug">
                {lesson.title}
              </span>
              <span className="text-brand-blue font-semibold shrink-0">{lesson.duration}</span>
            </div>
          ))}
          <button
            type="button"
            className="text-xs text-slate-400 hover:text-slate-600 font-medium pt-1 cursor-pointer transition-colors block"
          >
            99 more videos
          </button>
        </div>
      </div>

      <div className="pt-2">
        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          Ready to Dive In? Enroll Now and Start Building Your Digital Future!
        </p>
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-3xl font-black text-brand-blue tracking-tight">
            ${course.price || 25}
          </span>
          <span className="text-xs text-slate-400 font-normal">/lifetime</span>
        </div>
        <button
          type="button"
          className="w-full bg-brand-lime hover:bg-brand-lime/90 text-slate-900 font-bold text-sm py-3.5 rounded-full transition-colors shadow-xs cursor-pointer text-center"
        >
          Enroll Now
        </button>
      </div>

      <div className="border-t border-slate-100 pt-5">
        <h4 className="text-sm font-bold text-slate-900 mb-3.5">This course include</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-xs text-slate-700">
            <IconFolder className="size-4 text-brand-blue stroke-[1.8]" />
            <span className="font-medium">Learning Resources</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-700">
            <IconVideo className="size-4 text-brand-blue stroke-[1.8]" />
            <span className="font-medium">Quality Lesson Videos</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-700">
            <IconCertificate className="size-4 text-brand-blue stroke-[1.8]" />
            <span className="font-medium">Certificate of Completion</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-700">
            <IconHeadset className="size-4 text-brand-blue stroke-[1.8]" />
            <span className="font-medium">Private Consultation</span>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative size-10 rounded-full overflow-hidden bg-slate-100 shrink-0">
            <Image
              src={
                course.instructor.avatar ||
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
              }
              alt={course.instructor.name || "PurePearl Studio"}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h5 className="font-bold text-sm text-slate-900 leading-tight">
              {course.instructor.name || "PurePearl Studio"}
            </h5>
            <p className="text-xs text-slate-500">
              {course.instructor.role || "Professional Creator"}
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          Ready to Dive In? Enroll Now and Start Building Your Digital Future!
        </p>

        <Link
          href="/creators"
          className="inline-block border border-slate-200 hover:border-slate-300 text-slate-700 font-medium text-xs px-5 py-2 rounded-full cursor-pointer transition-colors"
        >
          See Full Profile
        </Link>
      </div>
    </div>
  );
}
