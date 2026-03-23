const fs = require('fs');
const path = require('path');

const FOLDERS = [
  'hover_projects',
  'hover_projects_loop',
  'hover_contact',
  'hover_contact_loop',
];

const AVATAR_DIR = path.join(__dirname, '..', 'public', 'avatar');

let fixed = 0;

for (const folder of FOLDERS) {
  const folderPath = path.join(AVATAR_DIR, folder);
  if (!fs.existsSync(folderPath)) continue;

  const files = fs.readdirSync(folderPath);
  
  const doubleExtFiles = files.filter(f => f.endsWith('.tmp.webp'));

  for (const doubleExtFile of doubleExtFiles) {
    const cleanedPath = path.join(folderPath, doubleExtFile);
    const correctName = doubleExtFile.replace('.tmp.webp', '.webp');
    const originalPath = path.join(folderPath, correctName);

    try {
      // Overwrite the original watermarked file with the cleaned one
      fs.copyFileSync(cleanedPath, originalPath);
      // Delete the .webp.webp file
      fs.unlinkSync(cleanedPath);
      fixed++;
    } catch (e) {
      console.error(`Failed to fix ${correctName}:`, e.message);
    }
  }
}

console.log(`✅ Fixed ${fixed} watermark-free frames!`);
