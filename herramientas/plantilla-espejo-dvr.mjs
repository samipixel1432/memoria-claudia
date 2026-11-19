// Plantilla product.espejo-retrovisor: landing del espejo retrovisor con doble cámara DVR (Dropi 1077944).
// Estándar de Tovelya: fotos deslizables arriba, confianza, 12 banners con un botón cada 2, formulario, cierre y barra.
// Sin videos (el proveedor no mandó) y sin secciones de texto largo. Reemplaza la que hizo otra IA el 2026-11-19.
// Uso: node plantilla-espejo-dvr.mjs <salida.json>
import { writeFileSync } from 'node:fs';
const img = (f) => `shopify://shop_images/${f}`;
const PRECIO = '$119.900';
const VARIANTE = '52225356628215';
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
        h1: { type: 'check', settings: { texto: 'Graba adelante en Full HD 1080p' } },
        h2: { type: 'check', settings: { texto: 'Cámara de reversa con líneas para parquear' } },
        h3: { type: 'check', settings: { texto: 'Se pone sobre tu espejo, sin herramientas' } }
      },
      block_order: ['h1', 'h2', 'h3'],
      settings: {
        carrusel: true,
        etiqueta_carrusel: 'Fotos del espejo retrovisor DVR',
        imagen: img('tovelya-espejo-conductor.jpg'),
        miniatura_1: img('tovelya-espejo-reversa.jpg'),
        miniatura_2: img('tovelya-espejo-catalogo.jpg'),
        miniatura_3: img('tovelya-espejo-placa.jpg'),
        miniatura_4: img('tovelya-espejo-noche.jpg'),
        miniatura_5: img('tovelya-espejo-familia.jpg'),
        miniatura_6: img('tovelya-espejo-caja.jpg'),
        eyebrow: 'Espejo retrovisor · Doble cámara DVR',
        titulo: 'Graba todo lo que pasa <em>adelante y atrás</em>',
        mostrar_valoracion: false,
        etiqueta_ahorro: '',
        etiqueta_confianza: 'Pagas al recibir',
        entradilla: 'Se pone encima de tu espejo y graba la vía. Al dar reversa te muestra la cámara de atrás.',
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
        img_1: banner('tovelya-espejo-b1-graba.jpg', 'Todo lo que pasa queda grabado: cámara de adelante Full HD 1080p'),
        img_2: banner('tovelya-espejo-b2-parqueo.jpg', 'Antes y después: deja de parquear adivinando'),
        btn_1: boton('Lo quiero', 'Pagas al recibir · Envío gratis'),
        img_3: banner('tovelya-espejo-b3-reversa.jpg', 'Líneas de colores para parquear al dar reversa'),
        img_4: banner('tovelya-espejo-b4-placa.jpg', 'La cámara de atrás va encima de tu placa'),
        btn_2: boton('Pedir mi espejo', 'No pagas nada ahora'),
        img_5: banner('tovelya-espejo-b5-noche.jpg', 'Graba también de noche, pantalla de 4,3 pulgadas'),
        img_6: banner('tovelya-espejo-b6-hace.jpg', 'Lo que hace: graba adelante y atrás, guarda el video si hay un golpe, graba en ciclo y vigila el carro parqueado'),
        btn_3: boton('Lo quiero', 'Pagas al recibir · Envío gratis'),
        img_7: banner('tovelya-espejo-b7-pasos.jpg', 'Se instala en 3 pasos: sobre tu espejo, la cámara atrás y al cargador'),
        img_8: banner('tovelya-espejo-b8-familia.jpg', 'Maneja tranquilo con tu familia'),
        btn_4: boton('Pedir mi espejo', 'No pagas nada ahora'),
        img_9: banner('tovelya-espejo-b9-plataforma.jpg', 'Ideal para taxi y plataformas: cada viaje queda grabado'),
        img_10: banner('tovelya-espejo-b10-lluvia.jpg', 'La cámara de atrás aguanta lluvia y lavadas'),
        btn_5: boton('Lo quiero', 'Pagas al recibir · Envío gratis'),
        img_11: banner('tovelya-espejo-b11-caja.jpg', 'Lo que recibes: espejo, cámara de reversa, cable largo y cargador de carro'),
        img_12: banner('tovelya-espejo-b12-pago.jpg', 'No pagas nada hasta recibirlo'),
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
        titulo: 'Maneja tranquilo, <em>todo queda grabado</em>',
        precio: PRECIO,
        precio_anterior: '',
        aria_precio_anterior: '',
        ahorro: '',
        nota_precio: 'Espejo + cámara de reversa + cable + cargador. La memoria microSD no viene incluida.',
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
writeFileSync(process.argv[2], JSON.stringify(t, null, 2) + '\n');
