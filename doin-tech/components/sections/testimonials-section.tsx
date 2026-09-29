"use client";

import * as React from "react";
import Image from "next/image";
import { TESTIMONIALS } from "@/lib/data";
import { TestimonialCard } from "@/components/testimonial-card";
import { cn } from "@/lib/utils";
import { FloatingElement, ScrollFadeIn, StaggerContainer, StaggerItem } from "@/components/motion/motion-elements";

export interface TestimonialsSectionProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  testimonials?: typeof TESTIMONIALS;
  className?: string;
}

export function TestimonialsSection({
  title = (
    <>
      Discover What Our
      <br />
      Community Is Saying
    </>
  ),
  description = "At ByteSpace, our vibrant community of learners and creators is at the heart of what we do. Hear directly from those who have experienced the transformative journey of learning and creating on our platform. Explore testimonials that reflect the diverse perspectives of enthusiastic learners and accomplished creators.",
  testimonials = TESTIMONIALS,
  className = "",
}: TestimonialsSectionProps = {}) {
  return (
    <section
      id="testimonials"
      className={cn(
        "relative py-20 sm:py-24 bg-white overflow-hidden",
        className,
      )}
    >
      <FloatingElement
        yOffset={5}
        duration={6}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[450px] sm:w-[580px] lg:w-[680px] pointer-events-none select-none z-0 flex items-center justify-center opacity-90"
      >
        <Image
          src="/images/discover/fram01.png"
          alt=""
          width={752}
          height={574}
          className="w-full h-full object-contain"
        />
      </FloatingElement>

      <FloatingElement
        yOffset={6}
        duration={5.5}
        delay={0.4}
        className="absolute -top-24 sm:-top-32 right-0 w-[450px] sm:w-[580px] lg:w-[680px] pointer-events-none select-none z-0 flex items-center justify-center opacity-90"
      >
        <Image
          src="/images/discover/fram01-right.png"
          alt=""
          width={638}
          height={784}
          className="w-full h-full object-contain"
        />
      </FloatingElement>

      <FloatingElement
        yOffset={6}
        duration={6.5}
        delay={0.8}
        className="absolute bottom-0 left-0 w-[480px] sm:w-[620px] lg:w-[720px] pointer-events-none select-none z-0 flex items-center justify-center opacity-80"
      >
        <Image
          src="/images/discover/fram01-blue-left.png"
          alt=""
          width={735}
          height={675}
          className="w-full h-full object-contain"
        />
      </FloatingElement>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollFadeIn yOffset={16} duration={0.6} className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-start mb-12 sm:mb-16">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.14]">
              {title}
            </h2>
          </div>
          <div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl lg:pt-1">
              {description}
            </p>
          </div>
        </ScrollFadeIn>

        <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t) => (
            <StaggerItem key={t.id} yOffset={14}>
              <TestimonialCard testimonial={t} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
