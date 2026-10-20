---
name: reference-codex-cli-images
description: Codex CLI is installed on Samuel's PC to generate images with his ChatGPT Plus plan instead of a paid API key
metadata:
  type: reference
---

On 2026-10-19 Samuel chose OpenAI images over Higgsfield because he already pays ChatGPT Plus. ChatGPT Plus does not include API credits, so instead of an API key I installed the official Codex CLI (`npm.cmd install -g @openai/codex@0.163.0`). Codex signs in with the ChatGPT account and has a built-in image generation tool, according to community docs; this was not yet confirmed working.

- Windows blocks `.ps1` scripts (execution policy). Use `codex.cmd` and `npm.cmd`, and do not change the policy.
- Claude's own shell is sandboxed: run installs and logins in Samuel's terminal panel, or the files land in the sandbox only.
- Login: `codex.cmd login` opens the browser and Samuel signs in himself. At the end of the 2026-10-19 session it was waiting for him.
- Next step: test a non-interactive image generation (`codex.cmd exec ...`) and save the result into the product's `landing/generated/` folder.
