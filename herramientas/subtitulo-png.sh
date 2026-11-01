#!/bin/bash
# Uso: subtitulo-png.sh <salida.png> <texto> [ancho_lienzo]
# Hace un subtítulo para pegar encima de un video vertical 1080x1920: caja blanca redondeada de tamaño FIJO
# (920x170) con texto oscuro en negrilla. Como la caja siempre mide lo mismo, sirve también para TAPAR los
# subtítulos que traen quemados los videos de proveedores (van en la misma franja, ~70–83 % de la altura).
out="$1"; txt="$2"; F=/usr/share/fonts/opentype/inter/InterDisplay-ExtraBold.otf
convert -size 960x200 xc:none \
  -fill 'rgba(0,0,0,0.25)' -draw "roundrectangle 22,26 942,196 42,42" -blur 0x6 \
  -fill white -draw "roundrectangle 20,16 940,186 40,40" \
  \( -size 860x150 -background none -fill "#10243F" -font "$F" -pointsize 68 -gravity center caption:"$txt" \) \
  -gravity center -geometry +0-5 -composite "$out"
