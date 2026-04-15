'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { formatDistanceToNow, format } from 'date-fns';
import {
  ArrowLeft, ExternalLink, Calendar, Clock,
  Bookmark, Share2, LinkIcon, Check, ArrowUpRight,
} from 'lucide-react';
import { Article } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import ArticleCard from '@/components/article/ArticleCard';
import { browserClient } from '@/lib/supabase/client';

/* ─── Constants ──────────────────────────────────────────────── */

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

/* ─── Helpers ────────────────────────────────────────────────── */

function estimateReadTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const mins  = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
}

/* ─── Page ───────────────────────────────────────────────────── */

/**
 * Article detail page — a rich preview to help users decide if the article
 * is worth clicking through to. Always links out to the original publisher.
 */
export default function ArticleDetailPage() {
  const { id }   = useParams<{ id: string }>();
  const router   = useRouter();
  const [article,  setArticle]  = useState<Article | null>(null);
  const [related,  setRelated]  = useState<Article[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [bookmarked, setBookmarked] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [isAuthed,   setIsAuthed]   = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/articles/${id}`)
      .then((r) => {
        if (r.status === 404) { setNotFound(true); return null; }
        return r.json();
      })
      .then((data) => {
        if (!data) return;
        setArticle(data.article);
        setRelated(data.related ?? []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    browserClient.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      setIsAuthed(true);
      fetch('/api/user/bookmarks')
        .then((r) => r.json())
        .then((data: { articles?: { id: string }[] }) => {
          if (data.articles?.some((a) => a.id === id)) setBookmarked(true);
        })
        .catch(() => {});
    });
  }, [id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleBookmark = async () => {
    if (!isAuthed) { router.push('/login'); return; }
    setBookmarked((b) => !b);
    await fetch('/api/user/bookmarks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ articleId: id }),
    }).catch(() => setBookmarked((b) => !b));
  };

  /* ── Loading skeleton ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="relative h-[420px] sm:h-[500px]">
          <Skeleton className="w-full h-full rounded-none" />
        </div>
        <main className="max-w-2xl mx-auto px-4 sm:px-6 -mt-16 relative z-10 pb-20">
          <Skeleton className="h-10 w-full mb-3 rounded-xl" />
          <Skeleton className="h-10 w-3/4 mb-6 rounded-xl" />
          <Skeleton className="h-4 w-full mb-2 rounded" />
          <Skeleton className="h-4 w-full mb-2 rounded" />
          <Skeleton className="h-4 w-2/3 mb-8 rounded" />
          <Skeleton className="h-14 w-full rounded-xl" />
        </main>
      </div>
    );
  }

  /* ── Not found ── */
  if (notFound || !article) {
    return (
      <main className="flex flex-col items-center justify-center py-32 px-4">
        <p className="text-lg text-muted-foreground mb-4">Article not found</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm"
          style={{ backgroundColor: '#E94560' }}
        >
          <ArrowLeft className="size-4" /> Back to Feed
        </Link>
      </main>
    );
  }

  const sourceName       = article.source?.name ?? '';
  const firstDiscipline  = article.disciplines?.[0]?.discipline;
  const disciplineColor  = DISCIPLINE_COLORS[firstDiscipline?.slug ?? ''] ?? '#E94560';
  const gradient         = `linear-gradient(135deg,${disciplineColor} 0%,#1A1A2E 100%)`;
  const readTime         = estimateReadTime(article.excerpt ?? article.title);
  const publishedDate    = article.publishedAt
    ? format(new Date(article.publishedAt), 'MMMM d, yyyy')
    : null;
  const relativeTime     = article.publishedAt
    ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })
    : null;

  const allDisciplines = article.disciplines?.map((d) => d.discipline) ?? [];

  return (
    <div className="min-h-screen bg-background">

      {/* ── Full-bleed hero ─────────────────────────────────────── */}
      <div className="relative h-[420px] sm:h-[500px] lg:h-[560px] overflow-hidden">
        {article.imageUrl ? (
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover"
            unoptimized
            priority
          />
        ) : (
          <div className="w-full h-full" style={{ background: gradient }} />
        )}

        {/* Dark gradient overlay — heavier at bottom so text card lifts off cleanly */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.82) 100%)' }}
        />

        {/* Back button — top left */}
        <div className="absolute top-4 left-4 z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/80 hover:text-white transition-colors backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(0,0,0,0.35)' }}
          >
            <ArrowLeft className="size-4" />
            <span className="hidden sm:inline">Back to Feed</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>

        {/* Actions — top right */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
            style={{ backgroundColor: 'rgba(0,0,0,0.35)' }}
            aria-label="Copy link"
            title={linkCopied ? 'Copied!' : 'Copy link'}
          >
            {linkCopied
              ? <Check className="size-4 text-[#10B981]" />
              : <Share2 className="size-4 text-white/80" />}
          </button>
          <button
            onClick={handleBookmark}
            className="w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
            style={{ backgroundColor: bookmarked ? 'rgba(233,69,96,0.5)' : 'rgba(0,0,0,0.35)' }}
            aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark'}
          >
            <Bookmark
              className="size-4"
              style={{
                color: bookmarked ? 'white' : 'rgba(255,255,255,0.8)',
                fill:  bookmarked ? 'white' : 'none',
              }}
            />
          </button>
        </div>

        {/* Hero text overlay — bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 pb-8 pt-16">
          <div className="max-w-3xl mx-auto">
            {/* Discipline badges */}
            {allDisciplines.length > 0 && (
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                {allDisciplines.map((d) => (
                  <span
                    key={d.id}
                    className="px-2.5 py-1 rounded-full text-white text-[10.5px] font-semibold"
                    style={{ backgroundColor: DISCIPLINE_COLORS[d.slug] ?? '#E94560' }}
                  >
                    {d.name}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
              {article.title}
            </h1>
          </div>
        </div>
      </div>

      {/* ── Content card — overlaps the hero bottom ──────────────── */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pb-20 lg:pb-12">

        {/* Source + meta strip */}
        <div
          className="flex flex-wrap items-center gap-x-4 gap-y-2 py-4 border-b border-border text-sm text-muted-foreground mb-6"
        >
          {sourceName && (
            <span className="font-semibold text-foreground">{sourceName}</span>
          )}
          {publishedDate && (
            <span className="flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              {publishedDate}
            </span>
          )}
          {relativeTime && (
            <span className="text-muted-foreground/60">{relativeTime}</span>
          )}
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5" />
            {readTime}
          </span>

          {/* Copy link inline */}
          <button
            onClick={handleCopyLink}
            className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {linkCopied
              ? <><Check className="size-3.5 text-[#10B981]" /><span className="text-[#10B981]">Copied</span></>
              : <><LinkIcon className="size-3.5" /><span>Copy link</span></>}
          </button>
        </div>

        {/* Excerpt — full, unsuppressed */}
        {article.excerpt && (
          <p className="text-base sm:text-lg text-foreground/80 leading-relaxed mb-8">
            {article.excerpt}
          </p>
        )}

        {/* Primary CTA */}
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between w-full px-6 py-5 rounded-2xl text-white transition-all mb-10"
          style={{ background: `linear-gradient(135deg, ${disciplineColor}cc 0%, #0F3460 100%)` }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.92'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-0.5">
              Read the full article
            </p>
            <p className="text-base font-bold text-white">
              {sourceName || 'Open original'}
            </p>
          </div>
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:translate-x-1"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
          >
            <ArrowUpRight className="size-5 text-white" />
          </div>
        </a>

        {/* Save for later — secondary action */}
        <div className="flex items-center justify-center mb-12">
          <button
            onClick={handleBookmark}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-medium transition-all"
            style={{
              borderColor:     bookmarked ? '#E94560' : undefined,
              color:           bookmarked ? '#E94560' : undefined,
              backgroundColor: bookmarked ? 'rgba(233,69,96,0.06)' : undefined,
            }}
          >
            <Bookmark
              className="size-4"
              style={{ fill: bookmarked ? '#E94560' : 'none', color: bookmarked ? '#E94560' : undefined }}
            />
            {bookmarked ? 'Saved to bookmarks' : 'Save for later'}
          </button>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-base font-bold text-foreground">More in {firstDiscipline?.name ?? 'Design'}</h2>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((r) => (
                <ArticleCard key={r.id} article={r} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
