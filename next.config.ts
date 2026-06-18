import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/testing",
  assetPrefix: "/testing/",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
