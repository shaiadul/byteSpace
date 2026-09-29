import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ByteSpace — Master In-Demand Tech Skills",
    short_name: "ByteSpace",
    description:
      "Unlock your creativity, gain valuable knowledge, and grow your career with our wide range of tech and design courses.",
    start_url: "/",
    display: "standalone",
    background_color: "#003be2",
    theme_color: "#003be2",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/apple-icon.svg",
        sizes: "180x180",
        type: "image/svg+xml",
      },
    ],
  };
}
