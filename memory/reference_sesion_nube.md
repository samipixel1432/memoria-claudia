---
name: reference-sesion-nube
description: How Claude works with Samuel from a cloud session (claude.ai/code): memory repo, connectors and skills available there
metadata:
  type: reference
---

On 2026-10-20 Samuel opened a cloud session (claude.ai/code), uploaded `memoria-claudia.zip` and pointed to `github.com/samipixel1432/memoria-claudia`. The GitHub repo was **empty**: the 2026-10-19 commit had never been pushed from the PC. It was pushed from the cloud that day, so GitHub is now the source of truth.

In the cloud:
- Attach the repo (`add_repo` samipixel1432/memoria-claudia), clone it, read `CLAUDE.md`, `memory/MEMORY.md` and `contexto/ESTADO-TOVELYA.md`; commit and push to `main` when done.
- The local project `1proyecto_shopifu` and its `shopify/*.py` scripts are **not** available (that repo has no GitHub remote). Work on the store through the Shopify connector instead.
- Connectors seen in the session: Shopify, Meta (ads), Canva and Claude Docs. Meta showing up here does not mean the Tovelya Ads account is reachable; check before promising.
- Skills seen: `landing-cro` (sales landing from one URL, single HTML) and `landing-a-secciones` (HTML landing → Shopify Dawn `.liquid` sections). The Moni Makers skills (`landing-basica`, `validador-producto-basico`, `combos-cod-basico`, `politicas-legales-basico`, `youtube-research-basico`, `direct-ads`, `indirect-ads`) live only on the PC, so they are not there (checked 2026-10-21). The Hainrixz plugins are now in the cloud too, see [[reference-hainrixz-skills]]; they load only in a session started on (or after a reload with) this repo. To bring the Moni Makers skills to the cloud, copy their folders from the PC project's `.claude/skills/` into this repo's `.claude/skills/` and push: every session that clones this repo then loads them.

- Network: the environment has lost its allowed domains more than once (2026-10-22). Needed: `auth.openai.com`, `chatgpt.com` (Codex images), `tovelya-store.myshopify.com`, `cdn.shopify.com` (checking the store and screenshots). If they are blocked, ask Samuel to add them again under the environment's ⚙️ → Network access. The Shopify connector and the staged-upload host keep working without them.
- Test orders (2026-10-23):
  - The EasySell COD form loads a Cloudflare Turnstile anti-bot check from `challenges.cloudflare.com`. That host is blocked here, so the form never submits from the cloud browser.
  - After about 10 automated page loads, Shopify answers 429 for roughly 10 minutes.
  - For a real form test, either allow `challenges.cloudflare.com` (Turnstile may still reject a headless browser) or ask Samuel to place the order from his phone. Then find it with an `orders` query (tag `easysell_cod_form`) and cancel or delete it.
  - The script is in the `herramientas/pedido-prueba.mjs`. Field placeholders: "Eje: Camilo Andres", "Eje: 3045675789", Departamento/Ciudad selects (option text has spaces, so pick by index), "Eje: Calle 45 # 13-25", "#Casa / Torre / Apto / Barrio o Referencia". Submit button: "PEDIR Y PAGAR AL RECIBIR".
- A cloud session cannot control Samuel's PC (no computer-use tools, checked 2026-10-21), and the Shopify connector cannot publish themes. Publishing a theme copy is always his click.

**Why:** Samuel wants to switch devices and keep the same memory.
**How to apply:** on the PC, run `git pull` in the `memoria-claudia` copy before working, since cloud sessions push too. See [[reference-memoria-github]].
