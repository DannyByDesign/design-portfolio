import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    localPatterns: [
      { pathname: "/portfolio/**" },
      { pathname: "/window.svg" },
      { pathname: "/globe.svg" },
      { pathname: "/file.svg" },
    ],
    deviceSizes: [384, 512, 640, 768, 1024, 1280],
    imageSizes: [96, 128, 192, 256, 384, 512],
    qualities: [60, 75],
    formats: ["image/webp"],
    minimumCacheTTL: 2678400,
  },
  async headers() {
    return [
      {
        source: "/portfolio/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/industrial-design/concept-mobility-system",
        destination: "/industrial-design/tiara",
        permanent: true,
      },
      {
        source: "/industrial-design/adaptive-kitchen-tooling",
        destination: "/industrial-design/timer-02",
        permanent: true,
      },
      {
        source: "/industrial-design/wearable-utility-concept",
        destination: "/industrial-design/adaptable-micro-mobility",
        permanent: true,
      },
      {
        source: "/industrial-design/consumer-device-program",
        destination: "/industrial-design/milwaukee-tool",
        permanent: true,
      },
      {
        source: "/industrial-design/household-product-line",
        destination: "/industrial-design/garmin-descent",
        permanent: true,
      },
      {
        source: "/industrial-design/accessory-system-design",
        destination: "/industrial-design/sketch-gallery",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      { source: "/industrial-design", destination: "/" },
      { source: "/design-engineering", destination: "/" },
    ];
  },
};

export default nextConfig;
