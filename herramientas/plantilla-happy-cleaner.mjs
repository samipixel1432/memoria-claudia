// Plantilla product.happy-cleaner: landing del Happy Cleaner, mix de frutas sabor sandía (estándar del café, colores
// originales). Es un alimento: el texto habla de sabor, preparación y lo que dice la etiqueta, sin promesas de salud.
// Fotos deslizables arriba, confianza, 8 banners con un botón cada 2, formulario, cierre y barra.
// Uso: node plantilla-happy-cleaner.mjs <salida.json>
import { writeFileSync } from 'node:fs';
const img = (f) => `shopify://shop_images/${f}`;
const PRECIO = '$79.900';
const VARIANTE = '51858274550007';
const AVISO = 'Este producto no es un medicamento. Su consumo es responsabilidad de quien lo recomienda y de quien lo usa.';
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
        h1: { type: 'check', settings: { texto: 'Sabor sandía, rico y refrescante' } },
        h2: { type: 'check', settings: { texto: 'Con fibra e inulina' } },
        h3: { type: 'check', settings: { texto: 'Unas 25 porciones, con copa dosificadora' } }
      },
      block_order: ['h1', 'h2', 'h3'],
      settings: {
        carrusel: true,
        etiqueta_carrusel: 'Fotos del Happy Cleaner',
        imagen: img('tovelya-happy-vaso.jpg'),
        miniatura_1: img('tovelya-happy-catalogo.jpg'),
        miniatura_2: img('tovelya-happy-manana.jpg'),
        miniatura_3: img('tovelya-happy-preparar.jpg'),
        miniatura_4: img('tovelya-happy-porciones.jpg'),
        miniatura_5: img('tovelya-happy-oficina.jpg'),
        miniatura_6: img('tovelya-happy-mezclar.jpg'),
        eyebrow: 'Happy Cleaner · Mix de frutas sabor sandía · 250 g',
        titulo: 'Tu bebida de sandía <em>para cada mañana</em>',
        mostrar_valoracion: false,
        etiqueta_ahorro: '',
        etiqueta_confianza: 'Pagas al recibir',
        entradilla: 'Una copa en un vaso de agua fría, revuelves y listo.',
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
        img_1: banner('tovelya-happy-b1-sabor.jpg', 'Un vaso rosado, rico y refrescante'),
        img_2: banner('tovelya-happy-b2-facil.jpg', 'Una copa en agua, revuelves y listo'),
        btn_1: boton('Lo quiero', 'Pagas al recibir · Envío gratis'),
        img_3: banner('tovelya-happy-b3-trae.jpg', 'Lo que trae cada tarro: fibra e inulina, sabor a sandía, copa dosificadora de 10 g y unas 25 porciones'),
        img_4: banner('tovelya-happy-b4-manana.jpg', 'Empieza el día con algo rico'),
        btn_2: boton('Pedir mi tarro', 'No pagas nada ahora'),
        img_5: banner('tovelya-happy-b5-pasos.jpg', 'Cómo se prepara: sirve una copa, agrega agua fría y disfrútalo'),
        img_6: banner('tovelya-happy-b6-porciones.jpg', '25 porciones en un solo tarro'),
        btn_3: boton('Lo quiero', 'Pagas al recibir · Envío gratis'),
        img_7: banner('tovelya-happy-b7-oficina.jpg', 'En la casa o en la oficina'),
        img_8: banner('tovelya-happy-b8-pago.jpg', 'No pagas nada hasta recibirlo'),
        btn_4: boton('Pedir contra entrega', 'Pagas al recibir · Envío gratis · Te confirmamos por WhatsApp')
      },
      block_order: ['img_1', 'img_2', 'btn_1', 'img_3', 'img_4', 'btn_2', 'img_5', 'img_6', 'btn_3', 'img_7', 'img_8', 'btn_4'],
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
        titulo: 'Tu vaso de sandía, <em>todos los días</em>',
        precio: PRECIO,
        precio_anterior: '',
        aria_precio_anterior: '',
        ahorro: '',
        nota_precio: AVISO,
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
