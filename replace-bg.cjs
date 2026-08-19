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
  
  // Widget backgrounds
  if (content.includes('bg-[#f0e6d2]')) {
    content = content.replace(/bg-\[#f0e6d2\]/g, 'bg-white');
    changed = true;
  }
  
  if (content.includes('border-[#e5dbc2]')) {
    content = content.replace(/border-\[#e5dbc2\]/g, 'border-slate-100');
    changed = true;
  }

  // Login background
  if (content.includes('bg-[#F1E9E0]')) {
    content = content.replace(/bg-\[#F1E9E0\]/g, 'bg-[#f8f9fa]');
    changed = true;
  }

  // A couple of other warm beiges from NewAssignment.tsx
  if (content.includes('bg-[#fdf4e8]')) {
    content = content.replace(/bg-\[#fdf4e8\]/g, 'bg-blue-50');
    changed = true;
  }
  if (content.includes('border-[#f5e3cc]')) {
    content = content.replace(/border-\[#f5e3cc\]/g, 'border-blue-100');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
