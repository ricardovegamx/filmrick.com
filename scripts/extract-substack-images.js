const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const https = require('https');

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const postsCSV = fs.readFileSync(path.join(__dirname, '..', 'substack', 'posts.csv'), 'utf-8');
const lines = postsCSV.trim().split('\n').slice(1);

const postMapping = {};
lines.reverse().forEach((line, index) => {
  const postId = line.split(',')[0];
  postMapping[postId] = index + 1;
});

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
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function uploadToCloudinary(localPath, cloudinaryPath) {
  try {
    const result = await cloudinary.uploader.upload(localPath, {
      public_id: cloudinaryPath,
      overwrite: true
    });
    console.log(`✓ Uploaded: ${cloudinaryPath}`);
    return result;
  } catch (error) {
    console.error(`✗ Failed: ${cloudinaryPath}`, error.message);
  }
}

function extractImageUrls(html) {
  const urls = [];
  const imgRegex = /https:\/\/substack-post-media\.s3\.amazonaws\.com\/public\/images\/[a-f0-9\-]+_\d+x\d+\.(jpeg|jpg|png|heic)/gi;
  const matches = html.match(imgRegex);

  if (matches) {
    const uniqueUrls = [...new Set(matches)];
    urls.push(...uniqueUrls);
  }

  return urls;
}

async function processPost(postId, storyNumber) {
  const htmlPath = path.join(__dirname, '..', 'substack', 'posts', `${postId}.html`);

  if (!fs.existsSync(htmlPath)) {
    console.log(`HTML file not found for ${postId}, skipping...`);
    return;
  }

  const html = fs.readFileSync(htmlPath, 'utf-8');
  const imageUrls = extractImageUrls(html);

  console.log(`\nProcessing Story ${storyNumber} (${postId}): ${imageUrls.length} images found`);

  const tempDir = path.join(__dirname, '..', 'temp-images');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  for (let i = 0; i < imageUrls.length; i++) {
    const url = imageUrls[i];
    const ext = path.extname(new URL(url).pathname);
    const tempFile = path.join(tempDir, `temp-${storyNumber}-${i}${ext}`);

    try {
      await downloadImage(url, tempFile);

      const cloudinaryName = i === 0 ? 'hero' : `image-${i + 1}`;
      const cloudinaryPath = `filmrick/stories/${storyNumber}/${cloudinaryName}`;

      await uploadToCloudinary(tempFile, cloudinaryPath);

      fs.unlinkSync(tempFile);
    } catch (error) {
      console.error(`✗ Error processing image ${i + 1}:`, error.message);
    }
  }
}

async function main() {
  console.log('Extracting images from Substack and uploading to Cloudinary...\n');

  for (const [postId, storyNumber] of Object.entries(postMapping)) {
    await processPost(postId, storyNumber);
  }

  const tempDir = path.join(__dirname, '..', 'temp-images');
  if (fs.existsSync(tempDir)) {
    fs.rmdirSync(tempDir, { recursive: true });
  }

  console.log('\n✅ All images processed!');
}

main();