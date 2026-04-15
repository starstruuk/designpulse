'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Clock } from 'lucide-react';
import PricingBadge from '@/components/shared/PricingBadge';
import { cn } from '@/lib/utils';

interface RecentlyAddedResource {
  id: string;
  name: string;
  description?: string | null;
  url: string;
  pricing: string;
  logoLetter?: string | null;
  logoColor?: string | null;
  createdAt: string | Date;
}

interface RecentlyAddedProps {
  resources: RecentlyAddedResource[];
}

function getTimeAgo(date: string | Date): string {
  const createdDate = new Date(date);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - createdDate.getTime()) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return `${Math.floor(interval)}y ago`;
  interval = seconds / 2592000;
  if (interval > 1) return `${Math.floor(interval)}mo ago`;
  interval = seconds / 86400;
  if (interval > 1) return `${Math.floor(interval)}d ago`;
  interval = seconds / 3600;
  if (interval > 1) return `${Math.floor(interval)}h ago`;
  interval = seconds / 60;
  if (interval > 1) return `${Math.floor(interval)}m ago`;
  return `${Math.floor(seconds)}s ago`;
}

function getDomain(url: string): string {
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return ''; }
}

function ResourceIcon({ resource }: { resource: RecentlyAddedResource }) {
  const [error, setError] = useState(false);
  const domain = getDomain(resource.url);
  const faviconUrl = domain ? `https://favicon.im/${domain}` : null;
  const bg = (resource.logoColor ?? '#E94560') + '18';
  const color = resource.logoColor ?? '#E94560';
  const letter = resource.logoLetter || resource.name.charAt(0).toUpperCase();

  if (faviconUrl && !error) {
    return (
      <div className="w-9 h-9 rounded-lg overflow-hidden bg-white dark:bg-[#1F2B4A] flex items-center justify-center border border-black/8 dark:border-white/6 shrink-0">
        <Image
          src={faviconUrl}
          alt={`${resource.name} logo`}
          width={36}
          height={36}
          className="object-contain w-full h-full"
          onError={() => setError(true)}
          unoptimized
        />
      </div>
    );
  }

  return (
    <div
      style={{ backgroundColor: bg, color }}
      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold"
    >
      {letter}
    </div>
  );
}

const RecentlyAdded = ({ resources }: RecentlyAddedProps) => {
  return (
    <div className={cn('rounded-xl border bg-card p-4', 'border-[#E5E7EB] dark:border-[#0F3460]', 'shadow-sm')}>
      <div className="flex items-center gap-2 mb-4">
        <Clock size={16} className="text-[#E94560]" />
        <span className="text-sm font-semibold text-foreground">Recently Added</span>
      </div>
      <div className="flex flex-col gap-1">
        {resources.map((resource) => (
          <a
            key={resource.id}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn('flex items-center gap-3 p-2 rounded-lg', 'hover:bg-accent transition-colors cursor-pointer')}
          >
            <ResourceIcon resource={resource} />
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-foreground truncate">{resource.name}</p>
                <PricingBadge pricing={resource.pricing} size="sm" className="text-[9px]" />
              </div>
              {resource.description && (
                <p className="text-xs text-muted-foreground truncate">{resource.description}</p>
              )}
              <span className="text-[10px] text-muted-foreground">{getTimeAgo(resource.createdAt)}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default RecentlyAdded;
