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
      { source: "/shop", destination: "/men/shop", permanent: false },
      {
        source: "/shop/:slug",
        destination: "/men/shop/:slug",
        permanent: false,
      },
      { source: "/bundles", destination: "/men/bundles", permanent: false },
      {
        source: "/bundles/:slug",
        destination: "/men/bundles/:slug",
        permanent: false,
      },
      { source: "/mystery", destination: "/men/mystery", permanent: false },
    ];
  },
};

export default nextConfig;
