import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85, 88, 90, 92, 95, 100],
    deviceSizes: [640, 828, 1080, 1280, 1920, 2560, 3840],
    minimumCacheTTL: 2592000,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [
      // 1. WWW to Apex Host Redirect
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.citizenconstructions.com" }],
        destination: "https://citizenconstructions.com/:path*",
        permanent: true,
      },
      // 2. HTTP to HTTPS Redirect
      {
        source: "/:path*",
        has: [
          { type: "header", key: "x-forwarded-proto", value: "http" },
          { type: "host", value: "citizenconstructions.com" },
        ],
        destination: "https://citizenconstructions.com/:path*",
        permanent: true,
      },
      // 3. HTTP + WWW to HTTPS Apex Single-Hop Redirect
      {
        source: "/:path*",
        has: [
          { type: "header", key: "x-forwarded-proto", value: "http" },
          { type: "host", value: "www.citizenconstructions.com" },
        ],
        destination: "https://citizenconstructions.com/:path*",
        permanent: true,
      },
      // 4. Legacy path redirects (direct 1-hop permanent redirects)
      {
        source: "/scissor-lifts",
        destination: "/brand-new/scissor-lifts",
        permanent: true,
      },
      {
        source: "/boom-lifts",
        destination: "/brand-new/boom-lifts",
        permanent: true,
      },
      {
        source: "/fleet",
        destination: "/brand-new",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
