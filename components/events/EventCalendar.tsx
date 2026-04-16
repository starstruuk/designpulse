'use client';

import { useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Event } from '@/types';

interface EventCalendarProps {
  events: Event[];
  currentMonth: Date;
  onMonthChange: (d: Date) => void;
  onDateClick: (dateStr: string) => void;
}

const EVENT_TYPE_COLORS: Record<string, string> = {
  CONFERENCE: '#6C63FF',
  WORKSHOP:   '#00B894',
  WEBINAR:    '#00D2FF',
  MEETUP:     '#F97316',
  HACKATHON:  '#E94560',
  AWARD:      '#FDCB6E',
};

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

const DAY_LABELS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

export default function EventCalendar({
  events,
  currentMonth,
  onMonthChange,
  onDateClick,
}: EventCalendarProps) {
  const year  = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const todayStr = new Date().toISOString().split('T')[0];

  // Build a map of dateStr → events for fast lookup
  const eventDateMap = useMemo(() => {
    const map = new Map<string, Event[]>();
    events.forEach((e) => {
      const existing = map.get(e.date) ?? [];
      existing.push(e);
      map.set(e.date, existing);
    });
    return map;
  }, [events]);

  // Build grid cells — nulls for empty leading/trailing slots
  const cells = useMemo(() => {
    const firstDay    = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const arr: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) arr.push(null);
    for (let d = 1; d <= daysInMonth; d++) arr.push(d);
    while (arr.length % 7 !== 0) arr.push(null);
    return arr;
  }, [year, month]);

  const prevMonth = () => onMonthChange(new Date(year, month - 1));
  const nextMonth = () => onMonthChange(new Date(year, month + 1));

  return (
    <div className="rounded-xl border bg-card p-5">
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-accent transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="size-4 text-muted-foreground" />
        </button>
        <h3 className="text-sm font-semibold text-foreground">
          {MONTH_NAMES[month]} {year}
        </h3>
        <button
          onClick={nextMonth}
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-accent transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="size-4 text-muted-foreground" />
        </button>
      </div>

      {/* Day headers */}
      <div className="mb-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
        {DAY_LABELS.map((d) => (
          <div key={d} className="text-center py-1 text-[10px] font-semibold text-muted-foreground">
            {d}
          </div>
        ))}
      </div>

      {/* Date grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
        {cells.map((day, idx) => {
          if (day === null) return <div key={`empty-${idx}`} />;

          const dateStr  = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const dayEvts  = eventDateMap.get(dateStr) ?? [];
          const hasEvts  = dayEvts.length > 0;
          const isToday  = dateStr === todayStr;
          const hasLive  = dayEvts.some((e) => e.status === 'LIVE');

          return (
            <button
              key={dateStr}
              onClick={() => hasEvts && onDateClick(dateStr)}
              disabled={!hasEvts}
              className={cn(
                'relative flex flex-col items-center justify-center py-2 rounded-lg text-xs transition-all',
                isToday
                  ? 'bg-[rgba(233,69,96,0.12)] text-[#E94560] font-semibold'
                  : hasEvts
                    ? 'text-foreground font-semibold hover:bg-accent cursor-pointer'
                    : 'text-muted-foreground opacity-40 cursor-default'
              )}
            >
              {day}

              {/* Event dots */}
              {hasEvts && (
                <div className="flex gap-0.5 mt-0.5">
                  {dayEvts.slice(0, 3).map((ev) => (
                    <span
                      key={ev.id}
                      className="w-1 h-1 rounded-full"
                      style={{ backgroundColor: EVENT_TYPE_COLORS[ev.type] ?? '#E94560' }}
                    />
                  ))}
                </div>
              )}

              {/* Live pulse dot */}
              {hasLive && (
                <span className="absolute top-1 right-1 flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#E94560] animate-ping opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#E94560]" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-border">
        {Object.entries(EVENT_TYPE_COLORS).map(([type, color]) => (
          <div key={type} className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-[10px] text-muted-foreground capitalize">
              {type.charAt(0) + type.slice(1).toLowerCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}