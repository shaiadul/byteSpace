"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/section-header";
import { AuthModal } from "@/components/auth-modal";
import { cn } from "@/lib/utils";

import { FloatingElement, ScrollFadeIn } from "@/components/motion/motion-elements";

export interface CtaBannerProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
}

export function CtaBanner({
  title = "Unlock Your Potential as a Creator with ByteSpace",
  description = "Experience the collaboration of numerous creators and an expanding selection of courses. Register now and become a part of a community comprising over 10,000 local and international creators. Utilize our Course Editor, and showcase your expertise by publishing your finest course on the ByteSpace Course Library.",
  buttonText = "Join as Creator",
  onButtonClick,
  className = "",
}: CtaBannerProps = {}) {
  const [authOpen, setAuthOpen] = React.useState(false);

  return (
    <>
      <section
        className={cn(
          "relative bg-brand-blue text-white py-16 sm:py-20 lg:py-24 overflow-hidden",
          className,
        )}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "85.33px 85.33px",
            backgroundPosition: "center top",
          }}
        />

        <FloatingElement
          yOffset={6}
          duration={4.8}
          delay={0.2}
          rotateOffset={1}
          className="absolute -top-2 sm:-top-3 md:top-0 -left-4 sm:-left-2 md:left-0 w-[85px] sm:w-[125px] md:w-[155px] lg:w-[185px] aspect-[267/225] pointer-events-none select-none z-10"
        >
          <Image
            src="/images/unlock/Frame (2).png"
            alt=""
            fill
            sizes="(max-width: 768px) 125px, 185px"
            className="object-contain"
          />
        </FloatingElement>

        <FloatingElement
          yOffset={5}
          duration={5.2}
          delay={0.5}
          rotateOffset={-1.5}
          className="hidden lg:block absolute top-[8%] left-[16%] xl:left-[18%] w-[90px] xl:w-[110px] aspect-[177/176] pointer-events-none select-none z-10"
        >
          <Image
            src="/images/unlock/Frame (1).png"
            alt=""
            fill
            sizes="110px"
            className="object-contain"
          />
        </FloatingElement>

        <FloatingElement
          yOffset={5}
          duration={4.4}
          delay={0.3}
          rotateOffset={1}
          className="absolute bottom-[10%] sm:bottom-[13%] md:bottom-[16%] left-0 sm:left-[1%] md:left-[2%] w-[45px] sm:w-[65px] md:w-[85px] lg:w-[105px] aspect-[140/189] pointer-events-none select-none z-10"
        >
          <Image
            src="/images/unlock/Cone (2).png"
            alt=""
            fill
            sizes="(max-width: 768px) 65px, 105px"
            className="object-contain"
          />
        </FloatingElement>

        <FloatingElement
          yOffset={7}
          duration={5.8}
          delay={0.7}
          className="absolute -bottom-4 sm:-bottom-6 md:-bottom-8 left-[3%] sm:left-[5%] md:left-[6%] lg:left-[7%] w-[120px] sm:w-[170px] md:w-[220px] lg:w-[270px] aspect-[346/190] pointer-events-none select-none z-10"
        >
          <Image
            src="/images/unlock/Cone (1).png"
            alt=""
            fill
            sizes="(max-width: 768px) 170px, 270px"
            className="object-contain"
          />
        </FloatingElement>

        <FloatingElement
          yOffset={5}
          duration={4.9}
          delay={0.4}
          rotateOffset={1.2}
          className="hidden lg:block absolute top-[8%] right-[15%] xl:right-[17%] w-[100px] xl:w-[125px] aspect-[190/189] pointer-events-none select-none z-10"
        >
          <Image
            src="/images/unlock/Cone.png"
            alt=""
            fill
            sizes="125px"
            className="object-contain"
          />
        </FloatingElement>

        <FloatingElement
          yOffset={6}
          duration={5.4}
          delay={0.6}
          rotateOffset={-1}
          className="absolute top-[2%] sm:top-[3%] md:top-[4%] -right-4 sm:-right-2 md:right-0 w-[75px] sm:w-[110px] md:w-[140px] lg:w-[170px] aspect-[218/372] pointer-events-none select-none z-10"
        >
          <Image
            src="/images/unlock/Mask Group.png"
            alt=""
            fill
            sizes="(max-width: 768px) 110px, 170px"
            className="object-contain"
          />
        </FloatingElement>

        <FloatingElement
          yOffset={6}
          duration={5.1}
          delay={0.8}
          className="absolute -bottom-3 sm:-bottom-5 md:-bottom-7 right-[2%] sm:right-[4%] md:right-[5%] lg:right-[6%] w-[100px] sm:w-[145px] md:w-[185px] lg:w-[225px] aspect-[334/199] pointer-events-none select-none z-10"
        >
          <Image
            src="/images/unlock/Frame.png"
            alt=""
            fill
            sizes="(max-width: 768px) 145px, 225px"
            className="object-contain"
          />
        </FloatingElement>

        <ScrollFadeIn yOffset={16} duration={0.6} className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <SectionHeader
            title={title}
            description={description}
            align="center"
            maxWidth="max-w-3xl"
            titleClassName="text-white text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.01em] leading-[120%]"
            descriptionClassName="text-white/90 text-sm sm:text-[18px] max-w-4xl mx-auto leading-[160%] tracking-normal font-normal mt-4 sm:mt-5"
          >
            <div className="mt-6 sm:mt-8 flex justify-center">
              <Button
                type="button"
                onClick={onButtonClick ?? (() => setAuthOpen(true))}
                className="bg-brand-lime hover:bg-brand-lime/90 text-slate-950 font-semibold text-xs sm:text-sm md:text-[15px] px-7 sm:px-9 py-2.5 sm:py-3 h-auto rounded-full shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-95"
              >
                {buttonText}
              </Button>
            </div>
          </SectionHeader>
        </ScrollFadeIn>
      </section>

      <AuthModal
        open={authOpen}
        onOpenChange={setAuthOpen}
        defaultMode="signup"
      />
    </>
  );
}
