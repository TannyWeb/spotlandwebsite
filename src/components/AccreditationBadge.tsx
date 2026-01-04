import * as React from 'react';

interface AccreditationBadgeProps {
  postSlug?: string;
  variant?: 'default' | 'compact';
}

export default function AccreditationBadge({ postSlug, variant = 'default' }: AccreditationBadgeProps) {
  if (!postSlug) return null;

  const badgeUrl = `/news/${postSlug}`;
  const sizeClasses = variant === 'compact' 
    ? 'px-4 py-2 text-sm font-semibold' 
    : 'px-6 py-3 text-base font-bold';
  const iconSize = variant === 'compact' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <a
      href={badgeUrl}
      className={`inline-flex items-center gap-2 bg-[#26a1ab] text-white hover:bg-[#1b7a82] transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 focus:ring-offset-white rounded-full ${sizeClasses}`}
      aria-label="Certified Quality - Learn more about our accreditation"
    >
      <svg 
        className={iconSize}
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" 
        />
      </svg>
      <span>Certified Quality</span>
    </a>
  );
}

