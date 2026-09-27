# VADER MODE V2.6 — Breathing Speed Control

V2.6 adds user-controlled playback speed to the Breathing Chamber while keeping the uploaded breathing MP3 unchanged.

## New in V2.6
- **Breathing track speed slider** directly in the Breathing Chamber.
- Range: **0.60× to 1.40×** in **0.05×** steps.
- Live multiplier display while dragging.
- **1.00×** is the original recording speed.
- The same control is mirrored under **Settings → Sound & Motion**.
- The selected speed is saved in local browser storage and restored on future visits.
- Changing the slider while the track is playing updates playback immediately.
- Pitch preservation is requested where the browser supports it, so changing tempo does not intentionally distort the characteristic sound.

## Audio integrity
The source MP3 is not trimmed, filtered, normalized, boosted, or re-encoded. The app changes only the browser audio element's `playbackRate` during playback.

SHA-256 of packaged breathing MP3 remains:
`00e1b681b529332cacad7073a61c68d0027e554b70121297ad89b54a293ede44`

## Chrome and Safari
- The standalone build keeps images and audio embedded as direct data URIs.
- The full folder build is recommended for Chrome via HTTPS/GitHub Pages.
- User interaction is still required before browsers allow audio playback.

## GitHub Pages
1. Upload the contents of the `vader-mode-v2_6` folder to your repository.
2. Enable **Settings → Pages → Deploy from a branch**.
3. Open the generated HTTPS URL.
4. In **Breathing Chamber**, move the speed slider and press **Test breathing audio**.
