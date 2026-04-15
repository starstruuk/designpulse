'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Bookmark,
  WrenchIcon,
  CalendarDays,
  Check,
  Loader2,
  LogOut,
  User,
  CalendarX,
} from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { browserClient } from '@/lib/supabase/client';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import Navbar from '@/components/layout/Navbar';
import EventCard from '@/components/events/EventCard';
import EventModal from '@/components/events/EventModal';
import LiveStreamPlayer from '@/components/events/LiveStreamPlayer';
import { Event } from '@/types';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface BookmarkedArticle {
  id: string;
  title: string;
  url: string;
  excerpt: string | null;
  imageUrl: string | null;
  publishedAt: string | null;
  source: { name: string } | null;
}

interface BookmarkedResource {
  id: string;
  name: string;
  url: string;
  description: string | null;
  pricing: 'FREE' | 'FREEMIUM' | 'PAID';
  logoLetter: string | null;
  logoColor: string | null;
  category: { name: string; color: string | null };
}

interface BookmarksData {
  articles: BookmarkedArticle[];
  resources: BookmarkedResource[];
}

type Tab = 'overview' | 'events';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DISCIPLINES = [
  { slug: 'product',     name: 'Product Design',    description: 'UX strategy, research & systems',       color: '#8B5CF6', emoji: '📦' },
  { slug: 'ux',          name: 'UX Design',          description: 'User research, flows & wireframes',     color: '#EF4444', emoji: '🔍' },
  { slug: 'ui',          name: 'UI Design',          description: 'Visual interfaces & design systems',    color: '#14B8A6', emoji: '🎨' },
  { slug: 'graphic',     name: 'Graphic Design',     description: 'Branding, print & visual identity',    color: '#F97316', emoji: '✏️' },
  { slug: 'motion',      name: 'Motion Design',      description: 'Animation, transitions & video',       color: '#10B981', emoji: '🎬' },
  { slug: 'interaction', name: 'Interaction Design', description: 'Prototyping & micro-interactions',     color: '#FBBF24', emoji: '⚡' },
  { slug: 'ai',          name: 'AI & Design',        description: 'Generative AI tools & AI-powered UX', color: '#06B6D4', emoji: '🤖' },
  { slug: 'visual',      name: 'Visual Design',      description: 'Illustration, photo & art direction',  color: '#EC4899', emoji: '🖼️' },
] as const;

const PRICING_COLORS: Record<string, string> = {
  FREE:     '#22C55E',
  FREEMIUM: '#F59E0B',
  PAID:     '#3B82F6',
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatMemberSince(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function formatPublishedDate(dateString: string | null): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getInitials(name: string | null, email: string | undefined): string {
  if (name) {
    return name
      .split(' ')
      .map((p) => p[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }
  return (email?.[0] ?? 'U').toUpperCase();
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SectionHeader({
  icon: Icon,
  title,
  count,
}: {
  icon: React.ElementType;
  title: string;
  count: number;
}) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Icon className="size-4 text-[#E94560]" />
      <h2 className="text-sm font-semibold text-white uppercase tracking-wide">{title}</h2>
      <span className="ml-1 inline-flex items-center justify-center rounded-full bg-[#0F3460] px-2 py-0.5 text-xs font-medium text-[#A8AABC]">
        {count}
      </span>
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
    <div className="flex flex-col items-center justify-center py-10 gap-2 text-center">
      <Icon className="size-8 text-[#0F3460]" />
      <p className="text-sm font-medium text-white">{title}</p>
      <p className="text-xs text-[#A8AABC] max-w-xs">{subtext}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Loading skeleton
// ---------------------------------------------------------------------------

function AccountSkeleton() {
  return (
    <div className="min-h-screen bg-[#1A1A2E]">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
        <Skeleton className="h-28 w-full rounded-xl bg-[#16213E]" />
        <Skeleton className="h-40 w-full rounded-xl bg-[#16213E]" />
        <Skeleton className="h-40 w-full rounded-xl bg-[#16213E]" />
        <Skeleton className="h-64 w-full rounded-xl bg-[#16213E]" />
        <Skeleton className="h-20 w-full rounded-xl bg-[#16213E]" />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// My Events tab content
// ---------------------------------------------------------------------------

function MyEventsTab({
  events,
  rsvpIds,
  onRsvp,
}: {
  events: Event[];
  rsvpIds: Set<string>;
  onRsvp: (eventId: string) => Promise<void>;
}) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [liveEvent, setLiveEvent]         = useState<Event | null>(null);

  const upcoming = events.filter((e) => e.status !== 'ARCHIVED');
  const past     = events.filter((e) => e.status === 'ARCHIVED');

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
        <CalendarX className="size-10 text-[#0F3460]" />
        <p className="text-sm font-medium text-white">No registered events yet</p>
        <p className="text-sm text-[#A8AABC]">
          RSVP to events on the{' '}
          <a href="/events" className="text-[#E94560] hover:underline">Events page</a>
          {' '}and they&apos;ll appear here.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-8">
        {upcoming.length > 0 && (
          <section>
            <p className="text-xs font-semibold text-[#A8AABC] uppercase tracking-widest mb-3">
              Upcoming & Live · {upcoming.length}
            </p>
            <div className="flex flex-col gap-4">
              {upcoming.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  isRsvp={rsvpIds.has(event.id)}
                  onRsvp={() => onRsvp(event.id)}
                  onView={() => setSelectedEvent(event)}
                  onWatchLive={() => setLiveEvent(event)}
                />
              ))}
            </div>
          </section>
        )}

        {past.length > 0 && (
          <section>
            <p className="text-xs font-semibold text-[#A8AABC] uppercase tracking-widest mb-3">
              Past Events · {past.length}
            </p>
            <div className="flex flex-col gap-4">
              {past.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  isRsvp={rsvpIds.has(event.id)}
                  onRsvp={() => onRsvp(event.id)}
                  onView={() => setSelectedEvent(event)}
                  onWatchLive={() => setLiveEvent(event)}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          isRsvp={rsvpIds.has(selectedEvent.id)}
          onRsvp={() => onRsvp(selectedEvent.id)}
          onClose={() => setSelectedEvent(null)}
          onWatchLive={() => { setLiveEvent(selectedEvent); setSelectedEvent(null); }}
        />
      )}

      {liveEvent && (
        <LiveStreamPlayer
          event={liveEvent}
          onClose={() => setLiveEvent(null)}
        />
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

/**
 * Account page — profile overview + registered events tab.
 * Protected by proxy.ts — only authenticated users can reach this route.
 */
export default function AccountPage() {
  const router = useRouter();

  const [user, setUser]               = useState<SupabaseUser | null>(null);
  const [loading, setLoading]         = useState(true);
  const [tab, setTab]                 = useState<Tab>('overview');
  const [bookmarks, setBookmarks]     = useState<BookmarksData>({ articles: [], resources: [] });
  const [rsvpEvents, setRsvpEvents]   = useState<Event[]>([]);
  const [rsvpIds, setRsvpIds]         = useState<Set<string>>(new Set());
  const [selected, setSelected]       = useState<Set<string>>(new Set());
  const [saving, setSaving]           = useState(false);
  const [saved, setSaved]             = useState(false);
  const [disciplineError, setDisciplineError] = useState<string | null>(null);

  // ── Load user + parallel data fetches ────────────────────────────────────
  useEffect(() => {
    browserClient.auth.getUser().then(({ data: { user: authUser } }) => {
      if (!authUser) {
        router.push('/login');
        return;
      }
      setUser(authUser);

      Promise.all([
        fetch('/api/user/bookmarks').then((r) => r.json() as Promise<BookmarksData>),
        fetch('/api/user/disciplines').then((r) => r.json() as Promise<{ disciplines?: string[] }>),
        fetch('/api/user/rsvp').then((r) => r.json() as Promise<{ eventIds?: string[]; events?: Event[] }>),
      ])
        .then(([bData, dData, rData]) => {
          setBookmarks(bData);
          if (dData.disciplines) setSelected(new Set(dData.disciplines));
          setRsvpIds(new Set(rData.eventIds ?? []));
          setRsvpEvents(rData.events ?? []);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    });
  }, [router]);

  const handleRsvp = useCallback(async (eventId: string) => {
    const res  = await fetch('/api/user/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId }),
    });
    const data = await res.json() as { rsvped?: boolean };

    if (data.rsvped === false) {
      setRsvpEvents((prev) => prev.filter((e) => e.id !== eventId));
      setRsvpIds((prev) => { const s = new Set(prev); s.delete(eventId); return s; });
    } else {
      setRsvpIds((prev) => new Set(prev).add(eventId));
    }
  }, []);

  const toggle = (slug: string) => {
    setSaved(false);
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(slug) ? next.delete(slug) : next.add(slug);
      return next;
    });
  };

  const handleSave = async () => {
    if (selected.size === 0) return;
    setSaving(true);
    setDisciplineError(null);
    try {
      const res = await fetch('/api/user/disciplines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ disciplines: Array.from(selected) }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({})) as { error?: string };
        setDisciplineError(data.error ?? 'Failed to save. Please try again.');
        return;
      }
      setSaved(true);
    } catch {
      setDisciplineError('Something went wrong. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await browserClient.auth.signOut();
    router.push('/');
    router.refresh();
  };

  if (loading) return <AccountSkeleton />;
  if (!user) return null;

  const name        = (user.user_metadata?.name as string) ?? null;
  const initials    = getInitials(name, user.email);
  const memberSince = user.created_at ? formatMemberSince(user.created_at) : null;

  const TABS: { id: Tab; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'events',   label: 'My Events', icon: CalendarDays, badge: rsvpEvents.length },
  ];

  return (
    <div className="min-h-screen bg-[#1A1A2E]">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* ── Page header ──────────────────────────────────────────────────── */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Account</h1>
          <p className="text-sm text-[#A8AABC] mt-1">Manage your profile and registered events</p>
        </div>

        {/* ── Tabs ─────────────────────────────────────────────────────────── */}
        <div className="flex gap-1 mb-8 bg-[#16213E] rounded-xl p-1 border border-[#0F3460] w-fit">
          {TABS.map(({ id, label, icon: Icon, badge }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                tab === id
                  ? 'bg-[#E94560] text-white shadow-sm'
                  : 'text-[#A8AABC] hover:text-white hover:bg-[#0F3460]'
              )}
            >
              <Icon className="size-4" />
              {label}
              {badge !== undefined && badge > 0 && (
                <span
                  className={cn(
                    'inline-flex items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold min-w-4.5',
                    tab === id
                      ? 'bg-white/20 text-white'
                      : 'bg-[#0F3460] text-[#A8AABC]'
                  )}
                >
                  {badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Tab: Overview ────────────────────────────────────────────────── */}
        {tab === 'overview' && (
          <div className="space-y-6">

            {/* Profile card */}
            <div className="rounded-xl border border-[#0F3460] bg-[#16213E] p-6 shadow-lg shadow-black/30 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[#E94560] text-white text-2xl font-bold shrink-0 select-none">
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  {name && (
                    <p className="font-semibold text-white text-base leading-tight truncate">{name}</p>
                  )}
                  <p className="text-sm text-[#A8AABC] truncate">{user.email}</p>
                  {memberSince && (
                    <p className="text-xs text-[#A8AABC]/60 mt-0.5">Member since {memberSince}</p>
                  )}
                </div>
              </div>

              {/* Stat pills */}
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0F3460] bg-[#1A1A2E] px-3 py-1 text-xs text-[#A8AABC]">
                  <Bookmark className="size-3 text-[#E94560]" />
                  {bookmarks.articles.length} article{bookmarks.articles.length !== 1 ? 's' : ''} saved
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0F3460] bg-[#1A1A2E] px-3 py-1 text-xs text-[#A8AABC]">
                  <WrenchIcon className="size-3 text-[#E94560]" />
                  {bookmarks.resources.length} tool{bookmarks.resources.length !== 1 ? 's' : ''} saved
                </span>
                <button
                  onClick={() => setTab('events')}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#0F3460] bg-[#1A1A2E] px-3 py-1 text-xs text-[#A8AABC] hover:border-[#E94560] hover:text-white transition-colors cursor-pointer"
                >
                  <CalendarDays className="size-3 text-[#E94560]" />
                  {rsvpEvents.length} event{rsvpEvents.length !== 1 ? 's' : ''} registered
                </button>
              </div>
            </div>

            {/* Saved Articles */}
            <div className="rounded-xl border border-[#0F3460] bg-[#16213E] p-6 shadow-lg shadow-black/30">
              <SectionHeader icon={Bookmark} title="Saved Articles" count={bookmarks.articles.length} />
              {bookmarks.articles.length === 0 ? (
                <EmptyState
                  icon={Bookmark}
                  title="No saved articles yet"
                  subtext="Bookmark articles from the feed to find them here."
                />
              ) : (
                <div className="flex gap-3 overflow-x-auto pb-2 -mb-2 scrollbar-thin">
                  {bookmarks.articles.map((article) => (
                    <a
                      key={article.id}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 w-48 flex flex-col gap-2 rounded-xl border border-[#0F3460] bg-[#1A1A2E] p-3 hover:border-[#E94560] transition-all duration-200 hover:scale-[1.02]"
                    >
                      {article.imageUrl ? (
                        <div className="relative w-full h-24 rounded-lg overflow-hidden">
                          <Image
                            src={article.imageUrl}
                            alt={article.title}
                            fill
                            unoptimized
                            className="object-cover"
                            sizes="192px"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-24 rounded-lg bg-[#0F3460] flex items-center justify-center">
                          <Bookmark className="size-6 text-[#A8AABC]" />
                        </div>
                      )}
                      <p className="text-sm font-semibold text-white line-clamp-2 leading-tight">
                        {article.title}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-[#A8AABC]">
                        {article.source && <span className="truncate">{article.source.name}</span>}
                        {article.source && article.publishedAt && <span className="shrink-0">·</span>}
                        {article.publishedAt && (
                          <span className="shrink-0">{formatPublishedDate(article.publishedAt)}</span>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Saved Tools */}
            <div className="rounded-xl border border-[#0F3460] bg-[#16213E] p-6 shadow-lg shadow-black/30">
              <SectionHeader icon={WrenchIcon} title="Saved Tools" count={bookmarks.resources.length} />
              {bookmarks.resources.length === 0 ? (
                <EmptyState
                  icon={WrenchIcon}
                  title="No saved tools yet"
                  subtext="Save tools from the Resources page to find them here."
                />
              ) : (
                <div className="flex gap-3 overflow-x-auto pb-2 -mb-2 scrollbar-thin">
                  {bookmarks.resources.map((resource) => (
                    <a
                      key={resource.id}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 w-48 flex flex-col gap-2 rounded-xl border border-[#0F3460] bg-[#1A1A2E] p-3 hover:border-[#E94560] transition-all duration-200 hover:scale-[1.02]"
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
                        style={{ backgroundColor: resource.logoColor ?? '#0F3460' }}
                      >
                        {resource.logoLetter ?? resource.name[0].toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white leading-tight truncate">{resource.name}</p>
                        <p className="text-xs text-[#A8AABC] truncate mt-0.5">{resource.category.name}</p>
                      </div>
                      <span
                        className="self-start inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold text-white"
                        style={{ backgroundColor: PRICING_COLORS[resource.pricing] ?? '#6B7280' }}
                      >
                        {resource.pricing}
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Design Disciplines */}
            <div className="rounded-xl border border-[#0F3460] bg-[#16213E] p-6 shadow-lg shadow-black/30 space-y-5">
              <div>
                <h2 className="text-sm font-semibold text-[#A8AABC] uppercase tracking-wide mb-1">
                  Design Disciplines
                </h2>
                <p className="text-sm text-[#A8AABC]">Your feed is filtered based on these selections.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {DISCIPLINES.map((d) => {
                  const isSelected = selected.has(d.slug);
                  return (
                    <button
                      key={d.slug}
                      onClick={() => toggle(d.slug)}
                      className={cn(
                        'relative flex flex-col items-start gap-2 p-4 rounded-xl border transition-all text-left hover:shadow-md',
                        isSelected ? 'shadow-sm' : 'border-[#0F3460] bg-[#1A1A2E] hover:bg-[#1F2B4A]'
                      )}
                      style={isSelected ? { borderColor: d.color + '60', backgroundColor: d.color + '12' } : {}}
                    >
                      {isSelected && (
                        <span
                          className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: d.color }}
                        >
                          <Check className="size-2.5 text-white" strokeWidth={3} />
                        </span>
                      )}
                      <span className="text-xl leading-none">{d.emoji}</span>
                      <div>
                        <p className="text-sm font-semibold text-white leading-tight">{d.name}</p>
                        <p className="text-[11px] text-[#A8AABC] leading-tight mt-0.5">{d.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {disciplineError && <p className="text-sm text-[#E94560]">{disciplineError}</p>}

              <Button
                onClick={handleSave}
                disabled={saving || selected.size === 0}
                className={cn(
                  'h-10 px-5 text-sm font-semibold transition-all',
                  saved
                    ? 'bg-[#00B894] hover:bg-[#00B894]/90 text-white'
                    : 'bg-[#E94560] hover:bg-[#E94560]/90 text-white'
                )}
              >
                {saving ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : saved ? (
                  <><Check className="size-4 mr-1.5" />Saved</>
                ) : (
                  'Save preferences'
                )}
              </Button>
            </div>

            {/* Sign Out */}
            <div className="rounded-xl border border-[#0F3460] bg-[#16213E] p-6 shadow-lg shadow-black/30 space-y-3">
              <h2 className="text-sm font-semibold text-[#A8AABC] uppercase tracking-wide">Session</h2>
              <p className="text-sm text-[#A8AABC]">Sign out of DesignPulse on this device.</p>
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="gap-2 text-[#E94560] border-[#E94560]/30 hover:bg-[#E94560]/8 hover:text-[#E94560]"
              >
                <LogOut className="size-4" />
                Sign out
              </Button>
            </div>

          </div>
        )}

        {/* ── Tab: My Events ────────────────────────────────────────────────── */}
        {tab === 'events' && (
          <MyEventsTab
            events={rsvpEvents}
            rsvpIds={rsvpIds}
            onRsvp={handleRsvp}
          />
        )}

      </div>
    </div>
  );
}
