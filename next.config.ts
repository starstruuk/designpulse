import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'favicon.im' },
      { protocol: 'https', hostname: '**' },
    ],
  },
};

export default nextConfig;
