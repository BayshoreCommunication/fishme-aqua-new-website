import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serve public assets directly. This keeps local PNGs and SVGs working in
  // environments where the Next.js image-optimization endpoint is unavailable.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
