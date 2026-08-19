const fs = require('fs');
let code = fs.readFileSync('src/components/Navbar.tsx', 'utf-8');

// 1. Remove from mainNavLinks
code = code.replace(/\{ name: 'Subjects', href: '\/#subjects', isDropdown: true \},\s*/g, '');

// 2. Remove desktop mega menu
// We need to match: {/* Desktop Subjects Mega Menu */} through to the matching closing tag.
// Since regex can be tricky with nested HTML tags, we'll try to find the start and end indices.

const desktopStartStr = "{/* Desktop Subjects Mega Menu */}";
const desktopStartIdx = code.indexOf(desktopStartStr);

if (desktopStartIdx !== -1) {
  // Find the next comment which might be {/* Desktop Resources Dropdown */} or something similar
  const nextCommentIdx = code.indexOf("{/* Desktop Resources Dropdown */}", desktopStartIdx);
  if (nextCommentIdx !== -1) {
    code = code.substring(0, desktopStartIdx) + code.substring(nextCommentIdx);
  }
}

// 3. Remove mobile dropdown
const mobileStartStr = "{/* Mobile Subjects Dropdown */}";
const mobileStartIdx = code.indexOf(mobileStartStr);

if (mobileStartIdx !== -1) {
  // Find the next condition
  const nextMobileIdx = code.indexOf("{link.name === 'Resources' && link.isDropdown && (", mobileStartIdx);
  if (nextMobileIdx !== -1) {
    code = code.substring(0, mobileStartIdx) + code.substring(nextMobileIdx);
  }
}

fs.writeFileSync('src/components/Navbar.tsx', code);
console.log('patched');
