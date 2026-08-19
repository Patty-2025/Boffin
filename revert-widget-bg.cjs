const fs = require('fs');

const filesToRevert = [
  './src/components/OrderFormWidget.tsx',
  './src/pages/CitationGenerator.tsx',
  './src/pages/EssayChecker.tsx',
  './src/pages/EssayTyper.tsx',
  './src/pages/FactoringCalculator.tsx',
  './src/pages/NewAssignment.tsx',
  './src/pages/Offers.tsx',
  './src/pages/ParaphrasingTool.tsx',
  './src/pages/PdfSummarizer.tsx',
  './src/pages/PlagiarismChecker.tsx',
  './src/pages/WordCounter.tsx'
];

filesToRevert.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Order forms and widgets
    content = content.replace(/className="bg-white p-3 sm:p-4/g, 'className="bg-[#f0e6d2] p-3 sm:p-4');
    
    // Offers
    content = content.replace(/className="bg-white p-12 rounded-\[64px\]/g, 'className="bg-[#f0e6d2] p-12 rounded-[64px]');
    content = content.replace(/border border-slate-100 relative/g, 'border border-[#e5dbc2] relative');

    fs.writeFileSync(file, content, 'utf8');
    console.log(`Reverted background in ${file}`);
  }
});
