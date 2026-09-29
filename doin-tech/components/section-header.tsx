import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  badge?: React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  as?: "h1" | "h2" | "h3";
  maxWidth?: string;
  children?: React.ReactNode;
}

export function SectionHeader({
  title,
  description,
  badge,
  align = "center",
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  as: HeadingTag = "h2",
  maxWidth = "max-w-5xl",
  children,
}: SectionHeaderProps) {
  const alignmentClasses = {
    left: "text-left mr-auto items-start",
    center: "text-center mx-auto items-center",
    right: "text-right ml-auto items-end",
  }[align];

  return (
    <div
      className={cn("flex flex-col w-full", maxWidth, alignmentClasses, className)}
    >
      {badge && <div className="mb-3.5">{badge}</div>}

      <HeadingTag
        className={cn(
          "font-heading font-semibold text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-[-0.01em] leading-[120%]",
          titleClassName
        )}
      >
        {title}
      </HeadingTag>

      {description && (
        <p
          className={cn(
            "font-sans font-normal text-base sm:text-[18px] text-slate-600 leading-[160%] tracking-normal mt-4 sm:mt-5",
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}

      {children}
    </div>
  );
}
