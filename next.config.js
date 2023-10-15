// const runtimeCaching = require("next-pwa/cache");
// const withPWA = require("next-pwa")({
//   pwa: {
//     dest: "public",
//     register: true,
//     skipWaiting: true,
//     runtimeCaching,
//   },
// });

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["https://api.admin"],
  },
};

module.exports = nextConfig;
