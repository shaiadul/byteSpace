"use client";

import {
  IconBook2,
  IconCertificate,
  IconInfinity,
  IconUsers,
  IconHeadphones,
} from "@tabler/icons-react";

export function FeaturesTicker() {
  const features = [
    {
      icon: IconBook2,
      title: "12K+ Online Courses",
      subtitle: "Updated for 2026",
    },
    {
      icon: IconCertificate,
      title: "Online Certificate",
      subtitle: "Accredited & shareable",
    },
    {
      icon: IconInfinity,
      title: "Lifetime Full Access",
      subtitle: "Learn at your own pace",
    },
    {
      icon: IconUsers,
      title: "Expert Top Tutors",
      subtitle: "Verified tech leaders",
    },
    {
      icon: IconHeadphones,
      title: "24/7 Mentorship Support",
      subtitle: "Real-time Discord help",
    },
  ];

  return (
    <div className="bg-white border-y border-slate-100 shadow-xs py-7 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3.5 group transition-transform hover:-translate-y-0.5"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#003be2] group-hover:bg-[#ccfc00] group-hover:text-black flex items-center justify-center shrink-0 transition-all duration-300 shadow-xs">
                  <Icon className="size-6" />
                </div>
                <div>
                  <div className="font-bold text-sm sm:text-base text-slate-900 leading-tight">
                    {item.title}
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">
                    {item.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
