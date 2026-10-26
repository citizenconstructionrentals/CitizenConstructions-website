const sharp = require('sharp');

async function inspectTarget() {
  const image = sharp('public/design-reference/applications-target.png');
  const metadata = await image.metadata();
  console.log('Target Dimensions:', metadata.width, 'x', metadata.height);

  // The prompt says:
  // "Container x 38–1783 (side padding about 2.1% of the width), column gap 22px, row gap 20px."
  // "each card about 567×264"
  // Let's verify the exact positions of cards:
  // Row 1: y around 232
  // Card 1: x: 38 or 41, w: 567, h: 264
  // Card 2: x: 41 + 567 + 22 = 630
  // Card 3: x: 630 + 567 + 22 = 1219
  // Row 2: y around 516
  // Card 4: x: 41
  // Card 5: x: 630
  // Card 6: x: 1219

  // Let's crop Card 3 (Facade) and Card 6 (HVAC) from the target image:
  // In Card 3:
  // Let's see if 03-facade already exists anywhere else, or if we extract from target:
  await image.clone().extract({ left: 1219, top: 232, width: 567, height: 264 }).toFile('public/images/applications/03-facade-from-target.jpg');
  await image.clone().extract({ left: 1219, top: 516, width: 567, height: 264 }).toFile('public/images/applications/06-hvac-from-target.jpg');
  await image.clone().extract({ left: 41, top: 516, width: 567, height: 264 }).toFile('public/images/applications/05-mall-from-target.jpg');
  await image.clone().extract({ left: 630, top: 516, width: 567, height: 264 }).toFile('public/images/applications/07-construction-from-target.jpg');
  console.log('Extracted cards from target!');
}

inspectTarget();
