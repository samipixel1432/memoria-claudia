#!/bin/bash
# Uso: clip-vertical.sh <video> <inicio_seg> <fin_seg> <salida.mp4> [ancho]
# Recorta un tramo de un video, lo pone vertical 9:16 (el video centrado sobre una copia borrosa de sí mismo),
# le QUITA EL AUDIO (los videos de proveedores suelen traer voces con promesas) y lo deja listo para la web.
in="$1"; ini="$2"; fin="$3"; out="$4"; w="${5:-540}"; h=$((w * 16 / 9))
ffmpeg -v error -y -ss "$ini" -to "$fin" -i "$in" -an \
  -filter_complex "[0:v]split[a][b];[a]scale=${w}:${h}:force_original_aspect_ratio=increase,crop=${w}:${h},boxblur=20:2[fondo];[b]scale=${w}:-2[frente];[fondo][frente]overlay=(W-w)/2:(H-h)/2,setsar=1,fps=30[v]" \
  -map "[v]" -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p -movflags +faststart "$out"
