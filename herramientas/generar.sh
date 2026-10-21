#!/bin/bash
# Uso: generar.sh <carpeta-cepillo> <nombre> [<nombre>...]
# Genera cada pieza de prompts.md con Codex (cuenta ChatGPT), en paralelo de a 3.
C="$1"; shift; REFARG=""; [ -f "$C/ref.jpg" ] && REFARG="-i $C/ref.jpg"
OUT="$C/generadas"; mkdir -p "$OUT" "$C/logs"
comun=$(awk '/^## COMUN/{f=1;next} /^## /{f=0} f' "$C/prompts.md")

uno() {
  n="$1"
  cuerpo=$(awk -v n="$n" '$0 ~ "^## "n" "{f=1;next} /^## /{f=0} f' "$C/prompts.md")
  [ -z "$cuerpo" ] && { echo "$n: sin prompt"; return; }
  tmp="$OUT/tmp-$n"; mkdir -p "$tmp"
  printf '%s\n\n%s\n\n%s\n' \
    "Usa tu herramienta de generación de imágenes (una sola imagen). Si hay una imagen adjunta, es la referencia obligatoria del producto. No escribas código para dibujarla. Guarda el resultado como $n.png en esta carpeta." \
    "$comun" "$cuerpo" |
  CODEX_CA_CERTIFICATE=/root/.ccr/ca-bundle.crt timeout 900 codex exec --skip-git-repo-check -s workspace-write -C "$tmp" \
    $REFARG > "$C/logs/$n.log" 2>&1
  if [ -f "$tmp/$n.png" ]; then mv "$tmp/$n.png" "$OUT/$n.png"; rm -rf "$tmp"; echo "$n: ok"; else echo "$n: FALLO (ver logs/$n.log)"; fi
}
export -f uno; export C OUT comun REFARG
printf '%s\n' "$@" | xargs -P 3 -I{} bash -c 'uno {}'
