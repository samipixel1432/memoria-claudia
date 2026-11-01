#!/bin/bash
# Anuncio UGC "la muchacha": video 4104ffaa (3.0–18.6 s) con los textos de salud difuminados, subtítulos nuevos,
# voz nueva y el cierre animado de Remotion.
set -e
H=/home/user/trabajo/happy; V=$H/videos/4104ffaa-4c85a2c0083e.mp4; T=$(mktemp -d); W=$H/voz
norm="scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30,setsar=1"
# Video base: se difuminan la lista de "beneficios" (t 2.5–8.0, franja 53–69 %) y "menos hinchazón…" (t 9.5–12.0, franja 42–58 %).
ffmpeg -nostdin -v error -y -ss 3.0 -t 14.0 -i $V -an -filter_complex \
  "[0:v]$norm,split=3[a][b][c];[b]crop=930:310:75:1015,boxblur=30:4,eq=brightness=-0.04[bb];[c]crop=930:330:75:800,boxblur=30:4,eq=brightness=-0.04[cc];[a][bb]overlay=75:1015:enable='between(t,2.4,8.1)'[ab];[ab][cc]overlay=75:800:enable='between(t,9.4,12.1)'" \
  -c:v libx264 -crf 18 -pix_fmt yuv420p $T/1.mp4
# Tarro real en la mano (video 07c18c66, 2.9–5.5 s) en vez del final del video, donde ella queda mostrando la cintura.
ffmpeg -nostdin -v error -y -ss 2.9 -t 2.6 -i $H/videos/07c18c66-72eacecffd2c.mp4 -an -vf "$norm" -c:v libx264 -crf 18 -pix_fmt yuv420p $T/1b.mp4
# Cierre animado (Remotion), sosteniendo el último cuadro hasta que termine la voz.
ffmpeg -nostdin -v error -y -ss 11.8 -t 3.2 -i /root/motion-architect/studio/out/HappyTarro-vertical.mp4 -an -vf "$norm,tpad=stop_mode=clone:stop_duration=0.2" -c:v libx264 -crf 18 -pix_fmt yuv420p $T/2.mp4
printf "file '%s'\nfile '%s'\nfile '%s'\n" $T/1.mp4 $T/1b.mp4 $T/2.mp4 > $T/lista.txt
ffmpeg -nostdin -v error -y -f concat -safe 0 -i $T/lista.txt -c copy $T/todo.mp4
s=$W/subs; Y=1372
ffmpeg -nostdin -v error -y -i $T/todo.mp4 -i $W/mujer.mp3 \
  -i $s/m1.png -i $s/m2.png -i $s/m3.png -i $s/m4.png -i $s/m5.png -i $s/m6.png -i $s/m7.png -i $s/m8.png -i $s/m9.png \
  -filter_complex "[0:v][2:v]overlay=60:$Y:enable='between(t,0,1.45)'[v1];[v1][3:v]overlay=60:$Y:enable='between(t,1.45,2.95)'[v2];[v2][4:v]overlay=60:$Y:enable='between(t,2.95,5.25)'[v3];[v3][5:v]overlay=60:$Y:enable='between(t,5.25,6.9)'[v4];[v4][6:v]overlay=60:$Y:enable='between(t,6.9,8.6)'[v5];[v5][7:v]overlay=60:$Y:enable='between(t,8.6,10.25)'[v6];[v6][8:v]overlay=60:$Y:enable='between(t,10.25,13.15)'[v7];[v7][9:v]overlay=60:$Y:enable='between(t,13.15,14.5)'[v8];[v8][10:v]overlay=60:$Y:enable='between(t,14.5,16.6)'[v];[1:a]loudnorm=I=-14:TP=-1.5:LRA=11,apad[a]" \
  -map "[v]" -map "[a]" -t 19.7 -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p -c:a aac -b:a 160k -movflags +faststart $W/happy-ugc-muchacha.mp4
rm -rf $T
ffprobe -v error -show_entries format=duration,size -of csv=p=0 $W/happy-ugc-muchacha.mp4
