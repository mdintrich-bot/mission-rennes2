import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Load .env
function loadEnv() {
  const envPath = path.join(projectRoot, '.env');
  if (!fs.existsSync(envPath)) {
    console.error("Fichier .env introuvable");
    process.exit(1);
  }
  const content = fs.readFileSync(envPath, 'utf8');
  const env = {};
  content.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      let val = trimmed.slice(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      env[key] = val;
    }
  });
  return env;
}

const env = loadEnv();
const username = env.IUT_USER || 'e21026u';
const password = env.IUT_PASS;
const authHeader = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');

function downloadFile(urlStr, destPath) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlStr);
    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      headers: {
        'Authorization': authHeader,
        'User-Agent': 'Mozilla/5.0'
      },
      rejectUnauthorized: false
    };

    const file = fs.createWriteStream(destPath);
    https.get(options, (res) => {
      if (res.statusCode !== 200) {
        file.close();
        if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
        return reject(new Error(`HTTP ${res.statusCode} sur ${urlStr}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(true));
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      reject(err);
    });
  });
}

async function main() {
  const pages = JSON.parse(fs.readFileSync(path.join(projectRoot, 'wp-pages.json'), 'utf8'));
  const imagesDir = path.join(projectRoot, 'public', 'portfolio-images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  // Collect all unique image URLs from all pages
  const imgSet = new Set();
  pages.forEach(p => {
    const matches = [...p.content.rendered.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)];
    matches.forEach(m => {
      const url = m[1];
      if (url.includes('webetu.iutnc.univ-lorraine.fr') && !url.includes('spinner.svg')) {
        imgSet.add(url);
      }
    });
  });

  console.log(`Trouvé ${imgSet.size} images uniques sur WordPress.`);

  const urlToLocal = {};
  for (const imgUrl of imgSet) {
    try {
      const urlObj = new URL(imgUrl);
      const originalName = path.basename(urlObj.pathname);
      // clean name
      const safeName = decodeURIComponent(originalName).replace(/[^a-zA-Z0-9._-]/g, '_');
      const dest = path.join(imagesDir, safeName);
      
      console.log(`Téléchargement de : ${safeName} (${imgUrl})...`);
      await downloadFile(imgUrl, dest);
      urlToLocal[imgUrl] = `./portfolio-images/${safeName}`;
      console.log(`✓ Sauvegardé -> ./portfolio-images/${safeName}`);
    } catch (err) {
      console.error(`✗ Erreur pour ${imgUrl} :`, err.message);
    }
  }

  // Save url mapping
  fs.writeFileSync(path.join(projectRoot, 'scripts', 'url-map.json'), JSON.stringify(urlToLocal, null, 2));
  console.log("Mapping des URLs sauvegardé dans scripts/url-map.json");
}

main().catch(console.error);
