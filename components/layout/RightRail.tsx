"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { TrendingUp, Wrench, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

function getDomain(url: string): string {
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return ''; }
}

function ToolIcon({ tool }: { tool: FeaturedTool }) {
  const [error, setError] = React.useState(false);
  const domain = getDomain(tool.url);
  const faviconUrl = domain ? `https://favicon.im/${domain}` : null;
  const logoColor = tool.logoColor ?? tool.category.color ?? '#E94560';

  if (faviconUrl && !error) {
    return (
      <div className="w-9 h-9 rounded-lg overflow-hidden bg-white dark:bg-[#1F2B4A] flex items-center justify-center border border-black/8 dark:border-white/6 shrink-0">
        <Image
          src={faviconUrl}
          alt={`${tool.name} logo`}
          width={36}
          height={36}
          className="object-contain w-full h-full"
          onError={() => setError(true)}
          unoptimized
        />
      </div>
    );
  }

  return (
    <div
      className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold shrink-0"
      style={{ backgroundColor: logoColor }}
    >
      {tool.logoLetter || tool.name[0].toUpperCase()}
    </div>
  );
}

// ─── Types ───────────────────────────────────────────────────────
interface TrendingArticle {
  id: string;
  title: string;
  source: { name: string } | null;
  disciplines: { discipline: { slug: string } }[];
}

interface FeaturedTool {
  id: string;
  name: string;
  url: string;
  description: string | null;
  pricing: string;
  logoLetter: string | null;
  logoColor: string | null;
  category: { name: string; color: string | null };
}

const PRICING_COLORS: Record<string, string> = {
  FREE:     "#22C55E",
  FREEMIUM: "#F59E0B",
  PAID:     "#3B82F6",
};

/**
 * Picks up to 5 articles ensuring each has a unique discipline slug.
 * Falls back to sequential picks if not enough category diversity.
 */
function pickDiverseArticles(articles: TrendingArticle[], count = 5): TrendingArticle[] {
  const seen  = new Set<string>();
  const picks: TrendingArticle[] = [];

  for (const a of articles) {
    if (picks.length >= count) break;
    const slug = a.disciplines?.[0]?.discipline?.slug ?? `__no_disc_${a.id}`;
    if (!seen.has(slug)) {
      seen.add(slug);
      picks.push(a);
    }
  }

  // If we didn't get enough diverse ones, fill in remaining without discipline constraint
  for (const a of articles) {
    if (picks.length >= count) break;
    if (!picks.find((p) => p.id === a.id)) picks.push(a);
  }

  return picks;
}

/**
 * Right rail showing trending articles and featured tools.
 * Only visible on xl+ screens. Fetches real data on mount.
 */
export default function RightRail() {
  const [trending, setTrending]   = React.useState<TrendingArticle[]>([]);
  const [tools, setTools]         = React.useState<FeaturedTool[]>([]);
  const [loadingT, setLoadingT]   = React.useState(true);
  const [loadingR, setLoadingR]   = React.useState(true);

  React.useEffect(() => {
    // Fetch 20 recent articles and pick 5 with diverse disciplines
    fetch('/api/articles?limit=20&sortBy=newest')
      .then((r) => r.json())
      .then((data) => {
        const picked = pickDiverseArticles(data.articles ?? []);
        setTrending(picked);
      })
      .catch(() => {})
      .finally(() => setLoadingT(false));

    // Fetch first 3 resources as featured tools
    fetch('/api/resources?limit=3&page=1')
      .then((r) => r.json())
      .then((data) => setTools((data.resources ?? []).slice(0, 3)))
      .catch(() => {})
      .finally(() => setLoadingR(false));
  }, []);

  return (
    <aside className={cn(
      "hidden xl:flex flex-col gap-6",
      "fixed right-0 top-16 w-70 h-[calc(100vh-4rem)]",
      "overflow-y-auto overscroll-contain",
      "border-l border-border bg-card",
      "p-4 z-30"
    )}>

      {/* ── Trending Now ── */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <TrendingUp className="size-4 text-[#E94560]" />
          Trending Now
        </div>

        {loadingT ? (
          <div className="flex flex-col gap-3">
            {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-10 rounded-lg" />)}
          </div>
        ) : (
          <div className="flex flex-col">
            {trending.map((article, index) => (
              <Link
                key={article.id}
                href={`/articles/${article.id}`}
                className={cn(
                  "flex items-start gap-3 py-2.5 group",
                  index < trending.length - 1 && "border-b border-border"
                )}
              >
                <span className="shrink-0 w-5 h-5 rounded-full bg-[#E94560]/10 text-[#E94560] text-xs font-semibold flex items-center justify-center mt-0.5">
                  {index + 1}
                </span>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <p className="text-sm font-medium leading-snug line-clamp-2 text-foreground group-hover:text-[#E94560] transition-colors">
                    {article.title}
                  </p>
                  {article.source && (
                    <p className="text-xs text-muted-foreground">{article.source.name}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-border" />

      {/* ── Featured Tools ── */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Wrench className="size-4 text-[#E94560]" />
          Featured Tools
        </div>

        {loadingR ? (
          <div className="flex flex-col gap-2">
            {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-16 rounded-xl" />)}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {tools.map((tool) => (
                <a
                  key={tool.id}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2.5 rounded-xl border border-border hover:border-[#E94560]/40 hover:bg-accent/40 transition-all group"
                >
                  <ToolIcon tool={tool} />

                  {/* Details */}
                  <div className="flex flex-col min-w-0 flex-1 gap-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-semibold text-foreground group-hover:text-[#E94560] transition-colors truncate">
                        {tool.name}
                      </span>
                      <span
                        className="text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0"
                        style={{
                          color:           PRICING_COLORS[tool.pricing] ?? "#6B7280",
                          backgroundColor: `${PRICING_COLORS[tool.pricing] ?? "#6B7280"}18`,
                        }}
                      >
                        {tool.pricing}
                      </span>
                    </div>
                    {tool.description && (
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {tool.description}
                      </p>
                    )}
                    <p className="text-[10px] text-muted-foreground/60">{tool.category.name}</p>
                  </div>

                  <ArrowUpRight className="size-3.5 text-muted-foreground group-hover:text-[#E94560] transition-colors shrink-0" />
                </a>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
