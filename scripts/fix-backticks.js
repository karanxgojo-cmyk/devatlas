const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../lib/content/articles.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Find the index of "// 17. Responsive Images & Modern Formats"
const splitMarker = '// 17. Responsive Images & Modern Formats';
const parts = content.split(splitMarker);

if (parts.length === 2) {
  let [before, after] = parts;
  // In `after`, before `];\n\nexport function getAllArticles()`, escape unescaped backticks
  const endMarker = '];\n\nexport function getAllArticles(): Article[] {';
  const subParts = after.split(endMarker);
  if (subParts.length === 2) {
    let [articleBlock, rest] = subParts;
    // Replace unescaped backticks that are not content: ` or closing `
    // Notice content starts with content: ` and ends with \n  },
    // Let's replace ``` with \`\`\`
    articleBlock = articleBlock.replace(/(?<!\\)```/g, '\\`\\`\\`');
    // Also replace inline code backticks `code` if they are not already escaped
    // A clean way is to replace unescaped ` that are not content: ` or ending `
    // Let's replace any single ` that is not preceded by \ and not followed by \n
    // Or simpler: replace all ` with \` EXCEPT the ones at `content: \`` and `\n  },\n`
    articleBlock = articleBlock.replace(/content: `/g, 'content: __OPEN_CONTENT__');
    articleBlock = articleBlock.replace(/`,\n  },/g, '__CLOSE_CONTENT__,\n  },');
    articleBlock = articleBlock.replace(/`,\n  }/g, '__CLOSE_CONTENT__,\n  }');
    articleBlock = articleBlock.replace(/(?<!\\)`/g, '\\`');
    articleBlock = articleBlock.replace(/__OPEN_CONTENT__/g, 'content: `');
    articleBlock = articleBlock.replace(/__CLOSE_CONTENT__/g, '`');

    content = before + splitMarker + articleBlock + endMarker + rest;
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Escaped backticks in newly added articles successfully!');
  }
}
