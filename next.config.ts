import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/hijab",
        destination: "/products/pro-performance-fit-hijab",
        permanent: true,
      },
      {
        source: "/tunic",
        destination: "/products/breathelite-longline-active-tunic",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
