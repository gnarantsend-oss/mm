/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'via.placeholder.com',
      // Bunny.net pull zone domain-оо энд нэм:
      // 'your-pullzone.b-cdn.net',
    ],
  },
};

module.exports = nextConfig;
