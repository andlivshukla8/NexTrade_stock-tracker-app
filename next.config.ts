import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Enable experimental features if needed
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Remove dangerous error ignoring settings
  // eslint: {
  //   ignoreDuringBuilds: true // This should be false in production
  // },
  // typescript: {
  //   ignoreBuildErrors: true // This should be false in production
  // }
};

export default nextConfig;
