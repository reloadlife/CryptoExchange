/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    outputFileTracingRoot: require("path").join(__dirname, "../../"),
  },
  transpilePackages: ["@crypto-exchange/shared", "@crypto-exchange/api"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
