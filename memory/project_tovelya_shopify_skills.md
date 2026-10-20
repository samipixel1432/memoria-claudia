---
name: project-tovelya-shopify-skills
description: "Tovelya is a Shopify COD dropshipping store (Colombia); a \"Moni Makers\" basic skill pack was installed into .claude/skills for this project"
metadata: 
  node_type: memory
  type: project
  originSessionId: 8b7fafc2-271e-4afc-9534-7ad38f727d8e
  modified: 2026-09-21T22:57:33.123Z
---

The project at `C:\Users\PC\OneDrive\Documentos\ChatGPT\1proyecto_shopifu` runs **Tovelya**, a Shopify pago-contra-entrega (COD) dropshipping store in Colombia (`tovelya-store.myshopify.com`, connected via the Shopify MCP tools and `shopify/.env`). Active product landing pages so far: Cepillo Eléctrico Recargable 7 en 1, Inflador y Arrancador Portátil 4 en 1, Mini Proyector LED — all built as custom liquid sections (see `shopify/*.liquid`) with a consistent structure (COD/shipping bar, hero with "Nuevo en Tovelya" badge, price, CTA).

On 2026-09-21 the user provided a zip (`Skills 3 Moni Makers`) with genericized dropshipping skills and asked to install them so Claude always uses them when relevant. Installed into `.claude/skills/` (project-level):
- `validador-producto-basico` — quick product validation (margin, demand, verdict).
- `landing-basica` — checklist/structure for building or reviewing a sales landing page.
- `combos-cod-basico` — quantity-based combo offers (1/2/3 units) via quantity discounts, not separate variants.
- `politicas-legales-basico` — privacy/returns policy pages + footer links.
- `youtube-research-basico` — summarizing a YouTube video into actionable dropshipping ideas.
- `direct-ads` / `indirect-ads` — static image ad prompts for hot (retargeting) vs cold (prospecting) audiences.

**Why:** the user wants these skills used by default whenever the task matches (making/reviewing a landing, validating a product, setting up combos, legal pages, or image ads) rather than improvising a generic approach.

**How to apply:** [[feedback-use-installed-dropshipping-skills]]. Note: `direct-ads`/`indirect-ads` SKILL.md files still contain leftover references to "Jacobo" and files like `campaign-copilot/data/products.json` from the original (non-generic) source they were distilled from — those specific file paths/names don't exist in this project; treat them as illustrative doctrine, not literal paths to read.
