
const CACHE_NAME = 'lab-7-starter';
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(['https://introweb.tech/assets/json/1_50-thanksgiving-side-dishes.json',
      'https://introweb.tech/assets/json/2_roasting-turkey-breast-with-stuffing.json',
      'https://introweb.tech/assets/json/3_moms-cornbread-stuffing.json',
      'https://introweb.tech/assets/json/4_50-indulgent-thanksgiving-side-dishes-for-any-holiday-gathering.json',
      'https://introweb.tech/assets/json/5_healthy-thanksgiving-recipe-crockpot-turkey-breast.json',
      'https://introweb.tech/assets/json/6_one-pot-thanksgiving-dinner.json',]);
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', function (event) {
  event.respondWith(caches.open(CACHE_NAME).then((cache) => {
    return cache.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request).then((fetchedResponse) => {
        cache.put(event.request, fetchedResponse.clone());
        return fetchedResponse;
      });
    })
  }));
});
