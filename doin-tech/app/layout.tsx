import type { Metadata, Viewport } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { TooltipProvider } from "@/components/ui/tooltip";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/json-ld";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  display: "swap",
  weight: "300 900",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bytespace.tech";

export const viewport: Viewport = {
  themeColor: "#003be2",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ByteSpace — Master In-Demand Tech Skills",
    template: "%s | ByteSpace",
  },
  description:
    "Unlock your creativity and advance your career with ByteSpace. Access hundreds of top-rated courses in UI/UX design, full-stack web development, AI, cloud computing, and digital marketing.",
  keywords: [
    "tech courses",
    "online learning platform",
    "UI/UX design course",
    "web development tutorial",
    "learn AI and machine learning",
    "ByteSpace education",
    "tech career training",
    "creative skills",
  ],
  authors: [{ name: "ByteSpace Team", url: SITE_URL }],
  creator: "ByteSpace",
  publisher: "ByteSpace Inc.",
  category: "Education",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "./",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "ByteSpace",
    title: "ByteSpace — Master In-Demand Tech Skills",
    description:
      "Unlock your creativity and advance your career with ByteSpace. Access hundreds of top-rated courses in UI/UX design, development, AI, and digital marketing.",
    images: [
      {
        url: "/images/home/Image.png",
        width: 1200,
        height: 630,
        alt: "ByteSpace — Master In-Demand Tech Skills",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ByteSpace — Master In-Demand Tech Skills",
    description:
      "Unlock your creativity and advance your career with ByteSpace. Access hundreds of top-rated courses in UI/UX design, development, AI, and digital marketing.",
    creator: "@bytespace",
    images: ["/images/home/Image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${poppins.variable} ${geistMono.variable} h-full antialiased font-sans`}
    >
      <head>
        <OrganizationJsonLd />
        <WebsiteJsonLd />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}

