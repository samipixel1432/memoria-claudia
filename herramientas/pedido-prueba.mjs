// Pedido de prueba en el formulario de EasySell (pago contra entrega).
// Uso: node pedido.mjs <url> <carpeta> [enviar]
// Sin "enviar" solo llena el formulario y toma fotos; con "enviar" además toca el botón final.
import pw from '/opt/node22/lib/node_modules/playwright/index.js';
const { chromium } = pw;
const [url, dir, enviar] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch());
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
await page.goto(url, { waitUntil: 'load', timeout: 90000 });
await page.waitForTimeout(4000);
const disparador = page.getByText(/PEDIR AHORA/i).first();
await disparador.waitFor({ state: 'attached', timeout: 60000 });
console.log('disparador:', await disparador.evaluate((e) => e.outerHTML.slice(0, 200)));
await disparador.scrollIntoViewIfNeeded();
await disparador.click({ force: true });
await page.waitForTimeout(6000);
const lista = () => page.evaluate(() => [...document.querySelectorAll('input, select, textarea, button')]
  .filter((e) => e.offsetParent !== null)
  .map((e) => ({ tag: e.tagName, type: e.type, name: e.name, ph: e.placeholder, text: (e.innerText || '').trim().slice(0, 50), opts: e.tagName === 'SELECT' ? [...e.options].slice(0, 4).map((o) => o.text) : undefined })));
console.log('CAMPOS', JSON.stringify(await lista()));
const llenar = async (ph, valor) => { const c = page.locator(`input[placeholder="${ph}"]:visible, textarea[placeholder="${ph}"]:visible`).first(); if (await c.count()) { await c.fill(valor); console.log('ok', ph); } else console.log('no está', ph); };
await llenar('Eje: Camilo Andres', 'PRUEBA Tovelya');
await llenar('Eje: Rodriguez Lerma', 'NO ENVIAR');
await llenar('Eje: 3045675789', '3232552543');
await llenar('Eje: Calle 45 # 13-25', 'PRUEBA - NO ENVIAR');
await llenar('#Casa / Torre / Apto / Barrio o Referencia', 'PEDIDO DE PRUEBA TOVELYA');
const selects = page.locator('select:visible');
const n = await selects.count();
if (n >= 1) { await selects.nth(0).selectOption({ label: 'Cundinamarca' }).catch(async () => { const o = await selects.nth(0).locator('option').allTextContents(); console.log('deptos', o.slice(0, 40).join(' | ')); }); }
await page.waitForTimeout(5000);
if (n >= 2) { const o = await selects.nth(1).locator('option').allTextContents(); console.log('ciudades', o.slice(0, 6).join(' | ')); let i = o.findIndex((t) => /bogot/i.test(t)); if (i < 1) i = 1; await selects.nth(1).selectOption({ index: i }); console.log('ciudad', o[i].trim()); }
await page.waitForTimeout(1000);
console.log('CAMPOS2', JSON.stringify(await lista()));
await page.screenshot({ path: `${dir}/lleno.png`, fullPage: false });
const form = page.locator('form:visible').first();
if (await form.count()) await form.screenshot({ path: `${dir}/form-completo.png` }).catch(() => {});
if (enviar === 'enviar') {
  const boton = page.locator('button:visible').filter({ hasText: /PEDIR Y PAGAR AL RECIBIR/i }).last();
  console.log('boton final:', await boton.innerText());
  await boton.click();
  await page.waitForTimeout(12000);
  console.log('URL final:', page.url());
  await page.screenshot({ path: `${dir}/resultado.png`, fullPage: false });
}
await browser.close();
