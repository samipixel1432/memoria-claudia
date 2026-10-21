---
name: reference-codex-cli-images
description: Codex CLI generates images with Samuel's ChatGPT plan (no API key), on his PC and in the cloud; exact cloud recipe inside
metadata:
  type: reference
---

On 2026-10-19 Samuel chose OpenAI images over Higgsfield because he already pays ChatGPT Plus. ChatGPT Plus does not include API credits, so instead of an API key I installed the official Codex CLI (`npm.cmd install -g @openai/codex@0.163.0`). Codex signs in with the ChatGPT account and has a built-in image generation tool, according to community docs; this was not yet confirmed working.

- Windows blocks `.ps1` scripts (execution policy). Use `codex.cmd` and `npm.cmd`, and do not change the policy.
- Claude's own shell is sandboxed: run installs and logins in Samuel's terminal panel, or the files land in the sandbox only.
- Login: `codex.cmd login` opens the browser and Samuel signs in himself. At the end of the 2026-10-19 session it was waiting for him.
- Next step: test a non-interactive image generation (`codex.cmd exec ...`) and save the result into the product's `landing/generated/` folder.

Cloud (2026-10-21): Samuel chose OpenAI/ChatGPT for images in the cloud too. Codex 0.163.0 installs fine in the container (`npm install -g @openai/codex`) and has `codex login --device-auth` (code entered from his phone, no localhost browser needed). But the environment's network policy blocked `auth.openai.com` and `chatgpt.com` (proxy 403). Samuel must add those domains under Allowed domains in the cloud environment settings (title bar → environment → Edit → Network access). The login lives in the container, so it has to be repeated in each new cloud session.

**Working in the cloud since 2026-10-21** (Samuel added both domains to the allowed list):
1. `npm install -g @openai/codex` (0.163.0).
2. Codex is a Rust binary that does not trust the session proxy by default: always run it with `CODEX_CA_CERTIFICATE=/root/.ccr/ca-bundle.crt`. Without it the login fails with "error sending request for url .../deviceauth/token".
3. Start `codex login --device-auth` in the background, give Samuel the link (https://auth.openai.com/codex/device) and the code (valid 15 min), and watch the log for "Successfully logged in".
4. Generate: `codex exec --skip-git-repo-check -s workspace-write -C <folder> "Genera una imagen con tu herramienta de generación de imágenes: ... Guarda la imagen como X.png en esta carpeta. No escribas código para dibujarla."` The `image_generation` feature is on by default; the image also stays in `~/.codex/generated_images/`. A test took about 1 minute and gave a realistic 1254×1254 PNG with his ChatGPT plan.

The matriz-viralidad plugin guard blocks inline code (`python -c`, `node -e`), dumping the environment, and any command that mentions the dot-env file, even inside a heredoc. Write scripts and notes to files with the Write/Edit tools instead.
