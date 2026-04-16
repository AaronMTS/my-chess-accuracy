import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/player",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
