"use client";

import { IconBrandFacebookFilled, IconBrandGoogle } from "@tabler/icons-react";

export function AuthSocialButtons() {
  return (
    <>
      <div className="relative flex items-center justify-center my-4">
        <div className="border-t border-slate-200 w-full" />
        <span className="bg-white px-3 text-xs text-slate-400 absolute">or</span>
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Continue with Facebook"
          className="size-11 rounded-full border border-slate-200 hover:border-slate-300 flex items-center justify-center text-slate-800 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
        >
          <IconBrandFacebookFilled className="size-5 text-slate-900" />
        </button>
        <button
          type="button"
          aria-label="Continue with Google"
          className="size-11 rounded-2xl border border-slate-200 hover:border-slate-300 flex items-center justify-center text-slate-800 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
        >
          <IconBrandGoogle className="size-5 text-slate-900 font-bold" />
        </button>
      </div>
    </>
  );
}
