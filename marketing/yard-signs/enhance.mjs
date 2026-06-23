import sharp from 'sharp';
import fs from 'node:fs';

const SRC = '/tmp/sign/photo-after.jpg';
const ORIG = '/tmp/sign/photo-after-original.jpg';
const OUT = '/tmp/sign/photo-after.jpg';

// keep a pristine copy the first time
if (!fs.existsSync(ORIG)) fs.copyFileSync(SRC, ORIG);

const meta = await sharp(ORIG).metadata();
console.log('source:', meta.width + 'x' + meta.height, meta.format);

await sharp(ORIG)
  // upscale ~3.3x with a high-quality kernel so blocks become smooth
  .resize(1600, 1200, { fit: 'cover', kernel: 'lanczos3' })
  // lift the dark exposure + a little life in the color
  .modulate({ brightness: 1.16, saturation: 1.1 })
  // gentle contrast (output = a*in + b)
  .linear(1.06, -5)
  // mild structure so it does not look mushy
  .sharpen({ sigma: 1.1, m1: 0.5, m2: 0.7 })
  .jpeg({ quality: 92, chromaSubsampling: '4:4:4' })
  .toFile(OUT);

const out = await sharp(OUT).metadata();
console.log('enhanced ->', OUT, out.width + 'x' + out.height, fs.statSync(OUT).size + ' bytes');
