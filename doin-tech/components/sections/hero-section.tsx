"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
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
    <section className="relative bg-brand-blue text-white overflow-hidden min-h-[calc(100vh-72px)] sm:min-h-[calc(100vh-76px)] lg:h-[calc(100vh-76px)] flex flex-col justify-between">
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

      <div className="absolute -left-5 sm:-left-3 md:-left-1 top-1 sm:top-2 md:top-3 w-[70px] h-[100px] sm:w-[125px] sm:h-[180px] md:w-[155px] md:h-[225px] lg:w-[175px] lg:h-[255px] pointer-events-none select-none z-10">
        <Image
          src="/images/home/Mask Group.png"
          alt=""
          fill
          sizes="(max-width: 640px) 70px, (max-width: 768px) 125px, 175px"
          priority
          className="object-contain"
        />
      </div>

      <div className="absolute -right-4 sm:-right-2 md:-right-4.5 top-1 sm:top-2 md:top-3 w-[75px] h-[110px] sm:w-[140px] sm:h-[200px] md:w-[170px] md:h-[245px] lg:w-[195px] lg:h-[280px] pointer-events-none select-none z-10">
        <Image
          src="/images/home/Cone.png"
          alt=""
          fill
          sizes="(max-width: 640px) 75px, (max-width: 768px) 140px, 195px"
          priority
          className="object-contain"
        />
      </div>

      <div className="hidden xs:block absolute left-[2%] sm:left-[4%] md:left-[6%] top-[30%] sm:top-[33%] w-[40px] h-[52px] sm:w-[70px] sm:h-[90px] md:w-[85px] md:h-[110px] pointer-events-none select-none z-10">
        <Image
          src="/images/home/Frame.png"
          alt=""
          fill
          sizes="85px"
          className="object-contain"
        />
      </div>

      <div className="absolute -left-4 sm:left-[1%] md:left-[2%] bottom-[2%] sm:bottom-[3%] w-[100px] h-[100px] sm:w-[190px] sm:h-[190px] md:w-[240px] md:h-[240px] lg:w-[275px] lg:h-[275px] pointer-events-none select-none z-10 opacity-70 sm:opacity-100">
        <Image
          src="/images/home/Cone (1).png"
          alt=""
          fill
          sizes="(max-width: 640px) 100px, 275px"
          className="object-contain"
        />
      </div>

      <div className="hidden xs:block absolute right-[3%] sm:right-[5%] md:right-[7%] top-[30%] sm:top-[33%] w-[45px] h-[45px] sm:w-[75px] sm:h-[75px] md:w-[95px] md:h-[95px] pointer-events-none select-none z-10">
        <Image
          src="/images/home/Mask Group (1).png"
          alt=""
          fill
          sizes="95px"
          className="object-contain"
        />
      </div>

      <div className="absolute right-[2%] sm:right-[3%] md:right-[4%] bottom-[2%] sm:bottom-[4%] w-[65px] h-[90px] sm:w-[100px] sm:h-[140px] md:w-[125px] md:h-[175px] lg:w-[140px] lg:h-[195px] pointer-events-none select-none z-10 opacity-70 sm:opacity-100">
        <Image
          src="/images/home/Mask Group (2).png"
          alt=""
          fill
          sizes="(max-width: 640px) 65px, 140px"
          className="object-contain"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-between flex-1 w-full">
        <div className="flex flex-col items-center text-center pt-4 sm:pt-3 md:pt-4 lg:pt-5 my-auto lg:my-0 shrink-0 w-full max-w-4xl">
          <h1 className="text-center font-extrabold text-[28px] xs:text-[32px] sm:text-[46px] md:text-[56px] lg:text-[66px] xl:text-[72px] leading-[1.08] sm:leading-[1.06] tracking-tight max-w-4xl text-white px-2">
            Get Access to Hundreds
            <br />
            Courses Available
          </h1>

          <p className="mt-1.5 sm:mt-2.5 text-center text-xs sm:text-sm md:text-base text-white/85 max-w-2xl font-light sm:font-normal leading-relaxed px-4">
            Unlock your creativity, gain valuable knowledge, and grow your
            business with our wide range of courses.
          </p>

          <form
            onSubmit={handleSearch}
            className="mt-3.5 sm:mt-4 md:mt-5 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 w-full max-w-[540px] mx-auto px-4 sm:px-2"
          >
            <div className="w-full sm:flex-1 bg-white rounded-full flex items-center gap-2.5 sm:gap-3 px-4 sm:px-6 h-[44px] sm:h-[48px] md:h-[50px] shadow-lg shadow-black/10 min-w-0">
              <IconSearch
                className="size-4 sm:size-5 text-slate-400 shrink-0"
                stroke={2}
              />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Course, topic, creator"
                className="w-full border-none shadow-none focus-visible:ring-0 focus-visible:border-none text-slate-800 placeholder:text-slate-400 text-xs sm:text-sm md:text-[15px] bg-transparent font-normal h-full p-0"
              />
            </div>
            <Button
              type="submit"
              className="w-auto px-8 h-[40px] sm:h-[48px] md:h-[50px] rounded-full bg-[#D4FB20] hover:bg-[#c6eb1b] text-slate-900 font-semibold text-xs sm:text-sm md:text-[15px] shadow-sm cursor-pointer transition-all duration-200 shrink-0 flex items-center justify-center active:scale-95 border-none mx-auto sm:mx-0"
            >
              Search
            </Button>
          </form>
        </div>

        <div className="relative w-full max-w-6xl mx-auto flex items-end justify-center flex-1 min-h-[270px] sm:min-h-[340px] lg:min-h-0">
          <div
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none select-none z-0"
            style={{
              width: "clamp(520px, 78vw, 1080px)",
              height: "clamp(520px, 78vw, 1080px)",
              bottom:
                "calc(-1 * clamp(520px, 78vw, 1080px) + clamp(250px, 48vh, 440px))",
            }}
          >
            <svg viewBox="0 0 840 840" fill="none" className="w-full h-full">
              <circle
                cx="420"
                cy="420"
                r="295"
                stroke="#D4FB20"
                strokeWidth="150"
              />
            </svg>
          </div>

          <div className="relative z-10 pointer-events-none select-none h-[clamp(260px,46vh,460px)] max-h-full aspect-[722/515]">
            <Image
              src="/images/home/Image.png"
              alt="ByteSpace Student"
              fill
              priority
              className="object-contain object-bottom"
              sizes="(max-width: 640px) 340px, (max-width: 1024px) 540px, 640px"
            />
          </div>

          <div
            className="absolute z-20 bg-white rounded-xl sm:rounded-2xl shadow-xl shadow-black/10 px-3 py-2 sm:px-4 lg:px-5 sm:py-3 lg:py-3.5 select-none pointer-events-auto"
            style={{
              left: "clamp(8px, calc(50% - 315px), calc(50% - 240px))",
              bottom: "clamp(145px, 26vh, 250px)",
            }}
          >
            <div className="font-semibold text-slate-900 text-[11px] sm:text-xs md:text-[15px] leading-tight">
              UI/UX Design
            </div>
            <div className="text-slate-500 text-[9px] sm:text-[10px] md:text-xs mt-0.5 sm:mt-1 font-normal tracking-wide">
              200 Courses &nbsp;•&nbsp; 1000+ Students
            </div>
          </div>

          <div
            className="absolute z-20 bg-white rounded-xl sm:rounded-2xl shadow-xl shadow-black/10 px-3 py-2 sm:px-4 lg:px-5 sm:py-3 lg:py-4 select-none pointer-events-auto min-w-[125px] sm:min-w-[155px] lg:min-w-[185px]"
            style={{
              right: "clamp(8px, calc(50% - 325px), calc(50% - 250px))",
              bottom: "clamp(105px, 19vh, 185px)",
            }}
          >
            <div className="text-slate-600 text-[9px] sm:text-[10px] md:text-[13px] font-normal leading-none">
              Learning Progress
            </div>
            <div className="text-slate-900 font-extrabold text-xl sm:text-2xl md:text-[34px] leading-none my-1 sm:my-1.5 md:my-2.5 tracking-tight">
              55%
            </div>
            <div className="w-full h-1 sm:h-1.5 md:h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#D4FB20] rounded-full w-[55%]" />
            </div>
          </div>

          <div
            className="absolute z-20 bg-white rounded-xl sm:rounded-2xl shadow-xl shadow-black/10 p-1.5 sm:p-2 md:p-3 select-none pointer-events-auto"
            style={{
              left: "clamp(6px, calc(50% - 340px), calc(50% - 270px))",
              bottom: "clamp(8px, 2.5vh, 28px)",
            }}
          >
            <Image
              src="/images/home/Auto Layout Vertical (1).png"
              alt="Happy Students 4.5 (240) - 2K+ students"
              width={220}
              height={90}
              className="w-[125px] sm:w-[160px] md:w-[220px] h-auto object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
