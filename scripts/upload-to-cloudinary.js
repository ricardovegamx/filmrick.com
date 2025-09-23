const cloudinary = require('cloudinary').v2
const fs = require('fs')
const path = require('path')

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

async function uploadImages() {
  const imagesDir = path.join(__dirname, '../public/images')

  async function uploadDirectory(dir, folder = '') {
    const files = fs.readdirSync(dir)

    for (const file of files) {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        await uploadDirectory(filePath, folder ? `${folder}/${file}` : file)
      } else if (/\.(jpg|jpeg|png|webp)$/i.test(file)) {
        try {
          const publicId = folder ? `${folder}/${path.parse(file).name}` : path.parse(file).name

          console.log(`Uploading: ${publicId}`)

          const result = await cloudinary.uploader.upload(filePath, {
            public_id: publicId,
            folder: 'filmrick',
            resource_type: 'image',
            overwrite: true,
            quality_analysis: true
          })

          console.log(`✓ Uploaded: ${result.public_id} (${Math.round(result.bytes / 1024)}KB)`)
        } catch (error) {
          console.error(`✗ Failed to upload ${file}:`, error.message)
        }
      }
    }
  }

  await uploadDirectory(imagesDir)
  console.log('\n✓ All images uploaded to Cloudinary!')
}

uploadImages().catch(console.error)