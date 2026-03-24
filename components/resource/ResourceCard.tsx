// components/resource/ResourceCard.tsx

import React from 'react';
import { Resource } from '@/types/index';
import PricingBadge from '@/components/shared/PricingBadge';
import { ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ResourceCardProps {
  resource: Resource;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const logoColorWithOpacity = (resource.logoColor ?? '#E94560') + '18';
  const logoTextColor = resource.logoColor ?? '#E94560';
  const firstLetter =
    resource.logoLetter || resource.name.charAt(0).toUpperCase();

  return (
    <div
      className={cn(
        'relative group rounded-xl border p-4 transition-all duration-200 cursor-pointer',
        'dark:bg-[#16213E] border-[#0F3460]',
        'light:bg-white border-[#E5E7EB] shadow-sm',
        'hover:border-[#E94560] hover:scale-[1.02]'
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          style={{ backgroundColor: logoColorWithOpacity, color: logoTextColor }}
          className="w-11 h-11 rounded-xl flex items-center justify-center text-lg font-bold"
        >
          {firstLetter}
        </div>
        <Link href={resource.url} target="_blank" rel="noopener noreferrer">
          <ExternalLinkIcon
            className={cn(
              'w-7 h-7 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity',
              'dark:bg-white/5 hover:bg-white/10',
              'light:bg-black/5 hover:bg-black/10'
            )}
          />
        </Link>
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