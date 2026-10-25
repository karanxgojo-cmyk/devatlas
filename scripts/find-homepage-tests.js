const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '../tests/e2e.spec.ts');
const content = fs.readFileSync(file, 'utf8');
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.includes("goto('/')")) {
    console.log(`Line ${i+1}: ${lines[i-1].trim()}`);
  }
});
