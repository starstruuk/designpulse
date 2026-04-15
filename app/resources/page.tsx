'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import ResourceCard from '@/components/resource/ResourceCard';
import CategoryGrid from '@/components/resource/CategoryGrid';
import RecentlyAdded from '@/components/resource/RecentlyAdded';
import Pagination from '@/components/shared/Pagination';
import PricingBadge from '@/components/shared/PricingBadge';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Search, X, Bookmark, ExternalLink, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { browserClient } from '@/lib/supabase/client';
import { Pricing } from '@/types';

const PRICING_OPTIONS = [
  { label: 'Free',     value: 'FREE',     color: '#22C55E', bg: 'rgba(34,197,94,0.12)'  },
  { label: 'Freemium', value: 'FREEMIUM', color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' },
  { label: 'Paid',     value: 'PAID',     color: '#3B82F6', bg: 'rgba(59,130,246,0.12)' },
];

const PRICING_COLORS: Record<string, string> = {
  FREE:     '#22C55E',
  FREEMIUM: '#F59E0B',
  PAID:     '#3B82F6',
};

// ─── Daily spotlight helpers ──────────────────────────────────────

/** Simple LCG seeded by a string — returns a deterministic [0,1) sequence. */
function seedRandom(seed: string): () => number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0;
  }
  return function () {
    hash = (hash * 1664525 + 1013904223) | 0;
    return (hash >>> 0) / 0xffffffff;
  };
}

/**
 * Picks `count` tools from `pool` using today's date as a seed.
 * The selection is stable within a day and changes daily.
 */
function getDailySpotlight(pool: any[], count: number): any[] {
  if (pool.length <= count) return pool;
  const today = new Date().toISOString().slice(0, 10); // "2026-04-10"
  const rng   = seedRandom(today);
  const chosen = new Set<number>();
  while (chosen.size < count) {
    chosen.add(Math.floor(rng() * pool.length));
  }
  return [...chosen].map((i) => pool[i]);
}

const PRICINGMAP: Record<string, Pricing> = {
  FREE:     Pricing.FREE,
  FREEMIUM: Pricing.FREEMIUM,
  PAID:     Pricing.PAID,
};

/**
 * Resource directory page — filterable by category, pricing, and search.
 * Includes a daily-rotating spotlight section at the top.
 */
export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activePricing, setActivePricing]   = useState('');
  const [search, setSearch]                 = useState('');
  const [resources, setResources]           = useState<any[]>([]);
  const [categories, setCategories]         = useState<any[]>([]);
  const [loading, setLoading]               = useState(true);
  const [page, setPage]                     = useState(1);
  const [totalPages, setTotalPages]         = useState(1);
  const [total, setTotal]                   = useState(0);

  const [bookmarkedIds, setBookmarkedIds]           = useState<Set<string>>(new Set());
  const [bookmarkedResources, setBookmarkedResources] = useState<any[]>([]);
  const [isAuthed, setIsAuthed]                     = useState(false);

  const [spotlight, setSpotlight]           = useState<any[]>([]);
  const [spotlightLoading, setSpotlightLoading] = useState(true);

  // Load auth + bookmarks once on mount
  useEffect(() => {
    browserClient.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      setIsAuthed(true);
      fetch('/api/user/bookmarks')
        .then((r) => r.json())
        .then((data: { resources?: any[] }) => {
          const res = data.resources ?? [];
          setBookmarkedIds(new Set(res.map((r) => r.id)));
          setBookmarkedResources(res);
        })
        .catch(() => {});
    });
  }, []);

  // Fetch categories once on mount
  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data.categories ?? []))
      .catch((err) => console.error('Error fetching categories:', err));
  }, []);

  // Fetch a large pool for the daily spotlight (unfiltered)
  useEffect(() => {
    fetch('/api/resources?limit=60&page=1')
      .then((r) => r.json())
      .then((data) => {
        const all = data.resources ?? [];
        setSpotlight(getDailySpotlight(all, 6));
      })
      .catch(() => {})
      .finally(() => setSpotlightLoading(false));
  }, []);

  // Fetch resources whenever filters or page change
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (activeCategory !== 'all') params.set('category', activeCategory);
    if (activePricing)            params.set('pricing',  activePricing);
    if (search)                   params.set('search',   search);
    params.set('page',  String(page));
    params.set('limit', '40');

    fetch(`/api/resources?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setResources(data.resources ?? []);
        setTotalPages(data.totalPages ?? 1);
        setTotal(data.total ?? 0);
      })
      .catch((err) => console.error('Error fetching resources:', err))
      .finally(() => setLoading(false));
  }, [activeCategory, activePricing, search, page]);

  function handleCategorySelect(slug: string) {
    setActiveCategory(slug);
    setPage(1);
  }

  function handlePricingToggle(pricing: string) {
    setActivePricing((prev) => (prev === pricing ? '' : pricing));
    setPage(1);
  }

  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  async function handleBookmark(resourceId: string) {
    if (!isAuthed) { window.location.href = '/login'; return; }
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      next.has(resourceId) ? next.delete(resourceId) : next.add(resourceId);
      return next;
    });
    await fetch('/api/user/bookmarks', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ resourceId }),
    });
  }

  function resetFilters() {
    setActiveCategory('all');
    setActivePricing('');
    setSearch('');
    setPage(1);
  }

  const recentResources = [...resources]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <main className="flex-1 xl:mr-[280px] p-6">

          {/* Page header */}
          <h1 className="text-2xl font-bold text-foreground">Resource Directory</h1>
          <p className="text-sm text-muted-foreground mt-1 mb-6">
            {total} tools & resources • Updated daily
          </p>

          {/* Search bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search tools, resources, categories…"
              className="pl-10 h-12 rounded-xl w-full"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {search && (
              <button
                onClick={() => handleSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="size-4 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>

          {/* ── Daily Spotlight ── */}
          <div className="mb-7">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Zap className="size-4 text-[#E94560]" />
                <span className="text-sm font-semibold text-foreground">Today&apos;s Spotlight</span>
              </div>
              <span className="text-[10px] text-muted-foreground tracking-wide">Refreshes daily</span>
            </div>

            {spotlightLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
                {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-[88px] rounded-xl" />)}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
                {spotlight.map((tool) => {
                  const logoColor    = tool.logoColor ?? tool.category?.color ?? '#E94560';
                  const pricingColor = PRICING_COLORS[tool.pricing] ?? '#6B7280';
                  return (
                    <a
                      key={tool.id}
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col gap-2 p-3 rounded-xl border border-border bg-card hover:border-[#E94560]/40 hover:shadow-md hover:scale-[1.02] transition-all group"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                          style={{ backgroundColor: logoColor }}
                        >
                          {tool.logoLetter || tool.name[0]?.toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-foreground truncate group-hover:text-[#E94560] transition-colors">
                            {tool.name}
                          </p>
                          <span
                            className="text-[9px] font-bold"
                            style={{ color: pricingColor }}
                          >
                            {tool.pricing}
                          </span>
                        </div>
                      </div>
                      {tool.description && (
                        <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                          {tool.description}
                        </p>
                      )}
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Category grid */}
          <CategoryGrid
            categories={categories}
            activeCategory={activeCategory}
            onSelect={handleCategorySelect}
          />

          {/* Pricing filter row */}
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <span className="text-xs text-muted-foreground mr-1">Pricing:</span>
            {PRICING_OPTIONS.map((option) => {
              const isActive = activePricing === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => handlePricingToggle(option.value)}
                  className="text-xs px-3 py-1.5 rounded-full border transition-colors"
                  style={
                    isActive
                      ? { backgroundColor: option.bg, color: option.color, borderColor: option.color + '40' }
                      : undefined
                  }
                >
                  <span className={!isActive ? 'text-muted-foreground' : ''}>
                    {option.label}
                  </span>
                </button>
              );
            })}
            {activePricing && (
              <button className="text-xs text-[#E94560] ml-1" onClick={() => setActivePricing('')}>
                Clear
              </button>
            )}
          </div>

          {/* Resource grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="rounded-xl h-48" />
              ))}
            </div>
          ) : resources.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <p className="text-lg font-medium">No resources match your filters</p>
              <p className="text-sm mt-1">Try adjusting your search or filters</p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 rounded-lg bg-[#E94560] text-white text-sm hover:bg-[#E94560]/90 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {resources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  isBookmarked={bookmarkedIds.has(resource.id)}
                  onBookmark={() => handleBookmark(resource.id)}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(p) => {
                setPage(p);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}
        </main>

        {/* Right rail */}
        <aside className="hidden xl:flex flex-col gap-6 fixed right-0 top-16 w-[280px] h-[calc(100vh-4rem)] overflow-y-auto border-l border-border bg-card p-4 z-30">
          <RecentlyAdded resources={recentResources} />

          {/* Saved tools */}
          {isAuthed && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Bookmark className="size-3.5 text-[#E94560]" />
                <p className="text-sm font-semibold text-foreground">Saved Tools</p>
                <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full bg-[rgba(233,69,96,0.1)] text-[#E94560]">
                  {bookmarkedResources.length}
                </span>
              </div>

              {bookmarkedResources.length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  Bookmark tools to save them here.
                </p>
              ) : (
                <div className="flex flex-col gap-2">
                  {bookmarkedResources.slice(0, 5).map((r) => {
                    const domain = r.url ? (() => { try { return new URL(r.url).hostname.replace(/^www\./, ''); } catch { return ''; } })() : '';
                    const faviconUrl = domain ? `https://favicon.im/${domain}` : null;
                    return (
                      <a
                        key={r.id}
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-muted/60 transition-colors group"
                      >
                        {faviconUrl ? (
                          <div className="w-7 h-7 rounded-md overflow-hidden bg-white dark:bg-[#1F2B4A] flex items-center justify-center border border-black/8 dark:border-white/6 shrink-0">
                            <Image src={faviconUrl} alt={r.name} width={28} height={28} className="object-contain w-full h-full" unoptimized />
                          </div>
                        ) : (
                          <div
                            style={{ backgroundColor: (r.logoColor ?? '#E94560') + '18', color: r.logoColor ?? '#E94560' }}
                            className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold shrink-0"
                          >
                            {r.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <span className="text-xs font-medium text-foreground truncate flex-1">{r.name}</span>
                        <PricingBadge pricing={PRICINGMAP[r.pricing] ?? Pricing.FREE} />
                        <ExternalLink className="size-3 text-muted-foreground opacity-0 group-hover:opacity-100 shrink-0" />
                      </a>
                    );
                  })}
                  {bookmarkedResources.length > 5 && (
                    <p className="text-[10px] text-muted-foreground text-center">
                      +{bookmarkedResources.length - 5} more
                    </p>
                  )}
                </div>
              )}

              <Link
                href="/bookmarks"
                className="text-xs text-[#E94560] hover:underline mt-1 text-center"
              >
                View all saved →
              </Link>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
