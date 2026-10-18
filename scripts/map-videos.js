import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('wp-pages.json', 'utf8'));
const p = pages.find(x => x.id === 206);

// Find each pfg-item containing video
const items = p.content.rendered.split('<div class="pfg-item ');
items.slice(1).forEach((item, idx) => {
  const isVideo = item.includes('pfg-item-link--video') || item.includes('youtube.com');
  const titleMatch = item.match(/<h3 class="pfg-item-title">(.*?)<\/h3>/i);
  const title = titleMatch ? titleMatch[1].replace(/&#039;/g, "'").replace(/&amp;/g, '&') : `Item ${idx}`;
  const ytMatch = item.match(/href="(https:\/\/[^"]*youtube\.com[^"]*)"/i);
  const imgMatch = item.match(/<img[^>]+src=["']([^"']+)["']/i);
  const descMatch = item.match(/<p class="pfg-item-description">([\s\S]*?)<\/p>/i);
  
  if (isVideo || ytMatch) {
    console.log(`\n--- PROJET VIDÉO [${idx}]: ${title} ---`);
    console.log('YouTube Link:', ytMatch ? ytMatch[1] : 'N/A');
    console.log('Image / Poster:', imgMatch ? imgMatch[1] : 'N/A');
    console.log('Description:', descMatch ? descMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : 'N/A');
  }
});
