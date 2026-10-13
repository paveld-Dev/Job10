const sharp = require('sharp');
const fs = require('fs');

async function processBanner() {
  const genPath = 'C:/Users/Pavel Dinesh/.gemini/antigravity-ide/brain/7cc176a6-c13a-4d09-980b-801c1ba48c6a/cta_woman_repositioned_1791871019572.jpg';

  // Crop and resize
  const croppedWoman = await sharp(genPath)
    .extract({ left: 0, top: 40, width: 1376, height: 728 })
    .resize(Math.round(1376 * (400 / 728)), 400) // 756 x 400
    .toBuffer();

  const meta = await sharp(croppedWoman).metadata();
  console.log('Resized crop dimensions:', meta.width, 'x', meta.height);

  const rawCrop = await sharp(croppedWoman).raw().toBuffer({ resolveWithObject: true });
  const baseLeftR = rawCrop.data[(200*meta.width + 10)*3];
  const baseLeftG = rawCrop.data[(200*meta.width + 10)*3 + 1];
  const baseLeftB = rawCrop.data[(200*meta.width + 10)*3 + 2];
  console.log('Base color:', baseLeftR, baseLeftG, baseLeftB);

  const baseCanvas = await sharp({
    create: {
      width: 1400,
      height: 400,
      channels: 3,
      background: { r: baseLeftR, g: baseLeftG, b: baseLeftB }
    }
  }).jpeg().toBuffer();

  // Create an alpha mask buffer
  const mask = Buffer.alloc(meta.width * meta.height);
  for (let y = 0; y < meta.height; y++) {
    for (let x = 0; x < meta.width; x++) {
      let alpha = 255;
      if (x < 80) {
        alpha = Math.round((x / 80) * 255);
      }
      if (x > meta.width - 50) {
        alpha = Math.round(((meta.width - 1 - x) / 50) * 255);
      }
      mask[y * meta.width + x] = alpha;
    }
  }

  const maskImage = await sharp(mask, {
    raw: {
      width: meta.width,
      height: meta.height,
      channels: 1
    }
  }).png().toBuffer();

  const croppedWomanWithAlpha = await sharp(croppedWoman)
    .ensureAlpha()
    .joinChannel(maskImage)
    .png()
    .toBuffer();

  const finalImage = await sharp(baseCanvas)
    .composite([
      {
        input: croppedWomanWithAlpha,
        left: 580,
        top: 0
      }
    ])
    .jpeg({ quality: 95 })
    .toBuffer();

  fs.writeFileSync('images/cta-card-bg.jpg', finalImage);
  fs.writeFileSync('public/images/cta-card-bg.jpg', finalImage);
  console.log('images/cta-card-bg.jpg successfully written!');
}

processBanner().catch(console.error);
