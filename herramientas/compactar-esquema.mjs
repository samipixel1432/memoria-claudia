// Compacta el {% schema %} de una sección (mismo JSON en una línea) para que el archivo pese menos.
// Uso: node compactar.mjs <entrada.liquid> <salida.liquid>
import { readFileSync, writeFileSync } from 'node:fs';
const [entrada, salida] = process.argv.slice(2);
const s = readFileSync(entrada, 'utf8');
const r = s.replace(/({% schema %}\n)([\s\S]*?)(\n{% endschema %})/, (_, a, json, b) => a + JSON.stringify(JSON.parse(json)) + b);
writeFileSync(salida, r);
console.log(s.length, '->', r.length);
