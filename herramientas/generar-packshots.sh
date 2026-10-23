#!/bin/bash
# Uso: generar-packshots.sh <carpeta> [nombre...]
# Foto de catálogo limpia por producto (lista.txt: nombre|descripción), con la foto real como referencia.
P="$1"; shift
OUT="$P/generadas"; mkdir -p "$OUT" "$P/logs"
COMUN='Foto de catálogo profesional, estilo tienda premium internacional, toda la serie con el mismo estilo: fondo color crema muy claro (#F6F1EA) liso con un degradado muy suave, el producto centrado ocupando cerca del 70% del cuadro, sombra suave y corta debajo, luz difusa de softbox, nítido, colores reales. ANCLA DE FIDELIDAD: el producto de la imagen de referencia se reproduce exactamente igual (forma, color, botones, logotipo, accesorios y proporciones); de la referencia se toma SOLO el producto, no los textos, íconos, sellos, personas ni el fondo. EVITAR: cualquier texto, letras, números, logotipos inventados, marcas de agua, sellos, íconos, personas, manos, aspecto de render 3D o de IA. Formato cuadrado.'

uno() {
  linea=$(grep "^$1|" "$P/lista.txt"); n="${linea%%|*}"; desc="${linea#*|}"
  tmp="$OUT/tmp-$n"; mkdir -p "$tmp"
  printf '%s\n\n%s\n\n%s\n' "Usa tu herramienta de generación de imágenes (una sola imagen) tomando la imagen adjunta como referencia obligatoria del producto. No escribas código para dibujarla. Guarda el resultado como $n.png en esta carpeta." "$COMUN" "Producto: $desc." |
    CODEX_CA_CERTIFICATE=/root/.ccr/ca-bundle.crt timeout 900 codex exec --skip-git-repo-check -s workspace-write -C "$tmp" -i "$P/ref/$n.jpg" > "$P/logs/$n.log" 2>&1
  if [ -f "$tmp/$n.png" ]; then mv "$tmp/$n.png" "$OUT/$n.png"; rm -rf "$tmp"; echo "$n: ok"; else echo "$n: FALLO"; fi
}
export -f uno; export P OUT COMUN
if [ $# -eq 0 ]; then set -- $(cut -d'|' -f1 "$P/lista.txt"); fi
printf '%s\n' "$@" | xargs -P 3 -I{} bash -c 'uno {}'
