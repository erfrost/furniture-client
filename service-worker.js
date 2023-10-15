// Установка сервисного работника
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("cache").then((cache) => {
      return cache.addAll([
        "/styles/KitchensToOrder.module.css",
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

// Обработка запросов на сеть
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
