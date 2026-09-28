import { AuthPageView } from "@/components/auth-page-view";

export const metadata = {
  title: "Sign In - ByteSpace",
  description: "Sign in to your ByteSpace account",
};

export default function SignInPage() {
  return <AuthPageView initialMode="signin" />;
}
