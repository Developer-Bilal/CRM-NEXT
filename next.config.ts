import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

// redirect to dashboard
module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true,
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
