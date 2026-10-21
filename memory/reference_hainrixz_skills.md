---
name: reference-hainrixz-skills
description: Where the Hainrixz (tododeia) skill packs were installed on 2026-10-19 and how each one is started
metadata:
  node_type: memory
  type: reference
  originSessionId: 8b7fafc2-271e-4afc-9534-7ad38f727d8e
  modified: 2026-10-19T22:48:26.316Z
---

Installed at the user's request (2026-10-19), reviewed first (hooks are only guard scripts, no network):

- User-scope Claude Code plugins (available in every project, new session needed): `claude-ads@tododeia-claude-ads` (`/ads start`, `/ads audit`, `/ads next`), `creative-architect@creative-architect` (`/creative-architect`), `claude-seo-ai@claude-seo-ai` (`/claude-seo-ai:audit <url>`), `motion-architect@motion-architect` (`/motion`, officially macOS/Linux; yt-dlp is not installed), `jarvis-architect@jarvis-architect` (`/jarvis-architect:jarvis-start`), `the-architect@soyenriquerocha` (`/architect-quick`, `/architect`), `matriz-viralidad@matriz-viralidad` (`/matriz-viralidad:matriz-start`, needs an Apify token the user pastes in `.env`).
- `the-architect` and `matriz-viralidad` marketplaces use `"source": "."`, which Claude Code 2.1.90 rejects, so they were installed from patched local copies in `C:\Users\PC\.claude\local-marketplaces\` (`"./"`). They do not auto-update from GitHub; re-clone and patch to update.
- Project-folder repos cloned to `C:\Users\PC\Proyectos-Claude\`: `claude-webkit` (open the folder in Claude Code to build a website; its `.claude/settings.local.json` pre-allows rm/curl/git) and `video-editor-architect` (needs `npm ci` and `npm run instalar -- --si`, then `/empezar`).
- claude-ads Python requirements were installed with pip; banana-claude (image generation) is not installed.

Cloud (2026-10-21): the same 7 plugins are declared in this repo's `.claude/settings.json` (`extraKnownMarketplaces` + `enabledPlugins`, project scope), so any session opened on `memoria-claudia` installs them. The `"source": "."` marketplaces installed fine with Claude Code 2.1.305, so no patched copies are needed in the cloud. Versions then: claude-ads 2.4.0, creative-architect 1.0.1, claude-seo-ai 0.2.0 (17 userConfig options unset; `/plugin configure claude-seo-ai@claude-seo-ai`), motion-architect 0.2.0, jarvis-architect 1.0.0, the-architect 2.6.0, matriz-viralidad 1.0.0. Hooks: only claude-seo-ai (guards Write/Edit/Bash, blocks e.g. `shopify theme push/publish` without a ticket) and matriz-viralidad (guards Bash/Read/Grep/Glob: `.env`, `python -c`, `node -e`...). Neither makes network calls.
