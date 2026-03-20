/**
 * find-watermark.js
 * Reads the bottom-right quadrant of a backup frame and finds
 * the exact bounding box of any non-white pixels (the watermark).
 *
 * Run: node scripts/find-watermark.js
 */

const sharp = require('sharp');
const path = require('path');

const SAMPLE = path.join(__dirname, '..', 'public', 'avatar_backup', 'idle', 'frame_001.webp');

async function main() {
  const { data, info } = await sharp(SAMPLE)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  console.log(`Image size: ${width} x ${height}, channels: ${channels}\n`);

  // Scan only the extreme bottom-right corner — the "Veo" text is very small
  // and sits at the absolute right edge, bottom few rows
  const searchLeft   = Math.floor(width * 0.70);   // right 30% of image
  const searchTop    = Math.floor(height * 0.90);   // bottom 10% of image

  let minX = width, maxX = 0, minY = height, maxY = 0;
  let found = false;
  const samples = [];

  for (let y = searchTop; y < height; y++) {
    for (let x = searchLeft; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2], a = data[idx + 3];

      // Non-white pixel = part of the watermark text (Veo is greenish/gray)
      const isWatermark = !(r > 200 && g > 200 && b > 200);
      if (isWatermark) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
        found = true;
        if (samples.length < 5) samples.push({ x, y, r, g, b, a });
      }
    }
  }

  if (samples.length) {
    console.log('Sample non-white pixels found:');
    samples.forEach(p => console.log(`  (${p.x},${p.y}) rgba(${p.r},${p.g},${p.b},${p.a})`));
  }

  if (!found) {
    console.log('No non-white pixels found in the search area. Try adjusting searchLeft/searchTop.');
    return;
  }

  const padX = 2, padY = 2;
  const left   = Math.max(0, minX - padX);
  const top    = Math.max(0, minY - padY);
  const right  = Math.min(width - 1, maxX + padX);
  const bottom = Math.min(height - 1, maxY + padY);

  console.log(`Watermark bounding box:`);
  console.log(`  left:   ${left}`);
  console.log(`  top:    ${top}`);
  console.log(`  right:  ${right}`);
  console.log(`  bottom: ${bottom}`);
  console.log(`  width:  ${right - left}`);
  console.log(`  height: ${bottom - top}`);
  console.log(`\nFor the script, use:`);
  console.log(`  const ERASE_LEFT   = ${left};`);
  console.log(`  const ERASE_TOP    = ${top};`);
  console.log(`  const ERASE_W      = ${right - left};`);
  console.log(`  const ERASE_H      = ${bottom - top};`);
}

main().catch(console.error);
