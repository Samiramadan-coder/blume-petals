import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["blumepetals.com", "www.blumepetals.com"],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.blumepetals.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
