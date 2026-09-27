# VADER MODE V2.3 — Exact Breathing Audio Loop

This build corrects the breathing-audio treatment from V2.2. The supplied Darth Vader MP3 is now used **exactly as uploaded**.

## Breathing audio correction

- Source file: `Darth Vader Breathing - QuickSounds.com.mp3`
- App asset: `assets/vader-breathing-original.mp3`
- Duration: approximately **35.657 seconds**
- The MP3 is copied byte-for-byte into the app.
- **No trimming. No volume boost. No filtering. No normalization. No re-encoding.**
- The browser's native audio loop replays the complete track continuously while the Breathing Chamber timer is running.
- The app no longer substitutes a synthesized breathing sound if the supplied track is blocked. It instead asks you to open the app in Safari/Chrome and tap Start again.

### Integrity check

SHA-256 of the original uploaded MP3 and the packaged app asset:

`00e1b681b529332cacad7073a61c68d0027e554b70121297ad89b54a293ede44`

This confirms that the packaged breathing file is the same file you supplied.

## Everything else retained

The V2.2 Vader imagery, Gallery & Postcards, postcard generator, Vader vs Human Coach, Incoming Transmissions, Imperial Debrief, swipe navigation, navigation cue, missions, ranks, badges, journal and wellness features are retained.

## Test sequence

1. Open `index.html` from a local web server or GitHub Pages.
2. Go to **Breathing Chamber**.
3. Tap **Test breathing audio** or **Start chamber**.
4. Confirm the complete original track is heard.
5. Let it run beyond 35 seconds to confirm the whole track loops back to the beginning.

For the standalone HTML, the same original MP3 bytes are embedded directly in the file as a data URL.
