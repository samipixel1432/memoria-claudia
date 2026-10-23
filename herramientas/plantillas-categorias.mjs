// Genera las plantillas de las 4 categorías (sub-landings) con los colores originales de Tovelya
// (azul marino y verde azulado; el café/crema es solo para el café con colágeno).
// Uso: node plantillas-categorias.mjs <carpeta-salida>
// La principal es la sección `tovelya-home-v3` (copia en herramientas/seccion-tovelya-home-v3.liquid).
import { writeFileSync, mkdirSync } from 'node:fs';
const OUT = process.argv[2]; mkdirSync(OUT, { recursive: true });
const img = (f) => `shopify://shop_images/${f}`;
const WA = 'https://wa.me/573232552543?text=Hola%20Tovelya%2C%20quiero%20ayuda%20para%20elegir%20un%20producto.';
const CREMA = '#F5F9F8';
// Paleta original para las secciones tovelya-categoria y tovelya-productos
const PAL = { color_tinta: '#10243F', color_suave: '#52637A', color_acento: '#0A7A6E', color_linea: '#D9E3EA', color_cta_texto: '#0F223B' };

const topbar = {
  type: 'tovelya-cepillo-v2-topbar',
  blocks: {
    t1: { type: 'mensaje', settings: { texto: '<strong>No pagas nada ahora</strong> · Pagas cuando te llega', solo_escritorio: false } },
    t2: { type: 'mensaje', settings: { texto: 'Envío gratis a toda Colombia', solo_escritorio: true } },
    t3: { type: 'mensaje', settings: { texto: 'Confirmamos tu pedido por WhatsApp', solo_escritorio: true } }
  },
  block_order: ['t1', 't2', 't3'],
  settings: {}
};
const cabecera = (texto, url) => ({
  type: 'tovelya-cepillo-v2-cabecera',
  settings: {
    logo: img('tovelya-logo-horizontal.png'), tamano_logo: 32, tamano_logo_movil: 28,
    texto_boton: texto, precio_boton: '', variant_id: '', url_boton: url, color_fondo: '#FFFFFF'
  }
});
const confianza = {
  type: 'tovelya-cepillo-v2-confianza',
  blocks: {
    c1: { type: 'item', settings: { icono: 'billete', titulo: 'Pago al recibir', subtitulo: 'Cero pago adelantado' } },
    c2: { type: 'item', settings: { icono: 'camion', titulo: 'Envío gratis', subtitulo: 'A toda Colombia' } },
    c3: { type: 'item', settings: { icono: 'chat', titulo: 'Confirmación personal', subtitulo: 'Te escribimos antes de despachar' } },
    c4: { type: 'item', settings: { icono: 'escudo', titulo: 'Compra respaldada', subtitulo: 'Según nuestras políticas' } }
  },
  block_order: ['c1', 'c2', 'c3', 'c4'],
  settings: {}
};
const footer = {
  type: 'tovelya-cepillo-v2-footer',
  blocks: {
    f1: { type: 'enlace', settings: { texto: 'Privacidad', enlace: '/policies/privacy-policy' } },
    f2: { type: 'enlace', settings: { texto: 'Términos', enlace: '/policies/terms-of-service' } },
    f3: { type: 'enlace', settings: { texto: 'Garantía y devoluciones', enlace: '/policies/refund-policy' } }
  },
  block_order: ['f1', 'f2', 'f3'],
  settings: { logo: img('tovelya-logo-white.png') }
};
// Banners uno debajo del otro, con botón al final.
const imagenes = (items, boton, extra = {}) => {
  const blocks = {}; const order = [];
  items.forEach(([f, alt, enlace], i) => { blocks[`img_${i + 1}`] = { type: 'imagen', settings: { imagen: img(f), alt, ...(enlace ? { enlace } : {}) } }; order.push(`img_${i + 1}`); });
  if (boton) { blocks.btn = { type: 'boton', settings: boton }; order.push('btn'); }
  return { type: 'tovelya-imagenes', blocks, block_order: order, settings: { color_fondo: CREMA, color_cta_texto: '#0F223B', color_nota: '#52637A', ...extra } };
};
const cierre = imagenes(
  [['tovelya-pago-v2.jpg', 'No pagas nada hasta recibirlo']],
  { texto: 'Escríbenos por WhatsApp', nota: 'Te respondemos y te ayudamos a elegir', enlace: WA },
  { padding_superior_movil: 24, padding_superior: 40 }
);
// Guía de categoría: subgrupos, necesidades y recomendado.
const guia = ({ subs = [], needs = [], rec = null, settings = {} }) => {
  const blocks = {}; const order = [];
  subs.forEach(([f, titulo, texto, enlace], i) => { blocks[`sub_${i + 1}`] = { type: 'subgrupo', settings: { imagen: img(f), titulo, texto, enlace } }; order.push(`sub_${i + 1}`); });
  needs.forEach(([pregunta, producto], i) => { blocks[`nec_${i + 1}`] = { type: 'necesidad', settings: { pregunta, producto } }; order.push(`nec_${i + 1}`); });
  if (rec) { blocks.rec = { type: 'recomendado', settings: rec }; order.push('rec'); }
  return { type: 'tovelya-categoria', blocks, block_order: order, settings: { ...PAL, color_pill: '#CFF5EE', ...settings } };
};
const productos = (s) => ({ type: 'tovelya-productos', settings: { cantidad: 12, ancla: 'productos', texto_boton: 'Ver producto', color_fondo: CREMA, ...PAL, ...s } });

const CATS = {
  hogar: ['tovelya-cat-hogar.jpg', 'Hogar y limpieza', 'Baño, cocina y pisos', '/collections/hogar'],
  salud: ['tovelya-cat-salud.jpg', 'Salud y bienestar', 'Postura, ejercicio y rutina', '/collections/salud'],
  'carro-moto': ['tovelya-cat-carro-moto.jpg', 'Carro y moto', 'Llantas, lluvia y ruta', '/collections/carro-y-moto'],
  entretenimiento: ['tovelya-cat-entretenimiento-pareja.jpg', 'Entretenimiento', 'Cine en casa', '/collections/entretenimiento']
};
const otras = (sin) => guia({
  subs: Object.entries(CATS).filter(([k]) => k !== sin).map(([, v]) => v),
  settings: { eyebrow_subgrupos: 'Sigue explorando', titulo_subgrupos: 'Otras <em>categorías</em>', color_fondo: '#FFFFFF' }
});

const categoria = (clave, { portada, alt, guiaCat, rec, recTitulo, extra = [], productosS = null, boton = ['Ver productos', '#productos'] }) => {
  const sections = {
    topbar,
    cabecera: cabecera(boton[0], boton[1]),
    portada: imagenes([[portada, alt]], { texto: boton[0], nota: 'Pagas al recibir · Envío gratis a toda Colombia', enlace: boton[1] }),
    ...(guiaCat ? { guia: guia(guiaCat) } : {}),
    ...Object.fromEntries(extra),
    ...(productosS ? { productos: productos(productosS) } : {}),
    recomendado: guia({ rec, settings: { titulo_recomendado: recTitulo, color_fondo: '#FFFFFF' } }),
    confianza,
    cierre,
    otras: otras(clave),
    footer
  };
  const order = ['topbar', 'cabecera', 'portada', ...(guiaCat ? ['guia'] : []), ...extra.map(([k]) => k), ...(productosS ? ['productos'] : []), 'recomendado', 'confianza', 'cierre', 'otras', 'footer'];
  writeFileSync(`${OUT}/collection.${clave}.json`, JSON.stringify({ sections, order }, null, 2));
};

categoria('hogar', {
  portada: 'tovelya-cat-hogar-portada-v2.jpg', alt: 'Hogar y limpieza: tu casa limpia sin tanto esfuerzo',
  guiaCat: {
    subs: [
      ['tovelya-cepillo-catalogo.jpg', 'Baño y ducha', 'Restriega baldosas y juntas sin agacharte', '/products/cepillo-electrico-recargable-7-en-1'],
      ['tovelya-cepillococina-catalogo.jpg', 'Cocina', 'Ollas, sartenes y alimentos al vacío', '/products/cepillo-electrico-cocina'],
      ['tovelya-robot-catalogo.jpg', 'Pisos y vidrios', 'Robot y trapero que hacen la fuerza', '/products/robot-limpiador-automatico'],
      ['tovelya-hidrolavadora-catalogo.jpg', 'Afuera y el carro', 'Patio, carro y moto con presión', '/products/hidrolavadora-inalambrica-48v']
    ],
    needs: [
      ['¿Te cansa agacharte a restregar la ducha?', 'cepillo-electrico-recargable-7-en-1'],
      ['¿Las ollas quedan con grasa pegada?', 'cepillo-electrico-cocina'],
      ['¿No tienes tiempo de trapear todos los días?', 'robot-limpiador-automatico'],
      ['¿No alcanzas los vidrios y paredes altas?', 'trapero-electrico-inalambrico'],
      ['¿Quieres lavar el carro o el patio en casa?', 'hidrolavadora-inalambrica-48v'],
      ['¿Se te dañan los alimentos en la nevera?', 'bomba-vacio-alimentos']
    ],
    settings: { color_fondo: '#FFFFFF' }
  },
  productosS: { eyebrow: 'Hogar y limpieza', titulo: 'Todos los <em>productos</em>' },
  recTitulo: 'Si solo vas a llevar <em>uno</em>',
  rec: { producto: 'cepillo-electrico-recargable-7-en-1', etiqueta: 'El más pedido', check_1: '7 cabezales para cada superficie', check_2: 'Mango extensible: limpias de pie', check_3: 'Recargable, sin cables', texto_boton: 'Ver el cepillo 7 en 1' }
});

categoria('salud', {
  portada: 'tovelya-cat-salud-portada-v2.jpg', alt: 'Salud y bienestar: cuídate todos los días',
  guiaCat: {
    subs: [
      ['tovelya-chaleco-catalogo.jpg', 'Postura', 'Te recuerda ir con la espalda derecha', '/products/chaleco-soporte-postural'],
      ['tovelya-hombro-catalogo.jpg', 'Calor y descanso', 'Soporte térmico para el hombro', '/products/soporte-termico-hombro'],
      ['tovelya-trampolin-catalogo.jpg', 'Ejercicio en casa', 'Trampolín, faja y camisilla térmica', '/products/trampolin-2-en-1'],
      ['tovelya-cafe-tarro-estudio.jpg', 'Tu rutina', 'Café con colágeno y báscula', '/products/cafe-con-colageno-coffee-colageno-400-g']
    ],
    needs: [
      ['¿Pasas horas sentado y te encorvas?', 'chaleco-soporte-postural'],
      ['¿Quieres calor en el hombro al final del día?', 'soporte-termico-hombro'],
      ['¿Quieres ver tu peso en el celular?', 'bascula-inteligente-bluetooth'],
      ['¿Quieres hacer ejercicio en casa, con los niños?', 'trampolin-2-en-1'],
      ['¿Buscas ajuste en la cintura al entrenar?', 'faja-waist-trainer'],
      ['¿Entrenas y quieres una camisilla térmica?', 'camisilla-termica-hombre'],
      ['¿Quieres un café práctico para la mañana?', 'cafe-con-colageno-coffee-colageno-400-g']
    ],
    settings: { color_fondo: '#FFFFFF' }
  },
  productosS: { eyebrow: 'Salud y bienestar', titulo: 'Todos los <em>productos</em>' },
  recTitulo: 'El nuevo <em>favorito</em>',
  rec: { producto: 'cafe-con-colageno-coffee-colageno-400-g', imagen: img('tovelya-cafe-tarro-hero.jpg'), etiqueta: 'Nuevo', check_1: 'Café + colágeno + vitaminas', check_2: 'Listo en 1 minuto, sin cafetera', check_3: 'Rinde 13 tazas por tarro', texto_boton: 'Ver el café con colágeno' }
});

categoria('carro-moto', {
  portada: 'tovelya-cat-carro-moto-portada-v2.jpg', alt: 'Carro y moto: listo para cualquier camino',
  guiaCat: {
    subs: [
      ['tovelya-carplay-catalogo.jpg', 'En la moto', 'Tu ruta y tu música en el manubrio', '/products/pantalla-carplay-para-moto'],
      ['tovelya-traje-catalogo.jpg', 'Bajo la lluvia', 'Chaqueta, pantalón y cubrezapatos', '/products/traje-impermeable-lluvia'],
      ['tovelya-tpms-catalogo.jpg', 'Llantas', 'Mira la presión desde el tablero', '/products/monitor-presion-llantas-tpms'],
      ['tovelya-inflador-catalogo.jpg', 'Emergencias', 'Arranca la batería e infla llantas', '/products/inflador-arrancador-portatil-4-en-1']
    ],
    needs: [
      ['¿Sacas el celular en la moto para ver la ruta?', 'pantalla-carplay-para-moto'],
      ['¿Te coge el aguacero en la moto?', 'traje-impermeable-lluvia'],
      ['¿Quieres saber si una llanta está baja?', 'monitor-presion-llantas-tpms'],
      ['¿Te ha dejado tirado la batería?', 'compresor-portatil-arrancador-bateria'],
      ['¿Quieres inflar llantas, bicis y balones?', 'inflador-arrancador-portatil-4-en-1']
    ],
    settings: { color_fondo: '#FFFFFF' }
  },
  productosS: { eyebrow: 'Carro y moto', titulo: 'Todos los <em>productos</em>' },
  recTitulo: 'Si andas en <em>moto</em>',
  rec: { producto: 'pantalla-carplay-para-moto', etiqueta: 'El favorito', check_1: 'Funciona con CarPlay y Android Auto', check_2: 'Ruta, música y llamadas en la pantalla', check_3: 'Se instala frente al manubrio', texto_boton: 'Ver la pantalla para moto' }
});

categoria('entretenimiento', {
  portada: 'tovelya-cat-entretenimiento-portada-v2.jpg', alt: 'Entretenimiento: cine en casa cuando quieras',
  extra: [['planes', imagenes([['tovelya-cat-entretenimiento-partidos-v2.jpg', 'Partidos y series en grande']], { texto: 'Ver el mini proyector', nota: 'Pagas al recibir · Envío gratis', enlace: '/products/mini-proyector-led' }, { padding_superior_movil: 24, padding_superior: 40 })]],
  boton: ['Ver el proyector', '/products/mini-proyector-led'],
  recTitulo: 'Tu plan de <em>cine en casa</em>',
  rec: { producto: 'mini-proyector-led', etiqueta: 'El favorito', check_1: 'Películas, series y partidos en grande', check_2: 'Pequeño: fácil de mover y guardar', check_3: 'Funciona mejor en un espacio oscuro', texto_boton: 'Ver el mini proyector' }
});

console.log('listo');
