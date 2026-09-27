const CACHE='vader-mode-v2.6-playback-speed';
const ASSETS=[
  './','./index.html','./styles.css','./media.js','./app.js','./manifest.webmanifest','./icon.svg',
  './assets/vader-command.webp','./assets/vader-army.webp','./assets/vader-smoke.webp',
  './assets/vader-mask-art.webp','./assets/vader-portrait-red.webp','./assets/vader-closeup.webp',
  './assets/vader-clouds.webp','./assets/vader-saber-dark.webp','./assets/vader-red-face.webp',
  './assets/vader-silhouette.webp','./assets/vader-corridor.webp','./assets/vader-breathing-original.mp3'
];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
