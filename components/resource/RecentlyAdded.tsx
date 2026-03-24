// components/resource/RecentlyAdded.tsx

import { Clock } from 'lucide-react';
import PricingBadge from '@/components/shared/PricingBadge';
import { cn } from '@/lib/utils';

interface RecentlyAddedProps {
  resources: Array<{
    id: string;
    name: string;
    description?: string | null;
    url: string;
    pricing: string;
    logoLetter?: string | null;
    logoColor?: string | null;
    createdAt: string | Date;
  }>;
}

/**
 * Helper function to calculate relative time from a given date.
 *
 * @param {string | Date} date - The date to compare with the current date.
 * @returns A string representing the relative time ago.
 */
function getTimeAgo(date: string | Date): string {
  const createdDate = new Date(date);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - createdDate.getTime()) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return `${Math.floor(interval)}y ago`;

  interval = seconds / 2592000;
  if (interval > 1) return `${Math.floor(interval)}m ago`;

  interval = seconds / 86400;
  if (interval > 1) return `${Math.floor(interval)}d ago`;

  interval = seconds / 3600;
  if (interval > 1) return `${Math.floor(interval)}h ago`;

  interval = seconds / 60;
  if (interval > 1) return `${Math.floor(interval)}m ago`;

  return `${Math.floor(seconds)}s ago`;
}

/**
 * RecentlyAdded component for displaying a list of recently added resources.
 *
 * @param {RecentlyAddedProps} props - The properties for the RecentlyAdded component.
 * @returns A div element containing the list of recently added resources.
 */
const RecentlyAdded = ({ resources }: RecentlyAddedProps) => {
  return (
    <div
      className={cn(
        'rounded-xl border bg-card p-4',
        'dark:border-[#0F3460] light:border-[#E5E7EB]',
        'shadow-sm'
      )}
    >
      <div className="flex items-center gap-2 mb-4">
        <Clock size={16} className="text-[#E94560]" />
        <span className="text-sm font-semibold text-foreground">Recently Added</span>
      </div>
      <div className="flex flex-col gap-1">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className={cn(
              'flex items-center gap-3 p-2 rounded-lg',
              'hover:bg-accent transition-colors cursor-pointer'
            )}
          >
            <div
              style={{
                backgroundColor: (resource.logoColor ?? '#E94560') + '18',
              }}
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            >
              <span
                style={{ color: resource.logoColor ?? '#E94560' }}
                className="text-sm font-bold"
              >
                {resource.logoLetter}
              </span>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-foreground truncate">
                  {resource.name}
                </p>
                <PricingBadge
                  pricing={resource.pricing}
                  size="sm"
                  className="text-[9px]"
                />
              </div>
              {resource.description && (
                <p className="text-xs text-muted-foreground truncate">
                  {resource.description}
                </p>
              )}
              <span className="flex-shrink-0 text-[10px] text-muted-foreground">
                {getTimeAgo(resource.createdAt)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyAdded;