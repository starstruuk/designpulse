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
 * GET /api/user/dismissed
 * Returns the authenticated user's dismissed event IDs.
 */
export async function GET() {
  const { data: { user } } = await getSupabaseUser();
  if (!user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email },
    include: { dismissedEvents: { select: { eventId: true } } },
  });

  const eventIds = dbUser?.dismissedEvents.map((d) => d.eventId) ?? [];
  return NextResponse.json({ eventIds });
}

const BodySchema = z.object({
  eventId: z.string().min(1),
  action:  z.enum(['dismiss', 'restore']),
});

/**
 * POST /api/user/dismissed
 * Dismisses or restores an event for the authenticated user.
 * Body: { eventId: string, action: 'dismiss' | 'restore' }
 */
export async function POST(req: NextRequest) {
  const { data: { user } } = await getSupabaseUser();
  if (!user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const parsed = BodySchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  const { eventId, action } = parsed.data;

  // Upsert user row
  const dbUser = await prisma.user.upsert({
    where:  { email: user.email },
    create: { email: user.email, name: user.user_metadata?.name ?? null },
    update: {},
  });

  if (action === 'dismiss') {
    await prisma.userDismissedEvent.upsert({
      where:  { userId_eventId: { userId: dbUser.id, eventId } },
      create: { userId: dbUser.id, eventId },
      update: {},
    });
    return NextResponse.json({ dismissed: true });
  }

  // restore
  await prisma.userDismissedEvent.deleteMany({
    where: { userId: dbUser.id, eventId },
  });
  return NextResponse.json({ dismissed: false });
}
