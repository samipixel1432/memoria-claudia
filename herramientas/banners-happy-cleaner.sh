#!/bin/bash
# Banners 4:5 del Happy Cleaner (colores originales de Tovelya). Es un alimento: sin promesas de salud.
# Uso: banners-happy-cleaner.sh <carpeta-con-generadas/> <foto-de-entrega>
C="$1"; ENTREGA="$2"; H=/home/user/memoria-claudia/herramientas
export PALETA=tovelya
g="$C/generadas"; o="$C/banners"; mkdir -p "$o"
bash $H/banner.sh "$g/vaso.png"     "$o/tovelya-happy-b1-sabor.jpg"     "Sabor sandía"        "Un vaso rosado,"    "rico y refrescante" "Mix de frutas sabor sandía." 50
bash $H/banner.sh "$g/preparar.png" "$o/tovelya-happy-b2-facil.jpg"     "Fácil de preparar"   "Una copa en agua,"  "revuelves y listo"  "Trae copa dosificadora de 10 g." 50
bash $H/banner-lista.sh "$g/catalogo.png" "$o/tovelya-happy-b3-trae.jpg" "Lo que trae" "Lo que trae" "cada tarro" \
  "Fibra e inulina" "Sabor a sandía" "Copa dosificadora de 10 g" "Unas 25 porciones"
bash $H/banner.sh "$g/manana.png"   "$o/tovelya-happy-b4-manana.jpg"    "Tu mañana"           "Empieza el día"     "con algo rico"      "Una bebida fresca para tu rutina." 40
bash $H/banner-pasos.sh "$o/tovelya-happy-b5-pasos.jpg" "Cómo se prepara" "Así de fácil," "en 3 pasos" \
  "$g/preparar.png" "Sirve una copa" "10 g del polvo en el vaso." \
  "$g/mezclar.png"  "Agrega agua fría" "Revuelve hasta disolver." \
  "$g/vaso.png"     "Disfrútalo" "Con hielo es más rico."
bash $H/banner.sh "$g/porciones.png" "$o/tovelya-happy-b6-porciones.jpg" "Rinde"              "25 porciones"       "en un solo tarro"   "Tarro de 250 g." 50
bash $H/banner.sh "$g/oficina.png"  "$o/tovelya-happy-b7-oficina.jpg"   "Donde estés"         "En la casa"         "o en la oficina"    "Solo necesitas agua." 40
bash $H/banner.sh "$ENTREGA"        "$o/tovelya-happy-b8-pago.jpg"      "Pago contra entrega" "No pagas nada"      "hasta recibirlo"    "Envío gratis a toda Colombia." 30
ls "$o"
