'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Calendar as CalendarIcon, Play } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import EventCard from '@/components/events/EventCard';
import EventCalendar from '@/components/events/EventCalendar';
import EventModal from '@/components/events/EventModal';
import LiveStreamPlayer from '@/components/events/LiveStreamPlayer';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Event } from '@/types';

type Tab = 'upcoming' | 'live' | 'archived';

export default function EventsPage() {
  const [events, setEvents]               = useState<Event[]>([]);
  const [currentMonth, setCurrentMonth]   = useState<Date>(new Date());
  const [rsvpIds, setRsvpIds]             = useState<Set<string>>(new Set());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showLiveStream, setShowLiveStream] = useState(false);
  const [activeTab, setActiveTab]         = useState<Tab>('upcoming');
  const [loading, setLoading]             = useState(true);

  // ── Fetch events on mount ──────────────────────────────────────
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res  = await fetch('/api/events');
        const data = await res.json();
        setEvents(data.events ?? []);
      } catch (err) {
        console.error('Failed to fetch events:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // ── Derived state ──────────────────────────────────────────────
  const liveEvent = events.find((e) => e.status === 'LIVE') ?? null;

  const filteredEvents = useMemo(() => {
    if (activeTab === 'live')     return events.filter((e) => e.status === 'LIVE');
    if (activeTab === 'archived') return events.filter((e) => e.status === 'ARCHIVED');
    return events.filter((e) => e.status === 'UPCOMING');
  }, [events, activeTab]);

  const tabCounts = useMemo(() => ({
    upcoming: events.filter((e) => e.status === 'UPCOMING').length,
    live:     events.filter((e) => e.status === 'LIVE').length,
    archived: events.filter((e) => e.status === 'ARCHIVED').length,
  }), [events]);

  // ── Handlers ───────────────────────────────────────────────────
  const toggleRsvp = useCallback((id: string) => {
    setRsvpIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const handleDateClick = useCallback((dateStr: string) => {
    const match = events.find((e) => e.date === dateStr);
    if (match) setSelectedEvent(match);
  }, [events]);

  // ── Render ─────────────────────────────────────────────────────
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

          {/* Live Now banner */}
          {liveEvent && (
            <button
              onClick={() => setShowLiveStream(true)}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all hover:shadow-lg bg-[#E94560]/10 border border-[#E94560]/20"
            >
              <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#E94560] opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E94560]" />
              </span>
              <span className="text-sm font-semibold text-[#E94560]">
                Live Now: {liveEvent.title.length > 30
                  ? liveEvent.title.slice(0, 30) + '…'
                  : liveEvent.title}
              </span>
              <Play className="size-3.5 text-[#E94560]" />
            </button>
          )}
        </div>

        {/* ── Two column layout ── */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

          {/* Left — Calendar */}
          <div className="lg:w-[340px] flex-shrink-0">
            <EventCalendar
              events={events}
              currentMonth={currentMonth}
              onMonthChange={setCurrentMonth}
              onDateClick={handleDateClick}
            />
          </div>

          {/* Right — Event list */}
          <div className="flex-1 min-w-0">

            {/* Tabs */}
            <div className="flex items-center gap-1 p-1 rounded-xl mb-6 bg-muted/40">
              {(['upcoming', 'live', 'archived'] as Tab[]).map((tab) => {
                const isActive = activeTab === tab;
                const count    = tabCounts[tab];
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      'flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-all',
                      isActive
                        ? 'bg-card shadow-sm text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {/* Live dot */}
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
                      isActive
                        ? 'bg-[#E94560]/10 text-[#E94560]'
                        : 'bg-muted text-muted-foreground'
                    )}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Event list */}
            <div className="space-y-4">
              {loading ? (
                // Skeletons
                [...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="rounded-xl h-40 w-full" />
                ))
              ) : filteredEvents.length === 0 ? (
                // Empty state
                <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                  <CalendarIcon className="size-10 mb-3 opacity-40" />
                  <p className="text-sm">No {activeTab} events right now</p>
                </div>
              ) : (
                filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    isRsvp={rsvpIds.has(event.id)}
                    onRsvp={() => toggleRsvp(event.id)}
                    onView={() => setSelectedEvent(event)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </main>

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