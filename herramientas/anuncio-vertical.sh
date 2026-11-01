#!/bin/bash
# Uso: anuncio-vertical.sh <guion.txt> <salida.mp4>
# Arma un video vertical 1080x1920 SIN AUDIO (la música se pone en Meta o CapCut) a partir de un guion.
# Cada línea del guion: video|archivo.mp4|0|Texto   o   foto|archivo.jpg|segundos|Texto
# Las fotos llevan un zoom lento. El texto va en una franja oscura abajo, con tipografía real.
# En el texto no usar ":" ni "'" (los rompe ffmpeg).
guion="$1"; out="$2"; F=/usr/share/fonts/opentype/inter/InterDisplay-ExtraBold.otf
tmp=$(mktemp -d); n=0
texto() { printf "drawtext=fontfile=%s:text='%s':fontsize=64:fontcolor=white:box=1:boxcolor=0x10243F@0.82:boxborderw=28:x=(w-text_w)/2:y=h*0.74" "$F" "$1"; }
while IFS='|' read -r tipo archivo seg txt; do
  [ -z "$tipo" ] && continue
  n=$((n + 1)); o="$tmp/$(printf '%02d' $n).mp4"
  if [ "$tipo" = video ]; then
    ffmpeg -nostdin -v error -y -i "$archivo" -an -filter_complex \
      "[0:v]split[a][b];[a]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=24:2[f];[b]scale=1080:-2[c];[f][c]overlay=(W-w)/2:(H-h)/2,$(texto "$txt"),fps=30,setsar=1[v]" \
      -map "[v]" -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p "$o"
  else
    fr=$(awk "BEGIN{print int($seg*30)}")
    ffmpeg -nostdin -v error -y -loop 1 -t "$seg" -i "$archivo" -an -filter_complex \
      "[0:v]scale=2160:-2,split[a][b];[a]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=24:2[f];[b]zoompan=z='min(zoom+0.0008,1.08)':d=$fr:s=1080x1080:fps=30[c];[f][c]overlay=(W-w)/2:(H-h)/2-120,$(texto "$txt"),fps=30,setsar=1[v]" \
      -map "[v]" -t "$seg" -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p "$o"
  fi
  echo "file '$o'" >> "$tmp/lista.txt"
done < "$guion"
ffmpeg -v error -y -f concat -safe 0 -i "$tmp/lista.txt" -c copy -movflags +faststart "$out"
rm -rf "$tmp"
ffprobe -v error -show_entries format=duration,size -of csv=p=0 "$out"
