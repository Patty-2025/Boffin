const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  const patterns = [
    { regex: /bg-\[#f47321\]\s+hover:bg-\[#e0651a\]/g, replacement: 'bg-[#1a1f71] hover:bg-[#f47321]' },
    { regex: /bg-blue-600\s+hover:bg-\[#1a1f71\]/g, replacement: 'bg-[#1a1f71] hover:bg-[#f47321]' },
    { regex: /bg-\[#f47321\]\s+text-white/g, replacement: 'bg-[#1a1f71] text-white' },
    { regex: /hover:bg-\[#e0651a\]/g, replacement: 'hover:bg-[#f47321]' },
    { regex: /bg-\[#1a1f71\]\s+hover:bg-slate-900/g, replacement: 'bg-[#1a1f71] hover:bg-[#f47321]' },
    { regex: /bg-\[#1a1f71\]\s+hover:bg-\[#1a1f71\]\/90/g, replacement: 'bg-[#1a1f71] hover:bg-[#f47321]' },
  ];

  let newContent = content;
  patterns.forEach(p => {
    if (newContent.match(p.regex)) {
      newContent = newContent.replace(p.regex, p.replacement);
      changed = true;
    }
  });

  if (changed) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log(`Updated ${file}`);
  }
});
