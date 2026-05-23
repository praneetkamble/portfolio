import fs from 'fs';
import { PNG } from 'pngjs';

const data = fs.readFileSync('public/backdrop1.png');
const png = PNG.sync.read(data);
const width = png.width;

// Print some pixel colors along the right vertical line at X = 1108
console.log('RGB colors along right vertical line at X=1108:');
for (let y = 160; y <= 760; y += 40) {
  const idx = (width * y + 1108) << 2;
  const r = png.data[idx];
  const g = png.data[idx + 1];
  const b = png.data[idx + 2];
  console.log(`  Y=${y}: R=${r}, G=${g}, B=${b}`);
}
