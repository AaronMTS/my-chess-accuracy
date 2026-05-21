import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://images.chesscomfiles.com/**"),
      new URL("https://lh3.googleusercontent.com/aida-public/**"),
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: "https://api.chess.com/pub/player/",
  },
};

export default nextConfig;
