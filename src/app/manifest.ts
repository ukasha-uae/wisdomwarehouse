import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Wisdom Warehouse",
    short_name: "Wisdom",
    description:
      "Parent and teacher update portal for Wisdom Warehouse, Dubai.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f9f7f3",
    theme_color: "#f39200",
    orientation: "portrait",
    icons: [
      {
        src: "/wisdom-warehouse-logo-dark.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/wisdom-warehouse-logo-dark.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/wisdom-warehouse-logo-dark.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
