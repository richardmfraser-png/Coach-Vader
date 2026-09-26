const CACHE='vader-mode-v2';
const ASSETS=[
  './','./index.html','./styles.css','./app.js','./manifest.webmanifest','./icon.svg',
  './assets/vader-hero.webp','./assets/breathing-vader.webp','./assets/stage-starting.webp',
  './assets/stage-established.webp','./assets/stage-promotion.webp','./assets/stage-colleagues.webp','./assets/stage-leader.webp'
];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
