'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CalendarIcon, ClockIcon, UsersIcon, Radio, Play, Ticket, CheckCircle2, X, ExternalLink } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { Event } from '@/types';

interface EventCardProps {
  event: Event;
  isRsvp: boolean;
  onRsvp: () => void;
  onView: () => void;
  onWatchLive: () => void;
  onDismiss?: () => void;
}

const EVENT_TYPE_COLORS: Record<string, string> = {
  CONFERENCE: '#6C63FF',
  WORKSHOP:   '#00B894',
  WEBINAR:    '#00D2FF',
  MEETUP:     '#F97316',
  HACKATHON:  '#E94560',
  AWARD:      '#FDCB6E',
};

const EVENT_TYPE_LABELS: Record<string, string> = {
  CONFERENCE: 'Conference',
  WORKSHOP:   'Workshop',
  WEBINAR:    'Webinar',
  MEETUP:     'Meetup',
  HACKATHON:  'Hackathon',
  AWARD:      'Award',
};

const EventCard: React.FC<EventCardProps> = ({ event, isRsvp, onRsvp, onView, onWatchLive, onDismiss }) => {
  const [showRsvpDialog, setShowRsvpDialog]           = useState(false);
  const [showConfirmDialog, setShowConfirmDialog]     = useState(false);

  const isLive             = event.status === 'LIVE';
  const isArchived         = event.status === 'ARCHIVED';
  const registrationClosed = event.registrationClosed ?? false;
  const typeColor          = EVENT_TYPE_COLORS[event.type] ?? '#E94560';

  const formattedDate = new Date(event.date + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });

  // Show a deadline chip if registration closes within 7 days and isn't closed yet
  const deadlineChip = (() => {
    if (!event.registrationDeadline || registrationClosed || isArchived || isLive) return null;
    const msLeft   = new Date(event.registrationDeadline + 'T23:59:59').getTime() - Date.now();
    const daysLeft = Math.ceil(msLeft / 86_400_000);
    if (daysLeft < 0 || daysLeft > 7) return null;
    return daysLeft === 0 ? 'Deadline today' : `${daysLeft}d to register`;
  })();

  function handleConfirmRsvp() {
    // Open the external link, then ask if registration succeeded
    if (event.url) window.open(event.url, '_blank', 'noopener,noreferrer');
    setShowRsvpDialog(false);
    setShowConfirmDialog(true);
  }

  return (
    <>
      <div
        className={cn(
          'group relative flex flex-col sm:flex-row rounded-xl overflow-hidden transition-all duration-200',
          'hover:shadow-xl hover:scale-[1.02]',
          'bg-white shadow-sm dark:bg-[#16213E] dark:shadow-none',
          isLive
            ? 'border border-[rgba(233,69,96,0.25)] hover:border-[#E94560]'
            : 'border border-black/8 dark:border-white/6 hover:border-[#E94560]',
        )}
      >
        {/* Dismiss button */}
        {onDismiss && (
          <button
            onClick={(e) => { e.stopPropagation(); onDismiss(); }}
            className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 rounded-full flex items-center justify-center bg-black/40 hover:bg-black/60 backdrop-blur-sm"
            aria-label="Dismiss event"
          >
            <X className="size-3 text-white" />
          </button>
        )}

        {/* Image */}
        <div
          className="sm:w-52 lg:w-60 shrink-0 h-40 sm:h-auto relative overflow-hidden cursor-pointer"
          onClick={onView}
        >
          {event.image ? (
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              unoptimized
            />
          ) : (
            <div
              className="w-full h-full"
              style={{ background: `linear-gradient(135deg, ${typeColor}33 0%, #1F2B4A 100%)` }}
            />
          )}

          {/* Status badge */}
          <div className="absolute top-3 left-3">
            <span
              className="px-2.5 py-1 rounded-full flex items-center gap-1.5 text-white"
              style={{
                fontSize: 10,
                fontWeight: 600,
                backgroundColor: isLive ? 'rgba(233,69,96,0.9)' : `${typeColor}cc`,
                backdropFilter: 'blur(4px)',
              }}
            >
              {isLive && (
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-white animate-ping opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
                </span>
              )}
              {isLive ? 'LIVE' : (EVENT_TYPE_LABELS[event.type] ?? event.type)}
            </span>
          </div>

          {/* Price overlay badge — bottom-right of image */}
          {event.isFree ? (
            <div className="absolute bottom-3 right-3">
              <span
                className="px-2 py-1 rounded-lg text-white"
                style={{ backgroundColor: 'rgba(0,184,148,0.85)', fontSize: 10, fontWeight: 600 }}
              >
                FREE
              </span>
            </div>
          ) : event.price && !event.price.includes('null') ? (
            <div className="absolute bottom-3 right-3">
              <span
                className="px-2 py-1 rounded-lg text-white"
                style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', fontSize: 11, fontWeight: 600 }}
              >
                {event.price}
              </span>
            </div>
          ) : null}

        </div>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-5 flex flex-col min-w-0">
          {/* Date + time */}
          <div className="flex items-center gap-3 mb-2 flex-wrap text-black/35 dark:text-white/35">
            <span className="flex items-center gap-1 text-[11px]">
              <CalendarIcon className="size-3" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1 text-[11px]">
              <ClockIcon className="size-3" />
              {event.time}
            </span>
            <span className="flex items-center gap-1 text-[11px]">
              <ClockIcon className="size-3" />
              {event.duration}
            </span>
            {registrationClosed && !isArchived && !isLive && (
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                style={{ backgroundColor: 'rgba(239,68,68,0.1)', color: '#EF4444' }}
              >
                Registration closed
              </span>
            )}
            {deadlineChip && (
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                style={{ backgroundColor: 'rgba(251,191,36,0.12)', color: '#F59E0B' }}
              >
                {deadlineChip}
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            className="mb-1.5 line-clamp-1 cursor-pointer transition-colors group-hover:text-[#E94560] text-[#1a1a2e] dark:text-white"
            style={{ fontSize: 16, fontWeight: 500 }}
            onClick={onView}
          >
            {event.title}
          </h3>

          {/* Description */}
          <p
            className="mb-3 line-clamp-2 text-black/45 dark:text-white/45"
            style={{ fontSize: 12.5, lineHeight: 1.5 }}
          >
            {event.description}
          </p>

          {/* Footer: host + actions */}
          <div className="flex items-center justify-between mt-auto flex-wrap gap-3">
            {/* Host */}
            <div className="flex items-center gap-2.5">
              {event.hostAvatar && (
                <Image
                  src={event.hostAvatar}
                  alt={event.hostName}
                  width={28}
                  height={28}
                  className="rounded-full object-cover ring-2 ring-black/8 dark:ring-white/6"
                  unoptimized
                />
              )}
              <div>
                <p className="text-[#1a1a2e] dark:text-white" style={{ fontSize: 12, fontWeight: 500 }}>
                  {event.hostName}
                </p>
                <p className="text-black/35 dark:text-white/35" style={{ fontSize: 10 }}>
                  {event.hostRole}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Attendees */}
              <span className="flex items-center gap-1 text-[11px] text-black/35 dark:text-white/35">
                <UsersIcon className="size-3" />
                {event.attendees}{event.maxAttendees ? `/${event.maxAttendees}` : ''}
              </span>

              {/* Action button */}
              {isLive ? (
                <button
                  onClick={onWatchLive}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg cursor-pointer transition-all"
                  style={{ backgroundColor: '#E94560', color: '#fff', fontSize: 12, fontWeight: 600 }}
                >
                  <Radio className="size-3.5" />
                  Watch Live
                </button>
              ) : isArchived ? (
                <button
                  onClick={onView}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg cursor-pointer transition-all bg-black/4 text-black/45 dark:bg-white/6 dark:text-white/45"
                  style={{ fontSize: 12, fontWeight: 500 }}
                >
                  <Play className="size-3.5" />
                  Watch Recording
                </button>
              ) : registrationClosed ? (
                <span className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[12px] font-medium bg-black/4 text-black/35 dark:bg-white/6 dark:text-white/35 cursor-not-allowed select-none">
                  <Ticket className="size-3.5" />
                  Closed
                </span>
              ) : isRsvp ? (
                <button
                  onClick={() => setShowRsvpDialog(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg cursor-pointer transition-all"
                  style={{
                    backgroundColor: 'rgba(0,184,148,0.12)',
                    color: '#00B894',
                    border: '1px solid rgba(0,184,148,0.25)',
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  <CheckCircle2 className="size-3.5" />
                  Registered
                </button>
              ) : (
                <button
                  onClick={() => setShowRsvpDialog(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg cursor-pointer transition-all"
                  style={{ backgroundColor: '#E94560', color: '#fff', fontSize: 12, fontWeight: 600 }}
                >
                  <Ticket className="size-3.5" />
                  RSVP
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── RSVP Confirmation Dialog ── */}
      <AlertDialog open={showRsvpDialog} onOpenChange={setShowRsvpDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isRsvp ? 'Cancel registration?' : 'Confirm RSVP'}
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="flex flex-col gap-3">
                <p className="text-sm text-muted-foreground">
                  {isRsvp
                    ? `Remove your registration for "${event.title}"?`
                    : `You're registering for "${event.title}".`
                  }
                </p>
                <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-muted/50 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium text-foreground">{formattedDate} · {event.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Cost</span>
                    <span className="font-medium text-foreground">
                      {event.isFree ? 'Free' : (event.price && !event.price.includes('null') ? event.price : 'Check event page')}
                    </span>
                  </div>
                  {!isRsvp && event.url && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Registration</span>
                      <span className="font-medium text-foreground flex items-center gap-1">
                        Opens external link <ExternalLink className="size-3" />
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={isRsvp ? () => { onRsvp(); setShowRsvpDialog(false); } : handleConfirmRsvp}
              style={isRsvp ? { backgroundColor: 'rgba(239,68,68,0.9)' } : { backgroundColor: '#E94560' }}
            >
              {isRsvp ? 'Remove registration' : 'Confirm & open link'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ── Post-visit confirmation dialog ── */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Did you register?</AlertDialogTitle>
            <AlertDialogDescription>
              Were you able to successfully register for "{event.title}"?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowConfirmDialog(false)}>
              Not yet
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => { onRsvp(); setShowConfirmDialog(false); }}
              style={{ backgroundColor: '#00B894' }}
            >
              <CheckCircle2 className="size-3.5 mr-1.5" />
              Yes, I'm registered
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EventCard;
