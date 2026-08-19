import React from 'react';
import { Star } from 'lucide-react';
import mahLogo from '../assets/trusted-logos/mah-logo.png';
import sitejabberLogo from '../assets/trusted-logos/sitejabber-logo.png';
import reviewsIoLogo from '../assets/trusted-logos/reviews-io-logo.png';

const RatingStars = ({ rating, colorClass }: { rating: number; colorClass: string }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= Math.floor(rating);
        return (
          <Star
            key={star}
            size={16}
            fill={isFilled ? 'currentColor' : 'none'}
            className={`${
              isFilled ? colorClass : 'text-[#d1d5db]'
            }`}
          />
        );
      })}
    </div>
  );
};

export default function TrustedLogos() {
  const platforms = [
    { name: 'Boffin Global Services', logo: mahLogo, rating: 4.9, color: 'text-[#ffc107]' }, // Elegant bright yellow
    { name: 'Sitejabber', logo: sitejabberLogo, rating: 4.8, color: 'text-[#ff9c00]' }, // Vivid Sitejabber orange
    { name: 'Reviews.io', logo: reviewsIoLogo, rating: 4.9, color: 'text-[#00b67a]' }, // Reviews.io bright brand green
  ];

  return (
    <div className="mb-0">
      <div className="text-sm md:text-base text-slate-500 font-medium mb-5 text-center lg:text-left">
        Trusted by <span className="font-bold text-slate-900">1.5M+</span> happy customers
      </div>
      <div className="flex flex-row flex-wrap gap-8 md:gap-12 items-center justify-center lg:justify-start">
        {platforms.map((platform) => (
          <div
            key={platform.name}
            className="flex flex-col items-center gap-2"
          >
            <div className="h-7 flex items-center justify-center">
               <img
                 src={platform.logo}
                 alt={platform.name}
                 className="max-h-full max-w-[125px] object-contain"
                 referrerPolicy="no-referrer"
               />
            </div>
            <div className="flex items-center gap-2">
              <RatingStars rating={platform.rating} colorClass={platform.color} />
              <span className="font-bold text-sm text-slate-800">{platform.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
