import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/testing",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
