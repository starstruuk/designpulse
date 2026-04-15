import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

async function getSupabaseUser() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll()     { return cookieStore.getAll(); },
        setAll(list) {
          try { list.forEach(({ name, value, options }) => cookieStore.set(name, value, options)); }
          catch { /* ignore in server component context */ }
        },
      },
    }
  );
  return supabase.auth.getUser();
}

/**
 * GET /api/user/rsvp
 * Returns the authenticated user's RSVP'd event IDs and event details.
 */
export async function GET() {
  const { data: { user } } = await getSupabaseUser();
  if (!user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email },
    include: {
      rsvps: {
        include: { event: true },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  const rsvps  = dbUser?.rsvps ?? [];
  const eventIds = rsvps.map((r) => r.eventId);
  const events   = rsvps.map((r) => r.event);

  return NextResponse.json({ eventIds, events });
}

const BodySchema = z.object({ eventId: z.string().min(1) });

/**
 * POST /api/user/rsvp
 * Toggles RSVP for an event. Creates the User row if it doesn't exist yet.
 * Returns { rsvped: boolean } — true if now RSVP'd, false if un-RSVP'd.
 */
export async function POST(req: NextRequest) {
  const { data: { user } } = await getSupabaseUser();
  if (!user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const parsed = BodySchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  const { eventId } = parsed.data;

  // Upsert user row
  const dbUser = await prisma.user.upsert({
    where:  { email: user.email },
    create: { email: user.email, name: user.user_metadata?.name ?? null },
    update: {},
  });

  // Toggle
  const existing = await prisma.eventRsvp.findUnique({
    where: { userId_eventId: { userId: dbUser.id, eventId } },
  });

  if (existing) {
    await prisma.eventRsvp.delete({ where: { id: existing.id } });
    return NextResponse.json({ rsvped: false });
  }

  await prisma.eventRsvp.create({ data: { userId: dbUser.id, eventId } });
  return NextResponse.json({ rsvped: true });
}
