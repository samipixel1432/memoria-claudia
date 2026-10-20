---
name: feedback-neon-floating-icons
description: "Landing style the user likes — neon floating badges, but only for benefits; color by function elsewhere"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 8b7fafc2-271e-4afc-9534-7ad38f727d8e
  modified: 2026-10-02T03:37:16.718Z
---

Brush landing, 2026-10-01: the user loved the neon floating step numbers ("perfecto") and asked for the same on all icons. After seeing it on every button and icon they said it was too loud ("muy exagerado", "me equivoqué, no lo uses en todos") and asked for color psychology per function.

Final system (end of `{% stylesheet %}` in `sections/tovelya-mini-proyector.liquid`, scoped `.mpp[data-brush-landing]`, CSS vars `--c-*`):
- Action/buy (CTAs, sticky button, Releasit submit, selected combo): orange `#ffb547→#ff8a1f`, navy text.
- Trust/payment (pago al recibir, garantías, formas de pago, compra protegida): blue `#6aa8ff→#2f6fe4`, white icon, no animation.
- Product benefits / cleaning + steps 1-2-3: neon `#8bfff1→#2ef2c9→#19d3ff`, soft glow, gentle float (-3px).
- Savings tags: gold. Checks (included/yes): solid green `#1fb36b`.
- Sizes: small icons 32px, feature icons 40px, checks 22px. Soft shadows, no pulsing glows.

**Why:** one accent everywhere made the page heavy and hid the buy button; the user wants each color to signal its function.
**How to apply:** on other Tovelya landings, offer this color-by-function system; reserve the neon for benefits/steps and keep CTAs a contrasting warm color. Put override CSS last so earlier same-specificity rules don't win. See [[tovelya-shopify-skills]].
