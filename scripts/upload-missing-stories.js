const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function uploadImage(localPath, cloudinaryPath) {
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

async function uploadStoryImages(storyNumber) {
  const storyDir = path.join(__dirname, '..', 'public', 'images', 'stories', storyNumber.toString());

  if (!fs.existsSync(storyDir)) {
    console.log(`Story ${storyNumber} directory not found, skipping...`);
    return;
  }

  const files = fs.readdirSync(storyDir);
  console.log(`\nUploading Story ${storyNumber} (${files.length} files)...`);

  for (const file of files) {
    const localPath = path.join(storyDir, file);
    const fileName = path.parse(file).name;
    const cloudinaryPath = `filmrick/stories/${storyNumber}/${fileName}`;
    await uploadImage(localPath, cloudinaryPath);
  }
}

async function main() {
  console.log('Uploading missing story images to Cloudinary...\n');

  // Upload stories 11-15
  for (let i = 11; i <= 15; i++) {
    await uploadStoryImages(i);
  }

  console.log('\n✅ Upload complete!');
}

main();