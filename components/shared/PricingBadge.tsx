// components/shared/PricingBadge.tsx

import { cn } from '@/lib/utils';

interface PricingBadgeProps {
  pricing: string;
  size?: 'sm' | 'md'; // default "sm"
  className?: string; // Add this line to include the className prop
}

const PRICING_CONFIG: Record<string, { color: string; bg: string }> = {
  FREE: { color: '#22C55E', bg: 'rgba(34,197,94,0.12)' },
  FREEMIUM: { color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' },
  PAID: { color: '#3B82F6', bg: 'rgba(59,130,246,0.12)' }
};

/**
 * PricingBadge component for displaying pricing information.
 *
 * @param {PricingBadgeProps} props - The properties for the PricingBadge component.
 * @returns A span element representing the pricing badge.
 */
const PricingBadge = ({ pricing, size = 'sm', className }: PricingBadgeProps) => {
  const config = PRICING_CONFIG[pricing.toUpperCase()] || PRICING_CONFIG.FREE;
  const label = pricing.charAt(0).toUpperCase() + pricing.slice(1).toLowerCase();

  return (
    <span
      className={cn(
        'rounded-full font-semibold inline-block',
        size === 'sm' ? 'px-2.5 py-1 text-[10px]' : 'px-3 py-1 text-xs',
        className // Add this line to include the className prop in the final class list
      )}
      style={{ backgroundColor: config.bg, color: config.color }}
    >
      {label}
    </span>
  );
};

export default PricingBadge;