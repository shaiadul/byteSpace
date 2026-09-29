"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { AuthSideArt } from "@/components/auth/auth-side-art";
import { SignInForm } from "@/components/auth/signin-form";
import { SignUpForm } from "@/components/auth/signup-form";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { OtpForm } from "@/components/auth/otp-form";

export type AuthMode = "signin" | "signup" | "forgot" | "otp";

interface AuthPageViewProps {
  initialMode?: AuthMode;
}

export function AuthPageView({ initialMode = "signin" }: AuthPageViewProps) {
  const [mode, setMode] = React.useState<AuthMode>(initialMode);

  const titlesByMode = {
    signin: { badge: "Sign In", heading: "Welcome Back" },
    signup: { badge: "Sign Up", heading: "Create Account" },
    forgot: { badge: "Forgot Password", heading: "Reset Password" },
    otp: { badge: "Verification", heading: "Enter OTP Code" },
  };

  const sideHeading =
    mode === "signin"
      ? "Sign up and come in"
      : mode === "signup"
        ? "Sign up with ease"
        : mode === "forgot"
          ? "Reset your password"
          : "Verify your email";

  const sideDescription =
    mode === "signin"
      ? "Experience a seamless and efficient sign-in process that grants you instant access to a world of knowledge."
      : mode === "signup"
        ? "Create your account today and embark on a transformative learning and creation journey with ByteSpace."
        : mode === "forgot"
          ? "Forgot your password? No worries, enter your registered email and we will send you a verification code."
          : "Verify your email address using the 6-digit verification code to keep your account secure.";

  return (
    <div
      className="h-screen w-full bg-brand-blue text-white flex flex-col justify-between overflow-hidden relative select-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
        `,
        backgroundSize: "85.33px 85.33px",
        backgroundPosition: "center top",
      }}
    >
      <header className="w-full max-w-7xl mx-auto p-6 sm:p-8 xl:p-10 shrink-0 z-20">
        <Link
          href="/"
          className="inline-block hover:opacity-85 transition-opacity"
        >
          <Image
            src="/images/global/auth_logo.svg"
            alt="ByteSpace"
            width={34}
            height={38}
            priority
            className="h-8 sm:h-9 w-auto"
          />
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 sm:px-8 xl:px-12 w-full max-w-7xl mx-auto z-10 min-h-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-center w-full">
          <AuthSideArt heading={sideHeading} description={sideDescription} />

          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <Card className="bg-white rounded-[32px] sm:rounded-[36px] p-6 sm:p-8 xl:p-10 shadow-2xl w-full max-w-[440px] xl:max-w-[460px] text-slate-900 border-none ring-0">
              <span className="text-xs sm:text-sm font-semibold text-brand-blue block mb-1">
                {titlesByMode[mode].badge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-6">
                {titlesByMode[mode].heading}
              </h2>

              {mode === "signin" && (
                <SignInForm onSwitchMode={(target) => setMode(target)} />
              )}

              {mode === "signup" && (
                <SignUpForm
                  onSuccess={() => setMode("otp")}
                  onSwitchMode={(target) => setMode(target)}
                />
              )}

              {mode === "forgot" && (
                <ForgotPasswordForm
                  onSuccess={() => setMode("otp")}
                  onSwitchMode={(target) => setMode(target)}
                />
              )}

              {mode === "otp" && (
                <OtpForm
                  onSuccess={() => setMode("signin")}
                  onCancel={() => setMode("signin")}
                />
              )}
            </Card>
          </div>
        </div>
      </main>

      <div className="h-6 shrink-0" />
    </div>
  );
}
