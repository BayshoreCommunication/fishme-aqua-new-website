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
};

export default nextConfig;
