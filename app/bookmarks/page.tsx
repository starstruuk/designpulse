'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bookmark, Wrench } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import ArticleCard from '@/components/article/ArticleCard';
import ResourceCard from '@/components/resource/ResourceCard';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { browserClient } from '@/lib/supabase/client';
import type { Article, Resource } from '@/types';
import { Pricing } from '@/types';

interface BookmarksData {
  articles: {
    id: string;
    title: string;
    url: string;
    excerpt: string | null;
    imageUrl: string | null;
    publishedAt: string | null;
    source: { name: string } | null;
  }[];
  resources: {
    id: string;
    name: string;
    url: string;
    description: string | null;
    pricing: 'FREE' | 'FREEMIUM' | 'PAID';
    logoLetter: string | null;
    logoColor: string | null;
    category: { name: string; color: string | null };
  }[];
}

const PRICING_MAP: Record<string, Pricing> = {
  FREE:     Pricing.FREE,
  FREEMIUM: Pricing.FREEMIUM,
  PAID:     Pricing.PAID,
};

type Tab = 'articles' | 'tools';

export default function BookmarksPage() {
  const router = useRouter();
  const [loading, setLoading]     = useState(true);
  const [tab, setTab]             = useState<Tab>('articles');
  const [articles, setArticles]   = useState<Article[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [bookmarkedArticleIds, setBookmarkedArticleIds] = useState<Set<string>>(new Set());
  const [bookmarkedResourceIds, setBookmarkedResourceIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    browserClient.auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.push('/login'); return; }

      fetch('/api/user/bookmarks')
        .then((r) => r.json())
        .then((data: BookmarksData) => {
          setBookmarkedArticleIds(new Set(data.articles.map((a) => a.id)));
          setBookmarkedResourceIds(new Set(data.resources.map((r) => r.id)));

          setArticles(data.articles.map((a) => ({
            id:          a.id,
            title:       a.title,
            url:         a.url,
            excerpt:     a.excerpt,
            content:     null,
            imageUrl:    a.imageUrl,
            publishedAt: a.publishedAt,
            source:      a.source ? { id: '', name: a.source.name, url: null } : null,
            disciplines: [],
          })));

          setResources(data.resources.map((r) => ({
            id:          r.id,
            name:        r.name,
            url:         r.url,
            description: r.description ?? undefined,
            pricing:     PRICING_MAP[r.pricing] ?? Pricing.FREE,
            logoLetter:  r.logoLetter ?? '',
            logoColor:   r.logoColor ?? '#E94560',
            category:    { name: r.category.name, color: r.category.color ?? '#E94560' },
            disciplines: [],
            featured:    false,
            createdAt:   new Date(),
          })));
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    });
  }, [router]);

  async function handleArticleBookmark(articleId: string) {
    setBookmarkedArticleIds((prev) => {
      const next = new Set(prev);
      next.delete(articleId);
      return next;
    });
    setArticles((prev) => prev.filter((a) => a.id !== articleId));
    await fetch('/api/user/bookmarks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ articleId }),
    });
  }

  async function handleResourceBookmark(resourceId: string) {
    setBookmarkedResourceIds((prev) => {
      const next = new Set(prev);
      next.delete(resourceId);
      return next;
    });
    setResources((prev) => prev.filter((r) => r.id !== resourceId));
    await fetch('/api/user/bookmarks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resourceId }),
    });
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2.5 mb-1">
            <Bookmark className="size-5 text-[#E94560]" />
            <h1 className="text-2xl font-bold text-foreground">Saved</h1>
          </div>
          <p className="text-sm text-muted-foreground">Your bookmarked articles and tools</p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-muted/40 mb-8 w-fit">
          {(['articles', 'tools'] as Tab[]).map((t) => {
            const count  = t === 'articles' ? articles.length : resources.length;
            const active = tab === t;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  active
                    ? 'bg-card shadow-sm text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {t === 'articles' ? <Bookmark className="size-3.5" /> : <Wrench className="size-3.5" />}
                {t.charAt(0).toUpperCase() + t.slice(1)}
                <span className={cn(
                  'px-1.5 py-0.5 rounded-full text-[10px]',
                  active ? 'bg-[rgba(233,69,96,0.1)] text-[#E94560]' : 'bg-muted text-muted-foreground'
                )}>
                  {loading ? '–' : count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <Skeleton key={i} className="rounded-xl h-64" />)}
          </div>
        ) : tab === 'articles' ? (
          articles.length === 0 ? (
            <EmptyState
              icon={Bookmark}
              title="No saved articles"
              subtext="Articles you bookmark from the feed will appear here."
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  isBookmarked={bookmarkedArticleIds.has(article.id)}
                  onBookmark={() => handleArticleBookmark(article.id)}
                />
              ))}
            </div>
          )
        ) : (
          resources.length === 0 ? (
            <EmptyState
              icon={Wrench}
              title="No saved tools"
              subtext="Tools you bookmark from the Resources page will appear here."
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {resources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  isBookmarked={bookmarkedResourceIds.has(resource.id)}
                  onBookmark={() => handleResourceBookmark(resource.id)}
                />
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  subtext,
}: {
  icon: React.ElementType;
  title: string;
  subtext: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-muted">
        <Icon className="size-6 text-muted-foreground" />
      </div>
      <p className="text-base font-medium text-foreground">{title}</p>
      <p className="text-sm text-muted-foreground max-w-xs">{subtext}</p>
    </div>
  );
}
