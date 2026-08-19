import React from 'react';
import { Link } from 'react-router-dom';

export interface LinkTarget {
  word: string;
  type: 'link' | 'highlight';
  path?: string;
}

export const renderTextWithLinks = (text: string, targets: LinkTarget[], seenWords: Set<string>) => {
  if (!text) return null;
  
  // Create a regex from all target words
  const sortedTargets = [...targets].sort((a, b) => b.word.length - a.word.length);
  const regexString = sortedTargets.map(t => t.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  
  if (!regexString) return text;
  
  const regex = new RegExp(`(${regexString})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, i) => {
    const lowerPart = part.toLowerCase();
    const target = sortedTargets.find(t => t.word.toLowerCase() === lowerPart);

    if (target) {
      if (!seenWords.has(target.word.toLowerCase())) {
        seenWords.add(target.word.toLowerCase());
        
        if (target.type === 'highlight') {
          return <span key={i} className="text-emerald-500 font-medium">{part}</span>;
        } else if (target.type === 'link') {
          return (
            <Link key={i} to={target.path!} className="text-emerald-500 hover:underline font-semibold cursor-pointer">
              {part}
            </Link>
          );
        }
      }
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
};
