---
name: project-home-categorias
description: Home v3 (original info + original navy/teal colors + one button per category) and 4 category sub-landings, 2026-10-23, test theme 181906309367
metadata:
  type: project
---
On 2026-10-23 I built the home and 4 category sub-landings in test theme `181906309367`. Samuel only has to publish that theme. Details are in `contexto/ESTADO-TOVELYA.md` (Categorías, Fotos limpias, Página principal).

**Why:**
- Samuel called the old home "re pailas": a projector photo with the logo pasted on and red clamps.
- He also wanted one page per category with "qué hay en esta sección" and recommendations.
- My first try was a white/cream café-style home. He said it was "muy sencilla".
- He likes ALL the information of the original home and its original colors (navy #081B35/#0F223B, teal #0A7A6E/#5EF0D8, orange buttons).
- He wants each category as a button.
- The café/cream palette belongs ONLY to the café con colágeno product.

**How to apply:**
- **Changing the home:** start from the original section (`sections/tovelya-home-v3.liquid` = original + category buttons + new hero photo) and add to it. Don't replace it with a minimal page.
- **Colors:** keep Tovelya's navy/teal everywhere except the café landing. Banners use `PALETA=tovelya herramientas/banner.sh`.
- **Category pages:**
  - Order: cover banner → subgroups → "¿Cuál es para ti?" (need → product) → all products → recommended → trust → COD/WhatsApp banner → other categories.
  - Built with `herramientas/plantillas-categorias.mjs` and the section `tovelya-categoria`.
- **Product photos:** each product's first photo is a clean catalog shot. Do the same for new products with `herramientas/generar-packshots.sh`.
- **Content rules:** don't invent reviews or ratings.
- **Big redesigns:** ask before changing direction. He rejected two redesigns (2026-10-22 and the first try on 2026-10-23).
- Related: [[feedback-menos-texto-mas-imagenes]], [[reference-shopify-desde-nube]].
