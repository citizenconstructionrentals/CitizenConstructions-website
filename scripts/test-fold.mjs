import sharp from 'sharp';
import pixelmatch from 'pixelmatch';

async function testBaseFoldVsBaseFull() {
  const baseFold = await sharp('qa/baseline-wide/brand_new_768x1024_fold.png').ensureAlpha().raw().toBuffer();
  const baseFullTop = await sharp('qa/baseline-wide/brand_new_768x1024_full.png')
    .extract({ left: 0, top: 0, width: 768, height: 1024 })
    .ensureAlpha()
    .raw()
    .toBuffer();

  const diffBuf = Buffer.alloc(768 * 1024 * 4);
  const diff = pixelmatch(baseFold, baseFullTop, diffBuf, 768, 1024, { threshold: 0.1 });
  console.log('Diff between baseFold and baseFullTop in baseline ITSELF:', diff, 'pixels (', (diff / (768 * 1024) * 100).toFixed(4), '%)');
}
testBaseFoldVsBaseFull();
