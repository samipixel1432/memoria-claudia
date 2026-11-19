#!/bin/bash
# Banners 4:5 del espejo retrovisor con doble cámara DVR (colores originales de Tovelya).
# Uso: banners-espejo-dvr.sh <carpeta-con-generadas/>
C="$1"; H=/home/user/memoria-claudia/herramientas
export PALETA=tovelya
g="$C/generadas"; o="$C/banners"; mkdir -p "$o"
bash $H/banner.sh "$g/conductor.png"  "$o/tovelya-espejo-b1-graba.jpg"     "Doble cámara"        "Todo lo que pasa"   "queda grabado"      "Cámara de adelante Full HD 1080p." 50
bash $H/banner-antes-despues.sh "$g/split-parqueo.png" "$o/tovelya-espejo-b2-parqueo.jpg" "Parquea fácil" "Deja de parquear" "adivinando" "Al dar reversa ves lo que hay atrás." 50
bash $H/banner.sh "$g/reversa.png"    "$o/tovelya-espejo-b3-reversa.jpg"   "Cámara de reversa"   "Líneas de colores"  "para parquear"      "Se prenden solas cuando das reversa." 50
bash $H/banner.sh "$g/placa.png"      "$o/tovelya-espejo-b4-placa.jpg"     "Cámara de atrás"     "Va encima"          "de tu placa"        "Pequeña, discreta y con luces." 50
bash $H/banner.sh "$g/noche.png"      "$o/tovelya-espejo-b5-noche.jpg"     "De día y de noche"   "Graba también"      "cuando oscurece"    "Pantalla de 4,3\" en tu espejo." 50
bash $H/banner-lista.sh "$g/catalogo.png" "$o/tovelya-espejo-b6-hace.jpg" "Lo que hace" "Un espejo" "que te cuida" \
  "Graba adelante y atrás a la vez" "Guarda el video si hay un golpe" "Graba en ciclo, sin parar" "Vigila el carro parqueado"
bash $H/banner-pasos.sh "$o/tovelya-espejo-b7-pasos.jpg" "Fácil de instalar" "Listo en" "3 pasos" \
  "$g/instalar.png"  "Ponlo sobre tu espejo" "Se sujeta con sus bandas." \
  "$g/placa.png"     "Pon la cámara atrás"   "Con el cable largo que trae." \
  "$g/conductor.png" "Conéctalo y maneja"    "Al cargador del carro."
bash $H/banner.sh "$g/familia.png"    "$o/tovelya-espejo-b8-familia.jpg"   "Tranquilidad"        "Maneja tranquilo"   "con tu familia"     "Si pasa algo, tienes la prueba." 40
bash $H/banner.sh "$g/plataforma.png" "$o/tovelya-espejo-b9-plataforma.jpg" "Si trabajas manejando" "Ideal para taxi" "y plataformas"     "Cada viaje queda grabado." 40
bash $H/banner.sh "$g/lluvia.png"     "$o/tovelya-espejo-b10-lluvia.jpg"   "Impermeable"         "Aguanta lluvia"     "y lavadas"          "La cámara de atrás va por fuera." 50
bash $H/banner.sh "$g/caja.png"       "$o/tovelya-espejo-b11-caja.jpg"     "Lo que recibes"      "Todo esto"          "llega en la caja"   "La memoria microSD (hasta 32 GB) no viene." 50
bash $H/banner.sh "$g/entrega.png"    "$o/tovelya-espejo-b12-pago.jpg"     "Pago contra entrega" "No pagas nada"      "hasta recibirlo"    "Envío gratis a toda Colombia." 30
ls "$o"
