import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure Turbopack uses project root only (reliable builds on Vercel)
  turbopack: {
    root: path.resolve(process.cwd()),
  },
};

export default nextConfig;
