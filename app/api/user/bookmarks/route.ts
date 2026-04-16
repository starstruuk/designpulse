import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
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
 * GET /api/user/bookmarks
 * Returns the authenticated user's bookmarked articles, resources, and opinions.
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
          article:  { include: { source: true } },
          resource: { include: { category: true } },
          opinion:  true,
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!dbUser) {
    return NextResponse.json({ articles: [], resources: [], opinions: [] });
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

  const opinions = dbUser.bookmarks
    .filter((b) => b.opinion !== null)
    .map((b) => {
      const o = b.opinion!;
      return {
        id:            o.id,
        title:         o.title,
        excerpt:       o.excerpt,
        imageUrl:      o.imageUrl ?? null,
        publishedAt:   o.publishedAt,
        authorName:    o.authorName,
        sourceUrl:     o.sourceUrl,
        sourcePlatform: o.sourcePlatform,
      };
    });

  return NextResponse.json({ articles, resources, opinions });
}

/**
 * POST /api/user/bookmarks
 * Toggles a bookmark for an article, resource, or opinion.
 * Body: exactly one of { articleId, resourceId, opinionId }.
 */
export async function POST(req: NextRequest) {
  const { data: { user } } = await getSupabaseUser();
  if (!user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json() as { articleId?: string; resourceId?: string; opinionId?: string };
  const { articleId, resourceId, opinionId } = body;

  const hasArticle  = typeof articleId  === 'string' && articleId.length  > 0;
  const hasResource = typeof resourceId === 'string' && resourceId.length > 0;
  const hasOpinion  = typeof opinionId  === 'string' && opinionId.length  > 0;
  const count = [hasArticle, hasResource, hasOpinion].filter(Boolean).length;

  if (count !== 1) {
    return NextResponse.json(
      { error: 'Provide exactly one of articleId, resourceId, or opinionId' },
      { status: 400 }
    );
  }

  const dbUser = await prisma.user.upsert({
    where:  { email: user.email },
    create: { email: user.email, name: user.user_metadata?.name ?? null },
    update: {},
  });

  const existing = await prisma.bookmark.findFirst({
    where: {
      userId:     dbUser.id,
      articleId:  articleId  ?? null,
      resourceId: resourceId ?? null,
      opinionId:  opinionId  ?? null,
    },
  });

  if (existing) {
    await prisma.bookmark.delete({ where: { id: existing.id } });
    return NextResponse.json({ bookmarked: false });
  }

  await prisma.bookmark.create({
    data: {
      userId:     dbUser.id,
      articleId:  articleId  ?? null,
      resourceId: resourceId ?? null,
      opinionId:  opinionId  ?? null,
    },
  });

  return NextResponse.json({ bookmarked: true });
}
