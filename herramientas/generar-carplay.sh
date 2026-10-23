#!/bin/bash
# Fotos de la landing de la pantalla CarPlay para moto (Codex, con la foto real de referencia).
# Uso: generar.sh <carpeta>
H="$1"; R="$H/ref"; OUT="$H/generadas"; mkdir -p "$OUT" "$H/logs"
COMUN='Fotografía publicitaria hiperrealista de fotógrafo comercial, marca premium. Colombia, personas latinoamericanas naturales. ANCLA DE FIDELIDAD: la pantalla para moto de las referencias se reproduce exactamente igual (marco negro rectangular con esquinas reforzadas, pantalla táctil de unos 5 pulgadas, soporte con abrazadera de manubrio); en la pantalla se ven íconos genéricos de apps (teléfono, música, mapa, mensajes) o un mapa de ruta genérico, sin texto legible. EVITAR: texto, letras, números, placas legibles, logotipos de marcas en motos o cascos, marcas de agua; manos deformes; personas manipulando la pantalla con la moto en movimiento; aspecto de render 3D o de IA. Formato cuadrado.'
uno() {
  n="$1"; prompt="$2"
  tmp="$OUT/tmp-$n"; mkdir -p "$tmp"
  printf '%s\n\n%s\n\n%s\n' "Usa tu herramienta de generación de imágenes (una sola imagen) tomando las imágenes adjuntas como referencia obligatoria del producto. No escribas código para dibujarla. Guarda el resultado como $n.png en esta carpeta." "$COMUN" "$prompt" |
    CODEX_CA_CERTIFICATE=/root/.ccr/ca-bundle.crt timeout 900 codex exec --skip-git-repo-check -s workspace-write -C "$tmp" -i "$R/carplay.png" -i "$R/carplay-real.jpg" > "$H/logs/$n.log" 2>&1
  if [ -f "$tmp/$n.png" ]; then mv "$tmp/$n.png" "$OUT/$n.png"; rm -rf "$tmp"; echo "$n: ok"; else echo "$n: FALLO"; fi
}
uno hero 'Vista desde atrás y un poco arriba del hombro de un motociclista latino con casco, detenido al borde de una carretera de montaña colombiana al atardecer dorado. En primer plano y nítida, la pantalla montada en el centro del manubrio de su moto naked negra, encendida con un mapa de ruta genérico. Al fondo la carretera con curvas y montañas verdes. Mucho espacio limpio, la pantalla en el centro de la imagen.' &
uno ruta 'Primer plano desde la posición del conductor: la pantalla montada en el manubrio de una moto mostrando un mapa de navegación genérico con una línea de ruta azul, y detrás, desenfocada, una avenida de ciudad colombiana con tráfico de motos a media mañana. Luz natural. La pantalla nítida, ocupando el centro.' &
uno conecta 'Un motociclista latino joven con chaqueta, de pie junto a su moto estacionada frente a su casa en Colombia, sostiene su celular en la mano mientras toca con el dedo la pantalla montada en el manubrio, que muestra íconos genéricos de apps. La moto está apagada y estacionada. Luz suave de mañana. Plano medio, la pantalla y el celular nítidos.' &
wait
uno musica 'Primer plano de la mano con guante de un motociclista tocando un ícono de música en la pantalla montada en el manubrio, con la moto detenida en un semáforo en rojo de una calle colombiana al anochecer (luces de ciudad desenfocadas). La pantalla muestra íconos genéricos de música y llamadas. Luz cálida de ciudad.' &
uno montaje 'Foto de detalle tipo catálogo: la abrazadera del soporte de la pantalla bien ajustada al manubrio negro de una moto, con la pantalla montada y encendida. Fondo de garaje limpio y desenfocado, luz de estudio suave. Se entiende claramente cómo se instala en el manubrio.' &
uno viaje 'Pareja de motociclistas latinos con cascos, detenidos en un mirador de carretera colombiana con montañas y neblina al amanecer, revisando la ruta en la pantalla montada en el manubrio de su moto de turismo. La pantalla nítida en el tercio inferior, el paisaje amplio detrás.' &
wait
