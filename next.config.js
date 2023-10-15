const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    runtimeCaching,
  },
});

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: [
      {
        protocol: "https",
        domain: "**",
      },
    ],
  },
});
