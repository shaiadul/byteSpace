"use client";

import { IconVideo } from "@tabler/icons-react";

interface LessonModule {
  id: string;
  title: string;
  description: string;
}

const LESSON_MODULES: LessonModule[] = [
  {
    id: "1",
    title: "Module 1: Introduction to Digital Assets",
    description:
      "Lay the groundwork with lessons like 'Understanding Digital Elements' and 'Navigating Design Software Tools.' Dive into the essentials of digital asset creation.",
  },
  {
    id: "2",
    title: "Module 2: Design Principles for Impact",
    description:
      "Master the principles that drive impactful designs with lessons such as 'Color Theory in Digital Design' and 'Typography Essentials.' Elevate your visual communication skills.",
  },
  {
    id: "4",
    title: "Module 4: User-Centric Design Strategies",
    description:
      "Understand 'Design Thinking in Digital Creation' and delve into 'User Experience (UX) Essentials.' Craft digital assets with a focus on user-centric design.",
  },
  {
    id: "5",
    title: "Module 5: Interactive Media and Engagement",
    description:
      "Engage your audience with lessons like 'Creating Interactive Presentations' and 'Integrating Multimedia Elements.' Master the art of creating immersive digital experiences.",
  },
  {
    id: "6",
    title: "Module 6: Project Showcase and Critique",
    description:
      "Perfect your presentation skills with 'Effective Presentation Techniques' and embrace collaboration with 'Peer Critique and Collaboration.' Showcase your work with confidence.",
  },
  {
    id: "7",
    title: "Module 7: Optimizing Digital Assets for Various Platforms",
    description:
      "Adapt your digital creations for 'Mobile Platforms' and optimize for 'Social Media.' Ensure widespread accessibility and engagement across diverse digital landscapes.",
  },
];

export function CourseLessonsTab() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-3">Explore the Modules</h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
          Immerse yourself in the course content as we break down each module into comprehensive
          lessons, providing practical insights and hands-on experiences.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-5">Lesson List</h3>
        <div className="space-y-5">
          {LESSON_MODULES.map((module) => (
            <div key={module.id} className="flex items-start gap-4 sm:gap-5">
              <div className="size-12 sm:size-13 rounded-2xl bg-brand-lime flex items-center justify-center shrink-0 shadow-xs">
                <IconVideo className="size-6 text-slate-900 stroke-[2.2]" />
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <h4 className="text-sm sm:text-[15px] font-bold text-slate-900 leading-snug">
                  {module.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1 font-normal">
                  {module.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-3">Lesson Content</h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl font-normal">
          Engage with each lesson through captivating video content, detailed textual
          explanations, and interactive elements. Download resources, complete assignments,
          and test your understanding with quizzes.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-3">Lesson Progress Tracking</h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl mb-5 font-normal">
          Witness your growth as you complete lessons, with an intuitive progress tracking feature
          guiding you through your learning journey.
        </p>

        <div className="border border-slate-200/90 rounded-2xl p-6 bg-white shadow-xs max-w-2xl">
          <div className="text-xs font-semibold text-slate-700 mb-1.5">Learning Progress</div>
          <div className="text-3xl font-black text-slate-900 tracking-tight mb-4">55%</div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
            <div className="w-[55%] h-full bg-brand-lime rounded-full transition-all duration-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
