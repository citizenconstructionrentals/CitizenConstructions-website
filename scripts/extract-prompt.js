const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('C:/Users/citiz/.gemini/antigravity/brain/83397a02-cf15-4b81-820d-6b5d86cb5aad/.system_generated/logs/transcript_full.jsonl')
});

rl.on('line', (line) => {
  if (line.includes('"step_index":3388')) {
    const data = JSON.parse(line);
    fs.writeFileSync('C:/Users/citiz/.gemini/antigravity/brain/83397a02-cf15-4b81-820d-6b5d86cb5aad/scratch/prompt_3388.txt', data.content, 'utf8');
    console.log('Saved prompt length:', data.content.length);
    process.exit(0);
  }
});
