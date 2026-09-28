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
  maxWidth = "max-w-3xl",
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
          "text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]",
          titleClassName
        )}
      >
        {title}
      </HeadingTag>

      {description && (
        <p
          className={cn(
            "text-muted-foreground text-base sm:text-lg leading-relaxed mt-4",
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
