const fs = require('fs');
const path = require('path');
const https = require('https');
const { JSDOM } = require('jsdom');

// Post #10 specific data
const POST_ID = '165149609';
const POST_SLUG = 'ruins-in-the-city-a-film-walk-through';
const POST_NUMBER = 10;

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
title: "Ruins in the City: A Film Walk Through Urban Decay"
description: "Exploring the forgotten corners of the city where nature reclaims concrete, capturing the beauty in decay through the lens of analog photography."
date: "2025-02-05"
---

${content.trim()}
`;

  // Create Spanish MDX (translated)
  const spanishContent = content
    .replace(/## Finding the Forgotten/g, '## Encontrando lo Olvidado')
    .replace(/## Urban Exploration/g, '## Exploración Urbana')
    .replace(/## The Beauty of Decay/g, '## La Belleza de la Decadencia')
    .replace(/## Through the Lens/g, '## A Través del Lente')
    .replace(/## Final Reflections/g, '## Reflexiones Finales');

  const spanishMdx = `---
title: "Ruinas en la Ciudad: Un Paseo Fotográfico por la Decadencia Urbana"
description: "Explorando los rincones olvidados de la ciudad donde la naturaleza reclama el concreto, capturando la belleza en la decadencia a través del lente de la fotografía analógica."
date: "2025-02-05"
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