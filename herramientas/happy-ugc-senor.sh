#!/bin/bash
# Anuncio UGC "el señor": tomas limpias del video 07c18c66 + foto + cierre animado de Remotion, voz nueva y subtítulos nuevos.
set -e
H=/home/user/trabajo/happy; V=$H/videos/07c18c66-72eacecffd2c.mp4; T=$(mktemp -d); W=$H/voz
norm="scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30,setsar=1"
# A: el señor (hook). Se difumina la franja donde estaban sus subtítulos para que no se asome nada debajo de los nuevos.
ffmpeg -nostdin -v error -y -ss 0 -t 2.65 -i $V -an -filter_complex "[0:v]$norm,split[a][b];[b]crop=1080:300:0:1360,boxblur=18:3[c];[a][c]overlay=0:1360" -c:v libx264 -crf 18 -pix_fmt yuv420p $T/1.mp4
# B: el tarro en la mano. C: la copa del tarro al vaso.
ffmpeg -nostdin -v error -y -ss 2.9 -t 2.6 -i $V -an -vf "$norm" -c:v libx264 -crf 18 -pix_fmt yuv420p $T/2.mp4
ffmpeg -nostdin -v error -y -ss 8.9 -t 3.55 -i $V -an -vf "$norm" -c:v libx264 -crf 18 -pix_fmt yuv420p $T/3.mp4
# D: foto del tarro abierto con la copa, en tarjeta sobre fondo borroso, con zoom lento.
ffmpeg -nostdin -v error -y -loop 1 -t 4.5 -i $H/generadas/porciones.png -an -filter_complex \
  "[0:v]scale=2160:-2,split[a][b];[a]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=24:2[f];[b]zoompan=z='min(zoom+0.0009,1.1)':d=135:s=1000x1000:fps=30[c];[f][c]overlay=(W-w)/2:330,fps=30,setsar=1" \
  -t 4.5 -c:v libx264 -crf 18 -pix_fmt yuv420p $T/4.mp4
# E: cierre animado (Remotion) con el botón "Pídelo hoy", sosteniendo el último cuadro.
ffmpeg -nostdin -v error -y -ss 11.8 -t 3.2 -i /root/motion-architect/studio/out/HappyTarro-vertical.mp4 -an -vf "$norm,tpad=stop_mode=clone:stop_duration=0.5" -c:v libx264 -crf 18 -pix_fmt yuv420p $T/5.mp4
for i in 1 2 3 4 5; do echo "file '$T/$i.mp4'"; done > $T/lista.txt
ffmpeg -nostdin -v error -y -f concat -safe 0 -i $T/lista.txt -c copy $T/todo.mp4
# Subtítulos (caja fija que tapa la franja de los subtítulos viejos) + voz nueva.
s=$W/subs; Y=1372
ffmpeg -nostdin -v error -y -i $T/todo.mp4 -i $W/hombre.mp3 \
  -i $s/h1.png -i $s/h2.png -i $s/h3.png -i $s/h4.png -i $s/h5.png -i $s/h6.png -i $s/h7.png -i $s/h8.png \
  -filter_complex "[0:v][2:v]overlay=60:$Y:enable='between(t,0,1.70)'[v1];[v1][3:v]overlay=60:$Y:enable='between(t,1.70,3.45)'[v2];[v2][4:v]overlay=60:$Y:enable='between(t,3.45,4.75)'[v3];[v3][5:v]overlay=60:$Y:enable='between(t,4.75,6.20)'[v4];[v4][6:v]overlay=60:$Y:enable='between(t,6.20,7.85)'[v5];[v5][7:v]overlay=60:$Y:enable='between(t,7.85,9.45)'[v6];[v6][8:v]overlay=60:$Y:enable='between(t,9.45,11.40)'[v7];[v7][9:v]overlay=60:$Y:enable='between(t,11.40,13.30)'[v];[1:a]loudnorm=I=-14:TP=-1.5:LRA=11,apad[a]" \
  -map "[v]" -map "[a]" -t 16.95 -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p -c:a aac -b:a 160k -movflags +faststart $W/happy-ugc-senor.mp4
rm -rf $T
ffprobe -v error -show_entries format=duration,size -of csv=p=0 $W/happy-ugc-senor.mp4
