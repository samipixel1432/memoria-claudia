# Memoria de Claude — Tovelya

Este repositorio es la memoria permanente de Claude para el trabajo con Samuel en **Tovelya** (tienda Shopify de pago contra entrega en Colombia). Sirve igual en un chat en la nube que en el computador: la memoria vive aquí, no en la memoria local de Claude.

## Al empezar cualquier conversación
1. Lee `memory/MEMORY.md` (el índice) y abre las notas que tengan que ver con lo que te piden.
2. Lee `contexto/ESTADO-TOVELYA.md`: estado actual de la tienda, campañas, landings, scripts y pendientes.
3. Responde siempre en **español**, claro y sin tecnicismos: Samuel no es programador.

## Cómo guardar memoria
- Cada nota es un archivo en `memory/` con este encabezado:
  ```markdown
  ---
  name: nombre-corto-en-kebab-case
  description: una línea para decidir si es relevante
  metadata:
    type: user | feedback | project | reference
  ---
  El hecho. En feedback y project, agrega **Why:** y **How to apply:**. Enlaza otras notas con [[su-name]].
  ```
- Agrega una línea al índice `memory/MEMORY.md`: `- [Título](archivo.md) — gancho`.
- Antes de crear una nota, revisa si ya hay una sobre lo mismo y actualízala en vez de duplicar. Borra las que resulten falsas.
- Fechas siempre absolutas (2026-10-19), nunca "ayer" o "la semana pasada".
- Cuando cambie el estado de la tienda (campaña, landing, pendiente resuelto), actualiza `contexto/ESTADO-TOVELYA.md`.
- Al terminar, haz commit y push a `main` de este repositorio. Si no puedes hacer push, dile a Samuel que quedó sin subir.

## Nunca guardes aquí
Llaves de API, tokens, contraseñas, el contenido de `.env`, datos de tarjetas ni datos personales de clientes (nombres, teléfonos, direcciones de pedidos).
