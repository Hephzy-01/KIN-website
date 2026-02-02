/**
 * Service Worker for KidsInspiring Nation PWA
 * Enables offline access and caching
 */

const CACHE_NAME = 'kin-v1';
const OFFLINE_URL = 'offline.html';

// Files to cache immediately
const PRECACHE_FILES = [
    './',
    'index.html',
    'about.html',
    'programs.html',
    'content.html',
    'community.html',
    'support.html',
    'progress.html',
    'css/design-system.css',
    'css/responsive.css',
    'css/whatsapp-button.css',
    'css/progress-tracker.css',
    'js/main.js',
    'js/stats-counter.js',
    'js/progress-tracker.js',
    'images/logo.png',
    'images/hero-background.jpg',
    OFFLINE_URL
];

// Install event - cache essential files
self.addEventListener('install', event => {
    console.log('[ServiceWorker] Installing...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[ServiceWorker] Caching app shell');
                return cache.addAll(PRECACHE_FILES);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('[ServiceWorker] Activating...');

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[ServiceWorker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    // Skip cross-origin requests
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                // Return cached version or fetch from network
                if (cachedResponse) {
                    console.log('[ServiceWorker] Serving from cache:', event.request.url);
                    return cachedResponse;
                }

                return fetch(event.request)
                    .then(response => {
                        // Don't cache if not a success response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response
                        const responseToCache = response.clone();

                        // Cache new resources dynamically
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch(() => {
                        // If both cache and network fail, show offline page
                        return caches.match(OFFLINE_URL);
                    });
            })
    );
});

// Background sync for prayer requests (future enhancement)
self.addEventListener('sync', event => {
    if (event.tag === 'sync-prayers') {
        event.waitUntil(syncPrayerRequests());
    }
});

async function syncPrayerRequests() {
    // Placeholder for future implementation
    console.log('[ServiceWorker] Syncing prayer requests...');
}

// Push notification handler (future enhancement)
self.addEventListener('push', event => {
    const data = event.data ? event.data.json() : {};
    const title = data.title || 'KidsInspiring Nation';
    const options = {
        body: data.body || 'New content available!',
        icon: 'images/logo.png',
        badge: 'images/logo.png',
        vibrate: [200, 100, 200],
        data: {
            url: data.url || '/'
        }
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
    event.notification.close();

    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});
