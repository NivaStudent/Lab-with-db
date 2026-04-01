const CACHE = "app-cache-v1";

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(cache =>
      cache.addAll(["/", "/index.html", "/offline.html"])
    )
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match("/offline.html"))
  );
});