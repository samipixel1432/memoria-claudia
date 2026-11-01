#!/bin/bash
# Uso: subir-video.sh <archivo.mp4> <key> <policy> <signature>
# Sube un video a Shopify con los datos que devuelve stagedUploadsCreate (resource VIDEO, httpMethod POST).
# Después se registra con fileCreate (contentType VIDEO, originalSource = resourceUrl).
f="$1"; key="$2"; policy="$3"; sig="$4"
curl -s -o /dev/null -w "$(basename "$f") %{http_code}\n" -X POST "https://shopify-video-production-core-originals.storage.googleapis.com" \
  -F "GoogleAccessId=video-production@video-production-225115.iam.gserviceaccount.com" \
  -F "key=$key" -F "policy=$policy" -F "signature=$sig" -F "file=@$f"
