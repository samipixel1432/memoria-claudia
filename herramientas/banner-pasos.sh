#!/bin/bash
# Uso: banner-pasos.sh <salida.jpg> <etiqueta> <titulo> <acento> <foto1> <paso1> <detalle1> <foto2> <paso2> <detalle2> <foto3> <paso3> <detalle3>
# Banner 4:5 (1080x1350) "cómo se usa": título arriba y 3 filas con foto redondeada, número naranja, paso y detalle.
# Colores originales de Tovelya; texto con tipografía real (no IA).
out="$1"; tag="$2"; titulo="$3"; acento="$4"; shift 4
F=/usr/share/fonts/opentype/inter
FONDO='#F5F9F8'; TINTA='#10243F'; ACENTO='#0A7A6E'; SUAVE='#52637A'; PILL='#CFF5EE'; NARANJA='#FF8A1F'
tmp=$(mktemp -d)
tw=$(convert -font "$F/InterDisplay-Bold.otf" -pointsize 30 label:"$tag" -format '%w' info:)
pw=$((tw + 48))
convert -size 1080x1350 xc:"$FONDO" \
  -fill "$PILL" -draw "roundrectangle 64,56 $((64 + pw)),106 25,25" \
  -font "$F/InterDisplay-Bold.otf" -pointsize 30 -fill "$TINTA" -gravity NorthWest -annotate +88+64 "$tag" \
  -font "$F/InterDisplay-ExtraBold.otf" -pointsize 82 -fill "$TINTA" -annotate +62+124 "$titulo" \
  -font "$F/InterDisplay-ExtraBold.otf" -pointsize 82 -fill "$ACENTO" -annotate +62+212 "$acento" \
  "$tmp/base.png"
y=340; n=1
while [ $# -ge 3 ]; do
  convert "$1" -resize 300x300^ -gravity center -extent 300x300 \
    \( -size 300x300 xc:none -fill white -draw "roundrectangle 0,0 299,299 32,32" \) -compose DstIn -composite "$tmp/f.png"
  convert "$tmp/base.png" "$tmp/f.png" -geometry +64+$y -composite \
    -fill "$NARANJA" -draw "circle 430,$((y + 70)) 430,$((y + 30))" \
    -font "$F/InterDisplay-ExtraBold.otf" -pointsize 46 -fill '#FFFFFF' -gravity NorthWest -annotate +416+$((y + 42)) "$n" \
    -font "$F/InterDisplay-ExtraBold.otf" -pointsize 54 -fill "$TINTA" -annotate +500+$((y + 36)) "$2" \
    -font "$F/InterDisplay-Medium.otf" -pointsize 36 -fill "$SUAVE" -annotate +500+$((y + 112)) "$3" \
    "$tmp/base.png"
  shift 3; y=$((y + 330)); n=$((n + 1))
done
convert "$tmp/base.png" -quality 86 -strip "$out"
rm -rf "$tmp"
