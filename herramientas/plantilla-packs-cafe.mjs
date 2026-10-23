// Agrega la sección de packs (1, 2, 3 y 5 tarros) a la plantilla visual del café, antes del pedido.
// Uso: node plantilla.mjs <plantilla-entrada.json> <salida.json>
import { readFileSync, writeFileSync } from 'node:fs';
const [entrada, salida] = process.argv.slice(2);
const t = JSON.parse(readFileSync(entrada, 'utf8').replace(/^\/\*[\s\S]*?\*\/\s*/, ''));
const img = (f) => `shopify://shop_images/${f}`;
const pack = (imagen, badge, destacado, titulo, precio, separado, ahorro, puntos, texto) => ({
  type: 'pack',
  settings: {
    imagen: img(imagen), badge, estilo_badge: destacado ? 'principal' : 'suave', destacado, titulo, precio,
    precio_anterior: separado, aria_precio_anterior: separado ? `Precio comprando por separado ${separado.replace(/\D/g, '')} pesos` : '',
    ahorro, puntos, texto_boton: texto, precio_boton: precio, variant_id: '51377169793271', url_boton: '#pedido', cantidad: 1, estilo_boton: destacado ? 'principal' : 'fantasma'
  }
});
t.sections.packs = {
  type: 'tovelya-cepillo-v2-packs',
  blocks: {
    p1: pack('tovelya-cafe-tarro-estudio.jpg', '', false, '1 tarro', '$99.900', '', '', '13 tazas aprox.\nPagas al recibir', 'Pedir 1 tarro'),
    p2: pack('tovelya-cafe-pack-x2.jpg', 'Para compartir', false, '2 tarros', '$139.900', '$199.800', 'Ahorras $59.900', '$69.950 por tarro\n26 tazas aprox.\nPagas al recibir', 'Pedir 2 tarros'),
    p3: pack('tovelya-cafe-pack-x3.jpg', 'Recomendado', true, '3 tarros', '$169.900', '$299.700', 'Ahorras $129.800', '$56.633 por tarro\n39 tazas aprox.\nPagas al recibir', 'Pedir 3 tarros'),
    p5: pack('tovelya-cafe-pack-x5.jpg', 'Mejor precio', false, '5 tarros', '$239.900', '$499.500', 'Ahorras $259.600', '$47.980 por tarro\n65 tazas aprox.\nPagas al recibir', 'Pedir 5 tarros')
  },
  block_order: ['p1', 'p2', 'p3', 'p5'],
  settings: {
    eyebrow: 'Entre más llevas, menos pagas por tarro',
    titulo: 'Elige cuántos <em>tarros quieres</em>',
    ancla: 'packs',
    riesgo_1: 'Pago único, no es suscripción',
    riesgo_2: 'Pagas al recibir · Envío gratis',
    color_fondo_1: '#3B2416', color_fondo_2: '#2A1A10', color_acento: '#B5743A', color_texto: '#FFFFFF',
    color_eyebrow: '#E2B98A', color_acento_titulo_2: '#E2B98A', color_tinta: '#1F1611', color_tinta_suave: '#6B5B4E',
    color_linea: '#EADFD3', color_placeholder: '#F6EFE6', color_badge_suave: '#8A5A2B', color_cta_texto: '#2A1A10'
  }
};
const i = t.order.indexOf('pedido');
t.order = t.order.filter((k) => k !== 'packs');
t.order.splice(i, 0, 'packs');
// Los botones del inicio y la barra llevan a elegir el pack primero
t.sections.hero.settings.url_boton = '#packs';
t.sections.hero.settings.texto_boton = 'Elegir mi pack';
t.sections.barracompra.settings.url_boton = '#packs';
t.sections.barracompra.settings.texto_boton = 'Elegir mi pack';
for (const b of ['btn_1', 'btn_2', 'btn_3']) { t.sections.imagenes.blocks[b].settings.enlace = '#packs'; t.sections.imagenes.blocks[b].settings.precio = 'desde $47.980 c/u'; }
t.sections.imagenes.blocks.btn_1.settings.texto = 'Ver packs';
t.sections.imagenes.blocks.btn_2.settings.texto = 'Elegir mi pack';
t.sections.imagenes.blocks.btn_3.settings.texto = 'Elegir mi pack';
t.sections.barracompra.settings.etiqueta = 'Desde $47.980 por tarro · pagas al recibir';
writeFileSync(salida, JSON.stringify(t));
console.log(t.order.join(' > '));
