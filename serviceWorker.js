const CACHE_NAME = "version-1";
const urlsToCache = ['index.html', 'offline.html'];

const self = this;

// intall sw
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log("opend cache");
                return cache.addAll(urlsToCache)
            })
    )
})

// listen for Request
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request)
                    .catch(() => caches.match('offline.html'))
            })
    )
})

// activate the sw 
self.addEventListener('activate', (event) => {
    const ca = [];
    ca.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames)=> Promise.all(
            cacheNames.map((cacheNames)=>{
                if (!ca.includes(cacheName)) {
                    return caches.delete(cacheName)
                }
            })
        ) )
    )
})