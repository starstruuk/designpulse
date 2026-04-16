'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Calendar as CalendarIcon, Play, SlidersHorizontal, ChevronDown, ChevronUp,
  Trash2, RotateCcw, CheckSquare2, Square,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EventCard from '@/components/events/EventCard';
import EventCalendar from '@/components/events/EventCalendar';
import EventModal from '@/components/events/EventModal';
import LiveStreamPlayer from '@/components/events/LiveStreamPlayer';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import Pagination from '@/components/shared/Pagination';
import { Event } from '@/types';
import { browserClient } from '@/lib/supabase/client';

type Tab     = 'upcoming' | 'live' | 'archived';
type Pricing = 'all' | 'free' | 'paid';
type View    = 'all' | 'mine' | 'discarded';
type SortBy  = 'date-asc' | 'date-desc' | 'attendees';

const EVENT_TYPES = [
  { value: 'CONFERENCE', label: 'Conference', color: '#6C63FF' },
  { value: 'WORKSHOP',   label: 'Workshop',   color: '#00B894' },
  { value: 'WEBINAR',    label: 'Webinar',     color: '#00D2FF' },
  { value: 'MEETUP',     label: 'Meetup',      color: '#F97316' },
  { value: 'HACKATHON',  label: 'Hackathon',   color: '#E94560' },
  { value: 'AWARD',      label: 'Award',       color: '#FDCB6E' },
] as const;

const SORT_OPTIONS: { value: SortBy; label: string }[] = [
  { value: 'date-asc',   label: 'Date (earliest first)' },
  { value: 'date-desc',  label: 'Date (latest first)'   },
  { value: 'attendees',  label: 'Most popular'           },
];

export default function EventsPage() {
  const [events, setEvents]               = useState<Event[]>([]);
  const [currentMonth, setCurrentMonth]   = useState<Date>(new Date());
  const [rsvpIds, setRsvpIds]             = useState<Set<string>>(new Set());
  const [dismissedIds, setDismissedIds]   = useState<Set<string>>(new Set());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showLiveStream, setShowLiveStream] = useState(false);
  const [view, setView]                   = useState<View>('all');
  const [activeTab, setActiveTab]         = useState<Tab>('upcoming');
  const [pricingFilter, setPricingFilter] = useState<Pricing>('all');
  const [typeFilters, setTypeFilters]     = useState<string[]>([]);
  const [fromDate, setFromDate]           = useState('');
  const [toDate, setToDate]               = useState('');
  const [sortBy, setSortBy]               = useState<SortBy>('date-asc');
  const [filtersOpen, setFiltersOpen]     = useState(false);
  const [loading, setLoading]             = useState(true);
  const [isAuthed, setIsAuthed]           = useState(false);
  const [eventPage, setEventPage]         = useState(1);
  const EVENTS_PER_PAGE = 10;
  // ── Selection mode ─────────────────────────────────────────────
  const [selectMode, setSelectMode]       = useState(false);
  const [selectedIds, setSelectedIds]     = useState<Set<string>>(new Set());

  // ── Hydrate dismissed IDs from localStorage after mount ────────
  useEffect(() => {
    try {
      const stored = localStorage.getItem('dp:dismissed-events');
      if (stored) setDismissedIds(new Set<string>(JSON.parse(stored) as string[]));
    } catch { /* storage unavailable */ }
  }, []);

  // ── Persist dismissed IDs to localStorage ──────────────────────
  useEffect(() => {
    try {
      localStorage.setItem('dp:dismissed-events', JSON.stringify([...dismissedIds]));
    } catch { /* storage unavailable */ }
  }, [dismissedIds]);

  // ── Fetch events + auth on mount ───────────────────────────────
  useEffect(() => {
    fetch('/api/events')
      .then((r) => r.json())
      .then((data) => setEvents(data.events ?? []))
      .catch((err) => console.error('Failed to fetch events:', err))
      .finally(() => setLoading(false));

    browserClient.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      setIsAuthed(true);

      fetch('/api/user/rsvp')
        .then((r) => r.json())
        .then((data: { eventIds?: string[] }) => setRsvpIds(new Set(data.eventIds ?? [])))
        .catch(() => {});

      fetch('/api/user/dismissed')
        .then((r) => r.json())
        .then((data: { eventIds?: string[] }) => {
          if (data.eventIds) setDismissedIds(new Set(data.eventIds));
        })
        .catch(() => {});
    });
  }, []);

  // ── Derived state ───────────────────────────────────────────────
  const liveEvent = events.find((e) => e.status === 'LIVE') ?? null;

  const discardedEvents = useMemo(
    () => events.filter((e) => dismissedIds.has(e.id)),
    [events, dismissedIds],
  );

  const baseList = useMemo(() => {
    if (view === 'discarded') return discardedEvents;
    const active = events.filter((e) => !dismissedIds.has(e.id));
    return view === 'mine' ? active.filter((e) => rsvpIds.has(e.id)) : active;
  }, [events, view, rsvpIds, dismissedIds, discardedEvents]);

  const filteredEvents = useMemo(() => {
    if (view === 'discarded') return discardedEvents;

    let list = baseList.filter((e) =>
      activeTab === 'live'     ? e.status === 'LIVE'     :
      activeTab === 'archived' ? e.status === 'ARCHIVED' :
                                 e.status === 'UPCOMING'
    );
    if (pricingFilter === 'free') list = list.filter((e) => e.isFree);
    if (pricingFilter === 'paid') list = list.filter((e) => !e.isFree);
    if (typeFilters.length > 0)   list = list.filter((e) => typeFilters.includes(e.type));
    if (fromDate) list = list.filter((e) => e.date >= fromDate);
    if (toDate)   list = list.filter((e) => e.date <= toDate);

    return [...list].sort((a, b) => {
      if (sortBy === 'date-asc')  return a.date.localeCompare(b.date);
      if (sortBy === 'date-desc') return b.date.localeCompare(a.date);
      return b.attendees - a.attendees;
    });
  }, [baseList, view, discardedEvents, activeTab, pricingFilter, typeFilters, fromDate, toDate, sortBy]);

  const tabCounts = useMemo(() => ({
    upcoming: baseList.filter((e) => e.status === 'UPCOMING').length,
    live:     baseList.filter((e) => e.status === 'LIVE').length,
    archived: baseList.filter((e) => e.status === 'ARCHIVED').length,
  }), [baseList]);

  // ── Selection helpers ───────────────────────────────────────────
  const visibleIds     = useMemo(() => filteredEvents.map((e) => e.id), [filteredEvents]);
  const allSelected    = visibleIds.length > 0 && visibleIds.every((id) => selectedIds.has(id));
  const someSelected   = visibleIds.some((id) => selectedIds.has(id));

  function toggleSelectMode() {
    setSelectMode((v) => !v);
    setSelectedIds(new Set());
  }

  function toggleSelectOne(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleSelectAll() {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(visibleIds));
    }
  }

  function dismissSelected() {
    selectedIds.forEach((id) => dismissEvent(id));
    setSelectedIds(new Set());
    setSelectMode(false);
  }

  function restoreSelected() {
    selectedIds.forEach((id) => restoreEvent(id));
    setSelectedIds(new Set());
    setSelectMode(false);
  }

  const hasActiveFilters = typeFilters.length > 0 || fromDate || toDate || sortBy !== 'date-asc' || pricingFilter !== 'all';

  // Reset to page 1 whenever filters/tabs change
  useEffect(() => { setEventPage(1); }, [activeTab, pricingFilter, typeFilters, fromDate, toDate, sortBy, view]);

  const eventTotalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);
  const pagedEvents = filteredEvents.slice((eventPage - 1) * EVENTS_PER_PAGE, eventPage * EVENTS_PER_PAGE);

  function clearFilters() {
    setTypeFilters([]);
    setFromDate('');
    setToDate('');
    setSortBy('date-asc');
    setPricingFilter('all');
  }

  function toggleType(type: string) {
    setTypeFilters((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }

  // ── Handlers ────────────────────────────────────────────────────
  const toggleRsvp = useCallback(async (id: string) => {
    const isAdding = !rsvpIds.has(id);
    setRsvpIds((prev) => {
      const next = new Set(prev);
      isAdding ? next.add(id) : next.delete(id);
      return next;
    });
    if (isAuthed) {
      await fetch('/api/user/rsvp', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ eventId: id }),
      });
    }
  }, [rsvpIds, isAuthed]);

  const handleDateClick = useCallback((dateStr: string) => {
    const match = events.find((e) => e.date === dateStr);
    if (match) setSelectedEvent(match);
  }, [events]);

  const dismissEvent = useCallback((id: string) => {
    setDismissedIds((prev) => new Set(prev).add(id));
    if (isAuthed) {
      fetch('/api/user/dismissed', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ eventId: id, action: 'dismiss' }),
      }).catch(() => {});
    }
  }, [isAuthed]);

  const restoreEvent = useCallback((id: string) => {
    setDismissedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    if (isAuthed) {
      fetch('/api/user/dismissed', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ eventId: id, action: 'restore' }),
      }).catch(() => {});
    }
  }, [isAuthed]);

  // ── Render ──────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="flex-1 p-6 max-w-[1400px] mx-auto">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#E94560]/10">
                <CalendarIcon className="size-5 text-[#E94560]" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Events</h1>
            </div>
            <p className="text-sm text-muted-foreground max-w-lg leading-relaxed">
              Upcoming live streams, workshops, and community meetups for designers.
            </p>
          </div>

          {liveEvent && (
            <button
              onClick={() => setShowLiveStream(true)}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all hover:shadow-lg bg-[#E94560]/10 border border-[#E94560]/20"
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#E94560] opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E94560]" />
              </span>
              <span className="text-sm font-semibold text-[#E94560]">
                Live Now: {liveEvent.title.length > 30 ? liveEvent.title.slice(0, 30) + '…' : liveEvent.title}
              </span>
              <Play className="size-3.5 text-[#E94560]" />
            </button>
          )}
        </div>

        {/* ── Two column layout ── */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

          {/* ── Left column: Calendar + Filters — sticky as a unit ── */}
          <div className="lg:w-[340px] shrink-0 flex flex-col gap-4 lg:sticky lg:top-20 lg:self-start">
            <EventCalendar
              events={events}
              currentMonth={currentMonth}
              onMonthChange={setCurrentMonth}
              onDateClick={handleDateClick}
            />

            {/* ── Filter panel ── */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <button
                onClick={() => setFiltersOpen((v) => !v)}
                className="w-full flex items-center justify-between px-4 py-3"
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <SlidersHorizontal className="size-4 text-[#E94560]" />
                  Filters
                  {hasActiveFilters && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#E94560]/10 text-[#E94560] font-semibold">
                      {[typeFilters.length > 0, !!fromDate || !!toDate, sortBy !== 'date-asc', pricingFilter !== 'all'].filter(Boolean).length}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {hasActiveFilters && (
                    <span
                      onClick={(e) => { e.stopPropagation(); clearFilters(); }}
                      className="text-xs text-[#E94560] hover:underline cursor-pointer"
                    >
                      Clear
                    </span>
                  )}
                  {filtersOpen
                    ? <ChevronUp className="size-3.5 text-muted-foreground" />
                    : <ChevronDown className="size-3.5 text-muted-foreground" />
                  }
                </div>
              </button>

              {filtersOpen && (
                <div className="border-t border-border px-4 py-4 flex flex-col gap-5">

                  {/* Event Type */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Event Type</p>
                    <div className="flex flex-col gap-1">
                      {EVENT_TYPES.map(({ value, label, color }) => {
                        const isActive = typeFilters.includes(value);
                        return (
                          <button
                            key={value}
                            onClick={() => toggleType(value)}
                            className={cn(
                              'flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm transition-all',
                              isActive ? 'bg-[#E94560]/10 text-[#E94560]' : 'text-foreground hover:bg-accent'
                            )}
                          >
                            <span className={cn(
                              'w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors',
                              isActive ? 'border-[#E94560] bg-[#E94560]' : 'border-muted-foreground'
                            )}>
                              {isActive && (
                                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </span>
                            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
                            <span className="font-medium">{label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="border-t border-border" />

                  {/* Pricing */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Pricing</p>
                    <div className="flex gap-1.5">
                      {(['all', 'free', 'paid'] as Pricing[]).map((p) => {
                        const isActive = pricingFilter === p;
                        const label    = p === 'all' ? 'All' : p === 'free' ? 'Free' : 'Paid';
                        return (
                          <button
                            key={p}
                            onClick={() => setPricingFilter(p)}
                            className={cn(
                              'px-3 py-1 rounded-full text-xs font-medium transition-all border',
                              isActive
                                ? p === 'free'
                                  ? 'bg-[#00B894]/10 border-[#00B894]/30 text-[#00B894]'
                                  : p === 'paid'
                                  ? 'bg-[#3B82F6]/10 border-[#3B82F6]/30 text-[#3B82F6]'
                                  : 'bg-[#E94560]/10 border-[#E94560]/30 text-[#E94560]'
                                : 'bg-transparent border-border text-muted-foreground hover:border-muted-foreground'
                            )}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="border-t border-border" />

                  {/* Date Range */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Date Range</p>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-muted-foreground">From</label>
                        <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="h-8 text-xs" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-muted-foreground">To</label>
                        <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="h-8 text-xs" />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border" />

                  {/* Sort By */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Sort By</p>
                    <div className="flex flex-col gap-1">
                      {SORT_OPTIONS.map(({ value, label }) => {
                        const isActive = sortBy === value;
                        return (
                          <button
                            key={value}
                            onClick={() => setSortBy(value)}
                            className={cn(
                              'flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm transition-colors text-left',
                              isActive ? 'bg-[#E94560]/10 text-[#E94560]' : 'text-foreground hover:bg-accent'
                            )}
                          >
                            <span className={cn(
                              'w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0',
                              isActive ? 'border-[#E94560]' : 'border-muted-foreground'
                            )}>
                              {isActive && <span className="w-2 h-2 rounded-full bg-[#E94560]" />}
                            </span>
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </div>
              )}
            </div>
          </div>

          {/* ── Right column: Event list ── */}
          <div className="flex-1 min-w-0">

            {/* ── View toggle: All / My Events / Discarded ── */}
            <div className="flex items-center gap-1 p-1 rounded-xl mb-4 bg-muted/40 w-fit">
              {([
                { v: 'all',       label: 'All Events', count: events.filter((e) => !dismissedIds.has(e.id)).length },
                { v: 'mine',      label: 'My Events',  count: rsvpIds.size },
                { v: 'discarded', label: 'Discarded',  count: dismissedIds.size },
              ] as { v: View; label: string; count: number }[]).map(({ v, label, count }) => {
                const isActive = view === v;
                return (
                  <button
                    key={v}
                    onClick={() => { setView(v); setSelectMode(false); setSelectedIds(new Set()); }}
                    className={cn(
                      'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                      isActive ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {v === 'discarded' && <Trash2 className="size-3.5" />}
                    {label}
                    {count > 0 && (
                      <span className={cn(
                        'px-1.5 py-0.5 rounded-full text-[10px]',
                        isActive
                          ? v === 'discarded'
                            ? 'bg-muted-foreground/20 text-muted-foreground'
                            : 'bg-[#E94560]/10 text-[#E94560]'
                          : 'bg-muted text-muted-foreground'
                      )}>
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* ── Status tabs (hidden on Discarded view) ── */}
            {view !== 'discarded' && (
              <div className="flex items-center gap-1 p-1 rounded-xl mb-4 bg-muted/40">
                {(['upcoming', 'live', 'archived'] as Tab[]).map((tab) => {
                  const isActive = activeTab === tab;
                  const count    = tabCounts[tab];
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={cn(
                        'flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-all',
                        isActive ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {tab === 'live' && (
                        <span className="relative flex h-2 w-2">
                          <span className={cn(
                            'absolute inline-flex h-full w-full rounded-full bg-[#E94560]',
                            isActive ? 'animate-ping opacity-75' : 'opacity-30'
                          )} />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E94560]" />
                        </span>
                      )}
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      <span className={cn(
                        'px-1.5 py-0.5 rounded-full text-[10px]',
                        isActive ? 'bg-[#E94560]/10 text-[#E94560]' : 'bg-muted text-muted-foreground'
                      )}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* ── Toolbar: result count + select mode toggle ── */}
            <div className="flex items-center justify-between mb-3 min-h-7">
              <span className="text-xs text-muted-foreground">
                {view === 'discarded'
                  ? `${discardedEvents.length} discarded event${discardedEvents.length !== 1 ? 's' : ''} — restore any time`
                  : `${filteredEvents.length} event${filteredEvents.length !== 1 ? 's' : ''}`
                }
              </span>

              <div className="flex items-center gap-3">
                {/* Clear filters */}
                {hasActiveFilters && view !== 'discarded' && (
                  <button onClick={clearFilters} className="text-xs text-[#E94560] hover:underline">
                    Clear filters
                  </button>
                )}

                {/* Restore all (discarded view) */}
                {view === 'discarded' && dismissedIds.size > 0 && !selectMode && (
                  <button
                    onClick={() => setDismissedIds(new Set())}
                    className="flex items-center gap-1 text-xs text-[#E94560] hover:underline"
                  >
                    <RotateCcw className="size-3" />
                    Restore all
                  </button>
                )}

                {/* Select mode toggle */}
                {filteredEvents.length > 0 && (
                  <button
                    onClick={toggleSelectMode}
                    className={cn(
                      'flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all border',
                      selectMode
                        ? 'bg-[#E94560]/10 border-[#E94560]/30 text-[#E94560]'
                        : 'border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                    )}
                  >
                    <CheckSquare2 className="size-3.5" />
                    {selectMode ? 'Cancel' : 'Select'}
                  </button>
                )}
              </div>
            </div>

            {/* ── Selection action bar ── */}
            {selectMode && (
              <div className="flex items-center gap-3 mb-4 px-4 py-2.5 rounded-xl border border-border bg-card">
                {/* Select all checkbox */}
                <button
                  onClick={toggleSelectAll}
                  className="flex items-center gap-2 text-sm font-medium text-foreground shrink-0"
                >
                  <span className={cn(
                    'w-4 h-4 rounded border-2 flex items-center justify-center transition-colors',
                    allSelected
                      ? 'border-[#E94560] bg-[#E94560]'
                      : someSelected
                      ? 'border-[#E94560] bg-[#E94560]/20'
                      : 'border-muted-foreground'
                  )}>
                    {allSelected && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {someSelected && !allSelected && (
                      <span className="w-1.5 h-0.5 bg-[#E94560] rounded-full" />
                    )}
                  </span>
                  {allSelected ? 'Deselect all' : 'Select all'}
                </button>

                <span className="text-xs text-muted-foreground">
                  {selectedIds.size > 0 ? `${selectedIds.size} selected` : 'None selected'}
                </span>

                <div className="ml-auto flex items-center gap-2">
                  {selectedIds.size > 0 && view !== 'discarded' && (
                    <button
                      onClick={dismissSelected}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20"
                    >
                      <Trash2 className="size-3.5" />
                      Remove {selectedIds.size} event{selectedIds.size !== 1 ? 's' : ''}
                    </button>
                  )}
                  {selectedIds.size > 0 && view === 'discarded' && (
                    <button
                      onClick={restoreSelected}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all bg-[#00B894]/10 text-[#00B894] hover:bg-[#00B894]/20 border border-[#00B894]/20"
                    >
                      <RotateCcw className="size-3.5" />
                      Restore {selectedIds.size} event{selectedIds.size !== 1 ? 's' : ''}
                    </button>
                  )}
                  {selectedIds.size === 0 && (
                    <span className="text-xs text-muted-foreground italic">Select events below</span>
                  )}
                </div>
              </div>
            )}

            {/* ── Event list ── */}
            <div className="space-y-4">
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="rounded-xl h-40 w-full" />
                ))
              ) : filteredEvents.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                  {view === 'discarded'
                    ? <Trash2 className="size-10 mb-3 opacity-40" />
                    : <CalendarIcon className="size-10 mb-3 opacity-40" />
                  }
                  <p className="text-sm">
                    {view === 'discarded'
                      ? 'No discarded events'
                      : view === 'mine' && rsvpIds.size === 0
                      ? "You haven't RSVP'd to any events yet"
                      : `No ${activeTab} events${view === 'mine' ? ' in your RSVPs' : ''}`}
                  </p>
                  {hasActiveFilters && view !== 'discarded' && (
                    <button onClick={clearFilters} className="mt-2 text-xs text-[#E94560] hover:underline">
                      Clear filters
                    </button>
                  )}
                </div>
              ) : (
                pagedEvents.map((event) => {
                  const isChecked = selectedIds.has(event.id);
                  return (
                    <div key={event.id} className="relative flex items-start gap-3">
                      {/* Checkbox — only visible in select mode */}
                      {selectMode && (
                        <button
                          onClick={() => toggleSelectOne(event.id)}
                          className="mt-4 shrink-0"
                          aria-label={isChecked ? 'Deselect event' : 'Select event'}
                        >
                          {isChecked
                            ? <CheckSquare2 className="size-5 text-[#E94560]" />
                            : <Square className="size-5 text-muted-foreground hover:text-foreground transition-colors" />
                          }
                        </button>
                      )}

                      <div
                        className={cn(
                          'flex-1 min-w-0 transition-all duration-150',
                          selectMode && isChecked && 'ring-2 ring-[#E94560]/40 rounded-xl',
                          selectMode && 'cursor-pointer'
                        )}
                        onClick={selectMode ? () => toggleSelectOne(event.id) : undefined}
                      >
                        <EventCard
                          event={event}
                          isRsvp={rsvpIds.has(event.id)}
                          onRsvp={selectMode ? () => {} : () => toggleRsvp(event.id)}
                          onView={selectMode ? () => toggleSelectOne(event.id) : () => setSelectedEvent(event)}
                          onWatchLive={selectMode ? () => {} : () => setShowLiveStream(true)}
                          onDismiss={selectMode || view === 'discarded' ? undefined : () => dismissEvent(event.id)}
                        />
                      </div>

                      {/* Restore button (discarded view, not select mode) */}
                      {view === 'discarded' && !selectMode && (
                        <button
                          onClick={() => restoreEvent(event.id)}
                          className="absolute top-2 right-2 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm transition-all"
                        >
                          <RotateCcw className="size-3" />
                          Restore
                        </button>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Pagination */}
            {!loading && eventTotalPages > 1 && (
              <Pagination
                currentPage={eventPage}
                totalPages={eventTotalPages}
                onPageChange={(p) => {
                  setEventPage(p);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}
          </div>
        </div>
      </main>

      <Footer />

      {/* ── Event Detail Modal ── */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          isRsvp={rsvpIds.has(selectedEvent.id)}
          onRsvp={() => toggleRsvp(selectedEvent.id)}
          onClose={() => setSelectedEvent(null)}
          onWatchLive={() => {
            setSelectedEvent(null);
            setShowLiveStream(true);
          }}
        />
      )}

      {/* ── Live Stream Player ── */}
      {showLiveStream && liveEvent && (
        <LiveStreamPlayer
          event={liveEvent}
          onClose={() => setShowLiveStream(false)}
        />
      )}
    </div>
  );
}
