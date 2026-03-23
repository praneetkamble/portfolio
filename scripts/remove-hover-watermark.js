/**
 * remove-hover-watermark.js
 *
 * Removes the Veo watermark from all 4 hover animation sequences
 * (hover_projects, hover_projects_loop, hover_contact, hover_contact_loop)
 * directly in public/avatar/ (in-place).
 *
 * Uses the same ratio-based pixel erasure as remove-watermark.js.
 * Run: node scripts/remove-hover-watermark.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const FOLDERS = [
  'hover_projects',
  'hover_projects_loop',
  'hover_contact',
  'hover_contact_loop',
];

const AVATAR_DIR = path.join(__dirname, '..', 'public', 'avatar');

// Exact watermark bounds (ratios) for 281x500 frames — same as existing sequences
const WM_LEFT_RATIO   = 250 / 281;
const WM_TOP_RATIO    = 448 / 500;
const WM_RIGHT_RATIO  =  281 / 281; // right edge = full width
const WM_BOTTOM_RATIO = 500 / 500;  // bottom edge = full height

async function processFrame(filePath) {
  const { data, info } = await sharp(filePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

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

  // Re-encode to WebP in-place (overwrite the original)
  const tmpPath = filePath + '.tmp.webp';
  await sharp(data, { raw: { width, height, channels } })
    .webp({ quality: 75 })
    .toFile(tmpPath);

  // We purposely DO NOT rename or delete the original here to avoid Windows/OneDrive EBUSY locks.
  // A secondary script (cleanup-webp.js) will handle the replacement safely.
}

async function main() {
  console.log('🎨 Removing Veo watermark from hover sequences...\n');

  let total = 0, success = 0;

  for (const folder of FOLDERS) {
    const folderPath = path.join(AVATAR_DIR, folder);

    if (!fs.existsSync(folderPath)) {
      console.log(`⚠️  Skipping ${folder}/ — folder not found`);
      continue;
    }

    const files = fs.readdirSync(folderPath)
      .filter(f => f.endsWith('.webp'))
      .sort();

    console.log(`📂 ${folder}/ — ${files.length} frames`);

    for (const file of files) {
      total++;
      const filePath = path.join(folderPath, file);
      try {
        await processFrame(filePath);
        process.stdout.write(`\r  ✓ ${folder}/${file}   `);
        success++;
      } catch (err) {
        console.error(`\n  ✗ ${file}: ${err.message}`);
      }
    }
    console.log(`\n  Done — ${success}/${total}\n`);
  }

  console.log(`\n✅ All done! Watermark removed from ${success}/${total} frames.`);
}

main().catch(console.error);
