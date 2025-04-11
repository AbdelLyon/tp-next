import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   experimental: {
      ppr: true,
   },
   images: {
      unoptimized: true,
   },

};

export default nextConfig;
