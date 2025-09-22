const fs = require('fs');
const path = require('path');
const https = require('https');
const { JSDOM } = require('jsdom');

// Post #11 specific data
const POST_ID = '166297000';
const POST_SLUG = 'orwo-wolfen-p400-first-impressions';
const POST_NUMBER = 11;

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
title: "ORWO Wolfen P400: First Impressions of This East German Film"
description: "Testing ORWO Wolfen P400, a film stock with deep East German heritage. My first roll experience with this unique black and white emulsion and its distinctive character."
date: "2025-02-10"
---

${content.trim()}
`;

  // Create Spanish MDX (translated)
  const spanishContent = content
    .replace(/## About ORWO Wolfen/g, '## Sobre ORWO Wolfen')
    .replace(/## The History/g, '## La Historia')
    .replace(/## First Roll Results/g, '## Resultados del Primer Rollo')
    .replace(/## Technical Notes/g, '## Notas Técnicas')
    .replace(/## Final Verdict/g, '## Veredicto Final');

  const spanishMdx = `---
title: "ORWO Wolfen P400: Primeras Impresiones de esta Película de Alemania Oriental"
description: "Probando ORWO Wolfen P400, una película con profundo patrimonio de Alemania Oriental. Mi experiencia del primer rollo con esta emulsión única en blanco y negro y su carácter distintivo."
date: "2025-02-10"
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