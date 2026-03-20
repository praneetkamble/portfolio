/**
 * remove-watermark.js  (raw pixel edition)
 *
 * Reads raw RGBA pixel data, zeros out BOTH the alpha AND the RGB
 * channels in the exact watermark region, then re-encodes to WebP.
 * This guarantees no leftover ghost color even in premultiplied renderers.
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const FOLDERS = ['idle', 'scroll', 'action'];
const SRC_DIR  = path.join(__dirname, '..', 'public', 'avatar_backup');
const OUT_DIR  = path.join(__dirname, '..', 'public', 'avatar_clean2');

// Exact watermark bounds (pixels) for 281x500 frames — scales proportionally
const WM_LEFT_RATIO   = 250 / 281;
const WM_TOP_RATIO    = 448 / 500;
const WM_RIGHT_RATIO  = 281 / 281;  // right edge = full width
const WM_BOTTOM_RATIO = 500 / 500;  // bottom edge = full height

async function processFrame(srcPath, outPath) {
  const { data, info } = await sharp(srcPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info; // channels = 4 (RGBA)

  // Compute exact pixel region
  const left   = Math.floor(WM_LEFT_RATIO   * width);
  const top    = Math.floor(WM_TOP_RATIO    * height);
  const right  = Math.ceil (WM_RIGHT_RATIO  * width);
  const bottom = Math.ceil (WM_BOTTOM_RATIO * height);

  // Zero out ALL channels (R, G, B, A = 0) in the watermark region
  for (let y = top; y < bottom && y < height; y++) {
    for (let x = left; x < right && x < width; x++) {
      const idx = (y * width + x) * channels;
      data[idx]     = 0; // R
      data[idx + 1] = 0; // G
      data[idx + 2] = 0; // B
      data[idx + 3] = 0; // A — fully transparent
    }
  }

  // Re-encode to WebP from the modified raw buffer
  await sharp(data, {
    raw: { width, height, channels },
  })
    .webp({ quality: 95 })
    .toFile(outPath);
}

async function main() {
  console.log('🎨 Watermark removal (raw pixel zero-out)...\n');

  let total = 0, success = 0;

  for (const folder of FOLDERS) {
    const srcFolder = path.join(SRC_DIR, folder);
    const outFolder = path.join(OUT_DIR, folder);

    if (!fs.existsSync(srcFolder)) continue;
    fs.mkdirSync(outFolder, { recursive: true });

    const files = fs.readdirSync(srcFolder)
      .filter(f => f.endsWith('.webp'))
      .sort();

    console.log(`📂 ${folder}/ — ${files.length} frames`);

    for (const file of files) {
      total++;
      const srcPath = path.join(srcFolder, file);
      const outPath = path.join(outFolder, file);
      try {
        await processFrame(srcPath, outPath);
        process.stdout.write(`\r  ✓ ${folder}/${file}   `);
        success++;
      } catch (err) {
        console.error(`\n  ✗ ${file}: ${err.message}`);
      }
    }
    console.log(`\n  Done — ${success}/${total}\n`);
  }

  console.log(`\n✅ All done! Files in: public/avatar_clean2/`);
}

main().catch(console.error);
