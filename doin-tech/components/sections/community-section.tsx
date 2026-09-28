"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  IconCheck,
  IconBrandDiscord,
  IconMessageCircle,
  IconUsers,
  IconArrowRight,
} from "@tabler/icons-react";

export function CommunitySection() {
  const communityFeatures = [
    {
      title: "Active Global Study Cohorts",
      desc: "Connect with peers across 140+ countries. Study, build, and debug together in real-time.",
    },
    {
      title: "Weekly Live Masterclasses & Hackathons",
      desc: "Join weekend code sprints, critique design portfolios, and showcase your live work.",
    },
    {
      title: "Exclusive Alumni Hiring Network",
      desc: "Direct referrals to vetted tech companies looking for job-ready graduates.",
    },
  ];

  return (
    <section id="community" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual with Community Widgets */}
          <div className="relative flex justify-center items-center order-2 lg:order-1">
            {/* Lime circular backdrop disc */}
            <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full bg-[#ccfc00] absolute -left-6 bottom-4 z-0 opacity-80 shadow-2xl shadow-[#ccfc00]/20" />

            <div className="relative z-10 w-[290px] sm:w-[380px] h-[380px] sm:h-[460px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80"
                alt="ByteSpace Community Members"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />

              {/* Floating Discord Badge */}
              <div className="absolute top-6 right-4 sm:-right-4 bg-white/95 backdrop-blur-md text-slate-900 p-3 sm:p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#5865F2] text-white flex items-center justify-center">
                  <IconBrandDiscord className="size-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    ByteSpace Discord
                  </div>
                  <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping" />
                    4,210 Online Now
                  </div>
                </div>
              </div>

              {/* Floating Community Chat Bubble */}
              <div className="absolute bottom-6 left-4 sm:-left-4 bg-slate-900/95 backdrop-blur-md text-white p-3.5 px-5 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 max-w-[260px]">
                <div className="w-9 h-9 rounded-full bg-[#ccfc00] text-black font-extrabold flex items-center justify-center shrink-0 text-xs">
                  JS
                </div>
                <div className="text-xs">
                  <div className="font-bold text-[#ccfc00]">Jake Simons</div>
                  <div className="text-[11px] text-slate-300 truncate">
                    “Just landed my first junior developer role! Thank you all!”
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Text & Features */}
          <div className="order-1 lg:order-2">
            <Badge
              variant="outline"
              className="mb-4 px-3 py-1 font-semibold text-blue-700 bg-blue-50 border-blue-200"
            >
              PEER-POWERED LEARNING
            </Badge>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.15] mb-6">
              Establish lifelong community
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
              Learning alone is hard. At ByteSpace, you join an active, welcoming ecosystem
              where peers collaborate on portfolio projects, share resume feedback, and cheer
              each other on toward milestone achievements.
            </p>

            <div className="space-y-5 mb-10">
              {communityFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-[#ccfc00] text-black flex items-center justify-center shrink-0 mt-1 shadow-xs">
                    <IconCheck className="size-4 stroke-[3]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base mb-1">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="secondary"
                size="lg"
                className="bg-[#ccfc00] text-black font-extrabold hover:bg-[#b8e600] px-7 shadow-md cursor-pointer gap-2"
                onClick={() => window.open("https://discord.com", "_blank")}
              >
                <IconBrandDiscord className="size-5" />
                <span>Join Discord Community</span>
              </Button>
              <Link href="/courses">
                <Button
                  variant="outline"
                  size="lg"
                  className="font-bold border-slate-300 hover:bg-slate-100 cursor-pointer"
                >
                  Explore Events
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
