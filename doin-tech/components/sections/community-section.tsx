"use client";

import Image from "next/image";
import { SectionHeader } from "@/components/section-header";
import { IconCheck } from "@tabler/icons-react";

export function CommunitySection() {
  const communityFeatures = [
    {
      title: "Share Your Expertise",
    },
    {
      title: "Weekly Live Masterclasses & Hackathons",
    },
    {
      title: "Exclusive Alumni Hiring Network",
    },
    {
      title: "Create & Manage Courses Easily.",
    },
  ];

  return (
    <section id="community">
      <div className="absolute -bottom-30 left-0 pointer-events-none select-none z-0 flex items-center justify-center w-1/2">
        <Image
          src="/images/hero/lime-circle-bg-bottom.png"
          alt=""
          width={1025}
          height={711}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="absolute bottom-0 right-0 w-1/2 pointer-events-none select-none z-0 flex items-center justify-center">
        <Image
          src="/images/hero/blue-cricle-bg.png"
          alt=""
          width={758}
          height={712}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative flex justify-center items-center order-2 lg:order-1">
            <div className="relative z-10 w-full max-w-[390px] sm:max-w-[450px] lg:max-w-[480px] aspect-[587/719] flex items-center justify-center">
              <Image
                src="/images/hero/Frame 12.png"
                alt="Establish lifelong community"
                fill
                priority
                className="object-contain select-none drop-shadow-lg"
                sizes="(max-width: 640px) 360px, (max-width: 1024px) 450px, 480px"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <SectionHeader
              title="Create & Manage Courses Easily."
              description="ByteSpace supports individuals or entities in the creation, publication, and administration of educational courses."
              align="left"
              maxWidth="max-w-none"
              className="mb-8"
            />

            <div className="space-y-3 mb-10">
              {communityFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 mt-1 shadow-xs">
                    <IconCheck className="size-3 stroke-1.5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900 text-base mb-1">
                      {feat.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
