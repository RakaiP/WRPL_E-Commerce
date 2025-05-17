import type { NextConfig } from "next";

const nextConfig: NextConfig = {

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
  /* Other config options here */
};

export default nextConfig;
