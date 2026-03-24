'use client';

import { cn } from '@/lib/utils';
import {
  Sparkles, Pen, Star, Type, LayoutGrid, Play,
  Palette, BookOpen, Zap, Camera, CheckSquare, Globe,
  type LucideIcon,
} from 'lucide-react';

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Sparkles, Pen, Star, Type, LayoutGrid, Play,
  Palette, BookOpen, Zap, Camera, CheckSquare, Globe,
};

interface CategoryGridProps {
  categories: Array<{
    name: string;
    slug: string;
    color?: string | null;
    icon?: string | null;
    _count?: { resources: number };
  }>;
  activeCategory: string;
  onSelect: (slug: string) => void;
}

/**
 * Grid of category filter tiles for the resource directory.
 */
export default function CategoryGrid({
  categories,
  activeCategory,
  onSelect,
}: CategoryGridProps) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-6">

      {/* All tile */}
      <Tile
        label="All"
        icon={LayoutGrid}
        isActive={activeCategory === "all"}
        onClick={() => onSelect("all")}
        color="#E94560"
      />

      {/* Category tiles */}
      {categories.map((category) => {
        const Icon = CATEGORY_ICONS[category.icon ?? ""] ?? LayoutGrid;
        return (
          <Tile
            key={category.slug}
            label={category.name}
            icon={Icon}
            isActive={activeCategory === category.slug}
            onClick={() => onSelect(category.slug)}
            color={category.color ?? "#E94560"}
            count={category._count?.resources}
          />
        );
      })}
    </div>
  );
}

// ─── Tile subcomponent ───────────────────────────────────────────
function Tile({
  label,
  icon: Icon,
  isActive,
  onClick,
  color,
  count,
}: {
  label: string;
  icon: LucideIcon;
  isActive: boolean;
  onClick: () => void;
  color: string;
  count?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-xl border p-4 flex flex-col items-center justify-center gap-2",
        "cursor-pointer transition-all duration-200 w-full",
        isActive
          ? "border-[#E94560] bg-[#E94560]/5"
          : "bg-white border-[#E5E7EB] shadow-sm dark:bg-[#16213E] dark:border-[#0F3460]",
        !isActive && "hover:border-[#E94560]/50"
      )}
    >
      <Icon
        className="size-5"
        style={{ color: isActive ? color : undefined }}
        {...(!isActive && { className: "size-5 text-muted-foreground" })}
      />
      <span className="text-xs font-medium text-center text-foreground">
        {label}
      </span>
      {count !== undefined && (
        <span className="text-[10px] text-muted-foreground">{count}</span>
      )}
    </button>
  );
}