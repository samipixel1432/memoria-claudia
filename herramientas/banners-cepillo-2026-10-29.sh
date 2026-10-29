#!/bin/bash
# Banners 4:5 del cepillo (colores originales de Tovelya). Uso: banners.sh <carpeta-con-generadas/> <carpeta-con-las-fotos-v3-en-png>
C="$1"; V3="$2"; B=/home/user/memoria-claudia/herramientas/banner.sh
export PALETA=tovelya
mkdir -p "$C/banners"
g="$C/generadas"
bash $B "$g/de-pie.png"                              "$C/banners/tovelya-cepillo-b1-de-pie.jpg"     "Palo largo"          "Limpia de pie,"     "sin arrodillarte"      "Llega al piso de la ducha sin agacharte." 40
bash $B "$V3/cab-01-cerdas-largas.png" "$C/banners/tovelya-cepillo-b2-gira.jpg" "Gira solo"           "Él frota,"          "tú solo lo guías"      "El motor hace la fuerza por ti." 50
bash $B "$g/kit.png"                                 "$C/banners/tovelya-cepillo-b3-kit.jpg"        "7 en 1"              "7 cepillos,"        "uno para cada cosa"    "Baño, cocina, vidrios y más." 50
bash $B "$g/juntas.png"                              "$C/banners/tovelya-cepillo-b4-juntas.jpg"     "Baño"                "Juntas y esquinas"  "que sí quedan limpias" "Entra en los rincones de la ducha." 50
bash $B "$g/estufa.png"                              "$C/banners/tovelya-cepillo-b5-cocina.jpg"     "Cocina"              "Estufa y ollas"     "sin tanto esfuerzo"    "Fibras para la grasa pegada." 50
bash $B "$V3/cab-06-esponja.png"  "$C/banners/tovelya-cepillo-b6-vidrios.jpg"    "Vidrios"             "Vidrios y espejos"  "con esponja suave"     "Cambias la punta en segundos." 50
bash $B "$g/recargable.png"                          "$C/banners/tovelya-cepillo-b7-recargable.jpg" "Recargable"          "Sin cables"         "mientras limpias"      "Lo cargas con el cable USB incluido." 50
bash $B "$g/entrega.png"                             "$C/banners/tovelya-cepillo-b8-pago.jpg"       "Pago contra entrega" "No pagas nada"      "hasta recibirlo"       "Envío gratis a toda Colombia." 30
ls -la "$C/banners"
