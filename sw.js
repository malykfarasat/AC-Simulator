const V='acs-v2';
const CORE=['./','./index.html','./manifest.json'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(
    keys.filter(k=>k!==V).map(k=>caches.delete(k))
  )).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  const url=e.request.url;
  if(url.includes('firebase')||url.includes('googleapis')||url.includes('gstatic')||url.includes('fonts')){
    e.respondWith(fetch(e.request).catch(()=>new Response('',{status:503})));
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached=>{
      if(cached)return cached;
      return fetch(e.request).then(res=>{
        if(res.ok&&e.request.method==='GET'){
          const clone=res.clone();
          caches.open(V).then(c=>c.put(e.request,clone));
        }
        return res;
      }).catch(()=>{
        if(e.request.mode==='navigate')return caches.match('./index.html');
        return new Response('Offline',{status:503});
      });
    })
  );
});
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  e.waitUntil(clients.matchAll({type:'window'}).then(wins=>{
    if(wins.length>0)return wins[0].focus();
    return clients.openWindow('./');
  }));
});
