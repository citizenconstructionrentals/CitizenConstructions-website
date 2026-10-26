const fs = require('fs');
const readline = require('readline');

async function checkMediaAnywhere() {
  const fileStream = fs.createReadStream('C:/Users/citiz/.gemini/antigravity/brain/83397a02-cf15-4b81-820d-6b5d86cb5aad/.system_generated/logs/transcript_full.jsonl');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });
  let count = 0;
  for await (const line of rl) {
    if (line.includes('"media"')) {
      const obj = JSON.parse(line);
      console.log('step:', obj.step_index, 'media:', JSON.stringify(obj.media));
      count++;
    }
  }
  console.log('Total lines with media:', count);
}
checkMediaAnywhere();
