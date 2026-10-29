#!/bin/bash
# Uso: banner-lista.sh <foto> <salida.jpg> <etiqueta> <titulo> <acento> <punto1> <punto2> <punto3> <punto4>
# Banner 4:5 (1080x1350) de beneficios: etiqueta y título arriba, foto en el medio y 4 puntos con check verde abajo.
# Colores originales de Tovelya; texto con tipografía real (no IA).
foto="$1"; out="$2"; tag="$3"; titulo="$4"; acento="$5"; shift 5
F=/usr/share/fonts/opentype/inter
FONDO='#F5F9F8'; TINTA='#10243F'; ACENTO='#0A7A6E'; PILL='#CFF5EE'; OK='#1FB36B'
tmp=$(mktemp -d)
# La foto entra completa (sin recortar el producto) y el borde se rellena con el color de su esquina
bg=$(convert "$foto" -format '%[pixel:p{5,5}]' info:)
convert "$foto" -resize 1080x520 -background "$bg" -gravity center -extent 1080x520 "$tmp/foto.png"
tw=$(convert -font "$F/InterDisplay-Bold.otf" -pointsize 30 label:"$tag" -format '%w' info:)
pw=$((tw + 48))
args=()
y=880
for p in "$@"; do
  args+=(-fill "$OK" -draw "circle 98,$((y + 32)) 98,$((y + 4))")
  args+=(-stroke '#FFFFFF' -strokewidth 7 -fill none -draw "polyline 84,$((y + 33)) 95,$((y + 44)) 114,$((y + 21))" -stroke none)
  args+=(-font "$F/InterDisplay-Bold.otf" -pointsize 46 -fill "$TINTA" -annotate +150+$((y + 4)) "$p")
  y=$((y + 106))
done
convert -size 1080x1350 xc:"$FONDO" \
  -fill "$PILL" -draw "roundrectangle 64,56 $((64 + pw)),106 25,25" \
  -font "$F/InterDisplay-Bold.otf" -pointsize 30 -fill "$TINTA" -gravity NorthWest -annotate +88+64 "$tag" \
  -font "$F/InterDisplay-ExtraBold.otf" -pointsize 82 -fill "$TINTA" -annotate +62+124 "$titulo" \
  -font "$F/InterDisplay-ExtraBold.otf" -pointsize 82 -fill "$ACENTO" -annotate +62+212 "$acento" \
  "$tmp/foto.png" -geometry +0+330 -composite \
  "${args[@]}" \
  -quality 86 -strip "$out"
rm -rf "$tmp"
