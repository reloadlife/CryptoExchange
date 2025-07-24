/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@crypto-exchange/shared"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
