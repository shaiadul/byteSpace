"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { AuthSocialButtons } from "./auth-social-buttons";

interface SignUpFormProps {
  onSuccess: () => void;
  onSwitchMode: (mode: "signin") => void;
}

export function SignUpForm({ onSuccess, onSwitchMode }: SignUpFormProps) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      <div className="space-y-1.5">
        <Label htmlFor="signup-name" className="text-xs font-semibold text-slate-700">
          Full Name
        </Label>
        <Input
          id="signup-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          className="h-11 rounded-xl border-slate-200 text-slate-900 focus-visible:border-brand-blue focus-visible:ring-1 focus-visible:ring-brand-blue/25 text-sm"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="signup-email" className="text-xs font-semibold text-slate-700">
          Email
        </Label>
        <Input
          id="signup-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="designer@example.com"
          className="h-11 rounded-xl border-slate-200 text-slate-900 focus-visible:border-brand-blue focus-visible:ring-1 focus-visible:ring-brand-blue/25 text-sm"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="signup-password" className="text-xs font-semibold text-slate-700">
          Password
        </Label>
        <div className="relative">
          <Input
            id="signup-password"
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
          Create Account
        </Button>
      </div>

      <AuthSocialButtons />

      <p className="text-center text-xs text-slate-600 pt-2">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => onSwitchMode("signin")}
          className="text-brand-blue font-semibold hover:underline cursor-pointer"
        >
          Sign in
        </button>
      </p>
    </form>
  );
}
