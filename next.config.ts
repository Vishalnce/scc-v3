import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
 

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sscexamlife.info",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
