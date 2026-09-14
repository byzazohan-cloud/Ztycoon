const CACHE='zazo-tycoon-v13-complete';
const ASSETS=["./", "./index.html", "./office.jpg", "./bank_v13.jpg", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./office_v13_1.jpg", "./office_v13_1_4k.jpg", "./office_v13_2.jpg", "./office_v13_2_4k.jpg", "./office_v13_3.jpg", "./office_v13_3_4k.jpg", "./office_v13_4.jpg", "./office_v13_4_4k.jpg", "./office_v13_5.jpg", "./office_v13_5_4k.jpg", "./office_v13_6.jpg", "./office_v13_6_4k.jpg", "./office_v13_7.jpg", "./office_v13_7_4k.jpg", "./office_v13_8.jpg", "./office_v13_8_4k.jpg", "./office_v13_9.jpg", "./office_v13_9_4k.jpg"];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 const r=e.request;
 if(r.mode==='navigate'||(r.headers.get('accept')||'').includes('text/html')){
   e.respondWith(fetch(r).then(res=>{let copy=res.clone();caches.open(CACHE).then(c=>c.put(r,copy));return res}).catch(()=>caches.match(r).then(x=>x||caches.match('./index.html'))));
   return;
 }
 e.respondWith(caches.match(r).then(x=>x||fetch(r).then(res=>{let copy=res.clone();caches.open(CACHE).then(c=>c.put(r,copy));return res})));
});
