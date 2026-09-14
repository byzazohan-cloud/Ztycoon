const CACHE='zazo-tycoon-v18-ultra-mobile';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./bank_mobile.jpg','./bank_8k.jpg','./office_mobile.jpg','./office_8k.jpg','./shop_mobile.jpg','./shop_8k.jpg','./warehouse_mobile.jpg','./warehouse_8k.jpg','./factory_mobile.jpg','./factory_8k.jpg','./city_mobile.jpg','./city_8k.jpg','./market_mobile.jpg','./market_8k.jpg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(r=>{let x=r.clone();caches.open(CACHE).then(c=>c.put(e.request,x));return r}).catch(()=>caches.match('./index.html')));return}
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});