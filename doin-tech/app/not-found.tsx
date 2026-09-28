"use client";

import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { IconHome, IconSearch, IconArrowRight } from "@tabler/icons-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar variant="hero" />

      {/* 404 Hero Section matching Figma Design */}
      <main className="flex-1 flex flex-col items-center justify-center bg-[#003be2] text-white py-24 px-4 text-center relative overflow-hidden">
        {/* Playful Floating Geometry */}
        <div className="absolute top-12 left-16 w-16 h-16 text-[#ccfc00] opacity-80 pointer-events-none">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full stroke-current stroke-[14] stroke-linecap-round">
            <path d="M10 50 Q 30 10, 50 50 T 90 50" />
          </svg>
        </div>

        <div className="absolute bottom-16 right-20 w-24 h-24 rounded-full border-[12px] border-white/20 pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Big Neon Lime 404 */}
          <div className="text-8xl sm:text-9xl md:text-[160px] font-black text-[#ccfc00] tracking-tighter leading-none mb-4 drop-shadow-xl select-none">
            404
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
            The page you are looking for doesn&apos;t exist
          </h1>

          <p className="text-blue-100 text-sm sm:text-base max-w-md mx-auto mb-10 leading-relaxed">
            The URL may have been mistyped or moved. Head back home or browse our popular
            courses catalog.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button
                variant="secondary"
                size="lg"
                className="bg-[#ccfc00] text-black hover:bg-[#b8e600] font-extrabold px-8 text-base shadow-xl cursor-pointer gap-2"
              >
                <IconHome className="size-5" />
                <span>Return to Home</span>
              </Button>
            </Link>

            <Link href="/courses">
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 font-bold px-7 text-base cursor-pointer gap-2"
              >
                <IconSearch className="size-5" />
                <span>Browse Courses</span>
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
