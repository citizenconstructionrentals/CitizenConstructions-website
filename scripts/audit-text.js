const fs = require('fs');
const path = require('path');

const bannedWords = [
  'warranty',
  'guarantee',
  'factory',
  'manufacturer', // only allowed: "Our team at the manufacturer's facility."
  'direct from',
  'catalogue',
  'buy',
  'purchase',
  'sale',
  'sell',
  'dealer',
  'distributor',
  'price',
  'stock',
  'inventory',
  'after-sales',
  'free maintenance',
  'zero-hour',
  'factory-fresh',
  'certified used',
  'battle-tested',
  '2-year',
  '2 year',
  '1-year',
  '1 year'
];

function walkDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (file === 'node_modules' || file === '.next' || file === '.git' || file === 'catalogues' || file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.webp') || file.endsWith('.mp4') || file.endsWith('.ico')) {
      continue;
    }
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath, fileList);
    } else {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const files = walkDir(path.join(process.cwd(), 'src'));
files.push(path.join(process.cwd(), 'README.md'));

console.log(`Checking ${files.length} files...`);

let totalIssues = 0;

for (const filePath of files) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    // Ignore pure comments or rule definitions in scripts/README notes if explicitly allowed
    const lower = line.toLowerCase();
    for (const word of bannedWords) {
      if (lower.includes(word)) {
        // Exception: About page neutral caption
        if (filePath.includes('about') && word === 'manufacturer' && line.includes("Our team at the manufacturer's facility.")) {
          continue;
        }
        // Exception: comments or confirm with owner comments
        if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*')) {
          continue;
        }
        console.log(`[BANNED: "${word}"] ${path.relative(process.cwd(), filePath)}:${idx + 1} -> ${line.trim()}`);
        totalIssues++;
      }
    }
  });
}

console.log(`\nScan complete. Total potential issues in src & README: ${totalIssues}`);
