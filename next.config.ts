import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
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
