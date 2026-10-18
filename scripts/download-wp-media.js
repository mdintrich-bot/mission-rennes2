import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

function loadEnv() {
  const envPath = path.join(projectRoot, '.env');
  const content = fs.readFileSync(envPath, 'utf8');
  const env = {};
  content.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx !== -1) {
      let val = trimmed.slice(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      env[trimmed.slice(0, eqIdx).trim()] = val;
    }
  });
  return env;
}

const env = loadEnv();
const authHeader = 'Basic ' + Buffer.from(`${env.IUT_USER}:${env.IUT_PASS}`).toString('base64');

function fetchJson(urlStr) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlStr);
    https.get({
      hostname: url.hostname,
      path: url.pathname + url.search,
      headers: { 'Authorization': authHeader, 'User-Agent': 'Mozilla/5.0' },
      rejectUnauthorized: false
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

function downloadFile(urlStr, destPath) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlStr);
    const file = fs.createWriteStream(destPath);
    https.get({
      hostname: url.hostname,
      path: url.pathname + url.search,
      headers: { 'Authorization': authHeader, 'User-Agent': 'Mozilla/5.0' },
      rejectUnauthorized: false
    }, (res) => {
      if (res.statusCode !== 200) {
        file.close();
        if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
        return resolve(false);
      }
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve(true)));
    }).on('error', err => {
      file.close();
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      resolve(false);
    });
  });
}

async function main() {
  const mediaList = await fetchJson('https://webetu.iutnc.univ-lorraine.fr/www/e21026u/cms/wordpresse_portfolio/wp-json/wp/v2/media?per_page=100');
  console.log(`Trouvé ${mediaList.length} items dans wp/v2/media.`);

  const imagesDir = path.join(projectRoot, 'public', 'portfolio-images');
  for (const m of mediaList) {
    const srcUrl = m.source_url;
    if (!srcUrl) continue;
    const filename = path.basename(new URL(srcUrl).pathname);
    const safeName = decodeURIComponent(filename).replace(/[^a-zA-Z0-9._-]/g, '_');
    const dest = path.join(imagesDir, safeName);
    if (!fs.existsSync(dest)) {
      console.log(`Téléchargement de media supplémentaire: ${safeName}`);
      await downloadFile(srcUrl, dest);
    }
  }
  console.log("Terminé pour tous les médias de wp/v2/media !");
}

main().catch(console.error);
