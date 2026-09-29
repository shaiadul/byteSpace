"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterProps {
  description?: string;
  columns?: FooterLink[][];
  copyrightText?: string;
  className?: string;
}

const DEFAULT_FOOTER_COLUMNS: FooterLink[][] = [
  [
    { label: "Featured Courses", href: "/courses" },
    { label: "Featured Categories", href: "/#categories" },
    { label: "Business", href: "/courses?category=Business" },
    { label: "IT", href: "/courses?category=IT" },
    { label: "Design", href: "/courses?category=Design" },
  ],
  [
    { label: "Development", href: "/courses?category=Development" },
    { label: "Marketing", href: "/courses?category=Marketing" },
    { label: "Photography", href: "/courses?category=Photography" },
    { label: "Finance", href: "/courses?category=Finance" },
    { label: "Sport", href: "/courses?category=Sport" },
  ],
  [
    { label: "Become a Creator", href: "/creators" },
    { label: "Affiliate Program", href: "/courses" },
    { label: "Contact", href: "/#contact" },
    { label: "Help", href: "/#help" },
    { label: "About", href: "/#about" },
  ],
];

export function Footer({
  description = "Stay Up to date with our latest features and releases by joining our newsletter.",
  columns = DEFAULT_FOOTER_COLUMNS,
  copyrightText = "® 2023 ByteSpace. All rights reserved.",
  className = "",
}: FooterProps = {}) {
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer
      className={cn(
        "bg-white text-slate-900 border-t border-border pt-16 sm:pt-20 pb-12",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-6 space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/images/global/footer_logo.svg"
                alt="ByteSpace"
                width={171}
                height={37}
                className="h-8.5 w-auto"
                priority
              />
            </Link>

            <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed max-w-md">
              {description}
            </p>

            <div className="pt-1">
              {subscribed ? (
                <div className="p-3 bg-brand-lime/30 text-slate-900 rounded-full text-xs font-semibold max-w-md">
                  ✓ Thank you! You are now subscribed to our newsletter.
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex items-center gap-3 max-w-md"
                >
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 h-12 px-6 rounded-full border border-slate-300 focus-visible:border-slate-500 focus-visible:ring-0 text-sm text-slate-800 placeholder:text-slate-400 bg-white shadow-2xs"
                  />
                  <Button
                    type="submit"
                    className="h-12 px-8 rounded-full bg-brand-lime hover:bg-brand-lime/90 text-slate-950 font-medium text-sm transition-colors cursor-pointer shrink-0"
                  >
                    Search
                  </Button>
                </form>
              )}

              <p className="text-xs text-slate-500 mt-3.5 max-w-sm leading-relaxed">
                By subscribing, you agree to our Privacy Policy and consent to
                receive updates from our company.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 lg:gap-14 pt-2">
            {columns.map((col, colIdx) => (
              <ul key={colIdx} className="space-y-4 text-sm text-slate-700">
                {col.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      href={link.href}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-200 mt-16 sm:mt-20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{copyrightText}</p>

          <div className="flex items-center gap-6 sm:gap-8 text-slate-600">
            <Link
              href="/privacy"
              className="hover:text-slate-900 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-slate-900 transition-colors"
            >
              Terms of Service
            </Link>
            <button
              type="button"
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Cookies Settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
