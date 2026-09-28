"use client";

import Image from "next/image";
import { IconCircleCheckFilled } from "@tabler/icons-react";

interface CourseAboutTabProps {
  courseTitle?: string;
}

const SNEAK_PEAK_IMAGES = [
  "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=80",
];

const KEY_POINTS = [
  "Foundational Concepts",
  "Design Principles Mastery",
  "Advanced Techniques in Digital Creation",
  "Project Showcase and Critique",
  "Optimizing for Various Platforms",
  "Digital Asset Management Best Practices",
  "Monetization Strategies",
  "Capstone Project: Building Your Portfolio",
];

export function CourseAboutTab({ courseTitle = "Build Digital Assets: A Comprehensive Guide" }: CourseAboutTabProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Description</h2>
        <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-4 font-normal">
          <p>
            Embark on an enlightening exploration into the world of digital creation with our
            comprehensive course, &quot;{courseTitle}.&quot; This transformative learning
            experience invites you to delve deep into the intricacies of crafting impactful
            digital content. From laying the groundwork with foundational concepts to mastering
            advanced techniques, this guide is meticulously curated to empower you with the skills
            essential for navigating the dynamic landscape of digital asset creation.
          </p>
          <p>
            In the initial modules, you&apos;ll establish a solid foundation by immersing yourself
            in the foundational concepts that form the backbone of digital asset creation.
            Understand the fundamental elements that constitute compelling digital content and gain
            proficiency in leveraging these elements to communicate effectively in the digital realm.
          </p>
          <p>
            As you progress through the course, you&apos;ll ascend to higher levels of expertise,
            delving into the nuances of design principles that drive impactful creations. Uncover
            the secrets behind effective visual communication, exploring color theory, typography,
            and layout strategies that elevate your digital assets to new heights. Engage in
            hands-on exercises that reinforce your understanding, allowing you to apply these
            principles in practical scenarios.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Sneak Peak</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {SNEAK_PEAK_IMAGES.map((src, idx) => (
            <div
              key={idx}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-xs border border-slate-100 hover:shadow-md transition-shadow"
            >
              <Image
                src={src}
                alt={`Course Sneak Peak ${idx + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Key Points</h2>
        <div className="space-y-3">
          {KEY_POINTS.map((point, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <IconCircleCheckFilled className="size-5 text-[#003be2] shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-slate-800">
                {point}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
