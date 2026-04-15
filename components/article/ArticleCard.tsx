'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Article } from '@/types';

const DISCIPLINE_COLORS: Record<string, string> = {
  product:     '#8B5CF6',
  ai:          '#06B6D4',
  graphic:     '#F97316',
  visual:      '#EC4899',
  motion:      '#10B981',
  interaction: '#FBBF24',
  ux:          '#EF4444',
  ui:          '#14B8A6',
};

// Deterministic gradient per source so cards without images still look distinct

interface ArticleCardProps {
  article: Article;
  isBookmarked?: boolean;
  onBookmark?: () => void;
}

/**
 * Article card for the feed grid. Links to the internal article detail page.
 */
export default function ArticleCard({ article, isBookmarked = false, onBookmark }: ArticleCardProps) {
  const [imgError, setImgError]  = useState(false);
  const firstDiscipline = article.disciplines?.[0]?.discipline;
  const sourceName      = article.source?.name ?? '';
  const disciplineColor = DISCIPLINE_COLORS[firstDiscipline?.slug ?? ''] ?? '#E94560';
  const gradient        = `linear-gradient(135deg,${disciplineColor} 0%,#1A1A2E 100%)`;

  const relativeTime = article.publishedAt
    ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })
    : null;

  return (
    <div className={cn(
      'group relative rounded-xl border overflow-hidden cursor-pointer',
      'bg-white border-[#E5E7EB] shadow-sm',
      'dark:bg-[#16213E] dark:border-[#0F3460]',
      'hover:border-[#E94560] hover:scale-[1.02] hover:shadow-xl transition-all duration-200',
    )}>
      {/* Thumbnail */}
      <Link href={`/articles/${article.id}`} className="block">
        <div className="relative h-44 overflow-hidden">
          {article.imageUrl && !imgError ? (
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              unoptimized
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full transition-transform group-hover:scale-105" style={{ background: gradient }} />
          )}

          {/* Bookmark button top-right */}
          <button
            onClick={(e) => { e.preventDefault(); onBookmark?.(); }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
            style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
          >
            <Bookmark
              className="size-4"
              style={{
                color: isBookmarked ? '#E94560' : 'rgba(255,255,255,0.7)',
                fill:  isBookmarked ? '#E94560' : 'none',
              }}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2 gap-2">
            <span className="text-[11px] font-medium text-muted-foreground truncate">{sourceName}</span>
            {relativeTime && (
              <span className="text-[11px] text-muted-foreground shrink-0">{relativeTime}</span>
            )}
          </div>

          <h3 className="text-[15px] font-semibold leading-snug text-foreground line-clamp-2 mb-2 transition-colors group-hover:text-[#E94560]">
            {article.title}
          </h3>

          {article.excerpt && (
            <p className="text-[12.5px] leading-relaxed text-muted-foreground line-clamp-2 mb-3">
              {article.excerpt}
            </p>
          )}

          {firstDiscipline && (
            <span
              className="inline-block px-2.5 py-1 rounded-full text-white text-[11px] font-semibold"
              style={{ backgroundColor: DISCIPLINE_COLORS[firstDiscipline.slug] ?? '#E94560' }}
            >
              {firstDiscipline.name}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}
