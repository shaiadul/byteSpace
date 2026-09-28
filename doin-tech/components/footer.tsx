"use client";

import * as React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandGithub,
  IconBrandDiscord,
  IconBrandYoutube,
  IconSend,
  IconHeartFilled,
} from "@tabler/icons-react";

export function Footer() {
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-16 border-b border-slate-900">
          {/* Brand & Newsletter Column (spans 2 on lg) */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#ccfc00] text-black font-black text-xl flex items-center justify-center shadow-md">
                B
              </div>
              <span className="font-extrabold text-2xl tracking-tight">ByteSpace</span>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Empowering next-generation builders, engineers, and designers with
              interactive, project-based education.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <div className="text-sm font-bold text-white mb-2">
                Subscribe to our weekly tech briefing
              </div>
              {subscribed ? (
                <div className="p-3 bg-[#ccfc00]/20 text-[#ccfc00] rounded-xl text-xs font-semibold border border-[#ccfc00]/40">
                  ✓ Thank you! You are now subscribed to ByteSpace briefings.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-500 h-10 text-sm focus-visible:ring-[#ccfc00]"
                  />
                  <Button
                    type="submit"
                    variant="secondary"
                    className="bg-[#ccfc00] text-black hover:bg-[#b8e600] font-bold text-xs shrink-0 px-4 h-10 cursor-pointer"
                  >
                    <IconSend className="size-3.5" />
                    <span>Subscribe</span>
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-sm font-bold tracking-wider uppercase text-slate-300 mb-4">
              Explore
            </div>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-[#ccfc00] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-[#ccfc00] transition-colors">
                  All Courses
                </Link>
              </li>
              <li>
                <Link href="/#growth" className="hover:text-[#ccfc00] transition-colors">
                  Learning Path
                </Link>
              </li>
              <li>
                <Link href="/#community" className="hover:text-[#ccfc00] transition-colors">
                  Community Hub
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="hover:text-[#ccfc00] transition-colors">
                  Student Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <div className="text-sm font-bold tracking-wider uppercase text-slate-300 mb-4">
              Categories
            </div>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/courses?category=Development" className="hover:text-[#ccfc00] transition-colors">
                  Web & Mobile Dev
                </Link>
              </li>
              <li>
                <Link href="/courses?category=Design" className="hover:text-[#ccfc00] transition-colors">
                  UI/UX & Product Design
                </Link>
              </li>
              <li>
                <Link href="/courses?category=Data & AI" className="hover:text-[#ccfc00] transition-colors">
                  Artificial Intelligence
                </Link>
              </li>
              <li>
                <Link href="/courses?category=Business" className="hover:text-[#ccfc00] transition-colors">
                  Startup & Management
                </Link>
              </li>
              <li>
                <Link href="/courses?category=Marketing" className="hover:text-[#ccfc00] transition-colors">
                  Growth Marketing
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Company */}
          <div>
            <div className="text-sm font-bold tracking-wider uppercase text-slate-300 mb-4">
              Company
            </div>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/#growth" className="hover:text-[#ccfc00] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-[#ccfc00] transition-colors">
                  Become an Instructor
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#ccfc00] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#ccfc00] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#ccfc00] transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Social & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} ByteSpace Inc. Crafted with</span>
            <IconHeartFilled className="size-3.5 text-red-500 fill-current inline-block" />
            <span>for global learners.</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="hover:text-[#ccfc00] transition-colors"
            >
              <IconBrandTwitter className="size-4.5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="hover:text-[#ccfc00] transition-colors"
            >
              <IconBrandGithub className="size-4.5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:text-[#ccfc00] transition-colors"
            >
              <IconBrandLinkedin className="size-4.5" />
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Discord"
              className="hover:text-[#ccfc00] transition-colors"
            >
              <IconBrandDiscord className="size-4.5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="hover:text-[#ccfc00] transition-colors"
            >
              <IconBrandYoutube className="size-4.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
