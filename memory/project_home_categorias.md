---
name: project-home-categorias
description: New white/cream home + one sub-landing per category (Hogar, Salud, Carro y moto, Entretenimiento), built 2026-10-23 in test theme 181906309367
metadata:
  type: project
---
On 2026-10-23 I built a new home and 4 category sub-landings in the test theme `181906309367` ("Tovelya - café colágeno con bono (prueba)"). Samuel only has to publish that theme. Full detail is in `contexto/ESTADO-TOVELYA.md` (Categorías, Fotos limpias, Página principal).

**Why:** Samuel said the old home looked "re pailas": a projector photo with the logo pasted on and red clamps, and every product crammed into one page. He wanted it like the café landing (white/cream, modern, very professional), plus a separate page per category that explains "qué hay en esta sección" and recommends, not products just thrown there. He picked 4 categories, the white/cream style, and new clean photos for every product.

**How to apply:**
- Category page pattern:
  - cover banner with the text inside
  - subgroups with photos
  - "¿Cuál es para ti?" (need → product)
  - all products
  - one recommended product with 3 checks
  - trust and the COD + WhatsApp banner
  - other categories
- New categories reuse the section `tovelya-categoria` and the generator `herramientas/plantillas-home-categorias.mjs`.
- Every product's first photo is now a cream-background catalog shot. Do the same for any new product (`herramientas/generar-packshots.sh`).
- The home keeps the old message he liked: "Lo útil también puede sentirse especial", 4 steps, the 2 real reviews and the 4 FAQs. Don't invent reviews or ratings.
- If he dislikes it, revert with `respaldos/2026-10-23-index-ANTES-original.json`. He has rejected a home redesign before (2026-10-22, "DEJALO COMO ESTABA ANTES"), so ask before changing direction.
- Related: [[feedback-menos-texto-mas-imagenes]], [[reference-shopify-desde-nube]].
