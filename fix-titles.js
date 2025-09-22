const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Mapping of post numbers to their actual Substack titles
const originalTitles = {
  2: "Gear Upgrades: Revitalizing my Analog Setup",
  3: "003", // This one is just "003"
  4: "Why I Ditched Cinestill Monobath: Moving to Traditional Development",
  5: "Owning a Leica IIIF: My Story and Initial Impressions",
  6: "Inspired by Daido Moriyama: My Adventure with High Contrast Black and White",
  7: "Does Having a Style Really Matter?",
  8: "My Unexpected Leap into Medium Format",
  9: "Photowalk: How a Roll from 2008 Took 16 Years to Develop",
  10: "Ruins in the City: A Film Walk Through Urban Decay",
  11: "ORWO Wolfen P400: First Impressions",
  12: "First Impressions: Canon Selphy CP1500",
  13: "Why I Still Shoot Film",
  14: "Riding the Power of the Yashica Mat",
  15: "Long Live Black and White"
};

// Extract actual titles from HTML files
async function extractTitleFromHTML(postId, slug) {
  try {
    const htmlFile = path.join(__dirname, 'posts', `${postId}.${slug}.html`);
    const html = fs.readFileSync(htmlFile, 'utf8');

    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Try to find title in various ways
    let title = null;

    // 1. Look for title tag
    const titleTag = document.querySelector('title');
    if (titleTag) {
      title = titleTag.textContent.trim();
    }

    // 2. Look for h1 tags
    if (!title) {
      const h1 = document.querySelector('h1');
      if (h1) {
        title = h1.textContent.trim();
      }
    }

    // 3. Look for meta title
    if (!title) {
      const metaTitle = document.querySelector('meta[property="og:title"]');
      if (metaTitle) {
        title = metaTitle.getAttribute('content');
      }
    }

    return title;
  } catch (error) {
    console.log(`Could not extract title for ${postId}: ${error.message}`);
    return null;
  }
}

async function fixTitles() {
  console.log('Fixing post titles to use original Substack titles...\n');

  for (const [postNum, correctTitle] of Object.entries(originalTitles)) {
    console.log(`Fixing post #${postNum}: "${correctTitle}"`);

    // Fix English version
    const englishPath = path.join(__dirname, 'content', 'stories', 'en', `${postNum}.mdx`);
    if (fs.existsSync(englishPath)) {
      let content = fs.readFileSync(englishPath, 'utf8');
      content = content.replace(/title: ".*?"/, `title: "${correctTitle}"`);
      fs.writeFileSync(englishPath, content);
      console.log(`  ✅ Fixed English: ${englishPath}`);
    }

    // Fix Spanish version (keep existing Spanish titles for now)
    console.log(`  📝 Spanish version will keep existing translated title`);
    console.log('');
  }

  console.log('✅ All titles fixed!');
}

fixTitles().catch(console.error);