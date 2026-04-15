'use client';

import React, { useState } from 'react';
import { Resource } from '@/types/index';
import PricingBadge from '@/components/shared/PricingBadge';
import { ExternalLinkIcon, Bookmark } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ResourceCardProps {
  resource: Resource;
  isBookmarked?: boolean;
  onBookmark?: () => void;
}

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, isBookmarked = false, onBookmark }) => {
  const [logoError, setLogoError] = useState(false);

  const domain           = getDomain(resource.url);
  const faviconUrl       = domain ? `https://favicon.im/${domain}` : null;
  const showLogo         = faviconUrl && !logoError;
  const logoColorBg      = (resource.logoColor ?? '#E94560') + '18';
  const logoTextColor    = resource.logoColor ?? '#E94560';
  const firstLetter      = resource.logoLetter || resource.name.charAt(0).toUpperCase();

  function handleCardClick(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a')) return;
    window.open(resource.url, '_blank', 'noopener,noreferrer');
  }

  return (
    <div
      onClick={handleCardClick}
      className={cn(
        'relative group rounded-xl border p-4 transition-all duration-200 cursor-pointer',
        'bg-white border-[#E5E7EB] shadow-sm',
        'dark:bg-[#16213E] dark:border-[#0F3460] dark:shadow-black/30',
        'hover:border-[#E94560] hover:scale-[1.02]'
      )}
    >
      <div className="flex items-start justify-between mb-3">
        {/* Logo — real or letter fallback */}
        {showLogo ? (
          <div className="w-11 h-11 rounded-xl overflow-hidden bg-white dark:bg-[#1F2B4A] flex items-center justify-center border border-black/8 dark:border-white/6 shrink-0">
            <Image
              src={faviconUrl}
              alt={`${resource.name} logo`}
              width={44}
              height={44}
              className="object-contain w-full h-full"
              onError={() => setLogoError(true)}
              unoptimized
            />
          </div>
        ) : (
          <div
            style={{ backgroundColor: logoColorBg, color: logoTextColor }}
            className="w-11 h-11 rounded-xl flex items-center justify-center text-lg font-bold shrink-0"
          >
            {firstLetter}
          </div>
        )}

        <div className="flex items-center gap-1">
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onBookmark?.(); }}
            className={cn(
              'p-1.5 rounded-lg transition-all',
              isBookmarked
                ? 'opacity-100'
                : 'opacity-0 group-hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10'
            )}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark tool'}
          >
            <Bookmark
              className="w-4 h-4"
              style={{
                color: isBookmarked ? '#E94560' : undefined,
                fill:  isBookmarked ? '#E94560' : 'none',
              }}
            />
          </button>
          <Link
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/5 dark:hover:bg-white/10"
          >
            <ExternalLinkIcon className="w-4 h-4 text-muted-foreground" />
          </Link>
        </div>
      </div>

      <h3 className="text-sm font-semibold text-foreground mb-1">
        {resource.name}
      </h3>
      {resource.description && (
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
          {resource.description}
        </p>
      )}
      <div className="flex items-center gap-2 flex-wrap">
        <PricingBadge pricing={resource.pricing} />
        <span
          style={{
            backgroundColor: (resource.category.color ?? '#E94560') + '15',
            color: resource.category.color ?? '#E94560',
          }}
          className="text-[10px] px-2.5 py-1 rounded-full font-medium"
        >
          {resource.category.name}
        </span>
      </div>
    </div>
  );
};

export default ResourceCard;
