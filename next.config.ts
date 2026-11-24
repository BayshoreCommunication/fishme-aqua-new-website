import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "30mb",
    },
  },
  // Serve public assets directly. This keeps local PNGs and SVGs working in
  // environments where the Next.js image-optimization endpoint is unavailable.
  images: {
    unoptimized: true,
    // YouTube video thumbnails shown behind play buttons.
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },
  // Keep search engines from indexing anything (pages, images, files).
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
