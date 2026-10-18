import fs from 'fs';

const transcript = fs.readFileSync('C:/Users/mathi/.gemini/antigravity-ide/brain/b239ac0b-f310-4ad2-b890-bf285e3d3153/.system_generated/logs/transcript.jsonl', 'utf8');
const lines = transcript.split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('push_files') && line.includes('call_mcp_tool')) {
    console.log(`=== LINE ${i} ===`);
    try {
      const obj = JSON.parse(line);
      console.log("TOOL CALLS:", JSON.stringify(obj.tool_calls, null, 2));
    } catch (e) {
      console.log(line.slice(0, 300));
    }
  }
}
