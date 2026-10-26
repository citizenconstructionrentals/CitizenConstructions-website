const fs = require('fs');
const path = require('path');

// 1. Update scissor-lifts.ts
let scissorPath = path.join(process.cwd(), 'src', 'data', 'scissor-lifts.ts');
let scissorContent = fs.readFileSync(scissorPath, 'utf8');

scissorContent = scissorContent.replace(/\s*warranty\?: string;/g, '');
scissorContent = scissorContent.replace(/catalogueUrl: string;/g, 'specSheetUrl: string;\n  catalogueUrl?: string;');
scissorContent = scissorContent.replace(/catalogueUrl: "\/catalogues\//g, 'specSheetUrl: "/spec-sheets/');
// also keep catalogueUrl pointing to specSheetUrl for backwards compatibility if any component accesses it:
scissorContent = scissorContent.replace(/specSheetUrl: "(\/spec-sheets\/[^"]+)",/g, 'specSheetUrl: "$1",\n    catalogueUrl: "$1",');

fs.writeFileSync(scissorPath, scissorContent, 'utf8');
console.log('Updated scissor-lifts.ts');

// 2. Update boom-lifts.ts
let boomPath = path.join(process.cwd(), 'src', 'data', 'boom-lifts.ts');
let boomContent = fs.readFileSync(boomPath, 'utf8');

boomContent = boomContent.replace(/\s*warranty\?: string;/g, '');
boomContent = boomContent.replace(/catalogueUrl\?: string;/g, 'specSheetUrl?: string;\n  catalogueUrl?: string;');

fs.writeFileSync(boomPath, boomContent, 'utf8');
console.log('Updated boom-lifts.ts');
