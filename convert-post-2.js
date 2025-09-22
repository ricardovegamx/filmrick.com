const fs = require('fs');
const path = require('path');
const https = require('https');
const { JSDOM } = require('jsdom');

// Post #2 specific data
const POST_ID = '159792121';
const POST_SLUG = 'gear-upgrades-revitalizing-my-analog';
const POST_NUMBER = 2;

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete the file async on error
      reject(err);
    });
  });
}

async function convertPost() {
  const htmlFile = path.join(__dirname, 'posts', `${POST_ID}.${POST_SLUG}.html`);
  const html = fs.readFileSync(htmlFile, 'utf8');

  const dom = new JSDOM(html);
  const document = dom.window.document;

  // Create output directory for images
  const imageDir = path.join(__dirname, 'public', 'images', 'stories', POST_NUMBER.toString());
  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
  }

  // Extract content
  let content = '';
  let imageCount = 0;
  let galleryImages = [];

  // Process all elements
  const elements = document.querySelectorAll('p, h2, h4, blockquote, div.captioned-image-container, div.image-gallery-embed');

  for (const element of elements) {
    if (element.tagName === 'P') {
      const text = element.textContent.trim();
      if (text && !text.includes('Subscribe') && !text.includes('Thanks for reading')) {
        content += `${text}\n\n`;
      }
    } else if (element.tagName === 'H2') {
      content += `## ${element.textContent.trim()}\n\n`;
    } else if (element.tagName === 'H4') {
      content += `### ${element.textContent.trim()}\n\n`;
    } else if (element.tagName === 'BLOCKQUOTE') {
      content += `> ${element.textContent.trim()}\n\n`;
    } else if (element.classList.contains('captioned-image-container')) {
      // Single image
      const img = element.querySelector('img');
      const caption = element.querySelector('figcaption');

      if (img) {
        imageCount++;
        const imageUrl = img.src;
        const imageExtension = imageUrl.includes('.heic') ? '.jpg' : '.jpg'; // Convert HEIC to JPG
        const imageName = imageCount === 1 ? 'hero' : `image-${imageCount}`;
        const localImagePath = `/images/stories/${POST_NUMBER}/${imageName}${imageExtension}`;
        const fullImagePath = path.join(imageDir, `${imageName}${imageExtension}`);

        try {
          await downloadImage(imageUrl, fullImagePath);
          console.log(`Downloaded: ${imageName}${imageExtension}`);

          content += `![${caption ? caption.textContent.trim() : `Image ${imageCount}`}](${localImagePath})\n`;
          if (caption) {
            content += `*${caption.textContent.trim()}*\n\n`;
          } else {
            content += '\n';
          }
        } catch (error) {
          console.error(`Failed to download ${imageUrl}:`, error);
        }
      }
    } else if (element.classList.contains('image-gallery-embed')) {
      // Gallery
      const galleryData = JSON.parse(element.dataset.attrs);
      const images = galleryData.gallery.images;
      const galleryCaption = galleryData.gallery.caption;

      content += '<Gallery>\n';

      for (let i = 0; i < images.length; i++) {
        const imageUrl = images[i].src;
        imageCount++;
        const imageName = `gallery-${i + 1}`;
        const localImagePath = `/images/stories/${POST_NUMBER}/${imageName}.jpg`;
        const fullImagePath = path.join(imageDir, `${imageName}.jpg`);

        try {
          await downloadImage(imageUrl, fullImagePath);
          console.log(`Downloaded gallery image: ${imageName}.jpg`);

          content += `  <GalleryImage src="${localImagePath}" alt="Gallery image ${i + 1}" />\n`;
          galleryImages.push(localImagePath);
        } catch (error) {
          console.error(`Failed to download gallery image ${imageUrl}:`, error);
        }
      }

      content += '</Gallery>\n\n';

      if (galleryCaption) {
        content += `*${galleryCaption}*\n\n`;
      }
    }
  }

  // Create English MDX
  const englishMdx = `---
title: "Gear Upgrades: Revitalizing My Analog Setup"
description: "My return to analog photography needed a little excitement—and of course, new gear. New cameras, lenses, and accessories that brought back my passion for shooting film."
date: "2024-12-15"
---

${content.trim()}
`;

  // Create Spanish MDX (translated)
  const spanishContent = content
    .replace(/## New Main SLR: Nikon F3/g, '## Nueva SLR Principal: Nikon F3')
    .replace(/### Previous Main SLR: Olympus OM-1 \+ Suiko 50mm f\/1\.4/g, '### SLR Principal Anterior: Olympus OM-1 + Suiko 50mm f/1.4')
    .replace(/## New Rangefinder: Yashica Electro 35 GTN/g, '## Nueva Rangefinder: Yashica Electro 35 GTN')
    .replace(/### Previous Rangefinder: Olympus Trip 35/g, '### Rangefinder Anterior: Olympus Trip 35')
    .replace(/## New Shoulder Bag: Ulanzi 6L/g, '## Nueva Bolsa de Hombro: Ulanzi 6L')
    .replace(/### Previous Shoulder Bag: ThinkTank Mirrorless Mover 20/g, '### Bolsa Anterior: ThinkTank Mirrorless Mover 20')
    .replace(/## New Lens: Vöigtlander ULTRON 40mm ƒ2 Aspherical SLII Nikon F AI-S/g, '## Nuevo Lente: Vöigtlander ULTRON 40mm ƒ2 Aspherical SLII Nikon F AI-S')
    .replace(/### Final Thoughts/g, '### Reflexiones Finales')
    .replace(/### Bonus: Olympus Trip 35 decent shots/g, '### Bonus: Buenas fotos con la Olympus Trip 35');

  const spanishMdx = `---
title: "Actualizaciones de Equipo: Revitalizando Mi Setup Analógico"
description: "Mi regreso a la fotografía analógica necesitaba un poco de emoción—y por supuesto, equipo nuevo. Nuevas cámaras, lentes y accesorios que trajeron de vuelta mi pasión por disparar en película."
date: "2024-12-15"
---

${spanishContent.trim()}
`;

  // Write English version
  const englishPath = path.join(__dirname, 'content', 'stories', 'en', `${POST_NUMBER}.mdx`);
  const englishDir = path.dirname(englishPath);
  if (!fs.existsSync(englishDir)) {
    fs.mkdirSync(englishDir, { recursive: true });
  }
  fs.writeFileSync(englishPath, englishMdx);

  // Write Spanish version
  const spanishPath = path.join(__dirname, 'content', 'stories', `${POST_NUMBER}.mdx`);
  const spanishDir = path.dirname(spanishPath);
  if (!fs.existsSync(spanishDir)) {
    fs.mkdirSync(spanishDir, { recursive: true });
  }
  fs.writeFileSync(spanishPath, spanishMdx);

  console.log(`\nPost ${POST_NUMBER} converted successfully!`);
  console.log(`- Downloaded ${imageCount} images`);
  console.log(`- English: content/stories/en/${POST_NUMBER}.mdx`);
  console.log(`- Spanish: content/stories/${POST_NUMBER}.mdx`);
}

convertPost().catch(console.error);