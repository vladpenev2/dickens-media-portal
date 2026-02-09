/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dickensmedia.com',
        pathname: '/assets/**',
      },
    ],
  },
};

module.exports = nextConfig;
