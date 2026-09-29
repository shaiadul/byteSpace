"use client";

import Link from "next/link";
import { Navbar } from "@/components/navbar";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col bg-brand-blue text-white relative overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
        `,
        backgroundSize: "85.33px 85.33px",
        backgroundPosition: "center top",
      }}
    >
      <Navbar variant="hero" />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 text-center relative z-10">
        <div className="flex flex-col items-center justify-center select-none w-full max-w-4xl mx-auto">
          <div className="text-[150px] sm:text-[210px] md:text-[270px] lg:text-[320px] font-black tracking-tight leading-[0.82] bg-linear-to-b from-brand-lime via-brand-lime/75 to-transparent bg-clip-text text-transparent">
            404
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-white tracking-tight leading-[1.12] -mt-6 sm:-mt-9 md:-mt-12 lg:-mt-14 relative z-10">
            The page you are looking
            <br />
            for doesn&apos;t exist
          </h1>

          <p className="mt-7 sm:mt-8 text-xs sm:text-[13px] md:text-sm text-blue-100/90 font-normal max-w-md">
            Try to use a correct url or go back to homepage to start again
          </p>

          <Link
            href="/"
            className="mt-5 sm:mt-6 bg-brand-lime hover:bg-brand-lime/90 text-slate-900 font-medium text-xs sm:text-sm px-6 sm:px-7 py-2.5 sm:py-3 rounded-full transition-colors shadow-xs cursor-pointer inline-flex items-center justify-center"
          >
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
