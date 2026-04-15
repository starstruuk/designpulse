'use client';

import React from 'react';
import Image from 'next/image';
import { X, CalendarIcon, ClockIcon, UsersIcon, Radio, Play, Ticket, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Event } from '@/types';

interface EventModalProps {
  event: Event;
  isRsvp: boolean;
  onRsvp: () => void;
  onClose: () => void;
  onWatchLive: () => void;
}

const EVENT_TYPE_COLORS: Record<string, string> = {
  CONFERENCE: '#6C63FF',
  WORKSHOP:   '#00B894',
  WEBINAR:    '#00D2FF',
  MEETUP:     '#F97316',
  HACKATHON:  '#E94560',
  AWARD:      '#FDCB6E',
};

/**
 * Full-screen modal overlay showing event details with RSVP / watch actions.
 */
const EventModal: React.FC<EventModalProps> = ({ event, isRsvp, onRsvp, onClose, onWatchLive }) => {
  const isLive     = event.status === 'LIVE';
  const isArchived = event.status === 'ARCHIVED';
  const typeColor  = EVENT_TYPE_COLORS[event.type] ?? '#E94560';

  const formattedDate = new Date(event.date + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });

  function handleCta() {
    if (isLive)     return onWatchLive();
    if (isArchived) return onClose();
    onRsvp();
  }

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Modal */}
      <div className="w-full max-w-lg rounded-2xl overflow-hidden bg-card shadow-2xl flex flex-col max-h-[90vh]">

        {/* Hero image */}
        <div className="relative h-48 shrink-0">
          {event.image ? (
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-[#1F2B4A]" />
          )}

          {/* Gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-black/60 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center bg-black/40 hover:bg-black/60 transition-colors"
            aria-label="Close"
          >
            <X className="size-4 text-white" />
          </button>

          {/* Type / status badge */}
          <div className="absolute bottom-3 left-4">
            <span
              className="px-2.5 py-1 rounded-full flex items-center gap-1.5 text-white text-[10px] font-semibold"
              style={{ backgroundColor: isLive ? 'rgba(233,69,96,0.9)' : typeColor + 'cc' }}
            >
              {isLive && (
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-white animate-ping opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
                </span>
              )}
              {isLive ? 'LIVE' : event.type}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto flex-1 flex flex-col gap-4">

          {/* Title */}
          <h3 className="text-xl font-semibold text-foreground leading-snug">{event.title}</h3>

          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-accent/50 p-2.5 flex items-center gap-2 text-sm text-foreground">
              <CalendarIcon className="size-4 text-muted-foreground shrink-0" />
              {formattedDate}
            </div>
            <div className="rounded-lg bg-accent/50 p-2.5 flex items-center gap-2 text-sm text-foreground">
              <ClockIcon className="size-4 text-muted-foreground shrink-0" />
              {event.time} · {event.duration}
            </div>
            <div className="rounded-lg bg-accent/50 p-2.5 flex items-center gap-2 text-sm text-foreground">
              <UsersIcon className="size-4 text-muted-foreground shrink-0" />
              {event.attendees}{event.maxAttendees ? `/${event.maxAttendees}` : ''} attending
            </div>
            <div className="rounded-lg bg-accent/50 p-2.5 flex items-center gap-2 text-sm font-medium"
              style={{ color: event.isFree ? '#22C55E' : '#3B82F6' }}>
              {event.isFree ? '✓ Free' : event.price ? `$${event.price}` : 'Paid'}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>

          {/* Host row */}
          <div className="flex items-center gap-3 pt-1 border-t border-border">
            {event.hostAvatar && (
              <Image
                src={event.hostAvatar}
                alt={event.hostName}
                width={36}
                height={36}
                className="rounded-full object-cover shrink-0"
                unoptimized
              />
            )}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Hosted by</p>
              <p className="text-sm font-medium text-foreground">{event.hostName}</p>
              <p className="text-xs text-muted-foreground">{event.hostRole}</p>
            </div>
          </div>

          {/* Tags */}
          {event.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full text-xs bg-accent text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* CTA button */}
          <Button
            className="w-full gap-2 mt-auto"
            onClick={handleCta}
            style={
              isLive || (!isArchived && !isRsvp)
                ? { backgroundColor: '#E94560', color: '#fff' }
                : undefined
            }
            variant={isArchived || isRsvp ? 'secondary' : 'default'}
          >
            {isLive && <><Radio className="size-4" /> Join Live Stream</>}
            {isArchived && <><Play className="size-4" /> Watch Recording</>}
            {!isLive && !isArchived && isRsvp && <><CheckCircle2 className="size-4" /> You&apos;re Registered — Cancel</>}
            {!isLive && !isArchived && !isRsvp && <><Ticket className="size-4" /> {event.isFree ? 'RSVP — Free' : event.price && !event.price.includes('null') ? `RSVP — ${event.price}` : 'RSVP'}</>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
