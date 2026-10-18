import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('wp-pages.json', 'utf8'));

pages.forEach(p => {
  const ytMatches = [...p.content.rendered.matchAll(/(https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)[^\s"'>]+)/gi)];
  const videoMatches = [...p.content.rendered.matchAll(/<video[^>]+src=["']([^"']+)["']/gi)];
  const iframeMatches = [...p.content.rendered.matchAll(/<iframe[^>]+src=["']([^"']+)["']/gi)];

  if (ytMatches.length || videoMatches.length || iframeMatches.length) {
    console.log(`\n========================================`);
    console.log(`PAGE [${p.id}]: ${p.title.rendered}`);
    console.log(`========================================`);
    ytMatches.forEach(m => console.log('YouTube URL:', m[1]));
    videoMatches.forEach(m => console.log('Video tag URL:', m[1]));
    iframeMatches.forEach(m => console.log('Iframe src:', m[1]));
  }
});
