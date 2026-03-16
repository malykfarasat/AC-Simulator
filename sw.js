const CACHE = 'ac-simulator-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Nunito:wght@400;600;700;800;900&display=swap',
];

// Install — cache core assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

// Activate — clear old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch — cache first for assets, network first for Firebase
self.addEventListener('fetch', e => {
  const url = e.request.url;
  
  // Skip Firebase and Google APIs — always network
  if (url.includes('firebase') || url.includes('googleapis') || url.includes('gstatic')) {
    e.respondWith(fetch(e.request).catch(() => new Response('', { status: 503 })));
    return;
  }

  // Cache first strategy for app assets
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(response => {
        if (response.ok && e.request.method === 'GET') {
          const clone = response.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return response;
      }).catch(() => {
        // Return cached index.html for navigation requests (offline)
        if (e.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
        return new Response('Offline', { status: 503 });
      });
    })
  );
});

// Background sync for coin/achievement saves
self.addEventListener('sync', e => {
  if (e.tag === 'sync-progress') {
    e.waitUntil(syncProgress());
  }
});

async function syncProgress() {
  // Progress is saved to Firebase when online via the main app
  // This is a fallback sync handler
  console.log('Background sync: progress');
}

// Push notifications
self.addEventListener('push', e => {
  const data = e.data?.json() || {};
  e.waitUntil(
    self.registration.showNotification(data.title || 'AC Simulator', {
      body: data.body || 'New daily challenges available!',
      icon: './icons/icon-192.png',
      badge: './icons/icon-96.png',
      tag: data.tag || 'ac-sim',
      data: { url: data.url || './' },
    })
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window' }).then(wins => {
      if (wins.length > 0) return wins[0].focus();
      return clients.openWindow(e.notification.data?.url || './');
    })
  );
});
