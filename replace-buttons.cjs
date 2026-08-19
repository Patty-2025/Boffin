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

  // Patterns to replace with dark blue and orange hover
  const patterns = [
    /bg-\[#f47321\]\s+hover:bg-\[#e0651a\]/g,
    /bg-\[#f47321\]\s+text-white\s+px-4\s+xl:px-6\s+py-2\s+xl:py-2.5\s+hover:bg-\[#e0651a\]/g,
    /bg-\[#f47321\]\s+text-white\s+px-4\s+py-3.5\s+hover:bg-\[#e0651a\]/g,
    /bg-blue-600\s+hover:bg-\[#1a1f71\]/g,
    /bg-blue-600\s+text-white\s+p-4\s+rounded-full\s+shadow-lg\s+hover:bg-\[#1a1f71\]/g,
    /bg-blue-600\s+flex\s+items-center\s+justify-center\s+gap-2\s+text-white\s+py-3\s+rounded-xl\s+text-sm\s+font-bold\s+hover:bg-blue-700/g,
    /bg-blue-600\s+text-white\s+p-3\s+rounded-xl\s+hover:bg-blue-700/g,
    /bg-\[#1a1f71\]\s+hover:bg-\[#1a1f71\]\/90/g,
    /bg-\[#1a1f71\]\s+hover:bg-slate-900/g,
    /bg-\[#f47321\]\s+text-white\s+px-8\s+py-3\s+rounded-xl\s+font-bold\s+shadow-lg\s+shadow-\[#f47321\]\/20\s+transition-all\s+hover:bg-\[#e0651a\]/g,
    /bg-\[#f47321\]\s+text-white\s+px-6\s+py-2.5\s+rounded-xl\s+flex\s+items-center\s+justify-center\s+gap-2\s+font-bold\s+transition-all\s+shadow-md\s+shadow-\[#f47321\]\/20\s+hover:bg-\[#e0651a\]/g
  ];

  // Specific string replacements based on grep output
  const specificReplacements = [
    { from: 'bg-[#f47321] hover:bg-[#e0651a]', to: 'bg-[#1a1f71] hover:bg-[#f47321]' },
    { from: 'bg-[#f47321] text-white px-4 xl:px-6 py-2 xl:py-2.5 hover:bg-[#e0651a]', to: 'bg-[#1a1f71] text-white px-4 xl:px-6 py-2 xl:py-2.5 hover:bg-[#f47321]' },
    { from: 'bg-[#f47321] text-white px-4 py-3.5 hover:bg-[#e0651a]', to: 'bg-[#1a1f71] text-white px-4 py-3.5 hover:bg-[#f47321]' },
    { from: 'bg-blue-600 hover:bg-[#1a1f71]', to: 'bg-[#1a1f71] hover:bg-[#f47321]' },
    { from: 'bg-blue-600 text-white font-bold py-2.5 rounded text-sm hover:bg-[#1a1f71]', to: 'bg-[#1a1f71] text-white font-bold py-2.5 rounded text-sm hover:bg-[#f47321]' },
    { from: 'bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-[#1a1f71]', to: 'bg-[#1a1f71] text-white p-4 rounded-full shadow-lg hover:bg-[#f47321]' },
    { from: 'bg-blue-600 flex items-center justify-center gap-2 text-white py-3 rounded-xl text-sm font-bold hover:bg-blue-700', to: 'bg-[#1a1f71] flex items-center justify-center gap-2 text-white py-3 rounded-xl text-sm font-bold hover:bg-[#f47321]' },
    { from: 'bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700', to: 'bg-[#1a1f71] text-white p-3 rounded-xl hover:bg-[#f47321]' },
    { from: 'bg-[#1a1f71] hover:bg-[#1a1f71]/90', to: 'bg-[#1a1f71] hover:bg-[#f47321]' },
    { from: 'bg-[#1a1f71] hover:bg-slate-900', to: 'bg-[#1a1f71] hover:bg-[#f47321]' },
    { from: 'bg-[#f47321] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-[#f47321]/20 transition-all hover:bg-[#e0651a]', to: 'bg-[#1a1f71] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-[#f47321]/20 transition-all hover:bg-[#f47321]' },
    { from: 'bg-[#f47321] text-white px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 font-bold transition-all shadow-md shadow-[#f47321]/20 hover:bg-[#e0651a]', to: 'bg-[#1a1f71] text-white px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 font-bold transition-all shadow-md hover:bg-[#f47321] transition-all' }
  ];

  let newContent = content;
  specificReplacements.forEach(rep => {
    if (newContent.includes(rep.from)) {
      newContent = newContent.split(rep.from).join(rep.to);
      changed = true;
    }
  });

  if (changed) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log(`Updated ${file}`);
  }
});
