import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { EventType, EventStatus } from '@/generated/prisma';

/** LIVE is always honoured as-is; UPCOMING/ARCHIVED are recomputed from the date. */
function effectiveStatus(date: string, stored: EventStatus): EventStatus {
  if (stored === EventStatus.LIVE) return EventStatus.LIVE;
  return new Date(date + 'T23:59:59') < new Date() ? EventStatus.ARCHIVED : EventStatus.UPCOMING;
}

/**
 * Returns true when a user can no longer register.
 * Falls back to the event date itself if no explicit deadline is set,
 * meaning same-day events are treated as registration-closed.
 */
function isRegistrationClosed(date: string, deadline: string | null): boolean {
  const cutoff = deadline ?? date;
  return new Date(cutoff + 'T23:59:59') < new Date();
}

export async function GET(request: Request) {
  try {
    const url    = new URL(request.url);
    const status = url.searchParams.get('status') as EventStatus | null;
    const type   = url.searchParams.get('type')   as EventType   | null;
    const month  = url.searchParams.get('month');
    const isFree = url.searchParams.get('isFree'); // "true" | "false" | null

    // Fetch all (or type/month/isFree-filtered) events, then apply date-based
    // status computation so the DB never returns stale UPCOMING entries.
    const dbWhere: Record<string, unknown> = {};
    if (type)  dbWhere.type  = type;
    if (month) dbWhere.date  = { startsWith: `${month}-` };
    if (isFree === 'true')  dbWhere.isFree = true;
    if (isFree === 'false') dbWhere.isFree = false;

    const raw = await prisma.event.findMany({
      where: dbWhere,
      orderBy: { date: 'asc' },
    });

    // Recompute status and registration state in memory
    const events = raw.map((e) => ({
      ...e,
      status:             effectiveStatus(e.date, e.status),
      registrationClosed: isRegistrationClosed(e.date, e.registrationDeadline ?? null),
    }));

    // Apply status filter after recomputation
    const filtered = status ? events.filter((e) => e.status === status) : events;

    return NextResponse.json({ events: filtered, total: filtered.length });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}