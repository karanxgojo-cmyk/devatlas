const fs = require('fs');
const path = require('path');

const authors = ['elena', 'marcus', 'kevin', 'sofia', 'aris', 'amina', 'devin', 'sarah', 'alex', 'priya'];
const colors = ['#1e3a8a', '#4c1d95', '#064e3b', '#78350f', '#831843', '#0f766e', '#1d4ed8', '#b45309', '#4338ca', '#be123c'];

authors.forEach((name, i) => {
  const initials = name.slice(0, 2).toUpperCase();
  const c = colors[i % colors.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="50" fill="${c}" />
  <circle cx="50" cy="40" r="20" fill="rgba(255,255,255,0.3)" />
  <ellipse cx="50" cy="85" rx="32" ry="24" fill="rgba(255,255,255,0.2)" />
  <text x="50" y="46" fill="#ffffff" font-family="sans-serif" font-size="18" font-weight="bold" text-anchor="middle">${initials}</text>
</svg>`;
  fs.writeFileSync(path.join(__dirname, '../public/images/authors/' + name + '.svg'), svg.trim());
});
console.log('All author avatars created successfully');
