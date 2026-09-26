# Vader Mode — Prototype v1

**The Dark Side Guide to Being a Better Human**

A lightweight, humorous self-wellness and personal-development web app inspired by the chapter themes of *Be More Vader*. The app converts exaggerated “Vader” framing into practical human behaviour: confidence, self-control, clarity, negotiation, boundaries, leadership, reflection and recovery.

## What is included

- Imperial Dashboard
- 25-lesson Vader Training Academy across the book's five broad stages
- Today's Orders / daily mission
- Mission Simulator with humorous choices and feedback
- Helmet Check (energy, focus, confidence, calm, patience)
- Breathing Chamber with 2, 5 and 10 minute timers
- Imperial Log reflection journal
- Command Centre for goals and commitments
- Dark Side Wisdom cards + user-added lines
- Progress, XP, ranks, streaks and badges
- Local JSON export/import
- Installable PWA support
- Responsive mobile/desktop design

All personal data stays in the browser using `localStorage`. There is no server and no account system in this first version.

## Run it locally

Because it is a static app, the simplest method is:

### Option A — Python

```bash
cd vader-mode-app
python3 -m http.server 8000
```

Open `http://localhost:8000`.

### Option B — VS Code

Open the folder in VS Code and use a static-server extension such as **Live Server**.

You can open `index.html` directly, but PWA/offline features require serving the folder over `http://` or `https://`.

## Publish with GitHub Pages

1. Create a new GitHub repository, for example `vader-mode`.
2. Upload all files in this folder to the repository root.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)` folder.
6. Save. GitHub will provide the public Pages address after deployment.

The app uses relative asset paths, so it works when hosted inside a GitHub Pages repository sub-path.

## Files

- `index.html` — app shell
- `styles.css` — complete responsive visual design
- `app.js` — app data, interactions and local persistence
- `manifest.webmanifest` — installable app metadata
- `service-worker.js` — simple offline cache
- `icon.svg` — original abstract app icon

## Content & IP note

This prototype is intended for personal use. It uses original wellness copy and paraphrases chapter themes rather than reproducing the source book. It does not include official Star Wars artwork, film stills, logos, music, dialogue clips or sound effects. “Star Wars” and “Darth Vader” are properties of their respective rights holders; this prototype is not affiliated with or endorsed by them.

If the app is ever distributed commercially, review the name, branding and trademark position before launch. The easiest commercial route would be to retain the underlying humour/training mechanics while moving to a clearly original “dark commander” identity.

## Good v2 upgrades

- Optional cloud sync / login
- Push reminders for Today's Orders
- More scenario packs (work, relationships, discipline, difficult conversations)
- Weekly wellness report
- User-created missions
- Voice notes in the Imperial Log
- Audio soundscapes generated from original assets
- Optional AI debrief coach
- Shareable “Vader Mode” achievement cards
