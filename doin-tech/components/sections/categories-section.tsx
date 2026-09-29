"use client";

import Link from "next/link";
import { SectionHeader } from "@/components/section-header";
import { FEATURE_TOPICS } from "@/lib/data";
import {
  IconPalette,
  IconCode,
  IconChartBar,
  IconBrain,
  IconCloud,
  IconBriefcase,
} from "@tabler/icons-react";
import { ScrollFadeIn, StaggerContainer, StaggerItem } from "@/components/motion/motion-elements";

export function CategoriesSection() {
  const iconMap: Record<string, React.ElementType> = {
    palette: IconPalette,
    code: IconCode,
    chart: IconChartBar,
    brain: IconBrain,
    cloud: IconCloud,
    briefcase: IconBriefcase,
  };

  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollFadeIn yOffset={16} duration={0.55}>
          <SectionHeader
            title="Explore Diverse Learning Paths at Bytespace"
            description="At Bytespace, we believe in empowering individuals through knowledge. Our diverse range of courses spans various fields, ensuring there's something for everyone. Unleash your potential and explore our carefully curated categories."
            align="center"
            className="mb-14"
          >
            {null}
          </SectionHeader>
        </ScrollFadeIn>

        <StaggerContainer staggerDelay={0.06} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {FEATURE_TOPICS.map((topic) => {
            const Icon = iconMap[topic.icon] || IconCode;
            return (
              <StaggerItem key={topic.id} yOffset={14}>
                <Link
                  href={`/courses?category=${encodeURIComponent(topic.name)}`}
                  className="group p-6 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-brand-blue/40 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center cursor-pointer relative h-full"
                >
                  <div className="w-16 h-16 rounded-full bg-brand-lime text-black flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md">
                    <Icon className="size-8" />
                  </div>

                  <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-brand-blue transition-colors">
                    {topic.name}
                  </h3>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
