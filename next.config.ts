import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const serverActionAllowedOrigins = (
  process.env.NEXT_SERVER_ACTIONS_ALLOWED_ORIGINS ?? ""
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Required when app runs behind reverse proxies (e.g., cPanel Passenger)
      // where Origin and forwarded host can differ from the Node upstream host.
      allowedOrigins: serverActionAllowedOrigins,
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
