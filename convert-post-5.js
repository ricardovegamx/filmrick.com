const fs = require('fs');
const path = require('path');
const https = require('https');
const { JSDOM } = require('jsdom');

// Post #5 specific data
const POST_ID = '162664803';
const POST_SLUG = 'owning-a-leica-iiif-my-story-and';
const POST_NUMBER = 5;

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

  // Process all elements
  const elements = document.querySelectorAll('p, h2, h3, h4, blockquote, ul, li, div.captioned-image-container');

  for (const element of elements) {
    if (element.tagName === 'P') {
      const text = element.textContent.trim();
      // Skip subscription prompts and empty paragraphs
      if (text && !text.includes('Subscribe') && !text.includes('Thanks for reading') && !text.includes('What about you?')) {
        content += `${text}\n\n`;
      }
    } else if (element.tagName === 'H2') {
      content += `## ${element.textContent.trim()}\n\n`;
    } else if (element.tagName === 'H3') {
      content += `### ${element.textContent.trim()}\n\n`;
    } else if (element.tagName === 'H4') {
      content += `#### ${element.textContent.trim()}\n\n`;
    } else if (element.tagName === 'BLOCKQUOTE') {
      content += `> ${element.textContent.trim()}\n\n`;
    } else if (element.tagName === 'UL') {
      // Process lists
      const listItems = element.querySelectorAll('li');
      listItems.forEach(li => {
        const text = li.textContent.trim();
        if (text) {
          content += `- ${text}\n`;
        }
      });
      content += '\n';
    } else if (element.classList && element.classList.contains('captioned-image-container')) {
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
    }
  }

  // Create English MDX
  const englishMdx = `---
title: "Owning a Leica IIIF: My Story and Initial Impressions"
description: "After months of wanting one, I finally got my hands on a Leica IIIF. Here's the story of how I found it and my first impressions with this iconic rangefinder camera."
date: "2025-01-20"
---

${content.trim()}
`;

  // Create Spanish MDX (translated)
  const spanishContent = content
    .replace(/## How I Got My Leica IIIF/g, '## Cómo Conseguí Mi Leica IIIF')
    .replace(/## First Impressions/g, '## Primeras Impresiones')
    .replace(/## The Leica Experience/g, '## La Experiencia Leica')
    .replace(/## Final Thoughts/g, '## Reflexiones Finales');

  const spanishMdx = `---
title: "Ser Dueño de una Leica IIIF: Mi Historia y Primeras Impresiones"
description: "Después de meses de querer una, finalmente conseguí una Leica IIIF. Aquí está la historia de cómo la encontré y mis primeras impresiones con esta icónica cámara rangefinder."
date: "2025-01-20"
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