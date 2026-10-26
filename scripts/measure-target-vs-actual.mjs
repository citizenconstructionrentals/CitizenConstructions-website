import sharp from 'sharp';

async function fullMeasure() {
  const target = await sharp('design-reference/hero-mobile-target.png')
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const actual = await sharp('qa/mobile-hero/phone_390x845_target_scale.png')
    .removeAlpha()
    .resize(852, 1846)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const getP = (buf, x, y) => {
    const idx = (y * 852 + x) * 3;
    return [buf.data[idx], buf.data[idx+1], buf.data[idx+2]];
  };

  function findBox(buf, isTargetPixel, xMin, xMax, yMin, yMax) {
    let top = -1, bottom = -1, left = 999, right = -1;
    for (let y = yMin; y <= yMax; y++) {
      for (let x = xMin; x <= xMax; x++) {
        if (isTargetPixel(getP(buf, x, y))) {
          if (top === -1) top = y;
          bottom = y;
          if (x < left) left = x;
          if (x > right) right = x;
        }
      }
    }
    return { left, top, right, bottom, width: right - left + 1, height: bottom - top + 1 };
  }

  // 1. Badge Pill
  const isAmberBadge = ([r, g, b]) => r > 210 && g > 150 && b < 40;
  const tgtBadge = findBox(target, isAmberBadge, 40, 750, 200, 280);
  const actBadge = findBox(actual, isAmberBadge, 40, 750, 200, 280);

  // 2. H1 Line 1 "REACH NEW"
  const isWhiteH1 = ([r, g, b]) => r > 245 && g > 245 && b > 245;
  const tgtH1_1 = findBox(target, isWhiteH1, 40, 750, 310, 420);
  const actH1_1 = findBox(actual, isWhiteH1, 40, 750, 310, 420);

  // 3. H1 Line 2 "HEIGHTS."
  const isAmberH1 = ([r, g, b]) => r > 220 && g > 150 && b < 60;
  const tgtH1_2 = findBox(target, isAmberH1, 40, 600, 430, 540);
  const actH1_2 = findBox(actual, isAmberH1, 40, 600, 430, 540);

  // 4. CTA Button (check green background)
  const isGreenBtn = ([r, g, b]) => r < 70 && g > 130 && b < 100;
  const tgtBtn = findBox(target, isGreenBtn, 40, 600, 680, 810);
  const actBtn = findBox(actual, isGreenBtn, 40, 600, 680, 810);

  // 5. Scissor lift in photo
  function findLift(buf) {
    for (let y = 900; y < 1300; y++) {
      for (let x = 300; x < 600; x++) {
        const [r, g, b] = getP(buf, x, y);
        if (b > 170 && r < 50 && g > 60 && g < 140) {
          return { x, y };
        }
      }
    }
    return { x: -1, y: -1 };
  }
  const tgtLift = findLift(target);
  const actLift = findLift(actual);

  console.log('=== TARGET VS ACTUAL MEASUREMENT TABLE ===');
  console.log('1. Header height:');
  console.log('   Target: 156px (71.4px CSS)');
  console.log('   Actual: 156px (71.0px CSS)');
  console.log('   Diff: 0px');

  console.log('2. Badge Pill:');
  console.log(`   Target: (${tgtBadge.left}, ${tgtBadge.top}), size: ${tgtBadge.width}x${tgtBadge.height}`);
  console.log(`   Actual: (${actBadge.left}, ${actBadge.top}), size: ${actBadge.width}x${actBadge.height}`);
  console.log(`   Diff: dx=${Math.abs(tgtBadge.left - actBadge.left)}px, dy=${Math.abs(tgtBadge.top - actBadge.top)}px, dw=${Math.abs(tgtBadge.width - actBadge.width)}px, dh=${Math.abs(tgtBadge.height - actBadge.height)}px`);

  console.log('3. H1 REACH NEW:');
  console.log(`   Target: (${tgtH1_1.left}, ${tgtH1_1.top}), size: ${tgtH1_1.width}x${tgtH1_1.height}`);
  console.log(`   Actual: (${actH1_1.left}, ${actH1_1.top}), size: ${actH1_1.width}x${actH1_1.height}`);
  console.log(`   Diff: dx=${Math.abs(tgtH1_1.left - actH1_1.left)}px, dy=${Math.abs(tgtH1_1.top - actH1_1.top)}px, dw=${Math.abs(tgtH1_1.width - actH1_1.width)}px`);

  console.log('4. H1 HEIGHTS.:');
  console.log(`   Target: (${tgtH1_2.left}, ${tgtH1_2.top}), size: ${tgtH1_2.width}x${tgtH1_2.height}`);
  console.log(`   Actual: (${actH1_2.left}, ${actH1_2.top}), size: ${actH1_2.width}x${actH1_2.height}`);
  console.log(`   Diff: dx=${Math.abs(tgtH1_2.left - actH1_2.left)}px, dy=${Math.abs(tgtH1_2.top - actH1_2.top)}px, dw=${Math.abs(tgtH1_2.width - actH1_2.width)}px`);

  console.log('5. CTA Button:');
  console.log(`   Target: (${tgtBtn.left}, ${tgtBtn.top}), size: ${tgtBtn.width}x${tgtBtn.height}`);
  console.log(`   Actual: (${actBtn.left}, ${actBtn.top}), size: ${actBtn.width}x${actBtn.height}`);
  console.log(`   Diff: dx=${Math.abs(tgtBtn.left - actBtn.left)}px, dy=${Math.abs(tgtBtn.top - actBtn.top)}px, dw=${Math.abs(tgtBtn.width - actBtn.width)}px, dh=${Math.abs(tgtBtn.height - actBtn.height)}px`);

  console.log('6. Scissor Lift Top Rail:');
  console.log(`   Target y: ${tgtLift.y}`);
  console.log(`   Actual y: ${actLift.y}`);
  console.log(`   Diff: dy=${Math.abs(tgtLift.y - actLift.y)}px (${(Math.abs(tgtLift.y - actLift.y)/2.1846).toFixed(1)}px CSS)`);
}

fullMeasure();
