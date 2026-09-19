const CACHE='zazo-tycoon-2.4.0';
const ASSETS=['./','./index.html','./manifest.json','./assets/city/holding.png','./assets/city/bank.png','./assets/city/airport.png','./assets/city/logistics.png','./assets/city/store.png','./assets/city/depot.png','./assets/city/factory.png','./assets/city/port.png','./assets/city/technology.png','./assets/city/construction.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(cache=>cache.put(e.request,c));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));
});
