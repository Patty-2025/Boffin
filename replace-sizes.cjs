const fs = require('fs');
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
  
  if (content.includes('text-[10px]')) {
    content = content.replace(/text-\[10px\]/g, 'text-xs'); 
    changed = true;
  }
  if (content.includes('text-[11px]')) {
    content = content.replace(/text-\[11px\]/g, 'text-xs');
    changed = true;
  }
  if (content.includes('text-[13px]')) {
    content = content.replace(/text-\[13px\]/g, 'text-sm');
    changed = true;
  }
  if (content.includes('text-[12px]')) {
    content = content.replace(/text-\[12px\]/g, 'text-xs');
    changed = true;
  }
  if (content.includes('text-[14px]')) {
    content = content.replace(/text-\[14px\]/g, 'text-sm');
    changed = true;
  }
  if (content.includes('text-[9px]')) {
    content = content.replace(/text-\[9px\]/g, 'text-xs');
    changed = true;
  }
  if (content.includes('text-[8px]')) {
    content = content.replace(/text-\[8px\]/g, 'text-xs');
    changed = true;
  }
  if (content.includes('text-[7px]')) {
    content = content.replace(/text-\[7px\]/g, 'text-xs');
    changed = true;
  }
  if (content.match(/text-\[[4][246]px\]/g)) {
    content = content.replace(/text-\[[4][246]px\]/g, 'text-5xl');
    changed = true;
  }
  if (content.includes('text-[54px]')) {
    content = content.replace(/text-\[54px\]/g, 'text-6xl');
    changed = true;
  }
  if (content.includes('text-[34px]')) {
    content = content.replace(/text-\[34px\]/g, 'text-4xl');
    changed = true;
  }
  if (content.includes('text-[28px]')) {
    content = content.replace(/text-\[28px\]/g, 'text-3xl');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated sizes in ${file}`);
  }
});
