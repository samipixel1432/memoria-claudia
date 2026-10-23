#!/bin/bash
# Uso: subir.sh <carpeta> <sello-fecha-X-Goog-Date>
# Saca del historial las URLs firmadas de stagedUploadsCreate y sube cada JPG con PUT.
U="$1"; SELLO="$2"
grep -oh "https://shopify-staged-uploads.storage.googleapis.com/tmp/95535235319/files/[a-f0-9-]*/[a-z0-9-]*[.]jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256[^\"\\\\]*$SELLO[^\"\\\\]*" /root/.claude/projects/-home-user-memoria-claudia/*.jsonl | sort -u > "$U/urls.txt"
echo "urls: $(wc -l < "$U/urls.txt")"
ok=0
while read -r u; do
  base="${u%%\?*}"; f="${base##*/}"
  c=$(curl -s -o /dev/null -w '%{http_code}' -X PUT -H "Content-Type: image/jpeg" --data-binary @"$U/$f" "$u")
  if [ "$c" = 200 ]; then ok=$((ok+1)); else echo "$f $c"; fi
done < "$U/urls.txt"
echo "subidas: $ok"
