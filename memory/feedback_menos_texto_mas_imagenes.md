---
name: feedback-menos-texto-mas-imagenes
description: Samuel wants landings with little text and many images that carry the text inside them (stacked banners with order buttons in between)
metadata:
  type: feedback
---

On 2026-10-22, looking at the coffee landing, Samuel said "hay demasiado texto" and asked for less text and more images "con texto", "bien bacano".

He approved the result the same day ("perfecto hermoso") and asked that it **always** be done this way. It is now the standard for every landing (summary in `CLAUDE.md`).

**Why:** his buyers scroll on mobile and read images, not paragraphs. Long text sections (benefits, comparisons, FAQs) lose them.
**How to apply:** keep a short hero (title, 3 checks, price, button), then a column of 4:5 banners (1080×1350) with one idea each: photo on top and a cream panel with a tag, a big two-line title and one small line. Make them with `herramientas/banner.sh` (real font, so no misspellings). Show them with the `tovelya-imagenes` section and put an order button every 2–3 images. Hide the text-heavy sections. See [[feedback-landing-clara-y-simple]] and [[feedback-landing-add-ctas-dont-remove]].
