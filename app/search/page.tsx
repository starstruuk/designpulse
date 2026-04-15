'use client';

import { Suspense, useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import { Search, FileText, Wrench, ArrowUpRight, Loader2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

// ── Types ─────────────────────────────────────────────────────────────────────

interface ArticleResult {
  id: string;
  title: string;
  excerpt: string | null;
  imageUrl: string | null;
  publishedAt: string;
  source: { name: string } | null;
  disciplines: { discipline: { slug: string; name: string } }[];
}

interface ResourceResult {
  id: string;
  name: string;
  description: string | null;
  url: string;
  pricing: string;
  logoLetter: string | null;
  logoColor: string | null;
  category: { name: string; color: string | null };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const PRICING_COLORS: Record<string, string> = {
  FREE:     '#22C55E',
  FREEMIUM: '#F59E0B',
  PAID:     '#3B82F6',
};

function getDomain(url: string): string {
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return ''; }
}

function relativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const d = Math.floor(diff / 86_400_000);
  if (d < 1)  return 'Today';
  if (d < 7)  return `${d}d ago`;
  if (d < 30) return `${Math.floor(d / 7)}w ago`;
  if (d < 365) return `${Math.floor(d / 30)}mo ago`;
  return `${Math.floor(d / 365)}y ago`;
}

// ── Article result card ───────────────────────────────────────────────────────

function ArticleCard({ article }: { article: ArticleResult }) {
  const discipline = article.disciplines?.[0]?.discipline;
  return (
    <Link
      href={`/articles/${article.id}`}
      className="group flex gap-3 p-3 rounded-xl border border-border bg-card hover:border-[#E94560]/40 hover:bg-accent/30 transition-all"
    >
      {/* Thumbnail */}
      <div className="relative w-20 h-16 rounded-lg overflow-hidden shrink-0 bg-accent">
        {article.imageUrl ? (
          <Image src={article.imageUrl} alt={article.title} fill className="object-cover" unoptimized />
        ) : (
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #E94560 0%, #1A1A2E 100%)' }} />
        )}
      </div>

      {/* Text */}
      <div className="flex flex-col justify-between min-w-0 flex-1 py-0.5">
        <div>
          <h3 className="text-sm font-semibold text-foreground line-clamp-2 leading-snug group-hover:text-[#E94560] transition-colors">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{article.excerpt}</p>
          )}
        </div>
        <div className="flex items-center gap-2 mt-1">
          {article.source && (
            <span className="text-[10px] text-muted-foreground">{article.source.name}</span>
          )}
          {discipline && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent text-muted-foreground">
              {discipline.name}
            </span>
          )}
          <span className="ml-auto flex items-center gap-1 text-[10px] text-muted-foreground">
            <Clock className="size-2.5" />
            {relativeTime(article.publishedAt)}
          </span>
        </div>
      </div>
    </Link>
  );
}

// ── Resource result card ──────────────────────────────────────────────────────

function ResourceCard({ resource }: { resource: ResourceResult }) {
  const [faviconError, setFaviconError] = useState(false);
  const domain = getDomain(resource.url);
  const faviconUrl = domain ? `https://favicon.im/${domain}` : null;
  const logoColor = resource.logoColor ?? resource.category.color ?? '#E94560';
  const letter = resource.logoLetter || resource.name[0].toUpperCase();
  const pricingColor = PRICING_COLORS[resource.pricing] ?? '#6B7280';

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:border-[#E94560]/40 hover:bg-accent/30 transition-all"
    >
      {/* Icon */}
      {faviconUrl && !faviconError ? (
        <div className="w-10 h-10 rounded-xl overflow-hidden bg-white dark:bg-[#1F2B4A] flex items-center justify-center border border-black/8 dark:border-white/6 shrink-0">
          <Image
            src={faviconUrl}
            alt={`${resource.name} logo`}
            width={40}
            height={40}
            className="object-contain w-full h-full"
            onError={() => setFaviconError(true)}
            unoptimized
          />
        </div>
      ) : (
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0"
          style={{ backgroundColor: logoColor }}
        >
          {letter}
        </div>
      )}

      {/* Details */}
      <div className="flex flex-col min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground group-hover:text-[#E94560] transition-colors truncate">
            {resource.name}
          </span>
          <span
            className="text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0"
            style={{ color: pricingColor, backgroundColor: `${pricingColor}18` }}
          >
            {resource.pricing}
          </span>
        </div>
        {resource.description && (
          <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{resource.description}</p>
        )}
        <p className="text-[10px] text-muted-foreground/60 mt-0.5">{resource.category.name}</p>
      </div>

      <ArrowUpRight className="size-3.5 text-muted-foreground group-hover:text-[#E94560] transition-colors shrink-0" />
    </a>
  );
}

// ── Search results ────────────────────────────────────────────────────────────

function SearchResults() {
  const params  = useSearchParams();
  const router  = useRouter();
  const q       = params.get('q') ?? '';

  const [inputValue, setInputValue] = useState(q);
  const [articles,   setArticles]   = useState<ArticleResult[]>([]);
  const [resources,  setResources]  = useState<ResourceResult[]>([]);
  const [loading,    setLoading]    = useState(false);
  const [searched,   setSearched]   = useState(false);

  const runSearch = useCallback((query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    Promise.all([
      fetch(`/api/articles?search=${encodeURIComponent(query)}&limit=10`).then((r) => r.json()),
      fetch(`/api/resources?search=${encodeURIComponent(query)}&limit=10`).then((r) => r.json()),
    ])
      .then(([artData, resData]) => {
        setArticles(artData.articles ?? []);
        setResources(resData.resources ?? []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Run search when URL param changes
  useEffect(() => {
    setInputValue(q);
    runSearch(q);
  }, [q, runSearch]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      router.push(`/search?q=${encodeURIComponent(inputValue.trim())}`);
    }
  };

  const total = articles.length + resources.length;

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-20 lg:pb-8">
      {/* Search header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-4">Search</h1>
        <div className="relative max-w-xl">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search articles and tools..."
            autoFocus
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-[#E94560]/30 focus:border-[#E94560]/60 transition-colors"
          />
        </div>
        {searched && !loading && (
          <p className="mt-3 text-sm text-muted-foreground">
            {total > 0
              ? `${total} result${total !== 1 ? 's' : ''} for "${q}"`
              : `No results for "${q}"`}
          </p>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-20 gap-2 text-muted-foreground">
          <Loader2 className="size-5 animate-spin text-[#E94560]" />
          <span className="text-sm">Searching…</span>
        </div>
      )}

      {/* Empty prompt */}
      {!loading && !searched && (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center">
            <Search className="size-6 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">Type something above and press Enter</p>
        </div>
      )}

      {/* No results */}
      {!loading && searched && total === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center">
            <Search className="size-6 text-muted-foreground" />
          </div>
          <p className="font-semibold text-foreground">No results found</p>
          <p className="text-sm text-muted-foreground">Try different keywords or check your spelling</p>
        </div>
      )}

      {/* Results */}
      {!loading && total > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Articles */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="size-4 text-[#E94560]" />
              <h2 className="text-sm font-semibold text-foreground">
                Articles
                <span className="ml-2 text-xs font-normal text-muted-foreground">({articles.length})</span>
              </h2>
            </div>
            {articles.length > 0 ? (
              <div className={cn('flex flex-col gap-2')}>
                {articles.map((a) => <ArticleCard key={a.id} article={a} />)}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground py-4">No articles matched.</p>
            )}
          </section>

          {/* Resources */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Wrench className="size-4 text-[#E94560]" />
              <h2 className="text-sm font-semibold text-foreground">
                Tools &amp; Resources
                <span className="ml-2 text-xs font-normal text-muted-foreground">({resources.length})</span>
              </h2>
            </div>
            {resources.length > 0 ? (
              <div className="flex flex-col gap-2">
                {resources.map((r) => <ResourceCard key={r.id} resource={r} />)}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground py-4">No tools matched.</p>
            )}
          </section>
        </div>
      )}
    </main>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SearchPage() {
  return (
    <>
      <Navbar />
      <Suspense>
        <SearchResults />
      </Suspense>
    </>
  );
}
