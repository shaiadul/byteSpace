"use client";

import Image from "next/image";
import { SectionHeader } from "@/components/section-header";
import { IconChartLine, IconCertificate, IconUsers } from "@tabler/icons-react";

export function GrowthSection() {
  const stats = [
    { value: "15K+", label: "Active Learners", icon: IconUsers },
    { value: "450+", label: "Certified Tutors", icon: IconCertificate },
    { value: "99%", label: "Course Satisfaction", icon: IconChartLine },
  ];

  return (
    <section id="growth" className="pt-20 sm:pt-24">
      <div className="absolute top-0 left-0 pointer-events-none select-none z-0 flex items-center justify-center w-1/2">
        <Image
          src="/images/hero/lime-circle-bg.png"
          alt=""
          width={1025}
          height={711}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative">
            <SectionHeader
              title="Your Path to Professional Growth Starts Here!"
              description="Explore our curated selection of courses tailored to enhance your capabilities and accelerate your career journey. Whether you are looking to sharpen specific skills, gain industry expertise, or embark on a new career path entirely, we have the resources you need."
              align="left"
              maxWidth="max-w-none"
              className="mb-8"
            />

            <div className="grid grid-cols-3 gap-4">
              {stats.map((s, idx) => {
                return (
                  <div key={idx} className="text-left">
                    <div className="text-2xl sm:text-3xl font-black text-primary tracking-tight">
                      {s.value}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-500 font-medium">
                      {s.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 w-full max-w-[480px] sm:max-w-[540px] lg:max-w-[580px] xl:max-w-[620px] aspect-[703/697] flex items-center justify-center">
            <Image
              src="/images/hero/Frame 11.png"
              alt="Best skills for continuous growth"
              fill
              priority
              className="object-contain select-none drop-shadow-lg"
              sizes="(max-width: 640px) 480px, (max-width: 1024px) 540px, 620px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
