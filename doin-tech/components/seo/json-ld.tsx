import * as React from "react";
import type { Course } from "@/lib/data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bytespace.tech";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: "ByteSpace",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/icon.svg`,
      width: "512",
      height: "512",
    },
    description:
      "ByteSpace is a modern tech and creative learning platform offering top-tier courses in web development, UI/UX design, AI, cloud computing, and digital marketing.",
    sameAs: [
      "https://twitter.com/bytespace",
      "https://www.linkedin.com/company/bytespace",
      "https://github.com/bytespace",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "ByteSpace",
    description: "Master In-Demand Tech and Creative Skills with Hundreds of Available Courses.",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/courses?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: "en-US",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function CourseJsonLd({ course }: { course: Course }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${SITE_URL}/courses/${course.id}#course`,
    name: course.title,
    description: course.description,
    url: `${SITE_URL}/courses/${course.id}`,
    image: course.thumbnail.startsWith("http")
      ? course.thumbnail
      : `${SITE_URL}${course.thumbnail}`,
    educationalLevel: course.level,
    about: course.category,
    timeRequired: course.duration,
    provider: {
      "@type": "EducationalOrganization",
      name: "ByteSpace",
      sameAs: SITE_URL,
    },
    author: {
      "@type": "Person",
      name: course.instructor.name,
      jobTitle: course.instructor.role,
    },
    offers: {
      "@type": "Offer",
      category: "Paid",
      price: course.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/courses/${course.id}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: course.rating,
      bestRating: "5",
      worstRating: "1",
      ratingCount: course.reviewsCount || 120,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      courseWorkload: course.duration,
      instructor: {
        "@type": "Person",
        name: course.instructor.name,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function CourseListJsonLd({ courses }: { courses: Course[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: courses.slice(0, 10).map((c, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Course",
        name: c.title,
        description: c.description,
        url: `${SITE_URL}/courses/${c.id}`,
        provider: {
          "@type": "EducationalOrganization",
          name: "ByteSpace",
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
