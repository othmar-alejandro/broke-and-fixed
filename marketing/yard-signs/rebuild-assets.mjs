import sharp from 'sharp';
import fs from 'node:fs';

const DIR = '/Users/othmarcasilla/broke-and-fixed-305/marketing/yard-signs';
const REC = '/Users/othmarcasilla/broke-and-fixed-305/marketing/recovered-assets';

// photos: original /tmp/sign/after.jpg (yellow Mediterranean) was the BEFORE,
// /tmp/sign/before.jpg (white modern) was the AFTER
fs.copyFileSync(`${REC}/sign__after.jpg`, `${DIR}/photo-before.webp`);
fs.copyFileSync(`${REC}/sign__before.jpg`, `${DIR}/photo-after-original.jpg`);

// enhance the low-res after photo, same pipeline as the original enhance.mjs
await sharp(`${DIR}/photo-after-original.jpg`)
  .resize(1600, 1200, { fit: 'cover', kernel: 'lanczos3' })
  .modulate({ brightness: 1.16, saturation: 1.1 })
  .linear(1.06, -5)
  .sharpen({ sigma: 1.1, m1: 0.5, m2: 0.7 })
  .jpeg({ quality: 92, chromaSubsampling: '4:4:4' })
  .toFile(`${DIR}/photo-after.jpg`);
console.log('photos ok');

// shield: crop the shield mark (above the wordmark) from the full logo
const trimmed = await sharp(`${REC}/card__newlogo.png`).trim().toBuffer();
const meta = await sharp(trimmed).metadata();
const shieldH = Math.round(meta.height * 0.66);
await sharp(trimmed)
  .extract({ left: 0, top: 0, width: meta.width, height: shieldH })
  .trim()
  .png()
  .toFile(`${DIR}/shield.png`);
const sm = await sharp(`${DIR}/shield.png`).metadata();
console.log(`shield ok ${sm.width}x${sm.height}`);
