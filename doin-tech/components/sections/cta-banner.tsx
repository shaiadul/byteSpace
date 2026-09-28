"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/auth-modal";
import { IconSparkles, IconArrowRight, IconShieldCheck } from "@tabler/icons-react";

export function CtaBanner() {
  const [authOpen, setAuthOpen] = React.useState(false);

  return (
    <>
      <section className="relative bg-[#003be2] text-white py-20 sm:py-24 overflow-hidden">
        {/* Playful Figma geometric elements */}
        <div className="absolute top-8 left-8 sm:left-20 w-14 h-14 text-[#ccfc00] opacity-80 pointer-events-none">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full stroke-current stroke-[14] stroke-linecap-round">
            <path d="M10 50 Q 30 10, 50 50 T 90 50" />
          </svg>
        </div>

        <div className="absolute bottom-8 left-12 sm:left-32 w-16 h-16 rounded-full border-[10px] border-white/20 pointer-events-none" />

        <div className="absolute top-10 right-10 sm:right-24 w-16 h-16 text-[#ccfc00] pointer-events-none">
          <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full rotate-45 opacity-90">
            <polygon points="50 15, 90 85, 10 85" />
          </svg>
        </div>

        <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full border-[16px] border-[#ccfc00]/25 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold mb-6">
            <IconSparkles className="size-4 text-[#ccfc00]" />
            <span>Zero Risk • 7-Day Unlimited Free Access</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6 max-w-3xl mx-auto">
            Start Your Free Trial and Access All Courses
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            Gain immediate access to 12,000+ interactive courses, code sandboxes, and mentor
            reviews. No credit card required to start.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setAuthOpen(true)}
              className="bg-[#ccfc00] text-black hover:bg-[#b8e600] font-black text-base sm:text-lg px-8 py-6 rounded-full shadow-2xl transition-transform hover:scale-105 active:scale-95 cursor-pointer gap-2"
            >
              <span>Get Started Now</span>
              <IconArrowRight className="size-5" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => setAuthOpen(true)}
              className="text-white hover:bg-white/10 font-bold text-base px-6 rounded-full border border-white/30 cursor-pointer"
            >
              View Membership Plans
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-blue-200">
            <div className="flex items-center gap-1.5">
              <IconShieldCheck className="size-4 text-[#ccfc00]" />
              <span>Cancel anytime in 1 click</span>
            </div>
            <div className="flex items-center gap-1.5">
              <IconShieldCheck className="size-4 text-[#ccfc00]" />
              <span>Official certificates included</span>
            </div>
          </div>
        </div>
      </section>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} defaultMode="signup" />
    </>
  );
}
