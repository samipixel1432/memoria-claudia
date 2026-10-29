// Plantilla product.limpiador-vidrio: landing del limpiador de vidrios con líquido (estándar del café, colores originales).
// Fotos deslizables arriba, confianza, 12 banners con texto (3 de antes y después, beneficios y pasos) y un botón
// cada 2, formulario, cierre y barra.
// Uso: node plantilla-limpiador-vidrio.mjs <salida.json>
import { writeFileSync } from 'node:fs';
const img = (f) => `shopify://shop_images/${f}`;
const PRECIO = '$69.900';
const VARIANTE = '51602091278583';
const banner = (f, alt) => ({ type: 'imagen', settings: { imagen: img(f), alt } });
const boton = (texto, nota) => ({ type: 'boton', settings: { texto, precio: PRECIO, nota } });
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
        h1: { type: 'check', settings: { texto: 'Trae el líquido adentro: presionas y listo' } },
        h2: { type: 'check', settings: { texto: 'Quita la película grasosa y las manchas de agua' } },
        h3: { type: 'check', settings: { texto: 'Parabrisas, ventanas y espejos' } }
      },
      block_order: ['h1', 'h2', 'h3'],
      settings: {
        carrusel: true,
        etiqueta_carrusel: 'Fotos del limpiador de vidrios',
        imagen: img('tovelya-vidrio-parabrisas.jpg'),
        miniatura_1: img('tovelya-vidrio-antes-despues.jpg'),
        miniatura_2: img('tovelya-vidrio-catalogo.jpg'),
        miniatura_3: img('tovelya-vidrio-retrovisor.jpg'),
        miniatura_4: img('tovelya-vidrio-boton.jpg'),
        miniatura_5: img('tovelya-vidrio-noche.jpg'),
        miniatura_6: img('tovelya-vidrio-mano.jpg'),
        eyebrow: 'Limpiador de vidrios · 120 ml de líquido incluido',
        titulo: 'Vidrios del carro <em>limpios y sin grasa</em>',
        mostrar_valoracion: false,
        etiqueta_ahorro: '',
        etiqueta_confianza: 'Pagas al recibir',
        entradilla: 'Presionas, frotas y enjuagas. Así de fácil.',
        precio: PRECIO,
        precio_anterior: '',
        aria_precio_anterior: '',
        ahorro: '',
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
        c3: { type: 'item', settings: { icono: 'chat', titulo: 'Te confirmamos', subtitulo: 'Por WhatsApp antes de enviar' } },
        c4: { type: 'item', settings: { icono: 'escudo', titulo: 'Compra respaldada', subtitulo: 'Según nuestras políticas' } }
      },
      block_order: ['c1', 'c2', 'c3', 'c4'],
      settings: {}
    },
    imagenes: {
      type: 'tovelya-imagenes',
      blocks: {
        img_1: banner('tovelya-vidrio-b1-claro.jpg', 'Ve la calle claro, sin grasa en el vidrio'),
        img_2: banner('tovelya-vidrio-b8-antes-parabrisas.jpg', 'Antes y después del parabrisas'),
        btn_1: boton('Lo quiero', 'Pagas al recibir · Envío gratis'),
        img_3: banner('tovelya-vidrio-b11-beneficios.jpg', 'Quita la película grasosa, borra las manchas de agua, trae 120 ml de líquido y cabe en la guantera'),
        img_4: banner('tovelya-vidrio-b2-facil.jpg', 'Presionas y el líquido sale solo'),
        btn_2: boton('Pedir mi limpiador', 'No pagas nada ahora'),
        img_5: banner('tovelya-vidrio-b12-pasos.jpg', 'Cómo se usa: presiona, frota el vidrio y enjuaga con agua'),
        img_6: banner('tovelya-vidrio-b3-parabrisas.jpg', 'Parabrisas sin película grasosa'),
        btn_3: boton('Lo quiero', 'Pagas al recibir · Envío gratis'),
        img_7: banner('tovelya-vidrio-b9-antes-retrovisor.jpg', 'Antes y después del retrovisor'),
        img_8: banner('tovelya-vidrio-b4-espejos.jpg', 'Espejos sin manchas de agua'),
        btn_4: boton('Pedir mi limpiador', 'No pagas nada ahora'),
        img_9: banner('tovelya-vidrio-b10-antes-ventana.jpg', 'Antes y después de la ventana'),
        img_10: banner('tovelya-vidrio-b5-noche.jpg', 'Maneja de noche y con lluvia viendo mejor'),
        btn_5: boton('Lo quiero', 'Pagas al recibir · Envío gratis'),
        img_11: banner('tovelya-vidrio-b6-tamano.jpg', 'Cabe en la guantera'),
        img_12: banner('tovelya-vidrio-b7-pago.jpg', 'No pagas nada hasta recibirlo'),
        btn_6: boton('Pedir contra entrega', 'Pagas al recibir · Envío gratis · Te confirmamos por WhatsApp')
      },
      block_order: ['img_1', 'img_2', 'btn_1', 'img_3', 'img_4', 'btn_2', 'img_5', 'img_6', 'btn_3', 'img_7', 'img_8', 'btn_4', 'img_9', 'img_10', 'btn_5', 'img_11', 'img_12', 'btn_6'],
      settings: { color_fondo: '#F5F9F8', color_cta_texto: '#0F223B', color_nota: '#52637A' }
    },
    pedido: {
      type: 'tovelya-cepillo-v2-pedido',
      settings: {
        eyebrow: 'No pagas nada ahora',
        titulo: 'Pídelo hoy y págalo cuando llegue',
        texto: `Solo tu nombre, celular y dirección. Te escribimos por WhatsApp para confirmar antes de enviarlo y pagas ${PRECIO} en efectivo cuando lo tengas en la mano.`,
        texto_boton: `Pedir contra entrega · ${PRECIO}`
      }
    },
    ctafinal: {
      type: 'tovelya-cepillo-v2-ctafinal',
      settings: {
        eyebrow: 'Envío gratis a toda Colombia',
        titulo: 'Vidrios limpios, <em>manejo más tranquilo</em>',
        precio: PRECIO,
        precio_anterior: '',
        aria_precio_anterior: '',
        ahorro: '',
        nota_precio: 'Trae 120 ml de líquido limpiador incorporado.',
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
  order: ['topbar', 'cabecera', 'hero', 'confianza', 'imagenes', 'pedido', 'ctafinal', 'footer', 'barracompra']
};
writeFileSync(process.argv[2], JSON.stringify(t));
console.log('listo');
