"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { AuthModal } from "@/components/auth-modal";
import { IconMenu2, IconShoppingBag } from "@tabler/icons-react";

interface NavbarProps {
  variant?: "hero" | "default";
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Creators", href: "/creators" },
];

export function Navbar({ variant = "hero" }: NavbarProps) {
  const [authOpen, setAuthOpen] = React.useState(false);
  const [authMode, setAuthMode] = React.useState<"signin" | "signup">("signin");
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const isHero = variant === "hero";

  const handleOpenAuth = (mode: "signin" | "signup") => {
    setAuthMode(mode);
    setAuthOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`w-full z-40 relative ${
          isHero
            ? "bg-[#003be2] text-white"
            : "bg-white text-slate-900 border-b border-slate-200 sticky top-0 shadow-xs"
        }`}
      >
        {isHero && (
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
        )}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-[72px] sm:h-[76px] flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/images/global/Header_Logo.svg"
              alt="ByteSpace"
              width={160}
              height={35}
              priority
              className={`h-[30px] sm:h-[34px] w-auto ${!isHero ? "invert brightness-0" : ""}`}
            />
          </Link>

          {/* Desktop Center Navigation */}
          <nav className="hidden md:flex items-center gap-10 text-[15px] font-normal flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-opacity hover:opacity-80 ${
                  isHero ? "text-white" : "text-slate-700 hover:text-blue-600 font-medium"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right: Sign In + Join Us + Bag */}
          <div className="hidden md:flex items-center gap-7 shrink-0 text-[15px]">
            {isHero ? (
              <>
                <button
                  type="button"
                  onClick={() => handleOpenAuth("signin")}
                  className="text-white hover:opacity-80 font-normal cursor-pointer transition-opacity"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenAuth("signup")}
                  className="text-white hover:opacity-80 font-normal cursor-pointer transition-opacity"
                >
                  Join Us
                </button>
                <button
                  type="button"
                  aria-label="Shopping Cart"
                  className="text-white hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center p-0.5"
                >
                  <svg
                    width="19"
                    height="21"
                    viewBox="0 0 20 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="1"
                      y="5.5"
                      width="18"
                      height="15.5"
                      rx="3"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M6 7V4.5C6 2.567 7.79086 1 10 1C12.2091 1 14 2.567 14 4.5V7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="default"
                  onClick={() => handleOpenAuth("signin")}
                  className="font-medium text-sm cursor-pointer text-slate-700 hover:bg-slate-100"
                >
                  Sign In
                </Button>
                <Button
                  variant="secondary"
                  size="default"
                  onClick={() => handleOpenAuth("signup")}
                  className="bg-[#ccfc00] text-black hover:bg-[#b8e600] font-semibold text-sm cursor-pointer rounded-lg px-5"
                >
                  Join Us
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg cursor-pointer text-slate-700"
                >
                  <IconShoppingBag className="size-5" />
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(true)}
              className={isHero ? "text-white hover:bg-white/10" : "text-slate-900"}
              aria-label="Open Menu"
            >
              <IconMenu2 className="size-6" />
            </Button>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetContent side="right" className="w-[300px] p-6 bg-white text-slate-900">
                <SheetHeader className="text-left mb-6">
                  <SheetTitle className="flex items-center gap-2 text-xl font-bold">
                    <Image
                      src="/images/global/Header_Logo.svg"
                      alt="ByteSpace"
                      width={140}
                      height={32}
                      className="h-7 w-auto invert brightness-0"
                    />
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-4 text-base font-medium">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-2 border-b border-slate-100 text-slate-800 hover:text-blue-600"
                    >
                      {link.label}
                    </Link>
                  ))}

                  <div className="pt-6 flex flex-col gap-3">
                    <Button
                      variant="outline"
                      size="default"
                      onClick={() => handleOpenAuth("signin")}
                      className="w-full"
                    >
                      Sign In
                    </Button>
                    <Button
                      variant="secondary"
                      size="default"
                      onClick={() => handleOpenAuth("signup")}
                      className="w-full bg-[#ccfc00] text-black font-bold hover:bg-[#b8e600]"
                    >
                      Join Us
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal
        open={authOpen}
        onOpenChange={setAuthOpen}
        defaultMode={authMode}
      />
    </>
  );
}
