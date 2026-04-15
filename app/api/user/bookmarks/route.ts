import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/** Creates an authenticated Supabase client from the request cookies. */
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
 * GET /api/user/bookmarks
 * Returns the authenticated user's bookmarked articles and resources.
 * If the user has not yet completed onboarding (no DB row), returns empty arrays.
 */
export async function GET() {
  const { data: { user } } = await getSupabaseUser();
  if (!user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email },
    include: {
      bookmarks: {
        include: {
          article: {
            include: { source: true },
          },
          resource: {
            include: { category: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  // User hasn't completed onboarding yet — return empty state
  if (!dbUser) {
    return NextResponse.json({ articles: [], resources: [] });
  }

  const articles = dbUser.bookmarks
    .filter((b) => b.article !== null)
    .map((b) => {
      const a = b.article!;
      return {
        id:          a.id,
        title:       a.title,
        url:         a.url,
        excerpt:     a.excerpt ?? null,
        imageUrl:    a.imageUrl ?? null,
        publishedAt: a.publishedAt ?? null,
        source:      a.source ? { name: a.source.name } : null,
      };
    });

  const resources = dbUser.bookmarks
    .filter((b) => b.resource !== null)
    .map((b) => {
      const r = b.resource!;
      return {
        id:          r.id,
        name:        r.name,
        url:         r.url,
        description: r.description ?? null,
        pricing:     r.pricing,
        logoLetter:  r.logoLetter ?? null,
        logoColor:   r.logoColor ?? null,
        category:    { name: r.category.name, color: r.category.color ?? null },
      };
    });

  return NextResponse.json({ articles, resources });
}

/**
 * POST /api/user/bookmarks
 * Toggles a bookmark for an article or resource.
 * Body: { articleId?: string, resourceId?: string } — exactly one must be present.
 */
export async function POST(req: NextRequest) {
  const { data: { user } } = await getSupabaseUser();
  if (!user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json() as { articleId?: string; resourceId?: string };
  const { articleId, resourceId } = body;

  // Exactly one of articleId or resourceId must be provided
  const hasArticle  = typeof articleId  === 'string' && articleId.length  > 0;
  const hasResource = typeof resourceId === 'string' && resourceId.length > 0;

  if ((!hasArticle && !hasResource) || (hasArticle && hasResource)) {
    return NextResponse.json(
      { error: 'Provide exactly one of articleId or resourceId' },
      { status: 400 }
    );
  }

  // Upsert user row so we always have a DB record
  const dbUser = await prisma.user.upsert({
    where:  { email: user.email },
    create: { email: user.email, name: user.user_metadata?.name ?? null },
    update: {},
  });

  // Check for existing bookmark
  const existing = await prisma.bookmark.findFirst({
    where: {
      userId:     dbUser.id,
      articleId:  articleId  ?? null,
      resourceId: resourceId ?? null,
    },
  });

  if (existing) {
    // Toggle off — delete the bookmark
    await prisma.bookmark.delete({ where: { id: existing.id } });
    return NextResponse.json({ bookmarked: false });
  }

  // Toggle on — create the bookmark
  await prisma.bookmark.create({
    data: {
      userId:     dbUser.id,
      articleId:  articleId  ?? null,
      resourceId: resourceId ?? null,
    },
  });

  return NextResponse.json({ bookmarked: true });
}
