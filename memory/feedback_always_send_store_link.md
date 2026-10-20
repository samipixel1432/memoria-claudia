---
name: feedback-always-send-store-link
description: "Always include the live Tovelya store link (or the specific page changed) at the end of every response where a change was published, without waiting to be asked"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 8b7fafc2-271e-4afc-9534-7ad38f727d8e
  modified: 2026-09-23T19:53:01.990Z
---

Always send the store link (https://tovelya-store.myshopify.com/, or the more specific page/product URL when only one page changed) at the end of any response where something was published to the live Tovelya theme.

**Why:** the user explicitly said (2026-09-23) "que te dije que siempre me mandes el link" — a repeated correction after I omitted it once. This is a standing preference, not a one-off request.

**How to apply:** after running `publish-home-theme.ps1` (or any other action that pushes a change live), close the response with the relevant link(s) rather than waiting for the user to ask "mándame el link". If multiple pages changed, list each one.
