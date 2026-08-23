import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
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
      { source: "/mystery", destination: "/men/bundles", permanent: false },
      {
        source: "/:gender(men|women)/mystery",
        destination: "/:gender/bundles",
        permanent: false,
      },
      { source: "/custom", destination: "/men/custom", permanent: false },
    ];
  },
};

export default nextConfig;
