import fs from 'fs';

// 1. Update scissor-lifts.ts
let sl = fs.readFileSync('src/data/scissor-lifts.ts', 'utf8');
sl = sl.replace('warranty: string;', 'availability: string;\n  warranty?: string;');
sl = sl.replaceAll('warranty: "2-Year Warranty",', 'availability: "Available on Rent",\n    // CONFIRM WITH OWNER\n    // Delivered to Your Site');
fs.writeFileSync('src/data/scissor-lifts.ts', sl, 'utf8');

// 2. Update boom-lifts.ts
let bl = fs.readFileSync('src/data/boom-lifts.ts', 'utf8');
bl = bl.replace('warranty: string;', 'availability: string;\n  warranty?: string;');
bl = bl.replaceAll('warranty: "2-Year Warranty",', 'availability: "Available on Rent",\n    // CONFIRM WITH OWNER\n    // Delivered to Your Site');
bl = bl.replace('Backed by a 2-year warranty.', 'Delivered to your site across India.');
fs.writeFileSync('src/data/boom-lifts.ts', bl, 'utf8');

console.log('Successfully updated scissor-lifts.ts and boom-lifts.ts!');
