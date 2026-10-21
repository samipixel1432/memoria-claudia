#!/bin/bash
# Uso: esquema.sh <seccion.liquid> [colores|todo]
# Muestra los settings del schema de una sección: id, tipo y valor por defecto.
f="$1"; modo="${2:-todo}"
awk '/{% schema %}/{f=1;next} /{% endschema %}/{f=0} f' "$f" > /tmp/claude-0/-home-user-memoria-claudia/cddc05fa-5689-528d-8cfa-eb83a6045128/scratchpad/_schema.json
if [ "$modo" = colores ]; then
  jq -r '.settings[] | select(.type=="color") | "\(.id)=\(.default)"' /tmp/claude-0/-home-user-memoria-claudia/cddc05fa-5689-528d-8cfa-eb83a6045128/scratchpad/_schema.json | tr '\n' ' '
else
  jq -r '"SETTINGS:", (.settings[] | select(.id) | "  \(.id) [\(.type)] = \(.default // "" | tostring | .[0:70])"), "BLOCKS:", (.blocks[]? | "  \(.type): " + ([.settings[]? | select(.id) | .id] | join(", ")))' /tmp/claude-0/-home-user-memoria-claudia/cddc05fa-5689-528d-8cfa-eb83a6045128/scratchpad/_schema.json
fi
echo
