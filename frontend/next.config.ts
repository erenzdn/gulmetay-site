import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.gulmetay.com",
      },
      {
        protocol: "https",
        hostname: "**.gulmetay.com.tr",
      },
      {
        protocol: "https",
        hostname: "gulmetay.mehmeterenozden.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
    ],
  },
};

export default nextConfig;
