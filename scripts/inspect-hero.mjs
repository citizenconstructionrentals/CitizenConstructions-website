import sharp from 'sharp';

async function measureBottomLeft() {
  const target = await sharp('design-reference/hero-mobile-target.png')
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const getP = (x, y) => {
    const idx = (y * 852 + x) * 3;
    return [target.data[idx], target.data[idx+1], target.data[idx+2]];
  };

  // Find where navy starts on left edge (x=0)
  for (let y = 1600; y < 1846; y++) {
    const [r, g, b] = getP(0, y);
    if (r < 20 && g < 50 && b > 80) {
      console.log('Navy on left edge starts at y =', y);
      break;
    }
  }

  // Find where navy ends on bottom edge (y=1845)
  for (let x = 0; x < 300; x++) {
    const [r, g, b] = getP(x, 1845);
    if (r > 100 || g > 100) {
      console.log('Navy on bottom edge ends at x =', x);
      break;
    }
  }

  // Find yellow line on left edge
  for (let y = 1600; y < 1846; y++) {
    const [r, g, b] = getP(0, y);
    if (r > 200 && g > 160 && b < 50) {
      console.log('Yellow on left edge at y =', y);
      break;
    }
  }
}

measureBottomLeft();
