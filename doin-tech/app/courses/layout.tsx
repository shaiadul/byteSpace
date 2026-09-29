import type { Metadata } from "next";
import { COURSES } from "@/lib/data";
import { CourseListJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bytespace.tech";

export const metadata: Metadata = {
  title: "Explore Tech & Design Courses",
  description:
    "Browse hundreds of expert-led courses across Web Development, UI/UX Design, Data & AI, and Digital Marketing at ByteSpace. Filter by category, skill level, and rating.",
  alternates: {
    canonical: `${SITE_URL}/courses`,
  },
  openGraph: {
    title: "Explore Tech & Design Courses | ByteSpace",
    description:
      "Browse hundreds of expert-led courses in Web Development, UI/UX Design, Data & AI, and Digital Marketing at ByteSpace.",
    url: `${SITE_URL}/courses`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore Tech & Design Courses | ByteSpace",
    description:
      "Browse hundreds of expert-led courses in Web Development, UI/UX Design, Data & AI, and Digital Marketing at ByteSpace.",
  },
};

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CourseListJsonLd courses={COURSES} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Courses", url: "/courses" },
        ]}
      />
      {children}
    </>
  );
}
