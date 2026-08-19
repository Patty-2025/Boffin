const fs = require('fs');
let content = fs.readFileSync('src/components/InformationalProse.tsx', 'utf8');

content = content.replace(/<section>/g, '<section className="py-[32px] font-[\\"Open_Sans\\",sans-serif] text-[#424242] text-[14px] leading-[24px]">');
content = content.replace(/className="container max-w-\[1000px\] mx-auto px-6 py-16"/g, 'className="container max-w-[1000px] mx-auto px-6"');
content = content.replace(/className="text-2xl md:text-\[31px\] font-bold text-\[#424242\] mb-6"/g, 'className="text-[20px] md:text-[22px] leading-[26px] md:leading-[31px] font-bold text-[#424242] mb-6"');
content = content.replace(/className="text-2xl md:text-\[31px\] font-bold text-\[#424242\] mb-6 mt-12"/g, 'className="text-[20px] md:text-[22px] leading-[26px] md:leading-[31px] font-bold text-[#424242] mb-6 mt-12"');
content = content.replace(/className="text-\[18px\] text-\[#424242\] mb-4"/g, 'className="text-[16px] md:text-[18px] leading-[29px] text-[#424242] mb-4"');
content = content.replace(/className="variant-h3 text-\[18px\] font-bold text-\[#424242\] mb-2 mt-6"/g, 'className="text-[16px] md:text-[18px] font-bold text-[#424242] mb-2 mt-6"');
content = content.replace(/className="list-disc pl-6 text-\[18px\] text-\[#424242\] space-y-3 mb-8"/g, 'className="list-disc pl-6 text-[16px] md:text-[18px] leading-[29px] text-[#424242] space-y-3 mb-8"');

fs.writeFileSync('src/components/InformationalProse.tsx', content);
console.log('Styles fixed');
