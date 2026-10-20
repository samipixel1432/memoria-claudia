# Estado de Tovelya (actualizado 2026-10-19)

## La tienda
- Shopify: `tovelya-store.myshopify.com` (dominio permanente `kh0tp1-dp.myshopify.com`). Pago contra entrega (COD) en Colombia.
- Formulario de pedido: **EasySell COD Form** (ventana emergente). Releasit se desinstaló.
  - La página abre el formulario con `window.openTysloForm()`; el formulario lee `?variant=` de la URL.
  - La configuración vive en el metafield de tienda `_es_cod_form.config_json`. El 2026-10-19 se cambió por API (script `shopify/update-easysell-form.py`): título "No pagas nada ahora: solo tus datos de entrega", apellido opcional, botón naranja "PEDIR Y PAGAR AL RECIBIR". **Si Samuel guarda el formulario desde la app de EasySell, esos cambios se pierden.**
  - El formulario muestra **envío gratis**; total del cepillo $129.900.
- Proveedor principal: Premier (API de catálogo en `premier.optimalabsconsulting.com/api/zapatos`).
- Fórmula de precio (de `shopify/sync-premier-catalog.ps1`): `(costo + 22000 + 18000 + 2000) / 0.75`, redondeado hacia arriba a …9.900.
- WhatsApp: hay dos números en uso y **falta que Samuel confirme cuál es el oficial**: +57 322 601 8352 (políticas; la memoria lo da como el real) y +57 323 255 2543 (en el inicio, en la landing del cepillo y en Meta).

## Cómo se trabaja la tienda (desde el proyecto local)
- Carpeta del proyecto: `C:\Users\PC\OneDrive\Documentos\ChatGPT\1proyecto_shopifu` (repositorio git local, **sin remoto en GitHub**).
- Scripts Python en `shopify/` que usan la Admin API con credenciales de `shopify/.env` (nunca leer ni mostrar ese archivo).
- Tema publicado (MAIN): `gid://shopify/OnlineStoreTheme/180673806583`. Antes de editar, bajar el archivo en vivo y comparar; otras sesiones también lo modifican.
- La llave de la app no tiene `read_publications`: para publicar un producto se usa REST `PUT /products/{id}.json {"published":true}`. Páginas y blogs se editan con el conector MCP de Shopify (la app local no tiene ese permiso).
- Commits: `git -c user.name="Samuel" -c user.email="<su correo>" commit`, con la línea `Co-Authored-By: Claude`.
- En el computador hay un hook (plugin matriz-viralidad) que bloquea comandos con `.env`, `.*` en regex, `python -c`, `node -e`, `env` o `printenv`: escribir scripts en archivos.

## Landings
- Sistema v2: plantillas `templates/product.<sufijo>.json` hechas con secciones `sections/tovelya-cepillo-v2-*`. Antes de editar una landing, revisar el `templateSuffix` del producto.
- **Cepillo eléctrico** (`cepillo-electrico-recargable-7-en-1`, plantilla `cepillo-v2`). Reformada el 2026-10-19 con `shopify/deploy-cepillo-landing-v3.py`:
  - Título "Limpia el baño sin arrodillarte" (igual al anuncio ganador del video en la ducha).
  - Orden: inicio → video → pedido → confianza → beneficios → antes/ahora → lo que recibes → cabezales → **oferta** (nueva) → cómo se usa → **cómo pedir en 3 pasos** (nueva) → $0 pago adelantado → cierre. Hay 8 botones de pedir.
  - Las preguntas frecuentes y el pack de 2 quedaron ocultos (no borrados). Samuel dijo que las preguntas distraen y pidió más llamados a la acción, **no quitar secciones**.
  - Falta: testimonios reales de clientes (no inventar reseñas). La foto principal en celular se ve cortada arriba.
- Otros productos activos con landing: trapero, bomba de vacío, compresor/arrancador, mini proyector, inflador 4 en 1, hidrolavadora, camisilla térmica, faja, soporte térmico de hombro, chaleco postural, CarPlay para moto, traje impermeable, báscula, trampolín, robot limpiador, cepillo de cocina, monitor TPMS, peluche de Jesús (rojo/azul).
- Peluche de Jesús: las imágenes nuevas se generan con los prompts de `assets/products/peluche-jesus/landing/PROMPTS-CODEX.md`. Cuando estén en `.../landing/generated/`, se suben con `shopify/deploy-peluche-jesus-images.py`.

## Campaña de Meta del cepillo
- Cuenta "Tovelya Ads". Campaña `TOV | Ventas | Cepillo eléctrico | Prueba`, presupuesto de campaña $20.000/día, Advantage+.
- **Apagada desde el 2026-10-13**: la cuenta tiene **saldo pendiente sin pagar** y Meta dejó de entregar. Samuel tiene que pagarlo.
- El conector de Meta (MCP) todavía no está habilitado para esa cuenta. Chrome no tenía la sesión de Facebook abierta.
- Datos de Shopify del 1 al 19 de octubre: 478 visitas a la landing → 87 empezaron el pedido → 9 pedidos → 6 válidos (3 anulados). Del 5 al 8 de octubre hubo 214 visitas de anuncios y 0 pedidos (causa sin revisar).
- Anuncio ganador según los UTM: `cepillo-video-ducha`.
- Plan completo: `assets/ads/cepillo/PLAN-ESTRATEGIA.md` (en el proyecto local). Costo máximo por pedido ≈ $27.000; meta ≤ $18.000.

## SEO (2026-10-19)
- Auditoría claude-seo-ai: SEO 67,6 (D) e IA 62 (D), medidos **antes** de los arreglos.
- Arreglado con `shopify/deploy-seo-fixes.py`, `deploy-seo-fixes-2.py` y `deploy-product-seo.py`:
  - Títulos y descripciones del inicio, las colecciones, Contacto, el blog, el catálogo y los productos.
  - Datos de producto y ruta de navegación para Google; la organización identificada.
  - Imagen por defecto para cuando se comparte un enlace.
  - Un solo título principal por página; se quitaron los títulos que cambiaba el código; textos en español.
  - Imágenes livianas en el inicio; productos asignados a sus categorías.
- Pendiente: una página "Quiénes somos", razón social/NIT, garantía y especificaciones por producto, testimonios.

## Herramientas instaladas en el computador
- Plugins de Hainrixz: claude-ads, creative-architect, claude-seo-ai, motion-architect, jarvis-architect, the-architect, matriz-viralidad (ver la nota `reference_hainrixz_skills.md`).
- **Codex para terminal** (`@openai/codex` 0.163.0), instalado el 2026-10-19 para generar imágenes con la cuenta de ChatGPT Plus de Samuel. En PowerShell se usa `codex.cmd`, porque Windows bloquea los `.ps1`. Al cerrar la sesión, el inicio de sesión (`codex.cmd login`) estaba en curso y sin confirmar.

## Preguntas abiertas para Samuel
1. ¿Cuál WhatsApp es el oficial: 322 o 323?
2. Bomba de vacío: la landing vende solo BLANCO a $119.900, pero en Shopify existen NEGRO y "Única" a $109.900, con precio tachado de $149.900. ¿Cuál es la oferta real?
3. La landing de la bomba muestra "Ref. Premier 1454" al cliente: ¿se quita?
4. El peluche y el traje impermeable no están en ninguna categoría.
5. Precio del peluche: $99.900 (el mercado está entre $55.000 y $69.900).
6. Confirmar con Premier el stock y el costo del TPMS (ref 1633) y del compresor (ref 1581).
