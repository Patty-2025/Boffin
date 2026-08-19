const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('boffinglobal.html', 'utf8');
const $ = cheerio.load(html);
const links = $('.js--mention-mobile a');

let svgCode = '';
links.each((i, el) => {
  const href = $(el).attr('href');
  const svg = $(el).html().replace(/class=/g, 'className=').replace(/clip-path/g, 'clipPath').replace(/fill-rule/g, 'fillRule').replace(/clip-rule/g, 'clipRule');
  svgCode += `
        <a 
          className="text-[#8cabca] border px-5 py-6 border-solid rounded-[3px] border-[#dde6ef] w-fit hover:text-[#0080d1] transition-colors flex items-center justify-center shrink-0 hover:border-[#8cabca] hover:bg-[#f3f7fa]" 
          href="${href}" 
          target="_blank" 
          rel="nofollow"
        >
          ${svg}
        </a>`;
});

const componentCode = `import React from 'react';

export const FeaturedLogos = () => {
  return (
    <section className="animate-appear-0 py-8 bg-transparent">
      <div className="max-w-[1000px] mx-auto px-6 relative z-10">
        <h2 className="text-center mx-auto text-[#424242] mb-8 font-serif text-[22px] md:text-[31px] font-bold">
          Our trusted essay writing service <br /> is featured in:
        </h2>
        <div className="flex flex-wrap justify-around gap-2 items-center overflow-auto no-scrollbar">
          ${svgCode}
        </div>
      </div>
    </section>
  );
};
`;

fs.writeFileSync('src/components/FeaturedLogos.tsx', componentCode);
console.log("Wrote src/components/FeaturedLogos.tsx");
