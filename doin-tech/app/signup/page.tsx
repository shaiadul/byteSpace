import type { Metadata } from "next";
import { AuthPageView } from "@/components/auth-page-view";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bytespace.tech";

export const metadata: Metadata = {
  title: "Create Free Account",
  description: "Create your free ByteSpace account today and start learning in-demand tech and creative skills.",
  alternates: {
    canonical: `${SITE_URL}/signup`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function SignUpPage() {
  return <AuthPageView initialMode="signup" />;
}
