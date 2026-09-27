# VADER MODE V2.5 — Chrome-Safe Build

This revision specifically addresses Chrome/local-file compatibility.

## Key change
V2.4 reconstructed embedded media as `blob:` URLs. Safari handles that path well, but Chrome/mobile document viewers can impose stricter local-file or embedded-media rules. V2.5 removes that dependency completely.

- All 11 Vader images are embedded as direct `data:image/webp;base64,...` sources.
- The exact supplied Darth Vader breathing MP3 is embedded as a direct `data:audio/mpeg;base64,...` source.
- The breathing element is now a real `<audio>` element attached to the document, which improves mobile Chrome playback after the user taps **Start chamber** or **Test breathing audio**.
- No trimming, gain change, filtering, or re-encoding of the supplied MP3.
- Existing colour templates, image tone, brightness, saturation and contrast controls remain.
- Settings → Media Check now reports the browser/runtime mode as well as image and audio readiness.

## Audio integrity
SHA-256 of packaged breathing MP3:
`00e1b681b529332cacad7073a61c68d0027e554b70121297ad89b54a293ede44`

## Important Chrome note
A downloaded standalone `.html` file is still subject to Chrome's local-file/document-viewer restrictions, especially on mobile. No app code can fully control those browser restrictions. The reliable deployment target for Chrome is **HTTPS**.

### Recommended
Upload the full V2.5 folder to GitHub Pages (or Netlify/Cloudflare Pages) and open the HTTPS URL in Chrome. That removes the local-file sandbox, gives the service worker/PWA a normal origin, and is the configuration to use for seamless Chrome behavior.

## Quick GitHub Pages deployment
1. Create a repository and upload the contents of the `vader-mode-v2_5` folder.
2. In GitHub: **Settings → Pages → Deploy from a branch**.
3. Select your main branch and `/ (root)`.
4. Open the generated `https://...github.io/...` address in Chrome.
5. Run **Settings → Media Check**; images should report 11/11 and the breathing track should report Ready.

The standalone file is retained for Safari/local convenience; the hosted HTTPS build is the canonical Chrome version.
