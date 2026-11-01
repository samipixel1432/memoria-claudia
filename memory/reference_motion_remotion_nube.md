---
name: reference-motion-remotion-nube
description: How to make edited ad videos with the motion-architect plugin (Remotion) from a cloud session, and the workarounds it needs
metadata:
  type: reference
---

Used on 2026-11-01 for the Happy Cleaner ads (`/motion-architect:motion`).

- **Studio install:** the studio is not installed in a new session. Copy it from the plugin and install:
  - `cp -r /root/.claude/plugins/cache/motion-architect/motion-architect/<versión>/studio ~/motion-architect/`
  - `npm ci` (npm registry is reachable).
  - Then copy assets to `~/motion-architect/studio/public/` (videos, jpg photos, fonts).
- **Fonts:** `@remotion/google-fonts` fails, because Google Fonts cannot be reached from the cloud. Replace `src/brand/brand.ts` with the local version and use Inter Display from `public/fonts`, declared with `@font-face` + `staticFile` inside the composition.
- **Browser:** do not let Remotion download Chrome. Pass `--browser-executable=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell` to `remotion still` and `remotion render`. Use `--muted`, since Samuel adds the music himself.
- **Saved code:** the Happy Cleaner compositions (`HappyTarro`, `HappyVerano`) and storyboards are in `herramientas/motion/`.
  - Both are 9:16 and 4:5, 15 s.
  - Text runs in a red pill, word by word. Photos sit in a card on a blurred background so the jar is never cropped. The ending has an orange "Pídelo hoy" button with a pulse.
  - A `|` in the text forces a line break.
  - To reuse: copy `HappyAd.tsx` and `index.ts` into `studio/src/compositions/` and `brand.ts` into `studio/src/brand/`.
- **Quicker option without Remotion:** `herramientas/anuncio-vertical.sh` (ffmpeg) builds a simple ad from a script of clips and photos.

**Why:** the session container is wiped, so the studio and these fixes have to be redone each time.
**How to apply:** follow the plugin flow (storyboard → Samuel approves → build → stills → render) with these fixes, and deliver the mp4 files with SendUserFile from `entregas/`. See [[feedback-menos-texto-mas-imagenes]] for content rules: food = no health claims.
