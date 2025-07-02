import { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use standalone output for server components
  output: "standalone",

  // Ignore TypeScript and ESLint errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
