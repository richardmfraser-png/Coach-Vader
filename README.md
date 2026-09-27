# VADER MODE V2.4 — Media-Resilient Build

This build fixes the media-loading issue by embedding every Vader image and the original breathing MP3 inside `media.js`, then reconstructing them as local Blob URLs at runtime. The visible app no longer depends on relative image/audio paths.

## What changed
- 11 Vader images embedded in the application and reconstructed locally.
- Exact original breathing MP3 embedded byte-for-byte; no trimming, gain change, filtering, or re-encoding.
- Native full-track looping during Breathing Chamber sessions.
- Built-in **Media Check** in Settings reports image load count and breathing-track readiness.
- New display controls: colour template, visual tone, overall brightness, image brightness, saturation, and contrast.
- Five colour templates: Imperial Red, Mustafar Ember, Bespin Blue, Carbon Monochrome, Sith Neon.

## Audio integrity
Original supplied MP3 SHA-256:
`00e1b681b529332cacad7073a61c68d0027e554b70121297ad89b54a293ede44`

Packaged V2.4 MP3 SHA-256:
`00e1b681b529332cacad7073a61c68d0027e554b70121297ad89b54a293ede44`

These are identical.

## Testing
1. Open `index.html` through a normal web server (GitHub Pages is ideal), or use the standalone HTML.
2. Open **Settings** → **Media Check** → **Run media check**.
3. It should report `11/11 loaded` and `Ready • ~35.7 sec`.
4. Tap **Test breathing audio**. User interaction is required by mobile browsers before audio can play.
5. Open **Gallery & Postcards** and confirm the imagery loads throughout.

## Hosting
This remains a static application. Upload the whole folder to GitHub Pages, Netlify, Cloudflare Pages, or any ordinary web host. No backend is required.
