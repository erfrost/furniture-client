self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("cache").then((cache) => {
      return cache.addAll([
        "/styles/ktchensToOrder.module.css",
        "/styles/furnishers.module.css",
        "/styles/aboutUs.module.css",
        "/styles/cartPage.module.css",
        "/styles/catalog.module.css",
        "/styles/deliveryAndPayment.module.css",
        "/styles/footerSocialIcons.module.css",
        "/styles/globals.css",
        "/styles/homePage.module.css",
        "/styles/itemPage.module.css",
        "/styles/kitchenItem.module.css",
        "/styles/refund.module.css",
        "/styles/salonsPage.module.css",
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

const cacheName = "cache";
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).then(async (response) => {
          const cache = await caches.open(cacheName);
          cache.put(event.request, response.clone());
          return response;
        })
      );
    })
  );
});
