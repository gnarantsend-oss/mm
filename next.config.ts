import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",           // статик HTML export
  basePath: "/turshilt",      // github.io/turshilt/ зам
  images: { unoptimized: true }, // next/image → <img> болгох
};

export default nextConfig;
