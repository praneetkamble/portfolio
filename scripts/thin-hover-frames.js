/**
 * thin-hover-frames.js
 * Keeps only every other frame (frame_001, frame_003, frame_005...) 
 * from all 4 hover sequences. Halves the file count: 192 → 96 per folder.
 * Also cleans up any leftover .tmp.webp files.
 * 
 * Run: node scripts/thin-hover-frames.js
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

for (const folder of FOLDERS) {
  const folderPath = path.join(AVATAR_DIR, folder);
  if (!fs.existsSync(folderPath)) continue;

  const files = fs.readdirSync(folderPath).sort();

  // Clean up any leftover .tmp.webp files
  const tmpFiles = files.filter(f => f.endsWith('.tmp.webp'));
  tmpFiles.forEach(f => fs.unlinkSync(path.join(folderPath, f)));

  // Get all webp frames in order
  const webpFiles = files.filter(f => f.endsWith('.webp') && f.startsWith('frame_')).sort();

  // Keep only even indices (i % 2 === 0): frame_001, frame_003, frame_005...
  const toDelete = webpFiles.filter((_, i) => i % 2 !== 0);

  toDelete.forEach(f => fs.unlinkSync(path.join(folderPath, f)));

  const remaining = webpFiles.length - toDelete.length;
  const sizeMB = (fs.readdirSync(folderPath)
    .filter(f => f.endsWith('.webp'))
    .reduce((sum, f) => sum + fs.statSync(path.join(folderPath, f)).size, 0) / 1024 / 1024).toFixed(2);

  console.log(`✓ ${folder}: kept ${remaining} frames (deleted ${toDelete.length} + ${tmpFiles.length} tmp), ${sizeMB} MB`);
}

console.log('\n✅ Done! Each hover sequence now has ~96 frames.');
