const fs = require('fs');
const path = require('path');
const https = require('https');
const { JSDOM } = require('jsdom');

// Post #7 specific data
const POST_ID = '163574512';
const POST_SLUG = 'does-having-a-style-really-matters';
const POST_NUMBER = 7;

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
title: "Does Having a Style Really Matter in Photography?"
description: "Exploring the eternal question of photographic style: is it essential for growth as a photographer, or can authenticity shine through without forcing a particular aesthetic?"
date: "2025-01-25"
---

${content.trim()}
`;

  // Create Spanish MDX (translated)
  const spanishContent = content
    .replace(/## What is Photographic Style?/g, '## ¿Qué es el Estilo Fotográfico?')
    .replace(/## The Pressure to Have a Style/g, '## La Presión de Tener un Estilo')
    .replace(/## Finding Your Voice/g, '## Encontrando Tu Voz')
    .replace(/## My Personal Journey/g, '## Mi Viaje Personal')
    .replace(/## Final Thoughts/g, '## Reflexiones Finales');

  const spanishMdx = `---
title: "¿Realmente Importa Tener un Estilo en la Fotografía?"
description: "Explorando la eterna pregunta del estilo fotográfico: ¿es esencial para el crecimiento como fotógrafo, o puede brillar la autenticidad sin forzar una estética particular?"
date: "2025-01-25"
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