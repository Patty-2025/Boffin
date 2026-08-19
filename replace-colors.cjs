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
  
  // Unify Oranges
  if (content.includes('#ea580c')) {
    content = content.replace(/#ea580c/g, '#f47321');
    changed = true;
  }
  
  // Unify Orange hovers
  if (content.includes('#c2410a')) {
    content = content.replace(/#c2410a/g, '#e0651a');
    changed = true;
  }

  if (content.includes('#c2410b')) {
    content = content.replace(/#c2410b/g, '#e0651a');
    changed = true;
  }
  
  if (content.includes('#c2410c')) {
    content = content.replace(/#c2410c/g, '#e0651a');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
