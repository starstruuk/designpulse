"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { SlidersHorizontal, X, Mail, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Sidebar, { SidebarFilters } from "@/components/layout/Sidebar";
import ArticleCard from "@/components/article/ArticleCard";
import HeroSection from "@/components/article/HeroSection";
import RightRail from "@/components/layout/RightRail";
import Pagination from "@/components/shared/Pagination";
import { Article } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { browserClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const SORT_LABELS: Record<string, string> = {
  newest: "Latest",
  oldest: "Oldest",
};

const DISCIPLINE_LABELS: Record<string, string> = {
  product:     "Product",
  ai:          "AI",
  graphic:     "Graphic",
  visual:      "Visual",
  motion:      "Motion",
  interaction: "Interaction",
  ux:          "UX",
  ui:          "UI",
};

/* ─── Newsletter Banner ──────────────────────────────────────────── */

function NewsletterBanner() {
  const [email, setEmail]         = React.useState('');
  const [status, setStatus]       = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg]   = React.useState('');

  const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setErrorMsg('Enter a valid email address');
      setStatus('error');
      return;
    }
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({})) as { error?: string };
        setErrorMsg(data.error ?? 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }
      setStatus('success');
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="mt-10 rounded-2xl px-6 py-8 flex items-center gap-4 bg-[#0F3460] dark:bg-[#16213E] border border-[#1F2B4A]">
        <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-[rgba(0,184,148,0.15)]">
          <CheckCircle2 className="size-5 text-[#00B894]" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">You&apos;re subscribed!</p>
          <p className="text-xs text-[rgba(255,255,255,0.5)] mt-0.5">
            Welcome to DesignPulse — your first issue lands this Thursday.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 rounded-2xl px-6 py-7 bg-[#0F3460] dark:bg-[#16213E] border border-[#1F2B4A]">
      <div className="flex flex-col sm:flex-row sm:items-center gap-5">
        {/* Icon + copy */}
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-[rgba(233,69,96,0.15)]">
            <Mail className="size-5 text-[#E94560]" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white leading-snug">
              Design news, every Thursday.
            </p>
            <p className="text-xs text-[rgba(255,255,255,0.45)] mt-0.5 leading-relaxed">
              Curated articles, tools &amp; opinions — free, no spam, unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 sm:shrink-0 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-56">
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
              placeholder="you@example.com"
              autoComplete="email"
              className={cn(
                "w-full h-9 px-3 rounded-lg text-sm bg-[rgba(255,255,255,0.07)] text-white placeholder:text-[rgba(255,255,255,0.3)]",
                "border outline-none transition-colors",
                status === 'error'
                  ? "border-[#E94560]"
                  : "border-[rgba(255,255,255,0.12)] focus:border-[#E94560]/60"
              )}
            />
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="h-9 px-4 rounded-lg flex items-center gap-1.5 text-sm font-semibold text-white bg-[#E94560] hover:bg-[#d63c55] disabled:opacity-60 disabled:cursor-not-allowed transition-colors shrink-0"
          >
            {status === 'loading' ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <Send className="size-3.5" />
            )}
            Subscribe
          </button>
        </form>
      </div>

      {status === 'error' && errorMsg && (
        <p className="flex items-center gap-1.5 mt-3 text-xs text-[#E94560]">
          <AlertCircle className="size-3.5 shrink-0" />
          {errorMsg}
        </p>
      )}
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const [filters, setFilters] = React.useState<SidebarFilters>({
    disciplines: [],
    sortBy:      "newest",
    fromDate:    "",
    toDate:      "",
  });
  const [articles, setArticles]         = React.useState<Article[]>([]);
  const [loading, setLoading]           = React.useState<boolean>(true);
  const [page, setPage]                 = React.useState(1);
  const [totalPages, setTotalPages]     = React.useState(1);
  const [total, setTotal]               = React.useState(0);
  const [mobileFilterOpen, setMobileFilterOpen] = React.useState(false);
  const [bookmarkedIds, setBookmarkedIds] = React.useState<Set<string>>(new Set());
  const [authUser, setAuthUser]           = React.useState<SupabaseUser | null>(null);

  // On mount: get auth user and load their bookmarks
  React.useEffect(() => {
    const init = async () => {
      const { data: { user } } = await browserClient.auth.getUser();
      setAuthUser(user);
      if (user) {
        try {
          const res  = await fetch('/api/user/bookmarks');
          const data = await res.json();
          const ids  = (data.articles ?? []).map((a: { id: string }) => a.id);
          setBookmarkedIds(new Set<string>(ids));
        } catch {
          // non-fatal — bookmarks just won't be pre-populated
        }
      }
    };
    init();
  }, []);

  React.useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filters.disciplines.length > 0) {
          params.set("disciplines", filters.disciplines.join(","));
        }
        if (filters.fromDate) params.set("from", filters.fromDate);
        if (filters.toDate)   params.set("to",   filters.toDate);
        if (filters.sortBy)   params.set("sortBy", filters.sortBy);
        params.set("page",  String(page));
        params.set("limit", "20");

        const res  = await fetch(`/api/articles?${params.toString()}`);
        const data = await res.json();

        setArticles(data.articles ?? []);
        setTotalPages(data.totalPages ?? 1);
        setTotal(data.total ?? 0);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [filters, page]);

  // Lock body scroll when mobile filters open
  React.useEffect(() => {
    document.body.style.overflow = mobileFilterOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileFilterOpen]);

  async function handleBookmark(articleId: string) {
    if (!authUser) {
      router.push('/login');
      return;
    }
    // Optimistic toggle
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(articleId)) next.delete(articleId);
      else next.add(articleId);
      return next;
    });
    try {
      await fetch('/api/user/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId }),
      });
    } catch {
      // Revert optimistic update on failure
      setBookmarkedIds((prev) => {
        const next = new Set(prev);
        if (next.has(articleId)) next.delete(articleId);
        else next.add(articleId);
        return next;
      });
    }
  }

  function handleFiltersChange(newFilters: SidebarFilters) {
    setPage(1);
    setFilters(newFilters);
  }

  function handlePageChange(newPage: number) {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function removeDiscipline(slug: string) {
    const next = { ...filters, disciplines: filters.disciplines.filter((d) => d !== slug) };
    handleFiltersChange(next);
  }

  function clearAll() {
    handleFiltersChange({ disciplines: [], sortBy: "newest", fromDate: "", toDate: "" });
  }

  // Dynamic heading
  const sortLabel = SORT_LABELS[filters.sortBy] ?? "Latest";
  const headingLabel =
    filters.disciplines.length === 1
      ? `${DISCIPLINE_LABELS[filters.disciplines[0]] ?? filters.disciplines[0]} Design`
      : filters.disciplines.length > 1
      ? "Filtered Articles"
      : `${sortLabel} Articles`;

  const activeFilterCount =
    filters.disciplines.length +
    (filters.fromDate   ? 1 : 0) +
    (filters.toDate     ? 1 : 0) +
    (filters.sortBy !== "newest" ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Mobile filter bar — sticky below navbar, hidden lg+ */}
      <div className="sticky top-16 z-20 border-b border-border bg-background lg:hidden">
        <div className="flex items-center px-4 py-2.5 gap-2">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className={cn(
              "flex items-center gap-2 px-3.5 py-2 rounded-lg text-[13px] transition-colors shrink-0",
              activeFilterCount > 0
                ? "bg-[#E94560]/10 text-[#E94560]"
                : "bg-accent/40 text-muted-foreground hover:bg-accent/60"
            )}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="flex items-center justify-center w-[18px] h-[18px] rounded-full bg-[#E94560] text-white text-[10px] font-semibold">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Active discipline chips — scrollable */}
          {filters.disciplines.length > 0 && (
            <div className="flex items-center gap-1.5 overflow-x-auto flex-1 min-w-0">
              {filters.disciplines.map((slug) => (
                <button
                  key={slug}
                  onClick={() => removeDiscipline(slug)}
                  className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#E94560]/10 text-[#E94560] text-[10px] shrink-0 hover:bg-[#E94560]/20 transition-colors"
                >
                  {DISCIPLINE_LABELS[slug] ?? slug}
                  <X className="w-2.5 h-2.5" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Hero — full width above sidebar layout, hidden when filters are active */}
      {filters.disciplines.length === 0 && !filters.fromDate && !filters.toDate && filters.sortBy === "newest" && page === 1 && (
        <div className="lg:ml-60 xl:mr-[280px]">
          <HeroSection bookmarkedIds={bookmarkedIds} onBookmark={handleBookmark} />
        </div>
      )}

      <div className="flex">
        <Sidebar filters={filters} onChange={handleFiltersChange} />

        <main className="flex-1 lg:ml-60 xl:mr-[280px] p-6">
          {/* Page heading + desktop active chips */}
          <div className="flex items-start justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{headingLabel}</h1>
              {!loading && (
                <p className="text-sm text-muted-foreground mt-1">
                  {total} article{total !== 1 ? "s" : ""} • Curated daily
                </p>
              )}
            </div>

            {/* Desktop active filter chips */}
            {filters.disciplines.length > 0 && (
              <div className="hidden lg:flex items-center gap-1.5 flex-wrap justify-end mt-1">
                {filters.disciplines.map((slug) => (
                  <button
                    key={slug}
                    onClick={() => removeDiscipline(slug)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E94560]/10 text-[#E94560] text-[11px] hover:bg-[#E94560]/20 transition-colors"
                  >
                    {DISCIPLINE_LABELS[slug] ?? slug}
                    <X className="w-3 h-3" />
                  </button>
                ))}
                <button
                  onClick={clearAll}
                  className="px-2 py-1 text-[11px] text-[#E94560] hover:underline"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Article grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="rounded-xl h-64" />
              ))}
            </div>
          ) : articles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
              <p className="text-lg font-medium">No articles found</p>
              <p className="text-sm mt-1">Try adjusting your filters</p>
              <button
                onClick={clearAll}
                className="mt-4 px-4 py-2 rounded-lg bg-[#E94560] text-white text-sm hover:bg-[#E94560]/90 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  isBookmarked={bookmarkedIds.has(article.id)}
                  onBookmark={() => handleBookmark(article.id)}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}

          <NewsletterBanner />
        </main>

        <RightRail />
      </div>

      {/* Mobile filter overlay backdrop */}
      {mobileFilterOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileFilterOpen(false)}
        />
      )}

      {/* Mobile filter drawer — slides in from left */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-[280px] flex flex-col lg:hidden",
          "bg-white dark:bg-[#16213E] border-r border-border shadow-xl",
          "transition-transform duration-300",
          mobileFilterOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-border shrink-0">
          <span className="text-sm font-semibold text-foreground flex items-center gap-2">
            <SlidersHorizontal className="size-4 text-[#E94560]" />
            Filter Articles
          </span>
          <button
            className="p-2 rounded-md hover:bg-accent/10"
            onClick={() => setMobileFilterOpen(false)}
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Sidebar content reused — Apply/Clear handled inside Sidebar */}
        <div className="flex-1 overflow-y-auto flex flex-col">
          <Sidebar
            filters={filters}
            onChange={handleFiltersChange}
            onApply={() => setMobileFilterOpen(false)}
            mobile
          />
        </div>
      </aside>
    </div>
  );
}
