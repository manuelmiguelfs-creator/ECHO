import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  devIndicators: false,
  async redirects() {
    return [
      { source: "/what-is-ocd", destination: "/learn", permanent: true },
      { source: "/learn/:condition", destination: "/learn?condition=:condition", permanent: true },
    ];
  },
};

export default nextConfig;
