const fs = require('fs');

async function extract() {
  try {
    const res = await fetch('https://boffinglobal.com/');
    const text = await res.text();
    const match = text.match(/<section class="animate-appear-0">[\s\S]*?<\/section>/);
    if (match) {
      let html = match[0];
      // convert to jsx
      html = html.replace(/class=/g, 'className=')
                 .replace(/clip-path=/g, 'clipPath=')
                 .replace(/fill-rule=/g, 'fillRule=')
                 .replace(/stroke-width=/g, 'strokeWidth=')
                 .replace(/stroke-linecap=/g, 'strokeLinecap=')
                 .replace(/stroke-linejoin=/g, 'strokeLinejoin=');
      
      const component = `import React from 'react';\n\nexport const FeaturedLogos = () => {\n  return (\n    ${html}\n  );\n};\n`;
      fs.writeFileSync('src/components/FeaturedLogos.tsx', component);
      console.log('Successfully extracted logos to src/components/FeaturedLogos.tsx');
    } else {
      console.log('Could not find the section in boffinglobal.com');
    }
  } catch (e) {
    console.error(e);
  }
}

extract();
