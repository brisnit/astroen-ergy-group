// Converts PNG/JPG originals in src/assets/lifestyle/ into real WebP files with the canonical
// .webp names the site expects. Usage: npm run images:webp
import { readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const dir = path.resolve('src/assets/lifestyle');
const files = await readdir(dir);
let converted = 0;
for (const name of files) {
  const ext = path.extname(name).toLowerCase();
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;
  const target = path.join(dir, path.basename(name, path.extname(name)) + '.webp');
  if (existsSync(target)) {
    console.log(`skip  ${name} (WebP already exists)`);
    continue;
  }
  const info = await sharp(path.join(dir, name)).rotate().webp({ quality: 86, effort: 5 }).toFile(target);
  console.log(`made  ${path.basename(target)} (${info.width}×${info.height}, ${Math.round(info.size / 1024)} KB)`);
  converted++;
}
console.log(converted ? `${converted} file(s) converted. You can delete the PNG/JPG originals.` : 'Nothing to convert.');
