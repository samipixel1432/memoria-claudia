# Estado de Tovelya (actualizado 2026-10-23)

## La tienda
- Shopify: `tovelya-store.myshopify.com` (dominio permanente `kh0tp1-dp.myshopify.com`). Pago contra entrega (COD) en Colombia.
- Formulario de pedido: **EasySell COD Form** (ventana emergente). Releasit se desinstaló.
  - La página abre el formulario con `window.openTysloForm()`; el formulario lee `?variant=` de la URL.
  - La configuración vive en el metafield de tienda `_es_cod_form.config_json`. El 2026-10-19 se cambió por API (script `shopify/update-easysell-form.py`): título "No pagas nada ahora: solo tus datos de entrega", apellido opcional, botón naranja "PEDIR Y PAGAR AL RECIBIR". **Si Samuel guarda el formulario desde la app de EasySell, esos cambios se pierden.**
  - El formulario muestra **envío gratis**; total del cepillo $129.900.
- Proveedor principal: Premier (API de catálogo en `premier.optimalabsconsulting.com/api/zapatos`).
- Fórmula de precio (de `shopify/sync-premier-catalog.ps1`): `(costo + 22000 + 18000 + 2000) / 0.75`, redondeado hacia arriba a …9.900.
- WhatsApp oficial: **+57 323 255 2543** (confirmado por Samuel el 2026-10-21). Ya está en el inicio, en la landing del cepillo y en Meta. Pendiente: las políticas todavía tienen el +57 322 601 8352; hay que cambiarlo por el 323.

## Cómo se trabaja la tienda (desde el proyecto local)
- Carpeta del proyecto: `C:\Users\PC\OneDrive\Documentos\ChatGPT\1proyecto_shopifu` (repositorio git local, **sin remoto en GitHub**).
- Scripts Python en `shopify/` que usan la Admin API con credenciales de `shopify/.env` (nunca leer ni mostrar ese archivo).
- Tema publicado (MAIN) **desde el 2026-10-21**: `Tovelya - cepillo fotos nuevas 2026-10-21`, `gid://shopify/OnlineStoreTheme/181838774519`. El anterior ("Horizon", `180673806583`) quedó en la biblioteca sin publicar. Si un script del PC tiene el id viejo, hay que cambiarlo. Antes de editar, bajar el archivo en vivo y comparar; otras sesiones también lo modifican.
- La llave de la app no tiene `read_publications`: para publicar un producto se usa REST `PUT /products/{id}.json {"published":true}`. Páginas y blogs se editan con el conector MCP de Shopify (la app local no tiene ese permiso).
- Commits: `git -c user.name="Samuel" -c user.email="<su correo>" commit`, con la línea `Co-Authored-By: Claude`.
- En el computador hay un hook (plugin matriz-viralidad) que bloquea comandos con `.env`, `.*` en regex, `python -c`, `node -e`, `env` o `printenv`: escribir scripts en archivos.

## Cómo se trabaja la tienda desde la nube
Ver la nota `memory/reference_shopify_desde_nube.md`: subir imágenes, editar plantillas en una copia del tema (el conector no deja escribir en el tema en vivo) y revisar en celular con `herramientas/captura.mjs`.

## Categorías (las 4 que eligió Samuel el 2026-10-23)
Cada una tiene su propia página ("sub-landing") con la plantilla `collection.<sufijo>` (ver abajo). Todas son automáticas por etiqueta, salvo Hogar.
| Categoría | URL | id | Regla | Plantilla | Productos activos |
|---|---|---|---|---|---|
| Hogar y limpieza | `/collections/hogar` | 505565315319 | ya existía (tipo de producto) | `collection.hogar` | 6: cepillo 7 en 1, cepillo de cocina, robot, hidrolavadora, trapero, bomba de vacío |
| Salud y bienestar | `/collections/salud` | 507579269367 | etiqueta `Salud` | `collection.salud` | 7: café, hombro, chaleco, báscula, faja, camisilla, trampolín |
| Carro y moto | `/collections/carro-y-moto` | 507580907767 | etiqueta `Carro y moto` | `collection.carro-moto` | 5: CarPlay moto, TPMS, inflador 4 en 1, compresor, traje impermeable |
| Entretenimiento | `/collections/entretenimiento` | 507580940535 | etiqueta `Entretenimiento` | `collection.entretenimiento` | 1: mini proyector (el peluche de Jesús entra cuando tenga fotos; hoy no tiene ninguna) |
- **Lo más pedido** (`/collections/lo-mas-pedido`, 507581497591, etiqueta `Lo mas pedido`): cepillo 7 en 1, café, proyector, CarPlay, compresor y chaleco. La usa la página principal. Se creó nueva para no tocar la etiqueta vieja "Tovelya destacado", que usa la principal en vivo.
- Ya existían y no se usan en el diseño nuevo: Tecnologia, Belleza, Bienestar, Mascotas, Mas vendidos.

## Fotos limpias de catálogo (2026-10-23, en vivo)
- Los 18 productos activos tienen de **primera foto** una foto de catálogo nueva: fondo crema `#F6F1EA`, producto al 70 %, sin texto, hecha con Codex desde su foto real y revisada contra ella (`tovelya-<nombre>-catalogo.jpg`). El café usa `tovelya-cafe-tarro-estudio.jpg`. Las fotos viejas siguen en la galería, detrás.
- Esto cambia la foto principal en la tienda, Meta y TikTok.
- Cómo se hacen: `herramientas/generar-packshots.sh <carpeta>` con `lista.txt` (`nombre|descripción`) y `ref/<nombre>.jpg`. Ver `herramientas/packshots-lista-2026-10-23.txt`. Se rehicieron el inflador (le faltaba la pantalla encendida) y el cepillo de cocina (salió cortado).

## Página principal
- **Nueva (2026-10-23, en el tema de prueba `181906309367`, sin publicar)**. Pedido de Samuel: la principal estaba "re pailas" (foto del proyector con el logo pegado y unos caimanes rojos); la quería como el café (blanco/crema), más moderna y profesional, y con una sub-landing por categoría que explique "qué hay en esta sección" y recomiende, no los productos tirados.
  - Orden: barra → cabecera ("Ver categorías") → portada `tovelya-home-v2-portada.jpg` ("Lo útil también puede sentirse especial", café + proyector + cepillo) → confianza → **¿Qué estás buscando?** (4 tarjetas a las 4 categorías, sección `tovelya-categoria` con ancla `categorias`) → **Lo más pedido** (6) → **Así compras** en 4 pasos con foto (sección `tovelya-cepillo-v2-pasos` en colores crema) → 2 opiniones de antes (sin nota inventada) → 4 preguntas de antes → banner "No pagas nada hasta recibirlo" + WhatsApp → pie.
  - Respaldo del `index.json` anterior (la sección vieja `tovelya-home`): `respaldos/2026-10-23-index-ANTES-original.json`. Para volver atrás basta subir ese archivo.
- **Sub-landings de categoría** (mismo tema de prueba): portada con texto adentro (`tovelya-cat-<cat>-portada.jpg`) → **Qué hay en esta sección** (4 subgrupos con foto) → **¿Cuál es para ti?** (pregunta de necesidad → producto con foto y precio) → **Todos los productos** → **Te recomendamos** (1 producto con 3 checks) → confianza → banner de pago + WhatsApp → **Otras categorías** → pie. Entretenimiento, con 1 solo producto, lleva un banner de "Partidos y series" en vez de subgrupos y lista.
  - Recomendados: Hogar → cepillo 7 en 1; Salud → café; Carro y moto → CarPlay; Entretenimiento → proyector.
  - El `templateSuffix` ya quedó puesto en las 4 categorías. Mientras no se publique el tema, el tema en vivo usa la plantilla normal de categoría.
  - Todo se arma con `herramientas/plantillas-home-categorias.mjs` (`node … <carpeta>` genera `index.json` y las 4 `collection.*.json`). Respaldos en `respaldos/2026-10-23-*.json`.
- **Antes** (en vivo hasta que Samuel publique): `templates/index.json` usa una sola sección grande, `sections/tovelya-home.liquid`, con todo escrito a mano: título "Lo útil también puede sentirse especial", 3 categorías fijas (Hogar, Entretenimiento y movimiento, Bienestar) con productos por handle, pasos, opiniones, preguntas y cierre.
- **2026-10-22: Samuel pidió dejar la página principal "como estaba antes".** Se devolvió `templates/index.json` del tema de prueba `181906309367` a la versión original (igual a la que está en vivo, se comprobó con la huella del archivo) y se quitó la etiqueta "Tovelya destacado" que se había puesto a 6 productos. La categoría Salud **sí se dejó**. Las secciones `tovelya-imagenes`/`tovelya-productos` y los banners `tovelya-home-b*.jpg` siguen guardados por si se retoma, junto con este diseño que **no** se usó:
- Diseño descartado (respaldo en `respaldos/2026-10-22-index-nueva.json`), en el tema de prueba `181906309367`. Estructura: barra superior → cabecera ("Ver productos") → banner de inicio ("Lo útil para tu casa y para tu día", foto con café + proyector + cepillo) → confianza → **"Lo más pedido"** (sección `tovelya-productos`, categoría Mas vendidos, 8) → banner Hogar → **banners de Salud** (rutina con báscula, café y chaleco; mujer con chaleco postural) → productos de **Salud** (6) → banner Tecnología (familia con el mini proyector) → banner "No pagas nada hasta recibirlo" con botón de WhatsApp → pie. Fotos hechas con Codex desde las fotos reales (`herramientas/generar-home.sh`), banners `tovelya-home-b1…b6.jpg`. Respaldo en `respaldos/2026-10-22-index-nueva.json`. La página vieja (`sections/tovelya-home.liquid`) sigue en el tema, solo que ya no se usa.
- (Ojo: la categoría "Mas vendidos" solo tiene 2 productos activos —bomba de vacío y trapero—; el resto son borradores.)
- Secciones nuevas reutilizables: `tovelya-imagenes` (ahora con enlace opcional en imagen y botón; sin enlace, el botón abre el formulario de pedido), `tovelya-productos` (tarjetas de una categoría; si no se elige categoría usa la de la página) y `tovelya-categoria` (2026-10-23: subgrupos, necesidad → producto y recomendado; con ancla opcional). Copias en `herramientas/`.

## Landings
- Sistema v2: plantillas `templates/product.<sufijo>.json` hechas con secciones `sections/tovelya-cepillo-v2-*`. Antes de editar una landing, revisar el `templateSuffix` del producto.
- **Cepillo eléctrico** (`cepillo-electrico-recargable-7-en-1`, plantilla `cepillo-v2`). Reformada el 2026-10-19 con `shopify/deploy-cepillo-landing-v3.py`:
  - Título "Limpia el baño sin arrodillarte" (igual al anuncio ganador del video en la ducha).
  - Orden: inicio → video → pedido → confianza → beneficios → antes/ahora → lo que recibes → cabezales → **oferta** (nueva) → cómo se usa → **cómo pedir en 3 pasos** (nueva) → $0 pago adelantado → cierre. Hay 8 botones de pedir.
  - Las preguntas frecuentes y el pack de 2 quedaron ocultos (no borrados). Samuel dijo que las preguntas distraen y pidió más llamados a la acción, **no quitar secciones**.
  - Falta: testimonios reales de clientes (no inventar reseñas).
  - **Fotos nuevas (2026-10-21, desde la nube)**: 15 fotos hechas con Codex/ChatGPT a partir de la foto real del kit, sin texto horneado, todas cuadradas (archivos `tovelya-cepillo-v3-*.jpg` en Shopify Files). La foto principal ya no se corta en celular (en celular el hero se ve en 4:3). Los 7 cabezales ahora tienen su nombre real (cerdas largas, domo, cerdas cortas, fibra verde, fibra azul, esponja, fibra gris) y su propia foto; antes decían "Juntas", "Esquinas", etc. y repetían fotos.
  - Texto más simple (2026-10-21, porque a Samuel le dijeron que solo compran si ven que es lo que quieren): título "Limpia baño y cocina sin agacharte ni frotar"; la sección de los 7 usos subió justo después de los videos, y los cabezales se titulan por el uso ("Piso de la ducha", "Ollas con grasa"...). Ver la nota `feedback_landing_clara_y_simple.md`.
  - Foto principal (2026-10-21, pedida por Samuel "que llame la atención"): de 3 opciones (antes/después, producto con salpicadura sobre azul marino de la marca, mujer con café) se eligió la de **salpicadura** (`tovelya-cepillo-v3-hero-impacto.jpg`), porque combina con el fondo oscuro del hero. La de antes/después quedó como primera miniatura (`tovelya-cepillo-v3-antes-despues.jpg`). La foto de la mujer de pie (`tovelya-cepillo-v3-hero.jpg`) quedó sin usar en el hero.
  - **En vivo desde el 2026-10-21**: Samuel publicó el tema `181838774519` y se comprobó en la tienda. Respaldo del antes/después en `respaldos/`.
  - Galería del producto (en vivo): se agregaron 7 fotos v3 y se quitó la `10-oferta-final` porque decía "$119.900 pago anticipado", que contradice "no pagas nada ahora" (el archivo sigue en Files).
- **Café con colágeno (nuevo, 2026-10-21)**: producto de **Dropi** (ID 2214172), no de Premier. Dropi pide inicio de sesión; Samuel mandó la foto del proveedor: **Natura Trends "Coffee + Colágeno", tarro de 400 g, ~13 porciones**, "alimento en polvo a base de crema de coco adicionado con vitaminas y minerales con colágeno y café soluble". La foto del proveedor dice "+ Obsequio" pero no se sabe qué regalo es: no se promete.
  - Producto en Shopify: `gid://shopify/Product/10157413269751` (handle `cafe-con-colageno-coffee-colageno-400-g`), variante `51377169793271`, SKU `TOV-CAFE-COLAGENO-400`. **ACTIVO y publicado desde el 2026-10-21** (lo pidió Samuel) en Tienda online, Facebook & Instagram y TikTok: https://tovelya-store.myshopify.com/products/cafe-con-colageno-coffee-colageno-400-g. Se comprobó que el botón de pedir abre el formulario de EasySell. Costos en Dropi (2026-10-21): x1 $23.900 (ID 2326220), x2 $47.800 (2326221), x3 $71.700 (2326222), x5 $119.500 (2326223). Samuel pidió calcular con **$30.000 de envío y $15.000 de publicidad por pedido** (+$2.000 de otros, como en la fórmula de la tienda, sobre 0,75). Resultado: x1 **$99.900** (se deja igual; ganancia ≈ $29.000), x2 $129.900 (≈ $35.100), x3 $159.900 (≈ $41.200), x5 $229.900 (≈ $63.400). Los combos se propusieron pero aún no están en Shopify ni en la landing. Si cambia el precio, hay que cambiarlo también en la plantilla (el texto "$99.900" y "unos $7.700 por taza" están escritos a mano).
  - 12 fotos `tovelya-cafe-*.jpg` en Files: 6 con el tarro real (de referencia la foto del proveedor; la etiqueta salió fiel) y 6 de estilo de vida sin empaque. Las 6 del tarro están en la galería del producto.
  - Landing: plantilla `product.cafe-colageno` (en el tema publicado `181838774519`, en vivo), hecha con las mismas secciones `tovelya-cepillo-v2-*` cambiando los colores a blanco, café y caramelo (estilo Apple, pedido por Samuel). Botones naranja y confianza azul como en las demás. No tiene precio tachado inventado: el ancla es "unos $7.700 por taza". No tiene preguntas frecuentes.  - **Versión visual (2026-10-22, sin publicar)** en el tema `Tovelya - café colágeno con bono (prueba)` (`gid://shopify/OnlineStoreTheme/181906309367`). Samuel dijo que había "demasiado texto" y pidió más imágenes con texto. Quedó: cabecera, inicio corto, confianza, **7 banners** con el texto dentro (`tovelya-cafe-b1…b7.jpg`, hechos con `herramientas/banner.sh`: foto arriba y panel crema con Inter Display) con 3 botones de pedido entre ellos (sección nueva `sections/tovelya-imagenes.liquid`, copia en `herramientas/`), pedido, cierre y barra. Se quitaron las secciones de texto (datos, beneficios, bono, pasos, momentos, comparativa, cómo pedir, garantía, preguntas).
  - Ese tema de prueba lo creó **otra sesión** el 2026-10-22 con un **"bono de $20.000"** y el precio tachado "$119.900" (precio sin bono). Se quitó, porque el tarro nunca se vendió a $119.900 y un descuento inventado se puede ver como publicidad engañosa. Respaldo completo de esa versión en `respaldos/2026-10-22-product.cafe-colageno-con-bono-otra-sesion.json`. El tema de prueba también tiene el cepillo igual al que está en vivo, así que publicarlo no lo daña.
  - Es alimento: no prometer resultados de salud ni de belleza (INVIMA y Meta lo prohíben). El texto habla de sabor, preparación, rendimiento y lo que dice la etiqueta.
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

## Herramientas instaladas
- En la nube (desde 2026-10-21): los 7 plugins de Hainrixz se instalan solos en cualquier sesión abierta sobre este repositorio (`.claude/settings.json`). Las skills de Moni Makers todavía no están en la nube.
- En el computador: plugins de Hainrixz: claude-ads, creative-architect, claude-seo-ai, motion-architect, jarvis-architect, the-architect, matriz-viralidad (ver la nota `reference_hainrixz_skills.md`).
- **Codex para terminal** (`@openai/codex` 0.163.0), instalado el 2026-10-19 para generar imágenes con la cuenta de ChatGPT Plus de Samuel. En PowerShell se usa `codex.cmd`, porque Windows bloquea los `.ps1`. Al cerrar la sesión, el inicio de sesión (`codex.cmd login`) estaba en curso y sin confirmar.

## Preguntas abiertas para Samuel
1. Bomba de vacío: la landing vende solo BLANCO a $119.900, pero en Shopify existen NEGRO y "Única" a $109.900, con precio tachado de $149.900. ¿Cuál es la oferta real?
2. La landing de la bomba muestra "Ref. Premier 1454" al cliente: ¿se quita?
3. El peluche y el traje impermeable no están en ninguna categoría.
4. Precio del peluche: $99.900 (el mercado está entre $55.000 y $69.900).
5. Confirmar con Premier el stock y el costo del TPMS (ref 1633) y del compresor (ref 1581).
