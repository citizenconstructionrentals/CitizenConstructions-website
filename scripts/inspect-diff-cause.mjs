import sharp from 'sharp';

async function checkOtherDiffs() {
  await sharp('qa/diff-wide/brand_new_768x1024_fold.png')
    .extract({ left: 140, top: 870, width: 580, height: 155 })
    .toFile('qa/diff-wide/brand_new_768_crop.png');

  await sharp('qa/baseline-wide/brand_new_768x1024_fold.png')
    .extract({ left: 140, top: 870, width: 580, height: 155 })
    .toFile('qa/diff-wide/brand_new_768_base_crop.png');

  await sharp('qa/after-wide/brand_new_768x1024_fold.png')
    .extract({ left: 140, top: 870, width: 580, height: 155 })
    .toFile('qa/diff-wide/brand_new_768_after_crop.png');

  console.log('Saved brand_new crops');
}
checkOtherDiffs();
