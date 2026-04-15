'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { Bookmark, TrendingUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
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


interface HeroSectionProps {
  bookmarkedIds: Set<string>;
  onBookmark: (id: string) => void;
}

/**
 * Hero section shown above the main feed — mimics a news front page layout.
 * Fetches its own top stories (mostRead) independently from the feed.
 */
export default function HeroSection({ bookmarkedIds, onBookmark }: HeroSectionProps) {
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [loading, setLoading]   = React.useState(true);

  React.useEffect(() => {
    fetch('/api/articles?sortBy=mostRead&limit=4')
      .then((r) => r.json())
      .then((d) => setArticles(d.articles ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const [featured, ...secondary] = articles;

  return (
    <section className="px-6 pt-6 pb-2">
      {/* Section header */}
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="size-4 text-[#E94560]" />
        <span className="text-xs font-bold uppercase tracking-widest text-[#E94560]">Top Stories</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] gap-4">

        {/* ── Featured article ───────────────────────────────── */}
        {loading ? (
          <Skeleton className="rounded-xl h-[420px]" />
        ) : featured ? (
          <FeaturedCard
            article={featured}
            isBookmarked={bookmarkedIds.has(featured.id)}
            onBookmark={() => onBookmark(featured.id)}
          />
        ) : null}

        {/* ── Secondary articles ─────────────────────────────── */}
        <div className="flex flex-col gap-3">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="rounded-xl h-[126px]" />
              ))
            : secondary.slice(0, 3).map((article) => (
                <SecondaryCard
                  key={article.id}
                  article={article}
                  isBookmarked={bookmarkedIds.has(article.id)}
                  onBookmark={() => onBookmark(article.id)}
                />
              ))}
        </div>
      </div>

      {/* Divider before feed */}
      <div className="mt-6 h-px bg-border" />
    </section>
  );
}

/* ── Featured (large) card ─────────────────────────────────────── */

function FeaturedCard({
  article,
  isBookmarked,
  onBookmark,
}: {
  article: Article;
  isBookmarked: boolean;
  onBookmark: () => void;
}) {
  const firstDiscipline = article.disciplines?.[0]?.discipline;
  const sourceName      = article.source?.name ?? '';
  const disciplineColor = DISCIPLINE_COLORS[firstDiscipline?.slug ?? ''] ?? '#E94560';
  const gradient        = `linear-gradient(135deg,${disciplineColor} 0%,#1A1A2E 100%)`;

  const relativeTime = article.publishedAt
    ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })
    : null;

  return (
    <div className={cn(
      'group relative rounded-xl overflow-hidden cursor-pointer h-[420px]',
      'border border-[#E5E7EB] dark:border-[#0F3460]',
      'hover:border-[#E94560] transition-all duration-200',
    )}>
      {/* Background image or gradient */}
      {article.imageUrl ? (
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized
          priority
        />
      ) : (
        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105" style={{ background: gradient }} />
      )}

      {/* Gradient overlay — stronger at bottom for text legibility */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.4) 45%, rgba(0,0,0,0.08) 100%)' }}
      />

      {/* Source badge — top left */}
      {sourceName && (
        <div className="absolute top-4 left-4">
          <span
            className="px-2.5 py-1 rounded-full text-white text-[10.5px] font-semibold backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          >
            {sourceName}
          </span>
        </div>
      )}

      {/* Bookmark — top right */}
      <button
        onClick={(e) => { e.preventDefault(); onBookmark(); }}
        className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors z-10"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
      >
        <Bookmark
          className="size-4"
          style={{
            color: isBookmarked ? '#E94560' : 'rgba(255,255,255,0.75)',
            fill:  isBookmarked ? '#E94560' : 'none',
          }}
        />
      </button>

      {/* Text content — bottom */}
      <Link href={`/articles/${article.id}`} className="absolute inset-0 flex flex-col justify-end p-5">
        {/* Discipline badge */}
        {firstDiscipline && (
          <span
            className="self-start mb-3 px-2.5 py-1 rounded-full text-white text-[10.5px] font-semibold"
            style={{ backgroundColor: DISCIPLINE_COLORS[firstDiscipline.slug] ?? '#E94560' }}
          >
            {firstDiscipline.name}
          </span>
        )}

        <h2 className="text-white text-xl sm:text-2xl font-bold leading-snug mb-2 line-clamp-3 transition-colors group-hover:text-[#E94560]">
          {article.title}
        </h2>

        {article.excerpt && (
          <p className="text-white/70 text-sm leading-relaxed line-clamp-2 mb-3">
            {article.excerpt}
          </p>
        )}

        {relativeTime && (
          <span className="text-white/50 text-[11px]">{relativeTime}</span>
        )}
      </Link>
    </div>
  );
}

/* ── Secondary (small horizontal) card ────────────────────────── */

function SecondaryCard({
  article,
  isBookmarked,
  onBookmark,
}: {
  article: Article;
  isBookmarked: boolean;
  onBookmark: () => void;
}) {
  const firstDiscipline = article.disciplines?.[0]?.discipline;
  const sourceName      = article.source?.name ?? '';
  const disciplineColor = DISCIPLINE_COLORS[firstDiscipline?.slug ?? ''] ?? '#E94560';
  const gradient        = `linear-gradient(135deg,${disciplineColor} 0%,#1A1A2E 100%)`;

  const relativeTime = article.publishedAt
    ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })
    : null;

  return (
    <div className={cn(
      'group flex rounded-xl overflow-hidden border cursor-pointer',
      'bg-white border-[#E5E7EB]',
      'dark:bg-[#16213E] dark:border-[#0F3460]',
      'hover:border-[#E94560] hover:shadow-md transition-all duration-200',
    )}>
      {/* Thumbnail */}
      <Link href={`/articles/${article.id}`} className="relative shrink-0 w-28 sm:w-32">
        {article.imageUrl ? (
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 transition-transform group-hover:scale-105" style={{ background: gradient }} />
        )}
        {firstDiscipline && (
          <span
            className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded-full text-white text-[9px] font-semibold"
            style={{ backgroundColor: DISCIPLINE_COLORS[firstDiscipline.slug] ?? '#E94560' }}
          >
            {firstDiscipline.name}
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between p-3 min-w-0">
        <Link href={`/articles/${article.id}`}>
          <div className="flex items-center justify-between mb-1 gap-2">
            <span className="text-[10.5px] font-medium text-muted-foreground truncate">{sourceName}</span>
            {relativeTime && (
              <span className="text-[10.5px] text-muted-foreground shrink-0">{relativeTime}</span>
            )}
          </div>
          <h3 className="text-[13.5px] font-semibold leading-snug text-foreground line-clamp-2 transition-colors group-hover:text-[#E94560]">
            {article.title}
          </h3>
        </Link>

        <button
          onClick={(e) => { e.preventDefault(); onBookmark(); }}
          className="self-end mt-1 p-1 rounded-md hover:bg-accent/50 transition-colors"
          aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
        >
          <Bookmark
            className="size-3.5"
            style={{
              color: isBookmarked ? '#E94560' : undefined,
              fill:  isBookmarked ? '#E94560' : 'none',
            }}
          />
        </button>
      </div>
    </div>
  );
}