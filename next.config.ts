import type { NextConfig } from "next";

// Static export: the site is plain files served by nginx / GitHub Pages.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
