---
name: feedback-use-installed-dropshipping-skills
description: "Always use the installed .claude/skills dropshipping skills (landing, validator, combos, policies, ads) instead of improvising when the task matches"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 8b7fafc2-271e-4afc-9534-7ad38f727d8e
  modified: 2026-09-21T22:57:40.097Z
---

Always invoke the relevant installed skill in `.claude/skills/` (see [[project-tovelya-shopify-skills]]) instead of freelancing a generic approach when the task matches:
- Building or reviewing a sales landing page → `landing-basica`
- Deciding whether a product is worth testing → `validador-producto-basico`
- Quantity discounts / combo offers (x1/x2/x3) → `combos-cod-basico`
- Privacy/returns policy pages, footer links → `politicas-legales-basico`
- Summarizing a YouTube video for ideas → `youtube-research-basico`
- Static image ad creatives → `direct-ads` (hot/retargeting) or `indirect-ads` (cold/prospecting)

**Why:** the user explicitly asked (2026-09-21) to install these and have them "always" used when relevant, rather than reinventing the approach each time.

**How to apply:** before doing ad-hoc work on a landing, product validation, combo pricing, legal pages, or ad creatives in this project, check whether one of these skills applies and invoke it via the Skill tool first.
