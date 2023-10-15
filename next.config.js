// const withPWA = require("next-pwa");

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: [
//       {
//         protocol: "https",
//         domain: "**",
//       },
//     ],
//   },
//   pwa: {
//     dest: "public",
//     register: true,
//     skipWaiting: true,
//   },
// };

// module.exports = withPWA(nextConfig);

const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});
