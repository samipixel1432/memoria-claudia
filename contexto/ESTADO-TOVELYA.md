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
- Tema publicado (MAIN) **desde el 2026-10-23**: `Tovelya - café colágeno con bono (prueba)`, `gid://shopify/OnlineStoreTheme/181906309367` (lo publicó Samuel; trae la principal v3, las sub-landings de categoría, el café visual y la landing nueva del CarPlay). El anterior, `Tovelya - cepillo fotos nuevas 2026-10-21` (`181838774519`), quedó en la biblioteca sin publicar, igual que "Horizon" (`180673806583`).
- Temas de prueba sin publicar:
  - `Tovelya - packs café (prueba)` (`181911585015`, copia del MAIN del 2026-10-23) con los packs del café. Seguía sin publicar el 2026-10-29.
  - `Tovelya - cepillo imágenes (prueba)` (`182115893495`, copia del MAIN del 2026-10-29) con la landing nueva del cepillo. **No trae los packs del café.** Si Samuel quiere las dos cosas, hay que pasar la plantilla `product.cafe-colageno.json` de los packs (`respaldos/2026-10-23-product.cafe-colageno-packs.json`) a este tema antes de publicar. Como el conector no deja escribir en el MAIN, cada cambio nuevo se hace en una copia y Samuel la publica. Si un script del PC tiene el id viejo, hay que cambiarlo. Antes de editar, bajar el archivo en vivo y comparar; otras sesiones también lo modifican.
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
- **Versión actual (v3, 2026-10-23, en vivo desde que Samuel publicó el tema `181906309367` ese mismo día)**:
  - **Lo que pidió Samuel:**
    - Dijo que la principal estaba "re pailas": foto del proyector con el logo pegado y unos caimanes rojos.
    - Pidió una sub-landing por categoría.
  - **Primer intento descartado:** una principal blanco/crema estilo café. Dijo que "quedó muy sencilla".
  - **Lo que quiere:**
    - **Toda la información de la original, con sus colores** (azul marino y verde azulado).
    - Las categorías como **un botón para cada una**.
    - **El café/crema es SOLO para el café con colágeno.**
  - **Cómo está hecha:**
    - Es la sección original copiada como `sections/tovelya-home-v3.liquid`. Copia en `herramientas/seccion-tovelya-home-v3.liquid`.
    - La original `tovelya-home.liquid` quedó intacta. Respaldo en `respaldos/2026-10-23-seccion-tovelya-home-ORIGINAL.liquid`.
    - `templates/index.json` usa `tovelya-home-v3`.
  - **Cambios frente a la original:**
    - Portada nueva `tovelya-home-v3-portada.jpg`: estudio azul marino con proyector, cepillo, café y CarPlay, sin logo pegado ni caimanes. La misma foto va en el cierre.
    - Bloque nuevo **"Entra a la sección que buscas"**, justo después de la confianza: 4 botones con foto (Hogar y limpieza, Salud y bienestar, Carro y moto, Entretenimiento).
    - El catálogo trae las 4 categorías nuevas con todos sus productos y un botón naranja "Entrar a …" que lleva a cada sub-landing.
    - Enlace "Categorías" en el menú.
  - Lo demás quedó igual: manifiesto, pasos, "vida real", opiniones, preguntas, cierre y pie.
  - **Para volver a la original:** subir `respaldos/2026-10-23-index-ANTES-original.json` como `templates/index.json`.
- **Sub-landings de categoría** (mismo tema de prueba, **colores originales**; portada `tovelya-cat-<cat>-portada-v2.jpg` hecha con `PALETA=tovelya herramientas/banner.sh`, banner de pago `tovelya-pago-v2.jpg`): portada con texto adentro → **Qué hay en esta sección** (4 subgrupos con foto) → **¿Cuál es para ti?** (pregunta de necesidad → producto con foto y precio) → **Todos los productos** → **Te recomendamos** (1 producto con 3 checks) → confianza → banner de pago + WhatsApp → **Otras categorías** → pie. Entretenimiento, con 1 solo producto, lleva un banner de "Partidos y series" en vez de subgrupos y lista.
  - Recomendados: Hogar → cepillo 7 en 1; Salud → café; Carro y moto → CarPlay; Entretenimiento → proyector.
  - El `templateSuffix` ya quedó puesto en las 4 categorías y el tema ya está publicado, así que las sub-landings están en vivo.
  - Las 4 plantillas se arman con `herramientas/plantillas-categorias.mjs` (`node … <carpeta>` genera las 4 `collection.*.json`). Respaldos en `respaldos/2026-10-23-*.json`.
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
  - **Versión v4, estilo café (2026-10-29), en el tema de prueba `182115893495`, sin publicar.**
    - Samuel pidió organizarla como la del café, con imágenes una debajo de la otra. Como tenía demasiado contenido, pidió que la parte de arriba "se pueda mover" e imágenes nuevas, y que los videos quedaran en una fila donde "se reproducen todos".
    - Arriba: **7 fotos que se pasan con el dedo**, con puntos y un contador "1/7". En computador lleva flechas.
      - Fotos: hero-impacto, de-pie, kit, antes-después, juntas, estufa y esponja.
      - Se activa con la opción nueva `carrusel` de la sección `tovelya-cepillo-v2-hero`, más `miniatura_5` y `miniatura_6`. Viene apagada por defecto, así que las otras landings no cambian.
    - Después: confianza, y luego la **fila de 5 videos que se reproducen todos a la vez** (sin sonido; cada uno tiene botón de sonido) con tarjetas angostas de 168 px.
      - Usa la opción nueva `reproducir_todos` de `tovelya-cepillo-v2-encasa`, también apagada por defecto.
    - **8 banners 4:5** con colores originales (`PALETA=tovelya`) y un botón cada 2 imágenes.
      - Banners: `tovelya-cepillo-b1-de-pie` … `b8-pago`.
      - 6 fotos nuevas con Codex desde la foto real del kit: `tovelya-cepillo-v4-de-pie`, `-kit`, `-juntas`, `-estufa`, `-recargable` y `-entrega`. Prompts en `herramientas/prompts-cepillo-2026-10-29.md`, banners con `herramientas/banners-cepillo-2026-10-29.sh`.
    - Al final: formulario, cierre, pie y barra.
    - Quedaron ocultas, no borradas: cabezales, beneficios, comparativa, datos, oferta, pasos, cómo pedir, garantía, packs y preguntas.
    - Se arma con `herramientas/plantilla-cepillo-v4.mjs`. Las secciones modificadas están en `herramientas/seccion-tovelya-cepillo-v2-hero.liquid` y `-encasa.liquid`. Respaldos del antes y del después en `respaldos/2026-10-29-product.cepillo-v2-*.json`.
    - Probado en celular el 2026-10-29: el carrusel se desliza, los 5 videos se reproducen y el formulario de EasySell carga.
    - **Pendiente de decidir con Samuel:** el precio sigue mostrando "-28%", tachado $179.900 y "Ahorra $50.000" (valores por defecto de la sección, igual que en vivo). Según la regla de no inventar descuentos, solo se puede dejar si el cepillo de verdad se vendió a $179.900.
  - Galería del producto (en vivo): se agregaron 7 fotos v3 y se quitó la `10-oferta-final` porque decía "$119.900 pago anticipado", que contradice "no pagas nada ahora" (el archivo sigue en Files).
- **Café con colágeno (nuevo, 2026-10-21)**: producto de **Dropi** (ID 2214172), no de Premier. Dropi pide inicio de sesión; Samuel mandó la foto del proveedor: **Natura Trends "Coffee + Colágeno", tarro de 400 g, ~13 porciones**, "alimento en polvo a base de crema de coco adicionado con vitaminas y minerales con colágeno y café soluble". La foto del proveedor dice "+ Obsequio" pero no se sabe qué regalo es: no se promete.
  - Producto en Shopify: `gid://shopify/Product/10157413269751` (handle `cafe-con-colageno-coffee-colageno-400-g`), variante `51377169793271`, SKU `TOV-CAFE-COLAGENO-400`. **ACTIVO y publicado desde el 2026-10-21** (lo pidió Samuel) en Tienda online, Facebook & Instagram y TikTok: https://tovelya-store.myshopify.com/products/cafe-con-colageno-coffee-colageno-400-g. Se comprobó que el botón de pedir abre el formulario de EasySell. Costos en Dropi (2026-10-21): x1 $23.900 (ID 2326220), x2 $47.800 (2326221), x3 $71.700 (2326222), x5 $119.500 (2326223). Samuel pidió calcular con **$30.000 de envío y $15.000 de publicidad por pedido** (+$2.000 de otros, como en la fórmula de la tienda, sobre 0,75). Resultado: x1 **$99.900** (se deja igual; ganancia ≈ $29.000), x2 $129.900 (≈ $35.100), x3 $159.900 (≈ $41.200), x5 $229.900 (≈ $63.400). Esa propuesta quedó reemplazada por los packs de abajo. Si cambia el precio, hay que cambiarlo también en la plantilla (el texto "$99.900" y "unos $7.700 por taza" están escritos a mano).
  - 12 fotos `tovelya-cafe-*.jpg` en Files: 6 con el tarro real (de referencia la foto del proveedor; la etiqueta salió fiel) y 6 de estilo de vida sin empaque. Las 6 del tarro están en la galería del producto.
  - Landing: plantilla `product.cafe-colageno` (en el tema publicado `181838774519`, en vivo), hecha con las mismas secciones `tovelya-cepillo-v2-*` cambiando los colores a blanco, café y caramelo (estilo Apple, pedido por Samuel). Botones naranja y confianza azul como en las demás. No tiene precio tachado inventado: el ancla es "unos $7.700 por taza". No tiene preguntas frecuentes.  - **Versión visual (2026-10-22, sin publicar)** en el tema `Tovelya - café colágeno con bono (prueba)` (`gid://shopify/OnlineStoreTheme/181906309367`). Samuel dijo que había "demasiado texto" y pidió más imágenes con texto. Quedó: cabecera, inicio corto, confianza, **7 banners** con el texto dentro (`tovelya-cafe-b1…b7.jpg`, hechos con `herramientas/banner.sh`: foto arriba y panel crema con Inter Display) con 3 botones de pedido entre ellos (sección nueva `sections/tovelya-imagenes.liquid`, copia en `herramientas/`), pedido, cierre y barra. Se quitaron las secciones de texto (datos, beneficios, bono, pasos, momentos, comparativa, cómo pedir, garantía, preguntas).
  - Ese tema de prueba lo creó **otra sesión** el 2026-10-22 con un **"bono de $20.000"** y el precio tachado "$119.900" (precio sin bono). Se quitó, porque el tarro nunca se vendió a $119.900 y un descuento inventado se puede ver como publicidad engañosa. Respaldo completo de esa versión en `respaldos/2026-10-22-product.cafe-colageno-con-bono-otra-sesion.json`. El tema de prueba también tiene el cepillo igual al que está en vivo, así que publicarlo no lo daña.
  - **Packs por cantidad (2026-10-23, pedidos por Samuel: "si llevas 2 o 3… cada vez más económico")**:
    - Variantes en Shopify, **en vivo**, con la opción "Cantidad":

      | Pack | Precio | Costo Dropi | Variante | Ganancia aprox. |
      |---|---|---|---|---|
      | 1 tarro | $99.900 | $23.900 | 51377169793271 | ≈ $29.000 |
      | 2 tarros | $139.900 | $47.800 | 51389326754039 | ≈ $45.100 |
      | 3 tarros | $169.900 | $71.700 | 51389326786807 | ≈ $51.200 |
      | 5 tarros | $239.900 | $119.500 | 51389326819575 | ≈ $73.400 |

      Las ganancias son con $30k de envío, $15k de publicidad y $2k de otros; el envío de 5 tarros puede salir más caro. Dropi no tiene pack de 4.
    - SKUs `TOV-CAFE-COLAGENO-400`, `-X2`, `-X3` y `-X5`, sin control de inventario.
    - Fotos: `tovelya-cafe-pack-x2/x3/x5.jpg`, hechas con Codex desde la foto real del tarro (`herramientas/generar-packs-cafe.sh`).
    - Landing: en el tema de prueba `181911585015` se agregó la sección `packs` (`tovelya-cepillo-v2-packs`, ancla `#packs`) antes del formulario.
      - Muestra el precio "por separado" y "Ahorras": es el precio real de 1 tarro × cantidad, no un descuento inventado. El 3 dice "Recomendado" y el 5 "Mejor precio".
      - Los botones del inicio, los banners y la barra dicen "Elegir mi pack" y llevan a `#packs`.
      - Se arma con `herramientas/plantilla-packs-cafe.mjs`. Respaldo en `respaldos/2026-10-23-product.cafe-colageno-packs.json`.
      - **Sin publicar.**
    - **Ojo:** el formulario de EasySell no muestra selector de variante, así que cada botón de pack abre el formulario con 1 tarro. Para que el pedido llegue con el pack correcto, Samuel tiene que crear en EasySell las ofertas por cantidad con los mismos precios. Si no, la cantidad hay que confirmarla por WhatsApp.
  - Es alimento: no prometer resultados de salud ni de belleza (INVIMA y Meta lo prohíben). El texto habla de sabor, preparación, rendimiento y lo que dice la etiqueta.
- **Pantalla CarPlay para moto** (`/products/pantalla-carplay-para-moto`, variante 51219372933367, plantilla `product.carplay-para-moto`).
  - **Precio, cambiado en vivo el 2026-10-23:** pasó de $229.900 a **$179.900** (Samuel: "me sale a 100, ponlo en 180").
    - Costo registrado en Shopify: $100.000.
    - Con $30.000 de envío y $15.000 de publicidad quedan unos $35.000 por venta.
    - No tiene precio tachado.
  - **Landing nueva, en el tema `181906309367` (en vivo desde el 2026-10-23):**
    - Mismo estándar que el café, con los **colores originales** (azul marino y verde azulado).
    - Estructura:
      - Inicio con la foto `tovelya-carplay-v2-hero.jpg`, 3 checks, precio y botón.
      - Confianza.
      - **6 banners** `tovelya-carplay-b1…b6.jpg`, hechos con `PALETA=tovelya herramientas/banner.sh`, con 3 botones de pedido entre ellos.
      - Formulario de pedido, cierre, pie y barra fija.
    - El botón abre EasySell (probado).
    - **Videos (2026-10-23)**: 3 videos reales que mandó Samuel, comprimidos con ffmpeg y subidos como archivos de Shopify: `tovelya-carplay-video-funciones.mp4`, `-llamadas-gps.mp4` e `-instalacion.mp4`.
      - En la landing van en un carrusel (sección `tovelya-cepillo-v2-encasa`, "Así se ve en la moto") justo después de la confianza.
      - También quedaron en la galería del producto, ya en vivo.
      - Se suben con `stagedUploadsCreate` resource VIDEO + POST multipart (GoogleAccessId, key, policy, signature, file) y luego `fileCreate` contentType VIDEO.
      - Uno es de un creador ("Yahir Arévalo"): ojo con los derechos si se usa en anuncios.
    - La plantilla vieja (sección `tovelya-landing` con las fotos `tovelya-carplay-moto-*.webp`) sigue en el tema en vivo hasta que se publique.
    - Se hace con `herramientas/plantilla-carplay-v2.mjs`; las fotos, con `herramientas/generar-carplay.sh`.
    - Respaldo de la plantilla: `respaldos/2026-10-23-product.carplay-para-moto-v2.json`.
  - **Textos:**
    - Siempre "con la moto detenida".
    - No se promete resistencia al agua.
    - Se ofrece confirmar por WhatsApp la compatibilidad con el celular y la moto.
- Otros productos activos con landing: trapero, bomba de vacío, compresor/arrancador, mini proyector, inflador 4 en 1, hidrolavadora, camisilla térmica, faja, soporte térmico de hombro, chaleco postural, CarPlay para moto, traje impermeable, báscula, trampolín, robot limpiador, cepillo de cocina, monitor TPMS, peluche de Jesús (rojo/azul).
- Peluche de Jesús: las imágenes nuevas se generan con los prompts de `assets/products/peluche-jesus/landing/PROMPTS-CODEX.md`. Cuando estén en `.../landing/generated/`, se suben con `shopify/deploy-peluche-jesus-images.py`.

## Campaña de Meta del cepillo
- Cuenta "Tovelya Ads". Campaña `TOV | Ventas | Cepillo eléctrico | Prueba`, presupuesto de campaña $20.000/día, Advantage+.
- **Apagada desde el 2026-10-13**: la cuenta tiene **saldo pendiente sin pagar** y Meta dejó de entregar. Samuel tiene que pagarlo.
- El conector de Meta (MCP) todavía no está habilitado para esa cuenta. Se volvió a revisar el 2026-10-23: Meta responde "se está habilitando poco a poco". Ese mismo día la cuenta salía ACTIVA y con método de pago. Las otras dos cuentas que ve el conector no son de Tovelya: `2193609430978035` es la personal, con publicaciones de Marketplace, y `AllDrop`. No crear campañas de Tovelya ahí.
- 2026-10-23: Samuel pidió una campaña CBO de $20.000/día para la pantalla CarPlay, copiando la estructura de la del cepillo, desde el 2026-10-24 a las 5. No se pudo crear desde la nube porque el conector no tiene permiso en Tovelya Ads y la extensión Claude in Chrome no está conectada a la sesión. Se le dieron los pasos para duplicarla él mismo en el Administrador de anuncios. Chrome no tenía la sesión de Facebook abierta.
- Datos de Shopify del 1 al 19 de octubre: 478 visitas a la landing → 87 empezaron el pedido → 9 pedidos → 6 válidos (3 anulados). Del 5 al 8 de octubre hubo 214 visitas de anuncios y 0 pedidos (causa sin revisar).
- Anuncio ganador según los UTM: `cepillo-video-ducha`.
- **Resultados en Shopify del 2026-10-24 al 2026-10-28** (revisado el 2026-10-28; Meta sigue sin dar acceso a la cuenta, así que el gasto no se vio):

  | Producto | Visitas desde redes | Pedidos | Fechas | Precio |
  |---|---|---|---|---|
  | Cepillo | 72 | 6 | #1017–#1020, #1022, #1023 | $129.900 |
  | Pantalla CarPlay | 40 | 3 | #1021, #1024, #1025; tres clientes distintos | $179.900 |

  - Las 9 llegaron por el formulario de EasySell, todas el 24 y el 25 de octubre.
  - El #1016 (2026-10-23) fue la prueba y quedó anulado.
  - **Desde el 2026-10-26 no hay ni una visita desde redes ni un pedido.** Hay que revisar si los anuncios se frenaron por el pago o por otra cosa.
  - Lo máximo que se puede gastar en publicidad por cada pedido que entra, aproximado: cepillo unos $27.000 (meta ≤ $18.000) y CarPlay unos $30.000 (meta ≤ $20.000).
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
