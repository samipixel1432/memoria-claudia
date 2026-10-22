# Memoria de Claude — Tovelya

Este repositorio es la memoria permanente de Claude para el trabajo con Samuel en **Tovelya** (tienda Shopify de pago contra entrega en Colombia). Sirve igual en un chat en la nube que en el computador: la memoria vive aquí, no en la memoria local de Claude.

## Al empezar cualquier conversación
1. Lee `memory/MEMORY.md` (el índice) y abre las notas que tengan que ver con lo que te piden.
2. Lee `contexto/ESTADO-TOVELYA.md`: estado actual de la tienda, campañas, landings, scripts y pendientes.
3. Responde siempre en **español**, claro y sin tecnicismos: Samuel no es programador.

## Así se hace siempre una landing (aprobado por Samuel el 2026-10-22: "perfecto, hermoso")
1. **Fotos con IA a partir de la foto real del producto** (Codex/ChatGPT con `herramientas/generar.sh`). El producto no se inventa ni se cambia; se revisa contra la foto real antes de subir.
2. **Inicio corto**: foto que llame la atención, título que diga qué es y para qué sirve, 3 checks cortos, precio y botón naranja.
3. **Poco texto, muchas imágenes con texto adentro**: banners 4:5 (1080×1350) hechos con `herramientas/banner.sh` (foto arriba, panel crema, etiqueta, título grande en 2 líneas, una línea pequeña), uno debajo del otro con la sección `tovelya-imagenes` (`herramientas/seccion-tovelya-imagenes.liquid`).
4. **Un botón de pedir cada 2 o 3 imágenes**, con precio y "Pagas al recibir · Envío gratis".
5. Al final: formulario de pedido, cierre y barra fija. Las secciones de texto largo (comparativa, beneficios, preguntas) van ocultas.
6. **Sin descuentos inventados** (nada de precio tachado que nunca existió) y, en alimentos, sin promesas de salud.
7. Yo subo todo y lo dejo en una copia del tema; Samuel solo toca **Publicar**. Le mando el link.
Detalles en `memory/feedback_menos_texto_mas_imagenes.md` y `memory/reference_shopify_desde_nube.md`.

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
