"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { AuthSocialButtons } from "./auth-social-buttons";

interface SignInFormProps {
  onSwitchMode: (mode: "signup" | "forgot") => void;
}

export function SignInForm({ onSwitchMode }: SignInFormProps) {
  const router = useRouter();
  const [email, setEmail] = React.useState("designer@example.com");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/courses");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="signin-email" className="text-xs font-semibold text-slate-700">
          Email
        </Label>
        <Input
          id="signin-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="designer@example.com"
          className="h-11 rounded-xl border-slate-200 text-slate-900 focus-visible:border-brand-blue focus-visible:ring-1 focus-visible:ring-brand-blue/25 text-sm"
        />
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="signin-password" className="text-xs font-semibold text-slate-700">
            Password
          </Label>
          <button
            type="button"
            onClick={() => onSwitchMode("forgot")}
            className="text-xs text-brand-blue font-semibold hover:underline cursor-pointer"
          >
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <Input
            id="signin-password"
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="h-11 rounded-xl border-slate-200 text-slate-900 focus-visible:border-brand-blue focus-visible:ring-1 focus-visible:ring-brand-blue/25 pr-10 text-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <IconEyeOff className="size-4.5" />
            ) : (
              <IconEye className="size-4.5" />
            )}
          </button>
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <Button
          type="submit"
          className="bg-brand-lime hover:bg-brand-lime/90 text-slate-900 font-bold text-sm px-8 py-2.5 h-auto rounded-full cursor-pointer shadow-xs transition-colors"
        >
          Sign In
        </Button>
      </div>

      <AuthSocialButtons />

      <p className="text-center text-xs text-slate-600 pt-2">
        New user?{" "}
        <button
          type="button"
          onClick={() => onSwitchMode("signup")}
          className="text-brand-blue font-semibold hover:underline cursor-pointer"
        >
          Create an account
        </button>
      </p>
    </form>
  );
}
