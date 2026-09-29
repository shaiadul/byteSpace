"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface ForgotPasswordFormProps {
  onSuccess: () => void;
  onSwitchMode: (mode: "signin") => void;
}

export function ForgotPasswordForm({ onSuccess, onSwitchMode }: ForgotPasswordFormProps) {
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-xs text-slate-600 leading-relaxed font-normal">
        Enter your registered email address and we&apos;ll send you an OTP verification code to
        reset your password.
      </p>

      <div className="space-y-1.5">
        <Label htmlFor="forgot-email" className="text-xs font-semibold text-slate-700">
          Email Address
        </Label>
        <Input
          id="forgot-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="designer@example.com"
          className="h-11 rounded-xl border-slate-200 text-slate-900 focus-visible:ring-brand-blue text-sm"
        />
      </div>

      <div className="pt-2 flex justify-between items-center">
        <button
          type="button"
          onClick={() => onSwitchMode("signin")}
          className="text-xs text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
        >
          Back to Sign In
        </button>
        <Button
          type="submit"
          className="bg-brand-lime hover:bg-brand-lime/90 text-slate-900 font-bold text-sm px-7 py-2.5 h-auto rounded-full cursor-pointer shadow-xs transition-colors"
        >
          Send Code
        </Button>
      </div>
    </form>
  );
}
