"use client";

import Image from "next/image";
import { FloatingElement } from "@/components/motion/motion-elements";

interface AuthSideArtProps {
  heading: string;
  description: string;
}

export function AuthSideArt({ heading, description }: AuthSideArtProps) {
  return (
    <div className="hidden lg:flex lg:col-span-6 flex-col justify-center pr-6">
      <h1 className="text-2xl xl:text-3xl font-normal text-white mb-2">
        {heading}
      </h1>
      <p className="text-white/80 text-xs xl:text-sm max-w-sm leading-relaxed mb-6 xl:mb-8 font-normal">
        {description}
      </p>

      <div className="relative w-[360px] xl:w-[410px] h-[320px] xl:h-[360px] select-none pointer-events-none">
        <FloatingElement
          yOffset={3}
          duration={5.0}
          delay={0.2}
          className="absolute top-8 left-0 w-[270px] xl:w-[310px] h-auto z-10"
        >
          <Image
            src="/images/auth/bottom-card.png"
            alt="Build Digital Asset Preview"
            width={373}
            height={384}
            className="w-full h-auto drop-shadow-xl"
            priority
          />
        </FloatingElement>

        <FloatingElement
          yOffset={4}
          duration={5.4}
          delay={0.5}
          className="absolute top-0 left-12 xl:left-14 w-[270px] xl:w-[310px] h-auto z-20"
        >
          <Image
            src="/images/auth/above-card.png"
            alt="Big Data Course Preview"
            width={373}
            height={384}
            className="w-full h-auto drop-shadow-2xl"
            priority
          />
        </FloatingElement>

        <FloatingElement
          yOffset={6}
          duration={4.2}
          delay={0.1}
          rotateOffset={2}
          className="absolute -top-5 -left-5 w-[100px] xl:w-[120px] h-auto z-30"
        >
          <Image
            src="/images/auth/top-lime-ring.png"
            alt="Lime Ring"
            width={148}
            height={147}
            className="w-full h-auto drop-shadow-lg"
          />
        </FloatingElement>

        <FloatingElement
          yOffset={5}
          duration={4.6}
          delay={0.6}
          rotateOffset={-2}
          className="absolute top-24 -right-2 w-[110px] xl:w-[130px] h-auto z-30"
        >
          <Image
            src="/images/auth/spring-frame.png"
            alt="Spring Element"
            width={177}
            height={176}
            className="w-full h-auto drop-shadow-md"
          />
        </FloatingElement>

        <FloatingElement
          yOffset={4}
          duration={4.4}
          delay={0.8}
          className="absolute -bottom-2 right-4 w-[190px] xl:w-[215px] h-auto z-30"
        >
          <Image
            src="/images/auth/happy-student.png"
            alt="Happy Students"
            width={258}
            height={123}
            className="w-full h-auto drop-shadow-xl"
          />
        </FloatingElement>

        <FloatingElement
          yOffset={5}
          duration={4.8}
          delay={0.4}
          rotateOffset={1.5}
          className="absolute -bottom-7 -left-6 w-[110px] xl:w-[125px] h-auto z-30"
        >
          <Image
            src="/images/auth/peyramid.png"
            alt="Lime Pyramid"
            width={190}
            height={189}
            className="w-full h-auto drop-shadow-xl"
          />
        </FloatingElement>
      </div>
    </div>
  );
}
