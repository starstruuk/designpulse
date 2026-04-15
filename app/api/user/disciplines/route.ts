import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

/** Shared helper — creates an authed Supabase client from the request cookies. */
async function getSupabaseUser() {
  const cookieStore = await cookies();
  const supabase    = createServerClient(
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
 * GET /api/user/disciplines
 * Returns the authenticated user's saved discipline slugs.
 */
export async function GET() {
  const { data: { user } } = await getSupabaseUser();
  if (!user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email },
    include: { preferences: { include: { discipline: true } } },
  });

  const disciplines = dbUser?.preferences.map((ud) => ud.discipline.slug) ?? [];
  return NextResponse.json({ disciplines });
}

const BodySchema = z.object({
  disciplines: z.array(z.string()).min(1),
});

/**
 * POST /api/user/disciplines
 * Saves the authenticated user's discipline preferences.
 * Creates the User row in Prisma if it doesn't exist yet.
 */
export async function POST(req: NextRequest) {
  const { data: { user } } = await getSupabaseUser();
  if (!user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // ── Validate body ──────────────────────────────────────────────
  const parsed = BodySchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
  const { disciplines } = parsed.data;

  // ── Upsert user row ────────────────────────────────────────────
  const dbUser = await prisma.user.upsert({
    where:  { email: user.email },
    create: { email: user.email, name: user.user_metadata?.name ?? null },
    update: {},
  });

  // ── Resolve discipline IDs ─────────────────────────────────────
  const dbDisciplines = await prisma.discipline.findMany({
    where: { slug: { in: disciplines } },
    select: { id: true, slug: true },
  });

  if (dbDisciplines.length === 0) {
    return NextResponse.json({ error: 'No matching disciplines found' }, { status: 422 });
  }

  // ── Upsert UserDiscipline rows ─────────────────────────────────
  await Promise.all(
    dbDisciplines.map((d) =>
      prisma.userDiscipline.upsert({
        where:  { userId_disciplineId: { userId: dbUser.id, disciplineId: d.id } },
        create: { userId: dbUser.id, disciplineId: d.id },
        update: {},
      })
    )
  );

  return NextResponse.json({ ok: true, saved: dbDisciplines.map((d) => d.slug) });
}
