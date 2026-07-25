const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const images = [
  'Торт Мишка на севере.webp',
  'Трубочки с кремом.webp',
  'Безе с карамелью.webp',
  'Пирожное Шу.webp',
  'Самса с курицей и грибами.webp',
  'Пирожки с картошкой.webp',
  'Пирожки с мясом и капустой.webp'
];

async function processImages() {
  for (const imgName of images) {
    const p = path.join(__dirname, 'images', imgName);
    if (!fs.existsSync(p)) {
      console.log(`File not found: ${p}`);
      continue;
    }
    
    try {
      const metadata = await sharp(p).metadata();
      const size = Math.min(metadata.width, metadata.height);
      const left = Math.floor((metadata.width - size) / 2);
      const top = Math.floor((metadata.height - size) / 2);
      
      const tmpPath = p + '.tmp.webp';
      
      await sharp(p)
        .extract({ left, top, width: size, height: size })
        .toFile(tmpPath);
        
      fs.renameSync(tmpPath, p);
      console.log(`Cropped 1:1 -> ${imgName}`);
    } catch (e) {
      console.error(`Error processing ${imgName}:`, e);
    }
  }
}

processImages();
