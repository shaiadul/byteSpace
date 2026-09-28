"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  IconCheck,
  IconSparkles,
  IconArrowRight,
  IconChartLine,
  IconCertificate,
  IconUsers,
} from "@tabler/icons-react";

export function GrowthSection() {
  const stats = [
    { value: "15K+", label: "Active Learners", icon: IconUsers },
    { value: "450+", label: "Certified Tutors", icon: IconCertificate },
    { value: "99%", label: "Course Satisfaction", icon: IconChartLine },
  ];

  const highlights = [
    "Practical curriculum updated quarterly to match current tech standards",
    "Real-world capstone projects reviewed by senior industry engineers",
    "1-on-1 scheduled office hours and portfolio reviews",
  ];

  return (
    <section id="growth" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-[#ccfc00]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text & Stats */}
          <div>
            <Badge
              variant="outline"
              className="mb-4 px-3 py-1 font-semibold text-blue-700 bg-blue-50 border-blue-200"
            >
              ACCELERATED CAREER PATH
            </Badge>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.15] mb-6">
              Best skills for continuous growth with us
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
              We empower learners and professionals around the globe to break into
              high-growth careers. Learn hands-on with actionable roadmaps, live mentorship,
              and verified credentialing.
            </p>

            {/* Checklist */}
            <div className="space-y-3.5 mb-10">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#ccfc00] text-black flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <IconCheck className="size-3.5 stroke-[3]" />
                  </div>
                  <span className="text-sm sm:text-base text-slate-700 font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Stats Counter Row */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-100 mb-8">
              {stats.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <div key={idx} className="text-left">
                    <div className="flex items-center gap-1.5 text-blue-600 mb-1">
                      <Icon className="size-4" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      {s.value}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-500 font-medium">
                      {s.label}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-4">
              <Link href="/courses">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-[#003be2] text-white hover:bg-[#0033c4] font-bold px-7 shadow-lg shadow-blue-600/20 cursor-pointer gap-2"
                >
                  <span>Explore Programs</span>
                  <IconArrowRight className="size-4" />
                </Button>
              </Link>
              <Link href="/courses">
                <Button
                  variant="outline"
                  size="lg"
                  className="font-bold border-slate-300 hover:bg-slate-100 cursor-pointer"
                >
                  View Syllabus
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Composition with Lime Accent Shapes */}
          <div className="relative flex justify-center items-center">
            {/* Playful lime organic shape backdrop */}
            <div className="w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full bg-[#ccfc00] absolute -right-6 top-8 z-0 opacity-90 shadow-2xl shadow-[#ccfc00]/25" />

            {/* Primary Portrait Card */}
            <div className="relative z-10 w-[300px] sm:w-[380px] h-[400px] sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80"
                alt="Continuous Growth Mentor"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />

              {/* Floating Completion Metric Pill */}
              <div className="absolute top-6 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md text-slate-900 p-3.5 sm:p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ccfc00] text-black font-extrabold flex items-center justify-center text-sm">
                  85%
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Course Progression
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Frontend Master Track
                  </div>
                </div>
              </div>

              {/* Floating Verified Mentor Badge */}
              <div className="absolute bottom-6 right-4 sm:right-6 bg-slate-900/90 backdrop-blur-md text-white p-3.5 px-5 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10">
                <IconSparkles className="size-5 text-[#ccfc00]" />
                <div className="text-left">
                  <div className="text-xs font-bold">1-on-1 Mentorship</div>
                  <div className="text-[11px] text-slate-300">Daily Live Q&A</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
