import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   experimental: {
      ppr: true,
      // useCache: true,
      // dynamicIO: true,
      // cacheLife: {
      //    hourly: {
      //       stale: 60 * 60, // 1 hour 
      //       revalidate: 60 * 10, // 10 minutes
      //       expire: 60 * 60, // 1 hour
      //    },
      // },
   },

};

export default nextConfig;
