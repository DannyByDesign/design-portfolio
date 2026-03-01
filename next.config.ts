import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async rewrites() {
    return [
      { source: "/industrial-design", destination: "/" },
      { source: "/design-engineering", destination: "/" },
    ];
  },
};

export default nextConfig;
