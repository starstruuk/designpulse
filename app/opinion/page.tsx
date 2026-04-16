'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import {
  MessageSquareQuote, PenLine, X, Send, ExternalLink, Clock,
  ChevronRight, Loader2, Sparkles, CheckCircle2, AlertCircle, Globe,
  ArrowUpRight, Bookmark, BookmarkCheck,
} from 'lucide-react';
import { browserClient } from '@/lib/supabase/client';
import type { Opinion } from '@/types';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

/* ─── Types ──────────────────────────────────────────────────── */

interface OpinionData {
  id: string | number;
  title: string;
  excerpt: string;
  snippet: string;
  author: { name: string; role: string; avatar: string; bio: string; twitter?: string };
  image: string | null;  // null triggers gradient fallback
  publishedDate: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
  sourceUrl?: string;
}

/* ─── Image & gradient helpers ───────────────────────────────── */

const OPINION_GRADIENTS = [
  'linear-gradient(135deg, #E94560 0%, #1A1A2E 100%)',
  'linear-gradient(135deg, #FF6719 0%, #16213E 100%)',
  'linear-gradient(135deg, #8B5CF6 0%, #1A1A2E 100%)',
  'linear-gradient(135deg, #06B6D4 0%, #16213E 100%)',
  'linear-gradient(135deg, #10B981 0%, #1A1A2E 100%)',
  'linear-gradient(135deg, #3B82F6 0%, #16213E 100%)',
  'linear-gradient(135deg, #FF4500 0%, #1A1A2E 100%)',
];

function getOpinionGradient(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash |= 0;
  }
  return OPINION_GRADIENTS[Math.abs(hash) % OPINION_GRADIENTS.length];
}

function isValidImageUrl(url: string | null | undefined): url is string {
  if (!url || url === 'none' || url === 'null') return false;
  return url.startsWith('http');
}

/* ─── Excerpt cleaner ────────────────────────────────────────── */

const SKIP_LINE_RE = /\b(sponsor(ed|ship)?|affiliate|unsubscribe|adverti(se|sing|sement)|paid\s+(partner|placement)|photo\s+by|image\s+(by|via|credit)|photo\s+credit|courtesy\s+of|illustration\s+by|getty\s+images?|shutterstock|unsplash|flickr|©|all\s+rights\s+reserved)\b/i;

/**
 * Strips leading sponsored/boilerplate/attribution sentences from RSS-sourced excerpts.
 * Splits on newlines and period-boundaries, then skips sentences that
 * contain known noise patterns, returning the first clean sentence found.
 */
function cleanExcerpt(raw: string): string {
  const chunks = raw
    .split('\n')
    .flatMap((line) => line.split('. '))
    .map((s) => s.trim())
    .filter((s) => s.length > 25);

  const cleanIdx = chunks.findIndex((s) => !SKIP_LINE_RE.test(s));
  if (cleanIdx > 0 && chunks[cleanIdx]) {
    const clean = chunks.slice(cleanIdx).join('. ');
    return clean.slice(0, 220) + (clean.length > 220 ? '…' : '');
  }
  return raw;
}

/** Maps a DB Opinion record to the page's OpinionData shape. */
function normalizeOpinion(o: Opinion): OpinionData {
  const avatar = o.authorAvatar
    ?? `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(o.authorName)}&backgroundColor=0f3460`;
  return {
    id:           o.id,
    title:        o.title,
    excerpt:      cleanExcerpt(o.excerpt),
    snippet:      o.snippet ? cleanExcerpt(o.snippet) : cleanExcerpt(o.excerpt),
    author: {
      name:    o.authorName,
      role:    o.authorRole ?? '',
      avatar,
      bio:     o.authorBio ?? '',
      twitter: o.authorHandle ?? undefined,
    },
    image:        isValidImageUrl(o.imageUrl) ? o.imageUrl : null,
    publishedDate: new Date(o.publishedAt).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    }),
    readTime:     o.readTime ?? '5 min read',
    tags:         o.tags,
    featured:     o.featured,
    sourceUrl:    o.sourceUrl,
  };
}

/* ─── Static fallback data (shown until DB is seeded) ────────── */

const STATIC_OPINIONS: OpinionData[] = [
  {
    id: 101,
    title: "Design Systems Are Killing Creativity — And That's Not Okay",
    excerpt: "We've traded craft for consistency. The design systems revolution promised scalability, but it's delivering mediocrity at scale.",
    snippet: "Every product looks the same now. The same rounded corners, the same 8px grid, the same component library with the same patterns. Design systems were supposed to free us from repetitive work so we could focus on innovation — instead, they've become a cage that rewards conformity over creativity. It's time to push back.",
    author: {
      name: 'Mira Vasquez',
      role: 'Creative Director, Studio Fray',
      avatar: 'https://images.unsplash.com/photo-1655249481446-25d575f1c054?w=80&q=80',
      bio: 'Mira runs an award-winning studio challenging the status quo of digital product design.',
      twitter: 'miravasquez',
    },
    image: 'https://images.unsplash.com/photo-1761628332000-9da4f810183e?w=1200&q=80',
    publishedDate: 'February 25, 2026',
    readTime: '7 min read',
    tags: ['Design Systems', 'Creativity', 'Hot Take'],
    featured: true,
  },
  {
    id: 102,
    title: "AI Won't Replace Designers — But Designers Who Use AI Will Replace Those Who Don't",
    excerpt: "The real competitive advantage isn't resisting AI tools. It's mastering them faster than your peers.",
    snippet: "Every technological shift produces the same cycle of denial, fear, and eventual adoption. AI is no different. The designers who thrive in 2027 won't be the ones who ignored generative tools — they'll be the ones who learned to wield them as creative amplifiers.",
    author: {
      name: 'Julian Park',
      role: 'Head of Design, Runway ML',
      avatar: 'https://images.unsplash.com/photo-1672685667592-0392f458f46f?w=80&q=80',
      bio: 'Julian leads design at Runway ML, where he works at the frontier of AI-assisted creative workflows.',
      twitter: 'julianpark',
    },
    image: 'https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?w=800&q=80',
    publishedDate: 'February 24, 2026',
    readTime: '6 min read',
    tags: ['AI', 'Future of Design', 'Career'],
  },
  {
    id: 103,
    title: 'We Need to Talk About Sustainable Design — For Real This Time',
    excerpt: "Greenwashing in design is rampant. Here's what genuine sustainability in digital product design actually looks like.",
    snippet: "Adding a leaf icon and choosing a green color palette doesn't make your product sustainable. Real sustainable design means reducing data transfer, optimizing asset sizes, eliminating dark patterns that drive overconsumption, and questioning whether the feature you're building needs to exist at all.",
    author: {
      name: 'Amara Osei',
      role: 'Sustainability Design Lead, Patagonia Digital',
      avatar: 'https://images.unsplash.com/photo-1636293875439-b3125c0f1fc1?w=80&q=80',
      bio: 'Amara leads sustainable design initiatives at Patagonia\'s digital team.',
    },
    image: 'https://images.unsplash.com/photo-1738512503391-a0c889991257?w=800&q=80',
    publishedDate: 'February 23, 2026',
    readTime: '8 min read',
    tags: ['Sustainability', 'Ethics', 'UX'],
  },
  {
    id: 104,
    title: 'The Remote Work Backlash Is Wrong — Design Teams Thrive Distributed',
    excerpt: 'Return-to-office mandates are based on nostalgia, not evidence. Distributed design teams can outperform co-located ones.',
    snippet: "The data is clear: distributed design teams produce work of equal or higher quality when given the right tools, rituals, and trust. The return-to-office push is driven by management anxiety, not by any measurable decline in design output.",
    author: {
      name: 'Noah Friedman',
      role: 'VP Design, Figma',
      avatar: 'https://images.unsplash.com/photo-1561736953-fab83e00232e?w=80&q=80',
      bio: 'Noah oversees design at Figma and is a vocal advocate for distributed design culture.',
      twitter: 'noahfriedman',
    },
    image: 'https://images.unsplash.com/photo-1759752394757-323a0adc0d62?w=800&q=80',
    publishedDate: 'February 22, 2026',
    readTime: '5 min read',
    tags: ['Remote Work', 'Culture', 'Leadership'],
  },
  {
    id: 105,
    title: 'Typography Is Still the Most Underrated Skill in Product Design',
    excerpt: 'We obsess over layout and color, but most interfaces succeed or fail based on type choices alone.',
    snippet: "Look at any beautifully designed product and strip away the color, the imagery, the illustrations. What's left? Type. Typography carries 95% of the information in most interfaces, yet it gets 5% of the design attention.",
    author: {
      name: 'Mira Vasquez',
      role: 'Creative Director, Studio Fray',
      avatar: 'https://images.unsplash.com/photo-1655249481446-25d575f1c054?w=80&q=80',
      bio: 'Mira runs an award-winning studio challenging the status quo of digital product design.',
      twitter: 'miravasquez',
    },
    image: 'https://images.unsplash.com/photo-1657490017668-b0f0c96d592d?w=800&q=80',
    publishedDate: 'February 21, 2026',
    readTime: '6 min read',
    tags: ['Typography', 'Product Design', 'Craft'],
  },
  {
    id: 106,
    title: "Accessibility Isn't a Feature — It's a Moral Imperative We Keep Ignoring",
    excerpt: 'Despite decades of guidelines and standards, the web is still overwhelmingly hostile to disabled users.',
    snippet: "We've had WCAG since 1999. We've had screen readers for decades. Yet study after study shows that the vast majority of websites fail basic accessibility audits. The problem isn't knowledge — it's priorities.",
    author: {
      name: 'Amara Osei',
      role: 'Sustainability Design Lead, Patagonia Digital',
      avatar: 'https://images.unsplash.com/photo-1636293875439-b3125c0f1fc1?w=80&q=80',
      bio: 'Amara leads sustainable design initiatives at Patagonia\'s digital team.',
    },
    image: 'https://images.unsplash.com/photo-1761773850623-7dce19588412?w=800&q=80',
    publishedDate: 'February 20, 2026',
    readTime: '9 min read',
    tags: ['Accessibility', 'Ethics', 'Inclusion'],
  },
];

/* ─── Platform SVG Icons ─────────────────────────────────────── */

const RedditIcon = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.249-.561 1.249-1.249 0-.688-.562-1.249-1.25-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 0-.463.327.327 0 0 0-.232-.094c-.058 0-.116.028-.163.071-.477.49-1.476.73-2.552.73-1.076 0-2.089-.24-2.58-.73a.272.272 0 0 0-.164-.071z" />
  </svg>
);
const LinkedInIcon = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const InstagramIcon = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 1 0 0-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 1 1-2.882 0 1.441 1.441 0 0 1 2.882 0z" />
  </svg>
);
const XTwitterIcon = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const socialPlatforms = [
  { name: 'Reddit',     Icon: RedditIcon,    color: '#FF4500' },
  { name: 'LinkedIn',   Icon: LinkedInIcon,  color: '#0A66C2' },
  { name: 'Instagram',  Icon: InstagramIcon, color: '#E4405F' },
  { name: 'X / Twitter', Icon: XTwitterIcon, color: '#000000' },
];

/* ─── Featured Opinion Card ──────────────────────────────────── */

function FeaturedOpinionCard({ opinion, isBookmarked, onBookmark }: { opinion: OpinionData; isBookmarked: boolean; onBookmark: () => void }) {
  return (
    <a
      href={opinion.sourceUrl ?? '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-2xl overflow-hidden border border-border bg-card cursor-pointer transition-all hover:shadow-2xl"
    >
      {/* Image */}
      <div className="relative h-56 sm:h-72 lg:h-80 overflow-hidden">
        {opinion.image ? (
          <Image
            src={opinion.image}
            alt={opinion.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div
            className="absolute inset-0 transition-transform group-hover:scale-105"
            style={{ background: getOpinionGradient(opinion.author.name) }}
          />
        )}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)' }} />

        {/* Featured badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 rounded-full flex items-center gap-1.5 text-[11px] font-semibold text-white" style={{ backgroundColor: 'rgba(233,69,96,0.9)' }}>
            <MessageSquareQuote className="size-3" />
            Featured Opinion
          </span>
        </div>

        {/* Mobile: title over image */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:hidden">
          <h2 className="text-white text-xl font-semibold leading-snug mb-2">{opinion.title}</h2>
          <div className="flex items-center gap-2">
            <Image src={opinion.author.avatar} alt={opinion.author.name} width={28} height={28} className="rounded-full object-cover" unoptimized />
            <span className="text-white/80 text-xs">{opinion.author.name}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-7">
        {/* Desktop title */}
        <h2 className="hidden sm:block text-2xl font-semibold leading-snug text-foreground mb-3 transition-colors group-hover:text-[#E94560]">
          {opinion.title}
        </h2>

        {/* Author byline */}
        <div className="flex items-center gap-3 mb-4">
          <Image
            src={opinion.author.avatar}
            alt={opinion.author.name}
            width={40}
            height={40}
            className="rounded-full object-cover hidden sm:block border-2 border-border shrink-0"
            unoptimized
          />
          <div>
            <p className="text-[13px] font-semibold text-foreground">{opinion.author.name}</p>
            <p className="text-[11px] text-muted-foreground">{opinion.author.role} · {opinion.publishedDate}</p>
          </div>
        </div>

        {/* Snippet */}
        <p className="text-sm leading-relaxed text-muted-foreground mb-4">{opinion.snippet}</p>

        {/* Tags + read time + bookmark */}
        <div className="flex items-center gap-2 flex-wrap">
          {opinion.tags.map((tag) => (
            <span key={tag} className="px-2.5 py-1 rounded-full text-[11px] bg-accent text-muted-foreground">
              {tag}
            </span>
          ))}
          <span className="flex items-center gap-1 ml-auto text-[11px] text-muted-foreground">
            <Clock className="size-3" />
            {opinion.readTime}
          </span>
          {typeof opinion.id === 'string' && (
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onBookmark(); }}
              className={cn(
                'p-1.5 rounded-lg transition-colors',
                isBookmarked ? 'text-[#E94560]' : 'text-muted-foreground hover:text-[#E94560]'
              )}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
            >
              {isBookmarked ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
            </button>
          )}
        </div>
      </div>
    </a>
  );
}

/* ─── Opinion Card ───────────────────────────────────────────── */

function OpinionCard({ opinion, isBookmarked, onBookmark }: { opinion: OpinionData; isBookmarked: boolean; onBookmark: () => void }) {
  return (
    <a
      href={opinion.sourceUrl ?? '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl overflow-hidden border border-border bg-card cursor-pointer transition-all hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        {opinion.image ? (
          <Image src={opinion.image} alt={opinion.title} fill className="object-cover transition-transform group-hover:scale-105" unoptimized />
        ) : (
          <div
            className="absolute inset-0 transition-transform group-hover:scale-105"
            style={{ background: getOpinionGradient(opinion.author.name) }}
          />
        )}
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 transition-opacity opacity-40 group-hover:opacity-100"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }}
        />
        {/* Author reveal on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="flex items-center gap-2.5">
            <Image src={opinion.author.avatar} alt={opinion.author.name} width={36} height={36} className="rounded-full object-cover border-2 border-white/30" unoptimized />
            <div>
              <p className="text-white text-xs font-semibold">{opinion.author.name}</p>
              <p className="text-white/60 text-[10px]">{opinion.author.role}</p>
            </div>
          </div>
        </div>
        {/* Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 rounded-full text-[10px] font-semibold text-white" style={{ backgroundColor: 'rgba(233,69,96,0.85)' }}>
            Opinion
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] text-muted-foreground">{opinion.publishedDate}</span>
          <span className="text-[11px] text-muted-foreground">·</span>
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Clock className="size-3" />
            {opinion.readTime}
          </span>
        </div>

        <h3 className="mb-2 text-[15px] font-semibold leading-snug text-foreground line-clamp-2 transition-colors group-hover:text-[#E94560]">
          {opinion.title}
        </h3>

        <p className="mb-3 text-[12.5px] leading-relaxed text-muted-foreground line-clamp-2">
          {opinion.excerpt}
        </p>

        <div className="flex items-center gap-1.5 flex-wrap mb-3">
          {opinion.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] bg-accent text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>

        <div className="pt-3 flex items-center gap-1 text-xs transition-colors border-t border-border text-muted-foreground group-hover:text-[#E94560]">
          Read full piece
          <ChevronRight className="size-3.5" />
          {typeof opinion.id === 'string' && (
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onBookmark(); }}
              className={cn(
                'ml-auto p-1 rounded-lg transition-colors',
                isBookmarked ? 'text-[#E94560]' : 'text-muted-foreground hover:text-[#E94560]'
              )}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
            >
              {isBookmarked ? <BookmarkCheck className="size-3.5" /> : <Bookmark className="size-3.5" />}
            </button>
          )}
        </div>
      </div>
    </a>
  );
}

/* ─── Reddit Post Card ───────────────────────────────────────── */

function RedditPostCard({ opinion }: { opinion: OpinionData }) {
  return (
    <a
      href={opinion.sourceUrl ?? '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-xl overflow-hidden border border-border bg-card transition-all hover:shadow-xl hover:border-[#FF4500]/30 cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-36 overflow-hidden shrink-0">
        {opinion.image ? (
          <Image
            src={opinion.image}
            alt={opinion.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div
            className="absolute inset-0 transition-transform group-hover:scale-105"
            style={{ background: getOpinionGradient(opinion.author.name) }}
          />
        )}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)' }} />
        <div className="absolute top-2.5 left-2.5">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white flex items-center gap-1" style={{ backgroundColor: 'rgba(255,69,0,0.85)' }}>
            <RedditIcon size={10} color="white" />
            {opinion.tags[0] ?? 'Reddit'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3.5 flex flex-col flex-1">
        <h4 className="text-[13px] font-semibold leading-snug text-foreground line-clamp-2 mb-2 group-hover:text-[#FF4500] transition-colors">
          {opinion.title}
        </h4>
        <p className="text-[11.5px] text-muted-foreground leading-relaxed line-clamp-2 mb-auto">
          {opinion.excerpt}
        </p>
        <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-border">
          <span className="text-[10.5px] text-muted-foreground">u/{opinion.author.name}</span>
          <span className="flex items-center gap-1 text-[10.5px] text-muted-foreground">
            <ArrowUpRight className="size-3" />
            {opinion.readTime}
          </span>
        </div>
      </div>
    </a>
  );
}

/* ─── Social Talking Points Section ─────────────────────────── */

function SocialTalkingPointsSection({
  redditPosts,
  loading,
}: {
  redditPosts: OpinionData[];
  loading: boolean;
}) {
  const [activeSubreddit, setActiveSubreddit] = useState<string | null>(null);

  // Derive unique subreddits present in the loaded posts
  const subreddits = useMemo(() => {
    const seen = new Set<string>();
    redditPosts.forEach((p) => {
      const sub = p.tags.find((t) => t.startsWith('r/'));
      if (sub) seen.add(sub);
    });
    return Array.from(seen).sort();
  }, [redditPosts]);

  const visiblePosts = activeSubreddit
    ? redditPosts.filter((p) => p.tags.includes(activeSubreddit))
    : redditPosts;

  const hasReddit = redditPosts.length > 0;

  return (
    <section className="mt-12 sm:mt-16">
      {/* Section header */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(255,69,0,0.12)' }}>
            <RedditIcon size={18} color="#FF4500" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Design Talking Points</h2>
            <p className="text-[11px] text-muted-foreground">Top discussions from the design community on Reddit</p>
          </div>
        </div>
        {hasReddit && (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border" style={{ color: '#FF4500', borderColor: 'rgba(255,69,0,0.3)', backgroundColor: 'rgba(255,69,0,0.08)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4500] animate-pulse" />
            LIVE FROM REDDIT
          </span>
        )}
      </div>

      {/* Subreddit filter pills */}
      {subreddits.length > 1 && (
        <div className="flex items-center gap-2 flex-wrap mb-5">
          <button
            onClick={() => setActiveSubreddit(null)}
            className={cn(
              'px-3 py-1.5 rounded-full text-[11px] font-medium transition-all border',
              activeSubreddit === null
                ? 'text-white border-transparent'
                : 'bg-card text-muted-foreground border-border hover:text-foreground'
            )}
            style={activeSubreddit === null ? { backgroundColor: '#FF4500', borderColor: '#FF4500' } : undefined}
          >
            All
          </button>
          {subreddits.map((sub) => (
            <button
              key={sub}
              onClick={() => setActiveSubreddit(activeSubreddit === sub ? null : sub)}
              className={cn(
                'px-3 py-1.5 rounded-full text-[11px] font-medium transition-all border',
                activeSubreddit === sub
                  ? 'text-white border-transparent'
                  : 'bg-card text-muted-foreground border-border hover:text-foreground'
              )}
              style={activeSubreddit === sub ? { backgroundColor: '#FF4500', borderColor: '#FF4500' } : undefined}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* Reddit grid — shown when data is available */}
      {hasReddit ? (
        visiblePosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visiblePosts.slice(0, 9).map((post) => (
              <RedditPostCard key={post.id} opinion={post} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-sm text-muted-foreground">
            No posts found for {activeSubreddit}.
          </div>
        )
      ) : loading ? (
        <div className="py-16 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin text-[#FF4500]" />
          Loading Reddit discussions…
        </div>
      ) : (
        <div className="py-16 text-center text-sm text-muted-foreground">
          Reddit discussions not available right now.
        </div>
      )}
    </section>
  );
}

/* ─── Write for Us Modal ─────────────────────────────────────── */

function WriteForUsModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({ name: '', email: '', topic: '', pitch: '', portfolio: '' });
  const [submitted, setSubmitted] = useState(false);

  const isValid = !!(formData.name && formData.email && formData.topic && formData.pitch);

  const handleChange = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-lg rounded-2xl overflow-hidden bg-card shadow-2xl" style={{ maxHeight: '90vh' }} role="dialog" aria-modal="true" aria-labelledby="write-modal-title">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[rgba(233,69,96,0.1)]">
              <PenLine className="size-4 text-[#E94560]" />
            </div>
            <h2 id="write-modal-title" className="text-[17px] font-semibold text-foreground">Submit Your Piece</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center bg-accent hover:bg-accent/80 transition-colors" aria-label="Close modal">
            <X className="size-4 text-muted-foreground" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 80px)' }}>
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-[rgba(0,184,148,0.1)]">
                <Send className="size-6 text-[#00B894]" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Pitch Submitted!</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Thanks, {formData.name}! Our editorial team will review your pitch within 5 business days. We&apos;ll reach out at {formData.email}.
              </p>
              <button onClick={onClose} className="mt-6 px-5 py-2.5 rounded-xl text-sm font-medium text-white" style={{ backgroundColor: '#E94560' }}>
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">
                We&apos;re looking for sharp, original perspectives on design, technology, and creative culture. Pieces should be 800–2,000 words.
              </p>

              {[
                { id: 'write-name',  field: 'name',  label: 'Full Name',        type: 'text',  placeholder: 'Your name',                          required: true  },
                { id: 'write-email', field: 'email', label: 'Email',            type: 'email', placeholder: 'you@email.com',                      required: true  },
                { id: 'write-topic', field: 'topic', label: 'Proposed Topic',   type: 'text',  placeholder: 'e.g. Why design tokens are overhyped', required: true  },
              ].map(({ id, field, label, type, placeholder, required }) => (
                <div key={id}>
                  <label htmlFor={id} className="block text-xs font-medium text-muted-foreground mb-1.5">
                    {label} {required && <span className="text-[#E94560]">*</span>}
                  </label>
                  <input
                    id={id}
                    type={type}
                    required={required}
                    value={(formData as Record<string, string>)[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-3.5 py-2.5 rounded-lg text-[13px] bg-background text-foreground border border-border outline-none focus:border-[#E94560] transition-colors"
                  />
                </div>
              ))}

              <div>
                <label htmlFor="write-pitch" className="block text-xs font-medium text-muted-foreground mb-1.5">
                  Your Pitch <span className="text-[#E94560]">*</span>
                </label>
                <textarea
                  id="write-pitch"
                  required
                  rows={4}
                  value={formData.pitch}
                  onChange={(e) => handleChange('pitch', e.target.value)}
                  placeholder="Summarize your argument in 2–3 sentences. What's your angle? Why now?"
                  className="w-full px-3.5 py-2.5 rounded-lg text-[13px] bg-background text-foreground border border-border outline-none focus:border-[#E94560] transition-colors resize-none leading-relaxed"
                />
              </div>

              <div>
                <label htmlFor="write-portfolio" className="block text-xs font-medium text-muted-foreground mb-1.5">
                  Portfolio or Writing Samples <span className="text-[11px] text-muted-foreground/60 font-normal">(optional)</span>
                </label>
                <input
                  id="write-portfolio"
                  type="url"
                  value={formData.portfolio}
                  onChange={(e) => handleChange('portfolio', e.target.value)}
                  placeholder="https://yoursite.com"
                  className="w-full px-3.5 py-2.5 rounded-lg text-[13px] bg-background text-foreground border border-border outline-none focus:border-[#E94560] transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!isValid}
                  className="w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-all"
                  style={{
                    backgroundColor: isValid ? '#E94560' : 'rgba(233,69,96,0.25)',
                    color: isValid ? '#fff' : 'rgba(233,69,96,0.5)',
                  }}
                >
                  <Send className="size-4" />
                  Submit Pitch
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Early Access Modal ─────────────────────────────────────── */

function EarlyAccessModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors]   = useState<{ name?: string; email?: string }>({});
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean }>({});

  const validateField = (field: string, value: string) => {
    if (field === 'name')  return value.trim() ? undefined : 'Name is required';
    if (field === 'email') {
      if (!value.trim()) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email';
    }
  };

  const handleBlur = (field: 'name' | 'email') => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((e) => ({ ...e, [field]: validateField(field, formData[field]) }));
  };

  const handleChange = (field: 'name' | 'email', value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) setErrors((e) => ({ ...e, [field]: validateField(field, value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true });
    const nameErr  = validateField('name', formData.name);
    const emailErr = validateField('email', formData.email);
    setErrors({ name: nameErr, email: emailErr });
    if (!nameErr && !emailErr) setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-sm rounded-2xl bg-card shadow-2xl overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="early-access-title">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[rgba(233,69,96,0.1)]">
              <Sparkles className="size-4 text-[#E94560]" />
            </div>
            <h2 id="early-access-title" className="text-[17px] font-semibold text-foreground">Early Access</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center bg-accent hover:bg-accent/80 transition-colors" aria-label="Close">
            <X className="size-4 text-muted-foreground" />
          </button>
        </div>

        <div className="px-6 py-5">
          {submitted ? (
            <div className="flex flex-col items-center text-center py-6">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-[rgba(0,184,148,0.1)]">
                <CheckCircle2 className="size-6 text-[#00B894]" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">You&apos;re on the list!</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We&apos;ll notify you at <span className="font-medium text-foreground">{formData.email}</span> as soon as Social-Media Design Talking Points launches.
              </p>
              <button onClick={onClose} className="mt-5 px-5 py-2.5 rounded-xl text-sm font-medium text-white" style={{ backgroundColor: '#E94560' }}>
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Be the first to see social-media design talking points when they launch.
              </p>

              {(['name', 'email'] as const).map((field) => (
                <div key={field}>
                  <label htmlFor={`early-${field}`} className="block text-xs font-medium text-muted-foreground mb-1.5">
                    {field === 'name' ? 'Name' : 'Email'} <span className="text-[#E94560]">*</span>
                  </label>
                  <input
                    id={`early-${field}`}
                    type={field === 'email' ? 'email' : 'text'}
                    value={formData[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    onBlur={() => handleBlur(field)}
                    placeholder={field === 'email' ? 'you@example.com' : 'Your name'}
                    className="w-full px-3.5 py-2.5 rounded-lg text-[13px] bg-background text-foreground border border-border outline-none focus:border-[#E94560] transition-colors"
                    style={{ borderColor: touched[field] && errors[field] ? '#E94560' : undefined }}
                  />
                  {touched[field] && errors[field] && (
                    <p className="flex items-center gap-1 mt-1.5 text-[11px] text-[#E94560]" role="alert">
                      <AlertCircle className="size-3" />
                      {errors[field]}
                    </p>
                  )}
                </div>
              ))}

              <button
                type="submit"
                className="w-full py-3 rounded-xl text-sm font-medium text-white transition-colors"
                style={{ backgroundColor: '#E94560' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#d63c55'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#E94560'; }}
              >
                Notify Me
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */

/**
 * Opinion page — featured piece, opinion grid, social talking points, write for us CTA.
 * Editorial opinions (Substack/RSS) are shown in the main grid.
 * Reddit posts appear in the Social Talking Points section.
 */
const PLATFORMS = [
  { value: 'all',      label: 'All Sources', color: '#E94560' },
  { value: 'substack', label: 'Substack',    color: '#FF6719' },
  { value: 'blog',     label: 'Blog',        color: '#3B82F6' },
] as const;
type PlatformValue = typeof PLATFORMS[number]['value'];

export default function OpinionPage() {
  const [earlyAccessOpen, setEarlyAccessOpen] = useState(false);

  // Filter state
  const [platform,    setPlatform]    = useState<PlatformValue>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Editorial opinions (substack / medium / blog / manual)
  const [editorialOpinions, setEditorialOpinions] = useState<OpinionData[]>(STATIC_OPINIONS);
  // Reddit discussions
  const [redditPosts, setRedditPosts] = useState<OpinionData[]>([]);
  const [loading, setLoading]         = useState(true);

  // Bookmarks
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    browserClient.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      fetch('/api/user/bookmarks')
        .then((r) => r.json())
        .then((data: { opinions?: { id: string }[] }) => {
          setBookmarkedIds(new Set((data.opinions ?? []).map((o) => o.id)));
        })
        .catch(() => {});
    });
  }, []);

  async function handleBookmark(opinionId: string) {
    const isBookmarked = bookmarkedIds.has(opinionId);
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      isBookmarked ? next.delete(opinionId) : next.add(opinionId);
      return next;
    });
    const { data: { user } } = await browserClient.auth.getUser();
    if (!user) { setBookmarkedIds((prev) => { const next = new Set(prev); isBookmarked ? next.add(opinionId) : next.delete(opinionId); return next; }); return; }
    await fetch('/api/user/bookmarks', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ opinionId }),
    });
  }

  useEffect(() => {
    setLoading(true);
    async function loadOpinions() {
      try {
        const platformParam = platform === 'all' ? '' : `platform=${platform}&`;

        const [editorialRes, redditRes] = await Promise.all([
          fetch(`/api/opinions?${platformParam}limit=24`),
          // Always fetch reddit independently — it lives in its own section
          fetch('/api/opinions?platform=reddit&limit=18'),
        ]);

        if (editorialRes.ok) {
          const data = await editorialRes.json();
          const normalized: OpinionData[] = (data.opinions as Opinion[])
            .filter((o) => o.sourcePlatform !== 'reddit')
            .map(normalizeOpinion);
          if (normalized.length > 0) setEditorialOpinions(normalized);
        }

        if (redditRes.ok) {
          const data = await redditRes.json();
          const normalized: OpinionData[] = (data.opinions as Opinion[]).map(normalizeOpinion);
          setRedditPosts(normalized);
        }
      } catch {
        // Network error — keep static fallback
      } finally {
        setLoading(false);
      }
    }

    loadOpinions();
  }, [platform]);

  // ── Derived: top tags from editorial opinions ─────────────────
  const allTags = useMemo(() => {
    const freq: Record<string, number> = {};
    editorialOpinions.forEach((o) => o.tags.forEach((t) => { freq[t] = (freq[t] || 0) + 1; }));
    return Object.entries(freq)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 12)
      .map(([t]) => t);
  }, [editorialOpinions]);

  // ── Client-side tag filter ────────────────────────────────────
  const filteredOpinions = useMemo(() => {
    if (!selectedTag) return editorialOpinions;
    return editorialOpinions.filter((o) => o.tags.includes(selectedTag));
  }, [editorialOpinions, selectedTag]);

  const featured = filteredOpinions.find((o) => o.featured) ?? filteredOpinions[0];
  const rest     = featured ? filteredOpinions.filter((o) => o.id !== featured.id) : [];

  return (
    <>
    <Navbar />
    <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-20 lg:pb-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[rgba(233,69,96,0.1)]">
            <MessageSquareQuote className="size-5 text-[#E94560]" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Opinion</h1>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-[560px]">
          Expert commentary and bold perspectives on the forces shaping design today.
          These pieces represent the authors&apos; views, not editorial positions.
        </p>
      </div>

      {/* ── Filters ── */}
      <div className="mb-7 space-y-3">
        {/* Platform tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          {PLATFORMS.map(({ value, label, color }) => (
            <button
              key={value}
              onClick={() => { setPlatform(value); setSelectedTag(null); }}
              className={cn(
                'px-3.5 py-1.5 rounded-full text-xs font-medium transition-all border',
                platform === value
                  ? 'text-white border-transparent'
                  : 'bg-card text-muted-foreground border-border hover:text-foreground'
              )}
              style={
                platform === value
                  ? { backgroundColor: color, borderColor: color }
                  : { ['--hover-color' as string]: color }
              }
              onMouseEnter={(e) => { if (platform !== value) e.currentTarget.style.borderColor = `${color}60`; }}
              onMouseLeave={(e) => { if (platform !== value) e.currentTarget.style.borderColor = ''; }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Tag pills — only shown when editorial content is present */}
        {allTags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] text-muted-foreground shrink-0 font-medium">Topic:</span>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={cn(
                  'px-2.5 py-1 rounded-full text-[11px] transition-colors border',
                  selectedTag === tag
                    ? 'bg-[#E94560]/15 text-[#E94560] border-[#E94560]/30'
                    : 'bg-accent text-muted-foreground border-transparent hover:text-foreground'
                )}
              >
                {tag}
              </button>
            ))}
            {selectedTag && (
              <button
                onClick={() => setSelectedTag(null)}
                className="text-[11px] text-muted-foreground hover:text-foreground ml-1 underline underline-offset-2"
              >
                Clear
              </button>
            )}
          </div>
        )}
      </div>

      {/* Featured */}
      {featured && <FeaturedOpinionCard opinion={featured} isBookmarked={typeof featured.id === 'string' && bookmarkedIds.has(featured.id)} onBookmark={() => typeof featured.id === 'string' && handleBookmark(featured.id)} />}

      {/* More opinions */}
      {rest.length > 0 && (
        <div className="mt-10 sm:mt-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-foreground">More Opinions</h2>
            <span className="text-xs text-muted-foreground">{rest.length} piece{rest.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((opinion) => (
              <OpinionCard key={opinion.id} opinion={opinion} isBookmarked={typeof opinion.id === 'string' && bookmarkedIds.has(opinion.id)} onBookmark={() => typeof opinion.id === 'string' && handleBookmark(opinion.id)} />
            ))}
          </div>
        </div>
      )}

      {/* Empty state when tag/platform filter yields nothing */}
      {!featured && !loading && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-accent mb-3">
            <MessageSquareQuote className="size-5 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">No opinions found for this filter.</p>
          <button
            onClick={() => { setPlatform('all'); setSelectedTag(null); }}
            className="mt-3 text-xs text-[#E94560] hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Social talking points */}
      <SocialTalkingPointsSection
        redditPosts={redditPosts}
        loading={loading}
      />

      {/* Modals */}
      {earlyAccessOpen && <EarlyAccessModal onClose={() => setEarlyAccessOpen(false)} />}
    </main>
    <Footer />
    </>
  );
}
