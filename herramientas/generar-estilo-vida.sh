#!/bin/bash
# Uso: generar.sh <carpeta>  — foto de estilo de vida por categoría, con referencias reales.
H="$1"; R="$H/ref"; OUT="$H/generadas"
COMUN='Fotografía publicitaria hiperrealista de fotógrafo comercial para una marca premium. Luz natural, colores reales, sombras suaves. Colombia, personas latinoamericanas naturales. ANCLA DE FIDELIDAD: cada producto de las imágenes de referencia se reproduce exactamente igual (forma, color, botones y proporciones); de las referencias se toma SOLO el producto. EVITAR: texto, letras, números, placas legibles, logotipos inventados, marcas de agua, íconos; manos deformes; aspecto de render 3D o de IA. Formato cuadrado.'
uno() {
  n="$1"; shift; prompt="$1"; shift
  tmp="$OUT/tmp-$n"; mkdir -p "$tmp"
  args=(); for r in "$@"; do args+=(-i "$R/$r"); done
  printf '%s\n\n%s\n\n%s\n' "Usa tu herramienta de generación de imágenes (una sola imagen) tomando las imágenes adjuntas como referencia obligatoria de los productos. No escribas código para dibujarla. Guarda el resultado como $n.png en esta carpeta." "$COMUN" "$prompt" |
    CODEX_CA_CERTIFICATE=/root/.ccr/ca-bundle.crt timeout 900 codex exec --skip-git-repo-check -s workspace-write -C "$tmp" "${args[@]}" > "$H/logs/$n.log" 2>&1
  if [ -f "$tmp/$n.png" ]; then mv "$tmp/$n.png" "$OUT/$n.png"; rm -rf "$tmp"; echo "$n: ok"; else echo "$n: FALLO"; fi
}
uno carro-moto 'Atardecer dorado en una carretera de montaña colombiana con curvas y verde. A la izquierda, un carro SUV gris detenido a un lado de la vía con el baúl abierto; dentro del baúl, ordenado y nítido, el compresor portátil negro con su pantalla. A la derecha, más cerca de la cámara, una moto detenida con la pantalla CarPlay montada en el manubrio, encendida y nítida, y el motociclista latino de pie a su lado con el traje impermeable azul marino puesto, sonriendo, casco en la mano. Composición amplia y limpia, los productos en la franja central, aire arriba.' compresor.png carplay.png traje.png &
uno carro-llantas 'Primer plano de la llanta delantera de un carro gris limpio estacionado en el garaje luminoso de una casa colombiana; el compresor portátil negro está en el piso conectado a la válvula con su manguera, pantalla encendida, y una mano de hombre latino sostiene la boquilla. Luz suave de mañana, fondo desenfocado. Producto nítido en el centro.' compresor.png &
uno entretenimiento-pareja 'Noche de película de una pareja latina joven en su habitación acogedora: acostados en la cama con cobijas y luces cálidas, miran una película proyectada en la pared blanca. En primer plano, nítido sobre la mesa de noche, el mini proyector LED blanco y amarillo encendido con su haz de luz. Ambiente íntimo, cálido y real.' proyector.png &
uno entretenimiento-partido 'Grupo de amigos latinos celebrando un gol en la terraza de una casa colombiana al anochecer, mirando un partido de fútbol proyectado grande sobre una sábana blanca colgada. En primer plano, nítido sobre una mesa con crispetas y gaseosas, el mini proyector LED blanco y amarillo encendido. Ambiente alegre, luces cálidas colgantes.' proyector.png &
wait
