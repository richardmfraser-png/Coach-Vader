# VADER MODE V2.1 — Media Fix Build

This build fixes the two issues reported in V2: Vader imagery not appearing reliably, and the Breathing Chamber sound not being audible on some iPhone / embedded-preview environments.

## What changed

- Important Vader imagery is now rendered as real `<img>` elements rather than depending mainly on CSS background images.
- Dashboard hero, training-stage cards, selected-stage hero, Incoming Transmission, Breathing Chamber and lesson modals all show explicit imagery from the supplied *Be More Vader* scan.
- The Breathing Chamber now uses a dedicated original WAV loop (`assets/vader-breath-loop.wav`) rather than relying only on Web Audio synthesis.
- The WAV is looped for the entire timed session and starts directly from the user's button tap, which is substantially more reliable on iPhone/Safari.
- A Web Audio synthetic fallback remains available if the media track cannot play.
- Settings now includes **Test breathing audio** as well as **Test navigation cue**.
- The Breathing Chamber itself also has a **Test breathing audio** button.
- The service-worker cache was bumped to `vader-mode-v2.1-media-fix`, so a hosted/PWA version will not keep serving the older V2 media bundle.

## Best way to test on iPhone

### Standalone file
Open `vader-mode-v2_1-standalone.html` in Safari (rather than relying on an in-app document preview). The standalone file contains the imagery, CSS, JavaScript and breathing WAV inside one HTML file.

1. Open the app.
2. Confirm the Vader image is visible on Dashboard.
3. Open **Breathing Chamber** — the Vader image should be visible at the top.
4. Tap **Test breathing audio**. You should hear a deep mechanical inhale/exhale loop.
5. Tap **Start chamber**. The loop should continue for the selected 2/5/10 minute session.
6. Open **Settings** if you want to raise the sound volume.

Some document preview surfaces intentionally suppress HTML audio or JavaScript. If a preview is silent, opening the same file in Safari/Chrome is the correct test.

## GitHub Pages / hosted version

Upload the entire `vader-mode-v2_1` folder contents together, preserving the `assets/` directory. `index.html` expects:

- `styles.css`
- `app.js`
- `service-worker.js`
- `manifest.webmanifest`
- `icon.svg`
- all files under `assets/`, including `vader-breath-loop.wav`

For GitHub Pages, place the folder contents at the repository root and enable Pages from the branch/folder you are publishing.

## Audio note

The breathing track is an original synthetic mechanical respirator loop designed to evoke the familiar Vader-style inhale/exhale. It is not copied from a Star Wars film soundtrack or official recording.

## Data

As before, user progress is stored only in browser `localStorage`. V2.1 keeps the same storage key so existing local V2 progress can carry forward.
