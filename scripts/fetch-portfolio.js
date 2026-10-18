import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Read .env file manually without extra dependencies
function loadEnv() {
  const envPath = path.join(projectRoot, '.env');
  if (!fs.existsSync(envPath)) {
    console.error("Fichier .env introuvable dans", envPath);
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

if (!password || password === 'votre_mot_de_passe') {
  console.error("Veuillez renseigner un mot de passe valide dans IUT_PASS du fichier .env");
  process.exit(1);
}

const authHeader = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');

function fetchJson(urlStr) {
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

    https.get(options, (res) => {
      let data = '';
      if (res.statusCode === 401) {
        return reject(new Error("401 Unauthorized : Vos identifiants IUT_USER ou IUT_PASS sont incorrects."));
      }
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new Error(`HTTP ${res.statusCode} sur ${urlStr}`));
      }
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch(e) {
          reject(new Error("Erreur de parsing JSON: " + e.message));
        }
      });
    }).on('error', reject);
  });
}

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
        fs.unlinkSync(destPath);
        return reject(new Error(`Failed to download: status ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      reject(err);
    });
  });
}

async function main() {
  console.log("Tentative de connexion à webetu avec le compte :", username);
  
  const postsUrl = `https://webetu.iutnc.univ-lorraine.fr/www/e21026u/cms/wordpresse_portfolio/wp-json/wp/v2/posts?_embed=1&per_page=100`;
  const mediaUrl = `https://webetu.iutnc.univ-lorraine.fr/www/e21026u/cms/wordpresse_portfolio/wp-json/wp/v2/media?per_page=100`;
  const categoriesUrl = `https://webetu.iutnc.univ-lorraine.fr/www/e21026u/cms/wordpresse_portfolio/wp-json/wp/v2/categories?per_page=100`;

  const [posts, media, categories] = await Promise.all([
    fetchJson(postsUrl).catch(err => { console.error("Posts error:", err.message); return []; }),
    fetchJson(mediaUrl).catch(err => { console.error("Media error:", err.message); return []; }),
    fetchJson(categoriesUrl).catch(err => { console.error("Categories error:", err.message); return []; }),
  ]);

  console.log(`Récupéré: ${posts.length} articles, ${media.length} médias, ${categories.length} catégories.`);

  // Create public/projects folder for downloaded images
  const imagesDir = path.join(projectRoot, 'public', 'portfolio-images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  // Create categories map
  const catMap = {};
  categories.forEach(c => {
    catMap[c.id] = c.name;
  });

  // Create media map by ID
  const mediaMap = {};
  media.forEach(m => {
    mediaMap[m.id] = m.source_url;
  });

  const processedProjects = [];

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const title = post.title?.rendered?.replace(/&#8217;/g, "'").replace(/&amp;/g, '&').replace(/&#8211;/g, '-') || 'Projet';
    const postCats = (post.categories || []).map(cid => catMap[cid]).filter(Boolean);
    
    // Find image URL
    let imageUrl = null;
    if (post.featured_media && mediaMap[post.featured_media]) {
      imageUrl = mediaMap[post.featured_media];
    } else if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
      imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
    }

    // If no featured image, check if an image is inside the content HTML
    if (!imageUrl && post.content?.rendered) {
      const match = post.content.rendered.match(/<img[^>]+src=["']([^"']+)["']/i);
      if (match) {
        imageUrl = match[1];
      }
    }

    let localImagePath = null;
    if (imageUrl) {
      try {
        const ext = path.extname(new URL(imageUrl).pathname) || '.jpg';
        const filename = `proj-${post.id}-${post.slug || i}${ext}`;
        const localDest = path.join(imagesDir, filename);
        console.log(`Téléchargement de l'image pour "${title}" :`, imageUrl);
        await downloadFile(imageUrl, localDest);
        localImagePath = `./portfolio-images/${filename}`;
        console.log(` -> Sauvegardé sous public/portfolio-images/${filename}`);
      } catch (err) {
        console.warn(`Impossible de télécharger l'image de ${title}:`, err.message);
      }
    }

    // Clean excerpt / text
    const cleanExcerpt = (post.excerpt?.rendered || post.content?.rendered || '')
      .replace(/<[^>]+>/g, '')
      .replace(/&#8217;/g, "'")
      .replace(/&amp;/g, '&')
      .replace(/&#8211;/g, '-')
      .replace(/&nbsp;/g, ' ')
      .trim();

    processedProjects.push({
      id: post.id,
      title: title,
      slug: post.slug,
      date: post.date,
      categories: postCats.length ? postCats : ['PROJET'],
      category: postCats[0] || 'CRÉATION',
      excerpt: cleanExcerpt,
      contentHtml: post.content?.rendered || '',
      image: localImagePath,
      originalImageUrl: imageUrl,
      link: post.link
    });
  }

  // Save to src/data/portfolio.json
  const dataDir = path.join(projectRoot, 'src', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const outputPath = path.join(dataDir, 'portfolio.json');
  fs.writeFileSync(outputPath, JSON.stringify(processedProjects, null, 2), 'utf8');
  console.log(`\nSuccès ! ${processedProjects.length} projets traités et sauvegardés dans ${outputPath}`);
}

main().catch(err => {
  console.error("Erreur d'exécution :", err.message);
  process.exit(1);
});
