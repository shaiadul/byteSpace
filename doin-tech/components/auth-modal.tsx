"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { IconBrandGoogle, IconBrandGithub, IconSparkles } from "@tabler/icons-react";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultMode?: "signin" | "signup";
}

export function AuthModal({
  open,
  onOpenChange,
  defaultMode = "signin",
}: AuthModalProps) {
  const [mode, setMode] = React.useState<"signin" | "signup">(defaultMode);

  React.useEffect(() => {
    setMode(defaultMode);
  }, [defaultMode]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[820px] p-0 overflow-hidden rounded-2xl border-none">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[480px]">
          {/* Left Decorative Brand Side */}
          <div className="bg-brand-blue text-white p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Playful Figma geometric elements */}
            <div className="absolute -top-12 -left-12 w-36 h-36 rounded-full border-8 border-brand-lime/30 animate-pulse pointer-events-none" />
            <div className="absolute top-1/4 right-3 w-10 h-10 bg-brand-lime rotate-45 rounded-lg opacity-80 pointer-events-none" />
            <div className="absolute bottom-16 -left-6 w-24 h-12 bg-white/10 rounded-full blur-sm pointer-events-none" />
            <div className="absolute -bottom-10 right-4 w-32 h-32 rounded-full border-[10px] border-white/20 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-8 h-8 rounded-lg bg-brand-lime text-black font-extrabold flex items-center justify-center text-sm shadow-md">
                  B
                </span>
                <span className="font-bold text-xl tracking-tight">ByteSpace</span>
                <Badge variant="secondary" className="ml-1 text-[10px] font-bold">
                  PRO
                </Badge>
              </div>

              <h3 className="text-2xl font-bold leading-tight mb-2">
                {mode === "signin"
                  ? "Welcome Back to ByteSpace"
                  : "Start Your Tech Career Today"}
              </h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                Join over 50,000+ engineers, designers and creators mastering
                next-generation digital skills.
              </p>
            </div>

            <div className="relative z-10 pt-8 border-t border-white/15">
              <div className="flex items-center gap-2 text-xs text-blue-100 mb-2">
                <IconSparkles className="size-4 text-brand-lime" />
                <span>Unlimited access to 12K+ verified courses</span>
              </div>
              <p className="text-[11px] text-blue-200">
                “ByteSpace is by far the highest-leverage learning platform in tech.”
              </p>
            </div>
          </div>

          {/* Right Form Side */}
          <div className="p-8 bg-white flex flex-col justify-center">
            <DialogHeader className="mb-5 text-left">
              <DialogTitle className="text-xl font-bold text-slate-900">
                {mode === "signin" ? "Sign In to ByteSpace" : "Create Free Account"}
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                {mode === "signin"
                  ? "Enter your credentials to continue learning"
                  : "Get 7 days free trial with full catalog access"}
              </DialogDescription>
            </DialogHeader>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onOpenChange(false);
              }}
              className="space-y-3.5"
            >
              {mode === "signup" && (
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Sarah Connor"
                    required
                    className="h-10 text-sm focus-visible:border-brand-blue focus-visible:ring-1 focus-visible:ring-brand-blue/25"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="name@company.com"
                  required
                  className="h-10 text-sm focus-visible:border-brand-blue focus-visible:ring-1 focus-visible:ring-brand-blue/25"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-slate-700 block">
                    Password
                  </label>
                  {mode === "signin" && (
                    <Button
                      variant="link"
                      size="sm"
                      type="button"
                      className="text-xs p-0 h-auto text-blue-600 hover:text-blue-700"
                    >
                      Forgot password?
                    </Button>
                  )}
                </div>
                <Input
                  type="password"
                  placeholder="••••••••"
                  required
                  className="h-10 text-sm focus-visible:border-brand-blue focus-visible:ring-1 focus-visible:ring-brand-blue/25"
                />
              </div>

              <Button
                type="submit"
                variant="secondary"
                size="lg"
                className="w-full font-bold text-sm shadow-md mt-2"
              >
                {mode === "signin" ? "Sign In to Account" : "Claim 7-Day Free Trial"}
              </Button>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-400 text-[11px]">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                type="button"
                className="w-full text-xs font-medium gap-1.5"
                onClick={() => onOpenChange(false)}
              >
                <IconBrandGoogle className="size-3.5" />
                Google
              </Button>
              <Button
                variant="outline"
                size="sm"
                type="button"
                className="w-full text-xs font-medium gap-1.5"
                onClick={() => onOpenChange(false)}
              >
                <IconBrandGithub className="size-3.5" />
                GitHub
              </Button>
            </div>

            <div className="mt-5 text-center text-xs text-slate-500">
              {mode === "signin" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <Button
                    variant="link"
                    type="button"
                    size="sm"
                    className="p-0 h-auto font-semibold text-blue-600 underline"
                    onClick={() => setMode("signup")}
                  >
                    Sign up free
                  </Button>
                </>
              ) : (
                <>
                  Already registered?{" "}
                  <Button
                    variant="link"
                    type="button"
                    size="sm"
                    className="p-0 h-auto font-semibold text-blue-600 underline"
                    onClick={() => setMode("signin")}
                  >
                    Sign in here
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
