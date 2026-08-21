import React from 'react';

interface BrandLogoProps {
  isDarkTheme?: boolean;
}

export default function BrandLogo({ isDarkTheme = false }: BrandLogoProps) {
  return (
    <div className="flex items-center gap-3">
      <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 10L20 2L32 10V30L20 38L8 30V10Z" fill="url(#logo-gradient)" fillOpacity="0.1" stroke="url(#logo-gradient)" strokeWidth="2"/>
          <path d="M20 2V18M8 10L20 18M32 10L20 18M20 18V38M8 30L20 28M32 30L20 28" stroke="url(#logo-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <defs>
            <linearGradient id="logo-gradient" x1="8" y1="2" x2="32" y2="38" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1e293b" />
              <stop offset="1" stopColor="#0f172a" />
            </linearGradient>
          </defs>
      </svg>
    </div>
  );
}
