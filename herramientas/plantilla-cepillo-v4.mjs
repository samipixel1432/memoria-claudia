// Plantilla product.cepillo-v2 al estándar del café (2026-10-29): fotos deslizables arriba, fila de videos que se
// reproducen todos a la vez y 8 banners con el texto adentro. Las secciones de texto quedan ocultas, no borradas.
// Uso: node plantilla-cepillo-v4.mjs <plantilla-actual.json> <salida.json>
import { readFileSync, writeFileSync } from 'node:fs';
const [entrada, salida] = process.argv.slice(2);
const t = JSON.parse(readFileSync(entrada, 'utf8').replace(/^\/\*[\s\S]*?\*\/\s*/, ''));
const img = (f) => `shopify://shop_images/${f}`;
const PRECIO = '$129.900';

Object.assign(t.sections.hero.settings, {
  carrusel: true,
  etiqueta_carrusel: 'Fotos del cepillo',
  imagen: img('tovelya-cepillo-v3-hero-impacto.jpg'),
  miniatura_1: img('tovelya-cepillo-v4-de-pie.jpg'),
  miniatura_2: img('tovelya-cepillo-v4-kit.jpg'),
  miniatura_3: img('tovelya-cepillo-v3-antes-despues.jpg'),
  miniatura_4: img('tovelya-cepillo-v4-juntas.jpg'),
  miniatura_5: img('tovelya-cepillo-v4-estufa.jpg'),
  miniatura_6: img('tovelya-cepillo-v3-cab-06-esponja.jpg'),
  entradilla: 'Gira solo y trae palo largo: limpias el piso de la ducha de pie. Incluye 7 cepillos para baño y cocina.'
});

Object.assign(t.sections.encasa.settings, {
  reproducir_todos: true,
  ancho_tarjeta_movil: 168,
  ancho_tarjeta: 220,
  padding_superior_movil: 48,
  padding_inferior_movil: 48,
  entradilla: 'Videos reales del cepillo en ducha, baño y cocina.'
});

const banner = (f, alt) => ({ type: 'imagen', settings: { imagen: img(f), alt } });
const boton = (texto, nota) => ({ type: 'boton', settings: { texto, precio: PRECIO, nota } });
t.sections.imagenes = {
  type: 'tovelya-imagenes',
  blocks: {
    img_1: banner('tovelya-cepillo-b1-de-pie.jpg', 'Limpia de pie, sin arrodillarte'),
    img_2: banner('tovelya-cepillo-b2-gira.jpg', 'Él frota, tú solo lo guías'),
    btn_1: boton('Lo quiero', 'Pagas al recibir · Envío gratis'),
    img_3: banner('tovelya-cepillo-b3-kit.jpg', '7 cepillos, uno para cada cosa'),
    img_4: banner('tovelya-cepillo-b4-juntas.jpg', 'Juntas y esquinas que sí quedan limpias'),
    btn_2: boton('Pedir mi cepillo', 'No pagas nada ahora'),
    img_5: banner('tovelya-cepillo-b5-cocina.jpg', 'Estufa y ollas sin tanto esfuerzo'),
    img_6: banner('tovelya-cepillo-b6-vidrios.jpg', 'Vidrios y espejos con esponja suave'),
    btn_3: boton('Lo quiero', 'Pagas al recibir · Envío gratis'),
    img_7: banner('tovelya-cepillo-b7-recargable.jpg', 'Sin cables mientras limpias'),
    img_8: banner('tovelya-cepillo-b8-pago.jpg', 'No pagas nada hasta recibirlo'),
    btn_4: boton('Pedir contra entrega', 'Pagas al recibir · Envío gratis · Te confirmamos por WhatsApp')
  },
  block_order: ['img_1', 'img_2', 'btn_1', 'img_3', 'img_4', 'btn_2', 'img_5', 'img_6', 'btn_3', 'img_7', 'img_8', 'btn_4'],
  settings: { color_fondo: '#F5F9F8', color_cta_texto: '#0F223B', color_nota: '#52637A' }
};

const visibles = ['topbar', 'cabecera', 'hero', 'confianza', 'encasa', 'imagenes', 'pedido', 'ctafinal'];
const ocultas = ['cabezales', 'beneficios', 'comparativa', 'datos', 'oferta', 'pasos', 'comopedir', 'garantia', 'packs', 'faq'];
for (const k of ocultas) t.sections[k].disabled = true;
for (const k of visibles) delete t.sections[k].disabled;
t.order = [...visibles, ...ocultas, 'footer', 'barracompra'];
const faltan = Object.keys(t.sections).filter((k) => !t.order.includes(k));
if (faltan.length) throw new Error('secciones sin orden: ' + faltan);
writeFileSync(salida, JSON.stringify(t));
console.log(t.order.join(' > '));
