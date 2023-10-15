/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      {
        protocol: "https",
        domain: "",
      },
    ],
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
};

module.exports = withPWA(nextConfig);
