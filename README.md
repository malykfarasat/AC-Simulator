# AC Simulator v2.0

## Files
- `index.html` — Complete app
- `manifest.json` — PWA manifest
- `sw.js` — Service worker (offline)
- `firestore.rules` — Firebase security rules
- `icons/` — Create this folder with icon-192.png + icon-512.png

## 🔥 Firebase Security Rules — IMPORTANT

Go to https://console.firebase.google.com → your project → Firestore → Rules
Replace the rules with the content of `firestore.rules`.

This ensures:
- Users can ONLY read/write their own data
- Data is validated before saving
- No unauthorized access possible

## 📲 Deploy to GitHub Pages

1. Create repo: `ac-simulator`
2. Upload ALL files (index.html, manifest.json, sw.js)
3. Create `icons/` folder — upload icon-192.png and icon-512.png
4. Settings → Pages → Deploy from main branch → / (root)
5. Live at: https://malykfarasat.github.io/ac-simulator/

## 🎨 Icons

Create icons using https://maskable.app or Figma:
- Dark navy background: #0a0e1a
- White/cyan snowflake or AC unit icon
- Export as: icon-192.png (192×192) and icon-512.png (512×512)

## 📱 Install on Phone

### Android (Chrome):
- Open the site in Chrome
- A banner will appear at the bottom automatically
- OR tap Chrome menu (⋮) → "Add to Home Screen"

### iOS (Safari):
- Open in Safari
- Tap Share button (□↑)
- Tap "Add to Home Screen"

## ☁️ Firebase — How Data Saves

1. All progress saves to localStorage instantly (works offline)
2. When user signs in with Google, data syncs to Firestore
3. Auto-save triggers 2 seconds after any change
4. On next sign-in on any device, cloud data loads automatically
5. If cloud data has more coins than local → cloud wins

## 🔐 Google Sign-in Setup

In Firebase Console:
1. Authentication → Sign-in method → Google → Enable
2. Add your GitHub Pages domain to Authorized domains:
   `malykfarasat.github.io`
3. Also add: `localhost` (for local testing)

## 🎮 Game Features

- Realistic room with AC unit visible on wall
- Room color changes with temperature (cold blue ↔ hot red)
- Airflow animation when AC is running
- 12 AC models (Common → Rare → Epic → Legendary → Secret)
- Physics: temperature, electricity calculation, fan speeds
- 30 achievements with Firebase tracking
- Daily challenges (3 new every day)
- Cool Zone mini-game
- Coin economy (earn, spend, unlock ACs)
- Easter egg (tap secret icon 7 times → CrystalFrost X)
- Timer, sleep mode, swing mode
