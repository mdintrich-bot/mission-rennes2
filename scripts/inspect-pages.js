import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('wp-pages.json', 'utf8'));

pages.forEach(p => {
  console.log(`\n========================================`);
  console.log(`PAGE [${p.id}]: ${p.title.rendered} (${p.slug})`);
  console.log(`========================================`);
  
  // Extract images
  const imgMatches = [...p.content.rendered.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*alt=["']?([^"'>]*)["']?/gi)];
  console.log('Images trouvées :', imgMatches.map(m => ({ url: m[1], alt: m[2] })));

  // Extract text
  const clean = p.content.rendered
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi, '\n--- $1 ---\n')
    .replace(/<p[^>]*>(.*?)<\/p>/gi, '\n$1\n')
    .replace(/<li[^>]*>(.*?)<\/li>/gi, '  * $1\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, "-")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\n\s+\n/g, '\n\n')
    .trim();

  console.log('Texte :\n', clean);
});
