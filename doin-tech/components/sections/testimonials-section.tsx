"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TESTIMONIALS } from "@/lib/data";
import { IconStarFilled, IconQuote } from "@tabler/icons-react";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-[#ccfc00]/15 via-white to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge
            variant="outline"
            className="mb-3 px-3 py-1 font-semibold text-blue-700 bg-blue-50 border-blue-200"
          >
            REAL OUTCOMES
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Student&apos;s Stories & Community Insights
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Hear from career-changers and experienced developers who reached their dream roles
            through ByteSpace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <Card
              key={t.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  {/* 5 Stars */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <IconStarFilled key={i} className="size-4 fill-amber-400" />
                    ))}
                  </div>
                  <IconQuote className="size-7 text-slate-200 group-hover:text-[#003be2]/30 transition-colors" />
                </div>

                <p className="text-slate-700 text-base leading-relaxed mb-6 italic">
                  “{t.quote}”
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-100 ring-2 ring-[#ccfc00] shrink-0">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">
                    {t.name}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    {t.role}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
