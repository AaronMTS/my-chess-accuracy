import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://lh3.googleusercontent.com/aida-public/**"), // Temporary - will be replaced after dummy data is removed
    ],
  },
  allowedDevOrigins: ["192.168.254.100"],
};

export default nextConfig;
