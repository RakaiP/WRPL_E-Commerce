import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "", // Keep empty unless necessary
        pathname: "/**", // Allows all paths
        search: "", // Keep empty unless you need specific query params
      },
    ],
  },
};

export default nextConfig;
