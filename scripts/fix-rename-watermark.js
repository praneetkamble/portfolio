/**
 * fix-rename-watermark.js
 * 
 * The previous script wrote .tmp.webp files (clean, watermark-free)
 * but couldn't rename due to OneDrive locks on the originals.
 * This script: 1) deletes original .webp, 2) renames .tmp.webp -> .webp
 * 
 * Run: node scripts/fix-rename-watermark.js
 */

const fs = require('fs');
const path = require('path');

const FOLDERS = [
  'hover_projects',
  'hover_projects_loop',
  'hover_contact',
  'hover_contact_loop',
];

const AVATAR_DIR = path.join(__dirname, '..', 'public', 'avatar');

let total = 0, success = 0;

for (const folder of FOLDERS) {
  const folderPath = path.join(AVATAR_DIR, folder);
  if (!fs.existsSync(folderPath)) continue;

  const tmpFiles = fs.readdirSync(folderPath)
    .filter(f => f.endsWith('.tmp.webp'))
    .sort();

  console.log(`📂 ${folder}/ — ${tmpFiles.length} tmp files to finalize`);

  for (const tmpFile of tmpFiles) {
    total++;
    const tmpPath = path.join(folderPath, tmpFile);
    const finalPath = path.join(folderPath, tmpFile.replace('.tmp.webp', '.webp'));

    try {
      // Delete the original (locked) file first
      if (fs.existsSync(finalPath)) {
        fs.unlinkSync(finalPath);
      }
      // Now rename tmp -> final (no conflict, OneDrive won't block)
      fs.renameSync(tmpPath, finalPath);
      process.stdout.write(`\r  ✓ ${folder}/${tmpFile.replace('.tmp.webp', '.webp')}   `);
      success++;
    } catch (err) {
      console.error(`\n  ✗ ${tmpFile}: ${err.message}`);
    }
  }
  console.log(`\n  Done — ${success}/${total}\n`);
}

console.log(`\n✅ Finalized ${success}/${total} frames.`);
