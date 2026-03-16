# AC Simulator — PWA

The ultimate AC simulator game as a Progressive Web App.

## Files
- `index.html` — Complete app (all screens, game logic, Firebase, UI)
- `manifest.json` — PWA manifest (install, icons, shortcuts)
- `sw.js` — Service worker (offline support, caching)

## Features
- ❄️ Full AC physics simulation (temperature, fan speed, modes)
- 🏭 12 AC models to collect (Common → Legendary → Secret)
- 🪙 Coin economy (earn, spend, unlock models)
- 🏆 30 achievements with real tracking
- 📅 Daily challenges (3 new every day, midnight reset)
- 🎮 Cool Zone mini-game with scoring
- ☁️ Optional Google Sign-in (Firebase sync)
- 📲 Installable as PWA (Add to Home Screen)
- 🔌 Works offline
- 🧊 Easter egg (tap secret icon 7 times → CrystalFrost X)

## Deploy to GitHub Pages

1. Create a new repo: `ac-simulator`
2. Upload all 3 files to the repo root
3. Go to Settings → Pages → Deploy from main branch
4. Your app will be live at:
   `https://malykfarasat.github.io/ac-simulator/`

## Add to Play Store (later)
Once hosted on GitHub Pages, use PWABuilder:
1. Go to pwabuilder.com
2. Enter: https://malykfarasat.github.io/ac-simulator/
3. Download signed AAB
4. Upload to Play Console

## Icons Needed
Create `icons/` folder with:
- `icon-96.png` (96×96)
- `icon-192.png` (192×192)
- `icon-512.png` (512×512)

Use a dark navy background (#0D1117) with a white/cyan snowflake ❄️ icon.
Free icon generator: maskable.app

## Firebase
Already configured with your credentials.
Google Sign-in saves progress to Firestore under `users/{uid}`.
