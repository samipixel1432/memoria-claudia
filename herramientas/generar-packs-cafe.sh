#!/bin/bash
# Fotos de los packs del café con colágeno (2, 3 y 5 tarros) a partir de la foto real del tarro.
H="$1"; OUT="$H/generadas"; mkdir -p "$OUT" "$H/logs"
COMUN='Foto de catálogo profesional de estudio, fondo crema claro liso (#F6F1EA) con degradado muy suave, luz suave de softbox, sombra corta y suave, nítida, colores reales. ANCLA DE FIDELIDAD: cada tarro es exactamente igual al de la referencia (tarro café oscuro con tapa negra, etiqueta "COFFEE + COLÁGENO" de Natura Trends con granos de café y coco), sin cambiar diseño, colores ni proporciones; todos los tarros idénticos entre sí. EVITAR: texto agregado, números, precios, sellos, personas, manos, logotipos inventados, aspecto de render 3D. Formato cuadrado.'
uno() {
  n="$1"; prompt="$2"; tmp="$OUT/tmp-$n"; mkdir -p "$tmp"
  printf '%s\n\n%s\n\n%s\n' "Usa tu herramienta de generación de imágenes (una sola imagen) tomando la imagen adjunta como referencia obligatoria del producto. No escribas código para dibujarla. Guarda el resultado como $n.png en esta carpeta." "$COMUN" "$prompt" |
    CODEX_CA_CERTIFICATE=/root/.ccr/ca-bundle.crt timeout 900 codex exec --skip-git-repo-check -s workspace-write -C "$tmp" -i "$H/ref/cafe.jpg" > "$H/logs/$n.log" 2>&1
  if [ -f "$tmp/$n.png" ]; then mv "$tmp/$n.png" "$OUT/$n.png"; rm -rf "$tmp"; echo "$n: ok"; else echo "$n: FALLO"; fi
}
uno x2 'Dos tarros iguales, uno al lado del otro, de frente, centrados y ocupando cerca del 65% del cuadro.' &
uno x3 'Tres tarros iguales en fila, de frente, el del centro un poco adelante, centrados y ocupando cerca del 70% del cuadro.' &
uno x5 'Cinco tarros iguales acomodados en dos filas (tres atrás y dos adelante), de frente, centrados y ocupando cerca del 75% del cuadro.' &
wait
