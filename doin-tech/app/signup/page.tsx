import { AuthPageView } from "@/components/auth-page-view";

export const metadata = {
  title: "Sign Up - ByteSpace",
  description: "Create your ByteSpace account",
};

export default function SignUpPage() {
  return <AuthPageView initialMode="signup" />;
}
