  const ToCacheFileList=[
    "./",
    "./index.html",
    "./manifest.json",
    "./e.png",
    "./sw.js"
  ],CacheName='PWA-V7';;
  
  
  self.addEventListener('install',(event)=>{
    event.waitUntil(
      caches.open(CacheName).then((cache)=>{
        return cache.addAll(ToCacheFileList);
      }).then(()=>{
        return self.skipWaiting();
      })
    )
  });
  
  self.addEventListener('active',(event)=>{
    event.waitUntil(
      caches.open(CacheName).then((cache)=>{
        return cache.keys().then((cachekey)=>{
          return Promise.all(
            cachekey.filter((CacheKey)=>{
              return ToCacheFileList.indexOf(CacheKey) === -1;
            }).map((CacheKey)=>{
              return caches.delete(CacheKey);
            })
          )
        }).then(()=>{
          return self.clients.claim();
        })
      })
    )
  });
  
  self.addEventListener('fetch',(event)=>{
    event.respondWith(
      caches.match(event.request).then((response)=>{
        return response || fetch(event.request);
      })
    )
  })
  
  