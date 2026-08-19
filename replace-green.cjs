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
  
  if (content.includes('bg-[#519c3f]')) {
    content = content.replace(/bg-\[#519c3f\]/g, 'bg-green-600');
    changed = true;
  }
  if (content.includes('hover:bg-[#438334]')) {
    content = content.replace(/hover:bg-\[#438334\]/g, 'hover:bg-green-700');
    changed = true;
  }
  if (content.includes('hover:bg-[#438234]')) {
    content = content.replace(/hover:bg-\[#438234\]/g, 'hover:bg-green-700');
    changed = true;
  }

  // Also there are a couple #e9f2ea backgrounds in profile
  if (content.includes('bg-[#e9f2ea]')) {
    content = content.replace(/bg-\[#e9f2ea\]/g, 'bg-green-50');
    changed = true;
  }
  if (content.includes('border-[#d2e3d4]')) {
    content = content.replace(/border-\[#d2e3d4\]/g, 'border-green-200');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
