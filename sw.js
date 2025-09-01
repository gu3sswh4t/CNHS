// Define a name for the cache
const CACHE_NAME = 'cnhs-file-depot-v1';

// List the files to cache. Since CSS and JS are inline, we only need the main page and the logo.
const urlsToCache = [
  '/',
  'index.html',
  'https://raw.githubusercontent.com/gu3sswh4t/COGONNATIONALHIGHSCHOOL/main/images/cogon.png'
];

// Install event: fires when the service worker is first installed.
self.addEventListener('install', (event) => {
  // We wait until the installation is complete.
  event.waitUntil(
    // Open the cache.
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        // Add all the specified files to the cache.
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: fires for every network request made by the page.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    // Check if the request is already in our cache.
    caches.match(event.request)
      .then((response) => {
        // If we have a cached response, return it.
        if (response) {
          return response;
        }
        // If not, fetch the request from the network.
        return fetch(event.request);
      }
    )
  );
});