import { NextRequest, NextResponse } from 'next/server';
import { prisma }                    from '@/lib/prisma';

/**
 * GET /api/opinions
 *
 * Returns aggregated opinion posts from the DB.
 *
 * Query params:
 *   platform  — filter by sourcePlatform ('reddit' | 'substack' | 'medium' | 'blog' | 'manual')
 *   tag       — filter to opinions whose tags array contains this value
 *   limit     — max results per platform group (default 20)
 *   page      — 1-based page index (default 1)
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const platform = searchParams.get('platform') ?? undefined;
  const tag      = searchParams.get('tag')      ?? undefined;
  const limit    = Math.min(Number(searchParams.get('limit') ?? 20), 50);
  const page     = Math.max(Number(searchParams.get('page') ?? 1), 1);

  try {
    const where: Record<string, unknown> = {};
    if (platform) where.sourcePlatform = platform;
    if (tag)      where.tags = { has: tag };

    const [opinions, total] = await Promise.all([
      prisma.opinion.findMany({
        where,
        orderBy: [
          { featured: 'desc' },
          { publishedAt: 'desc' },
        ],
        skip:  (page - 1) * limit,
        take:  limit,
      }),
      prisma.opinion.count({ where }),
    ]);

    return NextResponse.json({ opinions, total, page, limit });
  } catch (err) {
    console.error('[/api/opinions]', err);
    return NextResponse.json({ error: 'Failed to fetch opinions' }, { status: 500 });
  }
}
