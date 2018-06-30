const cacheName = 'currency-converter-v1';


// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', event => event.waitUntil(
  caches.open(cacheName).then(cache => cache.addAll([
    '/',
    '/main.js',
    '/main.css',
    'https://fonts.googleapis.com/css?family=Open+Sans:300,400,700',
    'https://free.currencyconverterapi.com/api/v5/countries',
  ])),
));


// eslint-disable-next-line no-restricted-globals
self.addEventListener('activate', event => event.waitUntil(
  caches.keys().then(cacheNames => Promise.all(
    cacheNames.filter(name => name.startsWith('currency-converter-') && name !== cacheName).map(name => caches.delete(name)),
  )),
));

// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', event => event.respondWith(
  caches.match(event.request).then(response => response || fetch(event.request)),
));

// eslint-disable-next-line no-restricted-globals
self.addEventListener('message', (event) => {
  if (event.data.action === 'skipWaiting') {
    // eslint-disable-next-line no-restricted-globals
    self.skipWaiting();
  }
});
