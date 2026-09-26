# VADER MODE V2

A private, humorous self-wellness web app inspired by the chapter themes and imagery in the supplied copy of **Be More Vader**.

**Core idea:** notice the dramatic “Vader instinct,” translate it into a useful human response, take one small action, then debrief.

## What V2 adds

- **Imperial Dashboard** with daily mission, readiness, XP, streak and incoming transmission.
- **25 Vader Training lessons** across the five book stages: Starting Out, Getting Established, Seeking Promotion, Working With Colleagues and Becoming a Leader.
- **Cinematic chapter skins** using selected imagery extracted from the supplied personal scan.
- **Vader vs Human Coach**: enter a real situation and get a humorous Vader instinct, a functional-human translation and one next mission. This is an offline rule-based reflection tool, not an AI service.
- **Incoming Transmission**: rotating small daily challenges with accept/complete tracking.
- **Mission Simulator** for common workplace and life situations.
- **Helmet Check** for energy, focus, confidence, calm and patience.
- **Breathing Chamber** with 2/5/10-minute timers, 4-2-6 pacing, and an original browser-synthesized mechanical respirator ambience designed to evoke the familiar chamber feel. No film audio recording is bundled.
- **Imperial Log** plus a separate **60-second Imperial Debrief**.
- **Command Centre** for goals and commitments.
- **Dark Side Wisdom**, progress tracking, XP, ranks and badges.
- **Shareable achievement cards** generated as PNG files in the browser; on supported phones the Web Share sheet opens automatically.
- **Swipe navigation** on touch devices.
- **Optional two-hit cinematic navigation cue**, volume control and optional haptics.
- Local-only data storage, JSON backup/import and PWA/offline support.

## Fastest way to use it

Open `index.html` from a small local web server, or deploy the whole folder to GitHub Pages.

For the easiest no-server preview, use the separate `vader-mode-v2-standalone.html` file supplied with the package. It contains the CSS, JavaScript and image assets in one file.

## Run locally

From this folder:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Publish on GitHub Pages

1. Create a new GitHub repository, for example `vader-mode`.
2. Upload **all files and the `assets` folder** from this package to the repository root.
3. Commit the files.
4. Open **Settings → Pages**.
5. Under **Build and deployment**, select **Deploy from a branch**.
6. Choose the `main` branch and `/ (root)` folder.
7. Save. GitHub will provide the public Pages address after deployment.

## Data and privacy

All entries and progress are stored in the browser with `localStorage`. There is no account, cloud database, analytics or external API in this build. Use **Settings → Export JSON** if you want a backup.

## Audio note

The navigation cue and Breathing Chamber audio are generated from Web Audio oscillators and filtered noise. They are original synthesized effects intended to give the app a dark, mechanical, cinematic atmosphere; the package does **not** contain an extracted Star Wars soundtrack, score, voice clip or Darth Vader breathing recording.

## Image note

The V2 chapter/atmosphere images were extracted from the *Be More Vader* scan supplied for this private build. If the app is ever distributed publicly or commercially, replace those images and review the branding/IP position first.

## Files

- `index.html` — app shell
- `styles.css` — interface and cinematic styling
- `app.js` — all app logic and content
- `assets/` — the seven selected visual assets
- `manifest.webmanifest` — installable web-app metadata
- `service-worker.js` — offline cache
- `icon.svg` — simple app icon

## Technical notes

No build step, package manager or server-side component is required. The app is plain HTML/CSS/JavaScript and is designed for modern Safari, Chrome and Edge browsers.
