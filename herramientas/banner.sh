#!/bin/bash
# Uso: banner.sh <foto> <salida.jpg> <etiqueta> <titulo> <acento> <subtitulo> [desplazamiento_y]
# Banner 1080x1350 estilo Apple: foto arriba (1080x980) y panel crema abajo con el texto.
# El texto se escribe con tipografía real (no IA): sin letras raras.
foto="$1"; out="$2"; tag="$3"; titulo="$4"; acento="$5"; sub="$6"; dy="${7:-50}"
F=/usr/share/fonts/opentype/inter
CREMA='#FAF6F0'; TINTA='#1F1611'; CAFE='#B5743A'; SUAVE='#6B5B4E'; PILL='#F1D4AE'

tmp=$(mktemp -d)
# Foto: cuadrada a 1080 y recorte vertical a 980 (dy = cuánto se quita arriba, 0-100)
convert "$foto" -resize 1080x1080^ -gravity center -extent 1080x1080 \
  -gravity NorthWest -crop 1080x980+0+"$dy" +repage "$tmp/foto.png"

# Medida de la etiqueta para dibujar la cápsula
tw=$(convert -font "$F/InterDisplay-Bold.otf" -pointsize 30 label:"$tag" -format '%w' info:)
pw=$((tw + 48))

convert -size 1080x1350 xc:"$CREMA" \
  "$tmp/foto.png" -geometry +0+0 -composite \
  -fill "$PILL" -draw "roundrectangle 64,1018 $((64 + pw)),1068 25,25" \
  -font "$F/InterDisplay-Bold.otf" -pointsize 30 -fill "$TINTA" -gravity NorthWest -annotate +88+1026 "$tag" \
  -font "$F/InterDisplay-ExtraBold.otf" -pointsize 82 -fill "$TINTA" -annotate +62+1084 "$titulo" \
  -font "$F/InterDisplay-ExtraBold.otf" -pointsize 82 -fill "$CAFE" -annotate +62+1172 "$acento" \
  -font "$F/InterDisplay-Medium.otf" -pointsize 38 -fill "$SUAVE" -annotate +64+1274 "$sub" \
  -quality 86 -strip "$out"
rm -rf "$tmp"
