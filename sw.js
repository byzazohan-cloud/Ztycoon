const CACHE='zazo-tycoon-1.0.6';
const ASSETS=['./','./index.html','./manifest.webmanifest',
'./assets/textile.jpg','./assets/construction.jpg','./assets/food.jpg','./assets/auto.jpg','./assets/tech.jpg',
'./assets/logistics.jpg','./assets/aviation.jpg','./assets/space.jpg','./assets/energy.jpg','./assets/mining.jpg',
'./assets/icon-192.png','./assets/icon-512.png','./assets/apple-touch-icon.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(cache=>cache.put(e.request,c));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));
});
