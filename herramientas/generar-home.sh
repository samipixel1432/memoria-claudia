#!/bin/bash
# Uso: generar-home.sh <carpeta-home>
# Genera las fotos de la página principal con Codex (cuenta ChatGPT), cada una con sus referencias reales.
H="$1"; R="$H/ref"; OUT="$H/generadas"; mkdir -p "$OUT" "$H/logs"

COMUN='Fotografía publicitaria hiperrealista de fotógrafo comercial para una marca premium. Estética luminosa y limpia: blancos, beige claro, madera clara, luz natural suave de mañana, sombras suaves. Apartamento moderno de clase media en Colombia, no de revista europea. Personas latinoamericanas naturales. ANCLA DE FIDELIDAD: cada producto de las imágenes de referencia se reproduce exactamente igual (forma, color, botones, logotipo y etiqueta); de las referencias se toma SOLO el producto, no los textos, gráficos, íconos ni fondos de la referencia. EVITAR: texto, letras, números, logotipos inventados, marcas de agua, sellos, íconos; manos deformes; aspecto de render 3D o de IA. Formato cuadrado.'

uno() {
  n="$1"; shift; prompt="$1"; shift
  tmp="$OUT/tmp-$n"; mkdir -p "$tmp"
  args=(); for r in "$@"; do args+=(-i "$R/$r"); done
  printf '%s\n\n%s\n\n%s\n' "Usa tu herramienta de generación de imágenes (una sola imagen) tomando las imágenes adjuntas como referencia obligatoria de los productos. No escribas código para dibujarla. Guarda el resultado como $n.png en esta carpeta." "$COMUN" "$prompt" |
    CODEX_CA_CERTIFICATE=/root/.ccr/ca-bundle.crt timeout 900 codex exec --skip-git-repo-check -s workspace-write -C "$tmp" "${args[@]}" > "$H/logs/$n.log" 2>&1
  if [ -f "$tmp/$n.png" ]; then mv "$tmp/$n.png" "$OUT/$n.png"; rm -rf "$tmp"; echo "$n: ok"; else echo "$n: FALLO"; fi
}

uno home-hero 'Sobre el mesón de una cocina luminosa, en primer plano y nítidos, tres productos juntos y bien acomodados: el tarro de café con colágeno (tapa negra, etiqueta café y blanca), el mini proyector LED blanco y amarillo, y el cepillo eléctrico blanco con su mango plateado apoyado. Al fondo, desenfocada, una mujer latina sonriente prepara café. Composición: los tres productos en la franja central, con aire arriba y abajo.' cafe.jpg proyector.jpg cepillo.jpg &
uno home-salud 'Rutina de bienestar en un baño y habitación luminosos: en primer plano la báscula inteligente de vidrio negro en el piso de madera clara, a un lado el tarro de café con colágeno junto a una taza humeante sobre una mesita, y el chaleco de soporte postural negro doblado con cuidado al lado. Luz de mañana muy suave, sensación de calma y cuidado personal. Los tres productos nítidos en la franja central.' bascula.jpg cafe.jpg chaleco.jpg &
uno home-tecnologia 'Noche de película en la sala de un apartamento colombiano: una familia latina (papá, mamá y un niño) en el sofá con cobijas y crispetas, mirando una película proyectada en la pared blanca; en primer plano, nítido sobre una mesa de centro, el mini proyector LED blanco y amarillo encendido con su haz de luz. Luz cálida, ambiente acogedor.' proyector.jpg &
uno home-postura 'Una mujer latina de unos 35 años, de pie y con la espalda recta, frente a la ventana de su apartamento con luz de mañana, usa el chaleco de soporte postural negro sobre una camiseta blanca ajustada; se ve segura y cómoda, con una taza de café en la mano. Plano medio, el chaleco nítido y en el centro.' chaleco.jpg &
wait
