import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Default Next.js server output — works perfectly on Render's Node service.
  // Render injects the PORT env var; `next start` listens on it automatically.
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Allow the dev preview origin used by the sandbox; harmless in production.
  allowedDevOrigins: ["*.space-z.ai"],
};

export default nextConfig;
