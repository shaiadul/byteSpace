import type { Metadata } from "next";
import { AuthPageView } from "@/components/auth-page-view";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bytespace.tech";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your ByteSpace account to access your courses and learning progress.",
  alternates: {
    canonical: `${SITE_URL}/signin`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function SignInPage() {
  return <AuthPageView initialMode="signin" />;
}
