// Uso: node captura.mjs <url> <salida-prefijo>
import pw from '/opt/node22/lib/node_modules/playwright/index.js';
const { chromium } = pw;

const [url, out] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch());
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true });
await page.goto(url, { waitUntil: 'load', timeout: 90000 });
await page.waitForTimeout(3000);
// Baja despacio para que carguen las imágenes diferidas
for (let y = 0; y < 20000; y += 600) { await page.evaluate(v => window.scrollTo(0, v), y); await page.waitForTimeout(250); }
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(1000);
const imgs = await page.$$eval('img', els => els.map(e => e.currentSrc || e.src).filter(s => s.includes('cepillo-v3')).length);
console.log('imagenes v3 en la pagina:', imgs);
await page.screenshot({ path: `${out}-arriba.png` });
await page.screenshot({ path: `${out}-completa.png`, fullPage: true });
await browser.close();
