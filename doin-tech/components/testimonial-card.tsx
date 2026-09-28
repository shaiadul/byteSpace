"use client";

import Image from "next/image";
import { Testimonial } from "@/lib/data";
import { cn } from "@/lib/utils";

export interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export function TestimonialCard({
  testimonial,
  className = "",
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl p-7 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.05)] border border-slate-100/80 hover:shadow-xl transition-all duration-300 flex flex-col justify-start relative group",
        className
      )}
    >
      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden relative mb-5 shrink-0 bg-slate-100">
        <Image
          src={testimonial.avatar}
          alt={testimonial.name}
          fill
          className="object-cover"
          sizes="72px"
        />
      </div>

      <div className="mb-4">
        <h3 className="font-bold text-slate-900 text-lg sm:text-xl">
          {testimonial.name}
        </h3>
        <p className="text-blue-600 font-medium text-sm mt-0.5">
          {testimonial.role}
        </p>
      </div>

      <p className="text-slate-600 text-sm sm:text-[14.5px] leading-relaxed">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
    </div>
  );
}
