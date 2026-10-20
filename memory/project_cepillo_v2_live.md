---
name: project-cepillo-v2-live
description: "The live brush product page now uses template product.cepillo-v2 (v2 redesign sections), not the old tovelya-mini-proyector section"
metadata:
  node_type: memory
  type: project
  originSessionId: 349bb2cd-b3f0-4986-939a-fc4f573f6489
  modified: 2026-10-06T02:28:55.249Z
---

Since 2026-10-05 the brush product (`cepillo-electrico-recargable-7-en-1`) has `templateSuffix = cepillo-v2`. Codex installed it from `landing-cepillo-v2/`. The page is built from 18 sections named `sections/tovelya-cepillo-v2-*.liquid`: 17 come from `landing-cepillo-v2/secciones/` and Codex added `-pedido` for the Releasit form. The old template `product.cepillo-electrico` (section `tovelya-mini-proyector`) is no longer what customers see.

Demo videos are stored as Shopify Files (`tovelya-cepillo-video-*.mp4`) and referenced in the template as `shopify://files/videos/<filename>`. That format works.

Update 2026-10-19: the order form is now EasySell (Releasit was uninstalled). Copy, order and sections are set by `shopify/deploy-cepillo-landing-v3.py`, which re-reads the live template and can be re-run. It adds the "oferta" and "comopedir" sections and hides the FAQ and the 2-pack. Current state is in `contexto/ESTADO-TOVELYA.md`.

**Why:** on 2026-10-05 I edited the old section first and the change wasn't visible because the product had already been switched to the v2 template.
**How to apply:** before editing the brush landing, check the product's `templateSuffix` through the Admin API and edit the `tovelya-cepillo-v2-*` sections and template. Deploy pattern: `shopify/deploy-cepillo-v2-videos.py`. See [[project-tovelya-shopify-skills]].
