#!/bin/bash
# Uso: banner-antes-despues.sh <foto-dividida> <salida.jpg> <etiqueta> <titulo> <acento> <subtitulo> [desplazamiento_y]
# Igual que banner.sh, pero la foto (mitad izquierda = antes, mitad derecha = después) lleva las cápsulas "ANTES" y "DESPUÉS".
H=$(dirname "$0"); F=/usr/share/fonts/opentype/inter
bash "$H/banner.sh" "$@" || exit 1
out="$2"
convert "$out" \
  -fill '#10243F' -draw "roundrectangle 36,36 236,96 30,30" \
  -fill '#0A7A6E' -draw "roundrectangle 576,36 836,96 30,30" \
  -font "$F/InterDisplay-ExtraBold.otf" -pointsize 34 -fill '#FFFFFF' -gravity NorthWest \
  -annotate +72+46 "ANTES" -annotate +606+46 "DESPUÉS" \
  -quality 86 -strip "$out"
