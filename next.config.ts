import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "image.sscexamlife.info",
        port: "",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "image.sscexamlife.info",
        port: "",
        pathname: "/uploads/**",
      },
    ],
  },

    eslint: {
    ignoreDuringBuilds: true,
  },

    typescript: {
    ignoreBuildErrors: true,
  },


};

export default nextConfig;
