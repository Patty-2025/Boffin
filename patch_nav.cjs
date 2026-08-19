const fs = require('fs');
let code = fs.readFileSync('src/components/Navbar.tsx', 'utf-8');

const services = [
  { name: "Assignment Writing", href: "/order" },
  { name: "IB Extended Essay", href: "/order" },
  { name: "ATHE Assignment Help", href: "/order" },
  { name: "Coursework Writing", href: "/order" },
  { name: "Open University Assignment", href: "/order" },
  { name: "Accounting Assignment", href: "/order" },
  { name: "Dissertation Writing", href: "/order" },
  { name: "CIPD Assignment Help", href: "/order" },
  { name: "OTHM Assignment Help", href: "/order" },
  { name: "MBA Project Assignment", href: "/order" },
  { name: "Homework Help Dubai", href: "/order" },
  { name: "CIPP Assignment Help", href: "/order" },
  { name: "Thesis Writing", href: "/order" },
  { name: "University Assignment Help", href: "/order" },
  { name: "Oman Assignment Essay", href: "/order" },
  { name: "Editing Proofreading", href: "/order" },
  { name: "ILM Assignment Help", href: "/order" },
  { name: "College Essay Help", href: "/order" },
  { name: "Research Paper", href: "/order" },
  { name: "CV Writing", href: "/order" },
  { name: "Online Exam Help", href: "/order" },
  { name: "Personal Statement Help", href: "/order" },
  { name: "BTEC Assignment Help", href: "/order" },
  { name: "Admission Essay", href: "/order" },
  { name: "Powerpoint Presentation", href: "/order" },
  { name: "DBA Writing Help", href: "/order" },
  { name: "CDR Report", href: "/order" },
  { name: "SOP Writing", href: "/order" }
];

const mobileRegex = /<div className=\{`overflow-hidden transition-all duration-300 \$\{activeMobileDropdown === 'Services' \? 'max-h-\[500px\] opacity-100 pb-3' : 'max-h-0 opacity-0'\}`\}>\s*<div className="bg-slate-50 rounded-xl p-2 space-y-1">\s*\{\[\s*\{ title: 'Code Debugging & Optimization'[\s\S]*?\]\.map\(service => \(\s*<Link[\s\S]*?<\/Link>\s*\)\)\}\s*<\/div>\s*<\/div>/g;

const newMobile = `<div className={\`overflow-hidden transition-all duration-300 overflow-y-auto \${activeMobileDropdown === 'Services' ? 'max-h-[350px] opacity-100 pb-3' : 'max-h-0 opacity-0'}\`}>
                        <div className="bg-slate-50 rounded-xl p-2 grid grid-cols-1 gap-1">
                          {[
${services.map(s => `                            { title: "${s.name}", href: "${s.href}" }`).join(',\n')}
                          ].map(service => (
                            <Link 
                              key={service.title} 
                              to={service.href} 
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block py-2 px-3 text-sm font-semibold text-slate-600 hover:text-amber-600 hover:bg-white rounded-lg transition-colors"
                            >
                              {service.title}
                            </Link>
                          ))}
                        </div>
                      </div>`;

code = code.replace(mobileRegex, newMobile);

const desktopRegex = /<motion\.div\s*initial=\{\{ opacity: 0, y: 10, scale: 0\.98 \}\}\s*animate=\{\{ opacity: 1, y: 0, scale: 1 \}\}\s*exit=\{\{ opacity: 0, y: 10, scale: 0\.98 \}\}\s*transition=\{\{ duration: 0\.2 \}\}\s*className="absolute top-full left-0 w-80 bg-white border border-slate-200 shadow-2xl z-50 rounded-2xl p-3 mt-1"\s*>\s*<div className="space-y-1">\s*\{\[\s*\{ title: 'Code Debugging & Optimization'[\s\S]*?\]\.map\(\(item\) => \{[\s\S]*?<\/Link>\s*\);\s*\}\)\}\s*<\/div>\s*<\/motion\.div>/g;

const newDesktop = `<motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full -left-20 w-[600px] bg-white border border-slate-200 shadow-2xl z-50 rounded-2xl p-4 mt-1"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      {[
${services.map(s => `                        { title: "${s.name}", href: "${s.href}" }`).join(',\n')}
                      ].map((item) => (
                        <Link 
                          key={item.title} 
                          to={item.href}
                          onClick={() => setActiveDesktopDropdown(null)}
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-amber-50/60 transition-all group"
                        >
                          <div className="w-2 h-2 rounded-full bg-amber-200 group-hover:bg-amber-500 transition-colors shrink-0"></div>
                          <h5 className="text-sm font-bold text-slate-700 group-hover:text-amber-600 transition-colors">{item.title}</h5>
                        </Link>
                      ))}
                    </div>
                  </motion.div>`;

code = code.replace(desktopRegex, newDesktop);

fs.writeFileSync('src/components/Navbar.tsx', code);
console.log('patched');
