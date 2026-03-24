'use client';

import React from 'react';
import Image from 'next/image';
import { CalendarIcon, ClockIcon, UsersIcon, Radio, Play, Ticket, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Event } from '@/types';

interface EventCardProps {
  event: Event;
  isRsvp: boolean;
  onRsvp: () => void;
  onView: () => void;
}

const EVENT_TYPE_COLORS: Record<string, string> = {
  CONFERENCE: '#6C63FF',
  WORKSHOP:   '#00B894',
  WEBINAR:    '#00D2FF',
  MEETUP:     '#F97316',
  HACKATHON:  '#E94560',
  AWARD:      '#FDCB6E',
};

const EventCard: React.FC<EventCardProps> = ({ event, isRsvp, onRsvp, onView }) => {
  const isLive     = event.status === 'LIVE';
  const isArchived = event.status === 'ARCHIVED';

  const formattedDate = new Date(event.date + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });

  const typeColor = EVENT_TYPE_COLORS[event.type] ?? '#E94560';

  return (
    <Card className={cn(
      'group flex flex-col sm:flex-row rounded-xl border overflow-hidden transition-all',
      'bg-white border-[#E5E7EB] shadow-sm',
      'dark:bg-[#16213E] dark:border-[#0F3460]',
      isLive ? 'border-[#E94560]/25 dark:border-[#E94560]/25' : '',
      'hover:shadow-xl hover:border-[#E94560]/40 dark:hover:border-[#E94560]/40'
    )}>
      {/* Image */}
      <div
        className="relative sm:w-52 lg:w-60 flex-shrink-0 h-40 sm:h-auto overflow-hidden cursor-pointer"
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
          <div className="w-full h-full bg-[#1F2B4A]" />
        )}

        {/* Status badge */}
        <div className="absolute top-3 left-3">
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

        {/* Price badge */}
        <div className="absolute bottom-3 right-3">
          {event.isFree ? (
            <span className="px-2 py-1 rounded-lg text-white text-[10px] font-semibold bg-[#00B894]">
              FREE
            </span>
          ) : event.price ? (
            <span className="px-2 py-1 rounded-lg text-white text-xs font-semibold bg-black/70">
              {event.price}
            </span>
          ) : null}
        </div>
      </div>

      {/* Content */}
      <CardContent className="flex-1 p-4 sm:p-5 flex flex-col gap-2">
        {/* Date + time */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <CalendarIcon className="size-3" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <ClockIcon className="size-3" />
            {event.time}
          </span>
          <span className="text-xs text-muted-foreground">{event.duration}</span>
        </div>

        {/* Title */}
        <h3
          className="text-base font-semibold leading-snug line-clamp-1 cursor-pointer hover:text-[#E94560] transition-colors"
          onClick={onView}
        >
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {event.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-2 flex-wrap gap-3">
          {/* Host */}
          <div className="flex items-center gap-2.5">
            {event.hostAvatar && (
              <Image
                src={event.hostAvatar}
                alt={event.hostName}
                width={28}
                height={28}
                className="rounded-full object-cover"
                unoptimized
              />
            )}
            <div>
              <p className="text-xs font-medium text-foreground">{event.hostName}</p>
              <p className="text-[10px] text-muted-foreground">{event.hostRole}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Attendees */}
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <UsersIcon className="size-3" />
              {event.attendees}{event.maxAttendees ? `/${event.maxAttendees}` : ''}
            </span>

            {/* Action */}
            {isLive ? (
              <Button
                size="sm"
                onClick={onView}
                className="bg-[#E94560] hover:bg-[#E94560]/90 text-white gap-1.5"
              >
                <Radio className="size-3.5" />
                Watch Live
              </Button>
            ) : isArchived ? (
              <Button size="sm" variant="secondary" onClick={onView} className="gap-1.5">
                <Play className="size-3.5" />
                Watch Recording
              </Button>
            ) : isRsvp ? (
              <Button
                size="sm"
                onClick={onRsvp}
                className="gap-1.5 bg-[rgba(0,184,148,0.12)] text-[#00B894] border border-[rgba(0,184,148,0.25)] hover:bg-[rgba(0,184,148,0.20)]"
                variant="outline"
              >
                <CheckCircle2 className="size-3.5" />
                Registered
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={onRsvp}
                className="bg-[#E94560] hover:bg-[#E94560]/90 text-white gap-1.5"
              >
                <Ticket className="size-3.5" />
                RSVP
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;