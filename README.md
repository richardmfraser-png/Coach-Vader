# VADER MODE V2.2 — Gallery + Supplied Audio Build

V2.2 keeps the wellness / self-development mechanics from V2.1 and adds the Vader imagery and breathing track supplied for this personal-use build.

## What changed

- Replaced the earlier book-scan chapter imagery with the newly supplied Vader artwork and stills throughout the app.
- Added a dedicated **Gallery & Postcards** section with all supplied images.
- Added 10 ready-made **Dark Side Postcards**: image + quippy headline + useful human lesson.
- Added an **Imperial Postcard Generator** so you can pick an image and write your own headline/lesson.
- Postcards can use the device share sheet where supported; otherwise they save as PNG files.
- The Dashboard, Training, Missions, Simulator, Coach, Helmet Check, Journal, Debrief, Command Centre, Wisdom and Progress areas now use the new imagery.
- The Breathing Chamber uses the supplied Darth Vader breathing MP3. The track is lightly boosted and trimmed only to improve mobile audibility and looping; the underlying supplied recording is otherwise preserved.
- **Test breathing audio** remains available in both the Breathing Chamber and Settings.
- Existing swipe navigation, navigation cue, haptics option, XP, badges, daily missions, Coach, Transmissions and Imperial Debrief are retained.

## Best test sequence

1. Open `index.html` from a local web server or host the folder on GitHub Pages.
2. Confirm the Dashboard hero shows the new Vader imagery.
3. Open **Gallery & Postcards** and tap several gallery images.
4. Tap **Share / save card** on a postcard and verify a PNG is created / shared.
5. Open **Breathing Chamber** and tap **Test breathing audio**.
6. Tap **Start chamber** and confirm the supplied breathing track loops while the timer runs.

## GitHub Pages

Upload the *contents* of this folder to a repository root, preserving the `assets/` folder. Enable GitHub Pages for that branch.

The app is plain HTML/CSS/JavaScript; there is no build step or backend.

## Data

Progress remains in browser `localStorage` under the same storage key used by V2/V2.1, so an existing browser profile can carry forward.

## Media note

This personal-use build contains the Vader images and breathing audio supplied for the project. If the app is ever distributed publicly, re-check the rights for those media assets before publication.
