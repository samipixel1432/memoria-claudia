// Plantilla product.carplay-v2: landing visual de la pantalla CarPlay para moto (estándar del café, colores originales).
// Uso: node plantilla.mjs <salida.json>
import { writeFileSync } from 'node:fs';
const img = (f) => `shopify://shop_images/${f}`;
const PRECIO = '$179.900';
const VARIANTE = '51219372933367';
const t = {
  sections: {
    topbar: {
      type: 'tovelya-cepillo-v2-topbar',
      blocks: {
        t1: { type: 'mensaje', settings: { texto: '<strong>No pagas nada ahora</strong> · Pagas cuando te llega', solo_escritorio: false } },
        t2: { type: 'mensaje', settings: { texto: 'Envío gratis a toda Colombia', solo_escritorio: true } },
        t3: { type: 'mensaje', settings: { texto: 'Confirmamos tu pedido por WhatsApp', solo_escritorio: true } }
      },
      block_order: ['t1', 't2', 't3'],
      settings: {}
    },
    cabecera: {
      type: 'tovelya-cepillo-v2-cabecera',
      settings: { logo: img('tovelya-logo-horizontal.png'), tamano_logo: 32, tamano_logo_movil: 28, texto_boton: 'Pedir', precio_boton: PRECIO, variant_id: VARIANTE, url_boton: '#pedido', color_fondo: '#FFFFFF' }
    },
    hero: {
      type: 'tovelya-cepillo-v2-hero',
      blocks: {
        h1: { type: 'check', settings: { texto: 'Funciona con Apple CarPlay y Android Auto' } },
        h2: { type: 'check', settings: { texto: 'Mapa, música y llamadas al frente' } },
        h3: { type: 'check', settings: { texto: 'Se instala en el manubrio' } }
      },
      block_order: ['h1', 'h2', 'h3'],
      settings: {
        imagen: img('tovelya-carplay-v2-hero.jpg'),
        miniatura_1: img('tovelya-carplay-v2-ruta.jpg'),
        miniatura_2: img('tovelya-carplay-v2-montaje.jpg'),
        miniatura_3: img('tovelya-carplay-v2-musica.jpg'),
        miniatura_4: img('tovelya-carplay-catalogo.jpg'),
        eyebrow: 'Pantalla para moto · CarPlay y Android Auto',
        titulo: 'Tu ruta al frente, <em>no en el bolsillo</em>',
        mostrar_valoracion: false,
        etiqueta_ahorro: '',
        etiqueta_confianza: 'Pagas al recibir',
        entradilla: 'Conecta tu celular y mira el mapa en el manubrio.',
        precio: PRECIO,
        precio_anterior: '',
        aria_precio_anterior: '',
        ahorro: 'Pago único, sin mensualidades',
        nota_precio: 'No pagas nada ahora · Pagas en efectivo cuando te llega',
        texto_boton: 'Pedir contra entrega',
        precio_boton: PRECIO,
        variant_id: VARIANTE,
        url_boton: '#pedido',
        texto_boton_2: '',
        riesgo_1: 'Pagas al recibir',
        riesgo_2: 'Envío gratis a toda Colombia',
        riesgo_3: 'Confirmamos por WhatsApp',
        metodos_pago: 'Contraentrega, Efectivo',
        tamano_titulo: 56,
        tamano_titulo_movil: 34
      }
    },
    confianza: {
      type: 'tovelya-cepillo-v2-confianza',
      blocks: {
        c1: { type: 'item', settings: { icono: 'billete', titulo: 'Pago al recibir', subtitulo: 'Cero pago adelantado' } },
        c2: { type: 'item', settings: { icono: 'camion', titulo: 'Envío gratis', subtitulo: 'A toda Colombia' } },
        c3: { type: 'item', settings: { icono: 'chat', titulo: 'Te asesoramos', subtitulo: 'Mándanos foto de tu manubrio' } },
        c4: { type: 'item', settings: { icono: 'escudo', titulo: 'Compra respaldada', subtitulo: 'Según nuestras políticas' } }
      },
      block_order: ['c1', 'c2', 'c3', 'c4'],
      settings: {}
    },
    videos: {
      type: 'tovelya-cepillo-v2-encasa',
      blocks: {
        v1: { type: 'clip', settings: { video: 'shopify://files/videos/tovelya-carplay-video-funciones.mp4', nombre: 'Llamadas, música y mapa', detalle: 'Todo en la pantalla del manubrio', sonido: true } },
        v2: { type: 'clip', settings: { video: 'shopify://files/videos/tovelya-carplay-video-llamadas-gps.mp4', nombre: 'Sin sacar el celular', detalle: 'Navega, llama y escucha música', sonido: true } },
        v3: { type: 'clip', settings: { video: 'shopify://files/videos/tovelya-carplay-video-instalacion.mp4', nombre: 'Así se instala', detalle: 'En el manubrio de tu moto', sonido: true } }
      },
      block_order: ['v1', 'v2', 'v3'],
      settings: {
        eyebrow: 'Mírala funcionando',
        titulo: 'Así se ve <em>en la moto</em>',
        entradilla: 'Videos reales de la pantalla instalada y en uso.',
        etiqueta_carrusel: 'Videos de la pantalla en uso',
        padding_superior_movil: 48,
        padding_inferior_movil: 48
      }
    },
    imagenes: {
      type: 'tovelya-imagenes',
      blocks: {
        img_1: { type: 'imagen', settings: { imagen: img('tovelya-carplay-b1-ruta.jpg'), alt: 'Mira el mapa sin sacar el celular' } },
        img_2: { type: 'imagen', settings: { imagen: img('tovelya-carplay-b2-conecta.jpg'), alt: 'Conecta tu celular y listo' } },
        btn_1: { type: 'boton', settings: { texto: 'La quiero', precio: PRECIO, nota: 'Pagas al recibir · Envío gratis' } },
        img_3: { type: 'imagen', settings: { imagen: img('tovelya-carplay-b3-musica.jpg'), alt: 'Tu música y tus llamadas a un toque' } },
        img_4: { type: 'imagen', settings: { imagen: img('tovelya-carplay-b4-montaje.jpg'), alt: 'Va firme en el manubrio' } },
        btn_2: { type: 'boton', settings: { texto: 'Pedir mi pantalla', precio: PRECIO, nota: 'No pagas nada ahora' } },
        img_5: { type: 'imagen', settings: { imagen: img('tovelya-carplay-b5-viaje.jpg'), alt: 'En la ciudad y en carretera' } },
        img_6: { type: 'imagen', settings: { imagen: img('tovelya-carplay-b6-pago.jpg'), alt: 'No pagas nada hasta recibirla' } },
        btn_3: { type: 'boton', settings: { texto: 'Pedir contra entrega', precio: PRECIO, nota: 'Pagas al recibir · Envío gratis · Te confirmamos por WhatsApp' } }
      },
      block_order: ['img_1', 'img_2', 'btn_1', 'img_3', 'img_4', 'btn_2', 'img_5', 'img_6', 'btn_3'],
      settings: { color_fondo: '#F5F9F8', color_cta_texto: '#0F223B', color_nota: '#52637A' }
    },
    pedido: {
      type: 'tovelya-cepillo-v2-pedido',
      settings: {
        eyebrow: 'No pagas nada ahora',
        titulo: 'Pídela hoy y págala cuando llegue',
        texto: `Solo tu nombre, celular y dirección. Te escribimos por WhatsApp para confirmar que funciona con tu celular y tu moto antes de enviarla, y pagas ${PRECIO} en efectivo cuando la tengas en la mano.`,
        texto_boton: `Pedir contra entrega · ${PRECIO}`
      }
    },
    ctafinal: {
      type: 'tovelya-cepillo-v2-ctafinal',
      settings: {
        eyebrow: 'Envío gratis a toda Colombia',
        titulo: 'Rueda con tu ruta <em>siempre a la vista</em>',
        precio: PRECIO,
        precio_anterior: '',
        aria_precio_anterior: '',
        ahorro: 'Pago único, sin mensualidades',
        nota_precio: 'Configura la ruta y la música con la moto detenida.',
        texto_boton: 'Pedir contra entrega',
        precio_boton: PRECIO,
        variant_id: VARIANTE,
        url_boton: '#pedido',
        riesgo_1: 'Pagas al recibir',
        riesgo_2: 'Envío gratis',
        riesgo_3: 'Confirmamos por WhatsApp',
        metodos_pago: 'Contraentrega, Efectivo'
      }
    },
    footer: {
      type: 'tovelya-cepillo-v2-footer',
      blocks: {
        f1: { type: 'enlace', settings: { texto: 'Privacidad', enlace: '/policies/privacy-policy' } },
        f2: { type: 'enlace', settings: { texto: 'Términos', enlace: '/policies/terms-of-service' } },
        f3: { type: 'enlace', settings: { texto: 'Garantía y devoluciones', enlace: '/policies/refund-policy' } }
      },
      block_order: ['f1', 'f2', 'f3'],
      settings: { logo: img('tovelya-logo-white.png') }
    },
    barracompra: {
      type: 'tovelya-cepillo-v2-barracompra',
      settings: { etiqueta: 'Precio final · pagas al recibir', precio: PRECIO, precio_anterior: '', aria_precio_anterior: '', texto_boton: 'Pedir · pago al recibir', variant_id: VARIANTE, url_boton: '#pedido' }
    }
  },
  order: ['topbar', 'cabecera', 'hero', 'confianza', 'videos', 'imagenes', 'pedido', 'ctafinal', 'footer', 'barracompra']
};
writeFileSync(process.argv[2], JSON.stringify(t));
console.log('listo');
