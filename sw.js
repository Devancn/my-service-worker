const base = "/service-worker-test/";
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open("v1")
      .then((cache) =>
        cache.addAll([
          base,
          `${base}index.html`,
          `${base}style.css`,
          `${base}app.js`,
          `${base}image-list.js`,
          `${base}star-wars-logo.jpg`,
          `${base}gallery/`,
          `${base}gallery/bountyHunters.jpg`,
          `${base}gallery/myLittleVader.jpg`,
          `${base}gallery/snowTroopers.jpg`,
        ])
      )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request)).then(response => {
    if(response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(response => {
        let responseClone = response.clone();

        caches.open('v1').then(cache => {
          cache.put(event.request, responseClone);
        })
        return response
      }).catch(() => caches.match(`${base}gallery/myLittleVader.jpg`))
    }
  })
})
