const fs = require('fs');

function replaceInFile(file, regex, replacement) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(regex, replacement);
  fs.writeFileSync(file, content, 'utf8');
}

replaceInFile('src/components/machine/MachineCard.tsx', /href=\{model\.specSheetUrl \|\| model\.catalogueUrl\}/g, 'href={model.specSheetUrl}');
replaceInFile('src/components/home/BrandNewScissorSection.tsx', /href=\{model\.specSheetUrl \|\| model\.catalogueUrl\}/g, 'href={model.specSheetUrl}');
replaceInFile('src/app/brand-new/scissor-lifts/[slug]/page.tsx', /href=\{model\.specSheetUrl \|\| model\.catalogueUrl\}/g, 'href={model.specSheetUrl}');
replaceInFile('src/app/brand-new/boom-lifts/[slug]/page.tsx', /href=\{model\.specSheetUrl \|\| model\.catalogueUrl\}/g, 'href={model.specSheetUrl}');

console.log('Fixed hrefs');
