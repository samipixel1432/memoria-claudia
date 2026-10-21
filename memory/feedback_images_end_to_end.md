---
name: feedback-images-end-to-end
description: Samuel wants Claude to generate images and put them on the landing or the ad itself, never hand him files to download and upload
metadata:
  type: feedback
---

On 2026-10-21 Samuel said: "lo que yo quiero es que tú las hagas y las pongas en la página o las de publicidad... que yo no tenga que estar entrando, pegando, descargando".

**Why:** he runs the store alone and is not technical; downloading and re-uploading files is the part he wants gone.
**How to apply:** generate the image (Codex/ChatGPT once connected, see [[reference-codex-cli-images]], or the Canva connector), then upload it yourself: to Shopify with the Shopify connector (`fileCreate` from the image's public URL, then set it on the product or landing section), and to Meta with the Meta connector (upload media, create the creative). Only ask him for things only he can do: logins, codes, payments. Send the store link when done ([[feedback-always-send-store-link]]).
