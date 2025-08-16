import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Avoid linting test files during Playwright's build step
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "image.tmdb.org" },
    ],
  },
};

export default nextConfig;
