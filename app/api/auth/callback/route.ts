import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Supabase Auth callback handler.
 * Exchanges the PKCE code for a session and redirects to `next` (default: "/").
 * Also used as the redirect target for magic-link and email-confirmation sign-ins.
 * New users with no saved disciplines are sent to /onboarding first.
 */
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code       = requestUrl.searchParams.get('code');
  const next       = requestUrl.searchParams.get('next') ?? '/';

  if (code) {
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll()        { return cookieStore.getAll(); },
          setAll(list)    {
            try { list.forEach(({ name, value, options }) => cookieStore.set(name, value, options)); }
            catch { /* ignore in server component context */ }
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.exchangeCodeForSession(code);

    // Send new users (no discipline preferences) to onboarding
    if (user?.email && next === '/') {
      try {
        const dbUser = await prisma.user.findUnique({
          where:   { email: user.email },
          include: { preferences: { take: 1 } },
        });
        const hasOnboarded = (dbUser?.preferences.length ?? 0) > 0;
        if (!hasOnboarded) {
          return NextResponse.redirect(new URL('/onboarding', request.url));
        }
      } catch { /* non-fatal — fall through to next */ }
    }
  }

  return NextResponse.redirect(new URL(next, request.url));
}
