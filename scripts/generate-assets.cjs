const fs = require('fs');
const path = require('path');

// 1. /_redesign/assets/img/logo.svg (Dark text for light bg)
const mainLogoDark = `<svg width="210" height="36" viewBox="0 0 210 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_boffin_logo)">
<path d="M24.0012 22.0105C19.6397 23.6935 0 36 0 36H34.3927C30.497 25.7734 46 20 46 20C46 20 28.2809 20.3589 24.0012 22.0105Z" fill="#F89C1C"/>
<path d="M14.1466 15.5C7.08156 18.9635 0 35.9808 0 36H33.7808C26.2723 19.5 43.9556 11 43.9556 11C43.9556 11 21.1692 12.0571 14.1466 15.5Z" fill="#E4666B"/>
<path d="M15.0976 7.40862C7.95038 12.396 0 35.9723 0 36H34.1737C23.8614 19.1963 40.8889 0 40.8889 0C40.8889 0 22.2018 2.45077 15.0976 7.40862Z" fill="url(#paint0_linear_boffin)"/>
</g>
<text x="52" y="24" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="22" letter-spacing="-0.5px" fill="#1A2E44">Boffin<tspan fill="#0080D1">Global</tspan><tspan font-size="10" font-weight="700" dy="5" fill="#0080D1">TM</tspan></text>
<defs>
<linearGradient id="paint0_linear_boffin" x1="24.249" y1="37.3839" x2="24.249" y2="-1.21255" gradientUnits="userSpaceOnUse">
<stop stop-color="#0FB6E9"/>
<stop offset="1" stop-color="#57BFA0"/>
</linearGradient>
<clipPath id="clip0_boffin_logo">
<rect width="46" height="36" fill="white" transform="matrix(1 0 0 -1 0 36)"/>
</clipPath>
</defs>
</svg>`;

// 2. /next/img/logos/boffinglobal.svg & /next/img/logos/boffinglobal.svg (White text for dark bg)
const mainLogoWhite = `<svg width="210" height="36" viewBox="0 0 210 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_boffin_logo_white)">
<path d="M24.0012 22.0105C19.6397 23.6935 0 36 0 36H34.3927C30.497 25.7734 46 20 46 20C46 20 28.2809 20.3589 24.0012 22.0105Z" fill="#F89C1C"/>
<path d="M14.1466 15.5C7.08156 18.9635 0 35.9808 0 36H33.7808C26.2723 19.5 43.9556 11 43.9556 11C43.9556 11 21.1692 12.0571 14.1466 15.5Z" fill="#E4666B"/>
<path d="M15.0976 7.40862C7.95038 12.396 0 35.9723 0 36H34.1737C23.8614 19.1963 40.8889 0 40.8889 0C40.8889 0 22.2018 2.45077 15.0976 7.40862Z" fill="url(#paint0_linear_boffin_white)"/>
</g>
<text x="52" y="24" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="22" letter-spacing="-0.5px" fill="#FFFFFF">Boffin<tspan fill="#38BDF8">Global</tspan><tspan font-size="10" font-weight="700" dy="5" fill="#38BDF8">TM</tspan></text>
<defs>
<linearGradient id="paint0_linear_boffin_white" x1="24.249" y1="37.3839" x2="24.249" y2="-1.21255" gradientUnits="userSpaceOnUse">
<stop stop-color="#0FB6E9"/>
<stop offset="1" stop-color="#57BFA0"/>
</linearGradient>
<clipPath id="clip0_boffin_logo_white">
<rect width="46" height="36" fill="white" transform="matrix(1 0 0 -1 0 36)"/>
</clipPath>
</defs>
</svg>`;

// 3. /next/img/logos/boffinglobal-small.svg & boffinglobal-small.svg
const smallLogo = `<svg width="30" height="26" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.6312 16.4282C12.8815 17.5797 0.5 26 0.5 26L22.1824 26C19.7264 19.0029 29.5 15.0526 29.5 15.0526C29.5 15.0526 18.3293 15.2982 15.6312 16.4282Z" fill="#F89C1C"/>
<path opacity="0.800003" d="M13.1159 10.6954C9.15119 13.3291 0.5 26 0.5 26L22.4091 26C17.0033 14.8129 28.783 7.5753 28.8556 7.52632C28.8556 7.52632 17.2119 7.97535 13.1159 10.6954Z" fill="#E31E26"/>
<path d="M10.256 5.35067C5.6375 8.95267 0.5 25.98 0.5 26L22.5829 26C15.9192 13.864 26.9222 0 26.9222 0C26.9222 0 14.8467 1.77 10.256 5.35067Z" fill="url(#paint0_linear_boffin_small)"/>
<defs>
<linearGradient id="paint0_linear_boffin_small" x1="16.1696" y1="26.9995" x2="16.1696" y2="-0.875733" gradientUnits="userSpaceOnUse">
<stop stop-color="#0FB6E9"/>
<stop offset="1" stop-color="#57BFA0"/>
</linearGradient>
</defs>
</svg>`;

// Favicon SVG
const faviconSvg = `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="64" height="64" rx="16" fill="#1A2E44"/>
<g transform="translate(10, 14) scale(1.4)">
<path d="M15.6312 16.4282C12.8815 17.5797 0.5 26 0.5 26L22.1824 26C19.7264 19.0029 29.5 15.0526 29.5 15.0526C29.5 15.0526 18.3293 15.2982 15.6312 16.4282Z" fill="#F89C1C"/>
<path opacity="0.800003" d="M13.1159 10.6954C9.15119 13.3291 0.5 26 0.5 26L22.4091 26C17.0033 14.8129 28.783 7.5753 28.8556 7.52632C28.8556 7.52632 17.2119 7.97535 13.1159 10.6954Z" fill="#E31E26"/>
<path d="M10.256 5.35067C5.6375 8.95267 0.5 25.98 0.5 26L22.5829 26C15.9192 13.864 26.9222 0 26.9222 0C26.9222 0 14.8467 1.77 10.256 5.35067Z" fill="url(#paint0_linear_fav)"/>
</g>
<defs>
<linearGradient id="paint0_linear_fav" x1="16.1696" y1="26.9995" x2="16.1696" y2="-0.875733" gradientUnits="userSpaceOnUse">
<stop stop-color="#0FB6E9"/>
<stop offset="1" stop-color="#57BFA0"/>
</linearGradient>
</defs>
</svg>`;

fs.mkdirSync('public/_redesign/assets/img', { recursive: true });
fs.mkdirSync('public/next/img/logos', { recursive: true });

fs.writeFileSync('public/_redesign/assets/img/logo.svg', mainLogoDark);
fs.writeFileSync('public/next/img/logos/boffinglobal.svg', mainLogoWhite);
fs.writeFileSync('public/next/img/logos/boffinglobal.svg', mainLogoWhite);
fs.writeFileSync('public/next/img/logos/boffinglobal-small.svg', smallLogo);
fs.writeFileSync('public/next/img/logos/boffinglobal-small.svg', smallLogo);
fs.writeFileSync('public/favicon.svg', faviconSvg);

console.log('Successfully written redesigned logo and favicon files!');
