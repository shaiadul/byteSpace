"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

interface OtpFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function OtpForm({ onSuccess, onCancel }: OtpFormProps) {
  const [otpValues, setOtpValues] = React.useState(["", "", "", "", "", ""]);
  const [resendCountdown, setResendCountdown] = React.useState(45);
  const otpInputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCountdown > 0) {
      timer = setInterval(() => {
        setResendCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCountdown]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[value.length - 1];
    }
    const newOtp = [...otpValues];
    newOtp[index] = value;
    setOtpValues(newOtp);

    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = [...otpValues];
    for (let i = 0; i < pasteData.length; i++) {
      newOtp[i] = pasteData[i];
    }
    setOtpValues(newOtp);
    const nextIndex = Math.min(pasteData.length, 5);
    otpInputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <p className="text-xs text-slate-600 leading-relaxed font-normal">
        We&apos;ve sent a 6-digit verification code to your email. Enter the code below to proceed.
      </p>

      <div className="flex items-center justify-between gap-1.5 sm:gap-2">
        {otpValues.map((val, idx) => (
          <input
            key={idx}
            ref={(el) => {
              otpInputRefs.current[idx] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={val}
            onChange={(e) => handleOtpChange(idx, e.target.value)}
            onKeyDown={(e) => handleOtpKeyDown(idx, e)}
            onPaste={handleOtpPaste}
            className="size-11 sm:size-12 rounded-xl border border-slate-200 text-center font-bold text-lg text-slate-900 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/25 outline-none transition-all"
          />
        ))}
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-500">
          {resendCountdown > 0 ? (
            <>Resend code in {resendCountdown}s</>
          ) : (
            <button
              type="button"
              onClick={() => setResendCountdown(45)}
              className="text-brand-blue font-semibold hover:underline cursor-pointer"
            >
              Resend code
            </button>
          )}
        </span>

        <button
          type="button"
          onClick={onCancel}
          className="text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
        >
          Cancel
        </button>
      </div>

      <Button
        type="submit"
        className="w-full bg-brand-lime hover:bg-brand-lime/90 text-slate-900 font-bold text-sm py-3 rounded-full cursor-pointer shadow-xs transition-colors"
      >
        Verify & Continue
      </Button>
    </form>
  );
}
