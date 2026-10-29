#!/bin/bash
# Banners 4:5 del limpiador de vidrios (colores originales de Tovelya).
# Uso: banners-limpiador-vidrio.sh <carpeta-con-generadas/> <foto-de-entrega.png>
C="$1"; ENTREGA="$2"; B=/home/user/memoria-claudia/herramientas/banner.sh
export PALETA=tovelya
g="$C/generadas"; o="$C/banners"; mkdir -p "$o"
bash $B "$g/antes-despues.png" "$o/tovelya-vidrio-b1-claro.jpg"      "Visión clara"        "Ve la calle claro,"  "sin grasa en el vidrio" "Quita la película grasosa del parabrisas." 50
bash $B "$g/boton.png"         "$o/tovelya-vidrio-b2-facil.jpg"      "Fácil de usar"       "Presionas y"         "el líquido sale solo"   "Trae 120 ml de líquido adentro." 50
bash $B "$g/parabrisas.png"    "$o/tovelya-vidrio-b3-parabrisas.jpg" "Parabrisas"          "Adiós a la"          "película grasosa"       "Frotas, enjuagas con agua y listo." 50
bash $B "$g/retrovisor.png"    "$o/tovelya-vidrio-b4-espejos.jpg"    "Espejos"             "Retrovisores"        "sin manchas de agua"    "Ves mejor lo que viene atrás." 50
bash $B "$g/noche.png"         "$o/tovelya-vidrio-b5-noche.jpg"      "Noche y lluvia"      "Maneja viendo"       "mejor el camino"        "Menos reflejos en un vidrio limpio." 50
bash $B "$g/mano.png"          "$o/tovelya-vidrio-b6-tamano.jpg"     "Compacto"            "Cabe en"             "la guantera"            "10,5 × 7,2 cm, liviano y resistente." 50
bash $B "$ENTREGA"             "$o/tovelya-vidrio-b7-pago.jpg"       "Pago contra entrega" "No pagas nada"       "hasta recibirlo"        "Envío gratis a toda Colombia." 30
ls "$o"
