import type { MetadataRoute } from "next";

// Block all search engines from crawling every route (served at /robots.txt).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
