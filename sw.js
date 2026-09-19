const CACHE='zazo-tycoon-2.6.1';
const ASSETS=['./','./index.html','./assets/zazo_city_world.webp','./manifest.webmanifest'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  e.respondWith(
    caches.match(e.request).then(hit=>hit||fetch(e.request).catch(()=>{
      if(e.request.mode==='navigate') return caches.match('./index.html');
      return new Response('',{status:503,statusText:'Offline'});
    }))
  );
});