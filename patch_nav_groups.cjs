const fs = require('fs');
let code = fs.readFileSync('src/components/Navbar.tsx', 'utf-8');

const groups = [
  {
    title: "Academic Writing",
    items: [
      { title: "Assignment Writing", href: "/order" },
      { title: "Dissertation Writing", href: "/order" },
      { title: "Thesis Writing", href: "/order" },
      { title: "Coursework Writing", href: "/order" },
      { title: "Research Paper", href: "/order" },
      { title: "IB Extended Essay", href: "/order" },
      { title: "College Essay Help", href: "/order" },
      { title: "Admission Essay", href: "/order" },
      { title: "Personal Statement Help", href: "/order" },
      { title: "SOP Writing", href: "/order" },
      { title: "Editing Proofreading", href: "/order" }
    ]
  },
  {
    title: "Professional & Business",
    items: [
      { title: "MBA Project Assignment", href: "/order" },
      { title: "DBA Writing Help", href: "/order" },
      { title: "Accounting Assignment", href: "/order" },
      { title: "CIPD Assignment Help", href: "/order" },
      { title: "CIPP Assignment Help", href: "/order" },
      { title: "ILM Assignment Help", href: "/order" },
      { title: "ATHE Assignment Help", href: "/order" },
      { title: "OTHM Assignment Help", href: "/order" },
      { title: "BTEC Assignment Help", href: "/order" },
      { title: "CDR Report", href: "/order" },
      { title: "CV Writing", href: "/order" }
    ]
  },
  {
    title: "Technical & Regional",
    items: [
      { title: "Code Debugging & Optimization", href: "/code-debugging" },
      { title: "Data Analysis & Visualization", href: "/data-analysis" },
      { title: "Engineering Simulations", href: "/engineering-simulations" },
      { title: "Software Architecture Plan", href: "/software-architecture" },
      { title: "Technical Documentation", href: "/technical-documentation" },
      { title: "Technical Assignment Guidance", href: "/assignment-guidance" },
      { title: "Homework Help Dubai", href: "/order" },
      { title: "Oman Assignment Essay", href: "/order" },
      { title: "University Assignment Help", href: "/order" },
      { title: "Open University Assignment", href: "/order" },
      { title: "Online Exam Help", href: "/order" },
      { title: "Powerpoint Presentation", href: "/order" }
    ]
  }
];

// Replaces the Desktop Services Dropdown
const desktopRegex = /\{\/\* Desktop Services Dropdown \*\/\}[\s\S]*?<\/motion\.div>\s*\)\}/;

const desktopReplacement = `{\/\* Desktop Services Dropdown \*\/}
                {link.name === 'Services' && link.isDropdown && activeDesktopDropdown === 'Services' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full -left-40 w-[850px] bg-white border border-slate-200 shadow-2xl z-50 rounded-2xl p-6 mt-1"
                  >
                    <div className="grid grid-cols-3 gap-6">
                      ${groups.map(group => `
                      <div>
                        <h4 className="text-[13px] font-black text-slate-900 mb-3 uppercase tracking-wider border-b border-slate-100 pb-2">${group.title}</h4>
                        <div className="space-y-1">
                          ${group.items.map(item => `
                          <Link 
                            to="${item.href}"
                            onClick={() => setActiveDesktopDropdown(null)}
                            className="flex items-center gap-2 py-1.5 px-2 -mx-2 rounded-lg text-[14px] font-medium text-slate-600 hover:text-amber-600 hover:bg-amber-50 transition-colors group"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-amber-500 transition-colors shrink-0"></div>
                            ${item.title}
                          </Link>
                          `).join('')}
                        </div>
                      </div>
                      `).join('')}
                    </div>
                  </motion.div>
                )}`;

code = code.replace(desktopRegex, desktopReplacement);

// Replaces the Mobile Services Dropdown
const mobileRegex = /\{\/\* Mobile Services Dropdown \*\/\}[\s\S]*?<\/div>\s*<\/div>\s*\)\}/;

const mobileReplacement = `{\/\* Mobile Services Dropdown \*\/}
                    {link.name === 'Services' && link.isDropdown && (
                      <div className={\`overflow-hidden transition-all duration-300 overflow-y-auto \${activeMobileDropdown === 'Services' ? 'max-h-[450px] opacity-100 pb-3' : 'max-h-0 opacity-0'}\`}>
                        <div className="bg-slate-50 rounded-xl p-4 space-y-4">
                          ${groups.map(group => `
                          <div>
                            <h4 className="text-[11px] font-black text-slate-900 mb-2 uppercase tracking-wider text-amber-600">${group.title}</h4>
                            <div className="space-y-1">
                              ${group.items.map(item => `
                              <Link 
                                to="${item.href}" 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block py-1.5 px-2 -mx-2 rounded-lg text-sm font-medium text-slate-600 hover:text-amber-600 hover:bg-white transition-colors"
                              >
                                ${item.title}
                              </Link>
                              `).join('')}
                            </div>
                          </div>
                          `).join('')}
                        </div>
                      </div>
                    )}`;

code = code.replace(mobileRegex, mobileReplacement);

fs.writeFileSync('src/components/Navbar.tsx', code);
console.log('patched navigation with groups');
