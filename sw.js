const CACHE="etap79gh-v4";
const FILES=["./","index.html","manifest.webmanifest","xlsx.full.min.js","jspdf.umd.min.js","html2canvas.min.js","docx.umd.js","icon-192.png","icon-512.png","icon-maskable-512.png","apple-touch-icon.png","napominaniya-79gh.ics"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;
  const u=new URL(r.url);
  if(u.origin!==location.origin){e.respondWith(caches.open(CACHE).then(c=>c.match(r).then(m=>m||fetch(r).then(res=>{if(res.ok||res.type==="opaque")c.put(r,res.clone());return res}).catch(()=>m))));return}
  /* свои файлы: сначала сеть (чтобы получать обновления), без сети — из кэша */
  e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp))}return res}).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match("index.html"))))});
