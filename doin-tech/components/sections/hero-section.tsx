"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IconSearch } from "@tabler/icons-react";

export function HeroSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/courses?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/courses");
    }
  };

  return (
    <section className="relative bg-[#003be2] text-white overflow-hidden">
      {/* Blue grid background pattern - seamless with navbar */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "85.33px 85.33px",
          backgroundPosition: "center top",
        }}
      />

      {/* ── 3D Decorative Floating Assets ── */}

      {/* Top-left: Lime Coil */}
      <div className="absolute -left-6 sm:-left-3 md:-left-1 top-2 sm:top-4 md:top-6 w-[125px] h-[180px] sm:w-[165px] sm:h-[235px] md:w-[200px] md:h-[285px] pointer-events-none select-none z-10">
        <Image
          src="/images/home/Mask Group.png"
          alt=""
          fill
          sizes="(max-width: 768px) 165px, 200px"
          priority
          className="object-contain"
        />
      </div>

      {/* Top-right: Lime Cylinder / Cone */}
      <div className="absolute -right-5 sm:-right-2 md:right-0 top-1 sm:top-3 md:top-5 w-[115px] h-[165px] sm:w-[155px] sm:h-[220px] md:w-[185px] md:h-[265px] pointer-events-none select-none z-10">
        <Image
          src="/images/home/Cone.png"
          alt=""
          fill
          sizes="(max-width: 768px) 155px, 185px"
          priority
          className="object-contain"
        />
      </div>

      {/* Left middle: White Zigzag Squiggle */}
      <div className="absolute left-[3%] sm:left-[6%] md:left-[8%] top-[33%] sm:top-[35%] w-[55px] h-[70px] sm:w-[75px] sm:h-[95px] md:w-[90px] md:h-[115px] pointer-events-none select-none z-10">
        <Image
          src="/images/home/Frame.png"
          alt=""
          fill
          sizes="90px"
          className="object-contain"
        />
      </div>

      {/* Bottom-left: White Donut / Torus Ring */}
      <div className="absolute -left-5 sm:left-[1%] md:left-[3%] bottom-[4%] sm:bottom-[7%] w-[150px] h-[150px] sm:w-[210px] sm:h-[210px] md:w-[265px] md:h-[265px] pointer-events-none select-none z-10">
        <Image
          src="/images/home/Cone (1).png"
          alt=""
          fill
          sizes="265px"
          className="object-contain"
        />
      </div>

      {/* Right middle: White Tetrahedron / Pyramid */}
      <div className="absolute right-[5%] sm:right-[8%] md:right-[10%] top-[34%] sm:top-[37%] w-[65px] h-[65px] sm:w-[85px] sm:h-[85px] md:w-[105px] md:h-[105px] pointer-events-none select-none z-10">
        <Image
          src="/images/home/Mask Group (1).png"
          alt=""
          fill
          sizes="105px"
          className="object-contain"
        />
      </div>

      {/* Bottom-right: White Spiral Squiggle */}
      <div className="absolute right-[2%] sm:right-[4%] md:right-[6%] bottom-[8%] sm:bottom-[11%] w-[85px] h-[120px] sm:w-[115px] sm:h-[160px] md:w-[135px] md:h-[190px] pointer-events-none select-none z-10">
        <Image
          src="/images/home/Mask Group (2).png"
          alt=""
          fill
          sizes="135px"
          className="object-contain"
        />
      </div>

      {/* ── Main Content Container ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 md:pt-14 pb-0 flex flex-col items-center">

        {/* Headline */}
        <h1 className="text-center font-extrabold text-[38px] sm:text-[54px] md:text-[66px] lg:text-[76px] leading-[1.08] tracking-tight max-w-4xl text-white">
          Get Access to Hundreds
          <br />
          Courses Available
        </h1>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-5 text-center text-[15px] sm:text-base md:text-[17px] text-white/85 max-w-2xl font-light sm:font-normal leading-relaxed">
          Unlock your creativity, gain valuable knowledge, and grow your business with our wide range of courses.
        </p>

        {/* Search bar + Button side-by-side */}
        <form
          onSubmit={handleSearch}
          className="mt-7 sm:mt-8 flex items-center justify-center gap-3 w-full max-w-[540px] mx-auto px-2"
        >
          <div className="flex-1 bg-white rounded-full flex items-center gap-3 px-5 sm:px-6 h-[48px] sm:h-[50px] shadow-lg shadow-black/10">
            <IconSearch className="size-5 text-slate-400 shrink-0" stroke={2} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Course, topic, creator"
              className="w-full border-none outline-none text-slate-800 placeholder:text-slate-400 text-sm sm:text-[15px] bg-transparent font-normal"
            />
          </div>
          <button
            type="submit"
            className="h-[48px] sm:h-[50px] px-7 sm:px-8 rounded-full bg-[#D4FB20] hover:bg-[#c6eb1b] text-slate-900 font-medium text-sm sm:text-[15px] shadow-sm cursor-pointer transition-all duration-200 shrink-0 flex items-center justify-center active:scale-95"
          >
            Search
          </button>
        </form>

        {/* ── Visual Stage: Lime Ring + Student + Floating Badges ── */}
        <div className="relative mt-8 sm:mt-10 w-full max-w-5xl mx-auto flex items-end justify-center h-[340px] sm:h-[400px] md:h-[450px] lg:h-[480px]">

          {/* Lime Donut Ring (centered behind student) */}
          <div
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none select-none z-0"
            style={{
              width: "clamp(560px, 70vw, 840px)",
              height: "clamp(560px, 70vw, 840px)",
              bottom: "clamp(-340px, -42vw, -510px)",
            }}
          >
            <svg viewBox="0 0 840 840" fill="none" className="w-full h-full">
              <circle
                cx="420"
                cy="420"
                r="310"
                stroke="#D4FB20"
                strokeWidth="220"
              />
            </svg>
          </div>

          {/* Student Photo */}
          <div
            className="relative z-10 pointer-events-none select-none"
            style={{
              width: "clamp(300px, 38vw, 480px)",
              height: "clamp(220px, 27vw, 345px)",
            }}
          >
            <Image
              src="/images/home/Image.png"
              alt="ByteSpace Student"
              fill
              priority
              className="object-contain object-bottom"
              sizes="(max-width: 640px) 300px, (max-width: 1024px) 420px, 480px"
            />
          </div>

          {/* Floating Card 1: UI/UX Design (Left upper) */}
          <div
            className="absolute z-20 bg-white rounded-2xl shadow-xl shadow-black/10 px-5 py-3.5 select-none pointer-events-auto"
            style={{
              left: "clamp(8px, calc(50% - 290px), calc(50% - 250px))",
              bottom: "clamp(160px, 20vw, 225px)",
            }}
          >
            <div className="font-semibold text-slate-900 text-sm sm:text-[15px] leading-tight">
              UI/UX Design
            </div>
            <div className="text-slate-500 text-xs mt-1 font-normal tracking-wide">
              200 Courses &nbsp;•&nbsp; 1000+ Students
            </div>
          </div>

          {/* Floating Card 2: Learning Progress (Right) */}
          <div
            className="absolute z-20 bg-white rounded-2xl shadow-xl shadow-black/10 px-5 py-4 select-none pointer-events-auto min-w-[160px] sm:min-w-[180px]"
            style={{
              right: "clamp(8px, calc(50% - 290px), calc(50% - 240px))",
              bottom: "clamp(120px, 16vw, 175px)",
            }}
          >
            <div className="text-slate-600 text-xs sm:text-[13px] font-normal leading-none">
              Learning Progress
            </div>
            <div className="text-slate-900 font-extrabold text-3xl sm:text-[34px] leading-none my-2.5 tracking-tight">
              55%
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#D4FB20] rounded-full w-[55%]" />
            </div>
          </div>

          {/* Floating Card 3: Happy Students (Left lower) */}
          <div
            className="absolute z-20 bg-white rounded-2xl shadow-xl shadow-black/10 p-3 sm:p-3.5 select-none pointer-events-auto"
            style={{
              left: "clamp(6px, calc(50% - 335px), calc(50% - 300px))",
              bottom: "clamp(25px, 4vw, 45px)",
            }}
          >
            <Image
              src="/images/home/Auto Layout Vertical (1).png"
              alt="Happy Students 4.5 (240) - 2K+ students"
              width={220}
              height={90}
              className="w-[180px] sm:w-[210px] h-auto object-contain"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  );
}
