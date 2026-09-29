import type { Metadata } from "next";
import { COURSES } from "@/lib/data";
import { CourseJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bytespace.tech";

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const course = COURSES.find((c) => c.id === id) || COURSES[0];

  const title = `${course.title}`;
  const description = course.description;
  const courseUrl = `${SITE_URL}/courses/${course.id}`;
  const imageUrl = course.thumbnail.startsWith("http")
    ? course.thumbnail
    : `${SITE_URL}${course.thumbnail}`;

  return {
    title,
    description,
    alternates: {
      canonical: courseUrl,
    },
    openGraph: {
      title: `${title} | ByteSpace`,
      description,
      url: courseUrl,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: course.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ByteSpace`,
      description,
      images: [imageUrl],
    },
  };
}

export default async function CourseDetailLayout({
  params,
  children,
}: Props) {
  const { id } = await params;
  const course = COURSES.find((c) => c.id === id) || COURSES[0];

  return (
    <>
      <CourseJsonLd course={course} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Courses", url: "/courses" },
          { name: course.title, url: `/courses/${course.id}` },
        ]}
      />
      {children}
    </>
  );
}
