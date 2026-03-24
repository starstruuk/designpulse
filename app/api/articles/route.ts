import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const disciplinesParam = url.searchParams.get('disciplines');
    const searchParam     = url.searchParams.get('search');
    const fromDate        = url.searchParams.get('from');
    const toDate          = url.searchParams.get('to');
    const sortBy          = url.searchParams.get('sortBy') || 'newest';
    const page            = parseInt(url.searchParams.get('page')  || '1',  10);
    const limit           = parseInt(url.searchParams.get('limit') || '20', 10);

    const disciplinesArray = disciplinesParam
      ? disciplinesParam.split(',').filter(Boolean)
      : [];

    const whereClause: any = {};

    // Discipline filter
    if (disciplinesArray.length > 0) {
      whereClause.disciplines = {
        some: {
          discipline: {
            slug: { in: disciplinesArray },
          },
        },
      };
    }

    // Search filter
    if (searchParam) {
      whereClause.OR = [
        { title:   { contains: searchParam, mode: 'insensitive' } },
        { excerpt: { contains: searchParam, mode: 'insensitive' } },
      ];
    }

    // Date range filter
    if (fromDate || toDate) {
      whereClause.publishedAt = {};
      if (fromDate) whereClause.publishedAt.gte = new Date(fromDate);
      if (toDate)   whereClause.publishedAt.lte = new Date(toDate);
    }

    // Sort order
    const orderBy =
      sortBy === 'newest'   ? { publishedAt: 'desc' as const } :
      sortBy === 'oldest'   ? { publishedAt: 'asc'  as const } :
      /* default newest */    { publishedAt: 'desc' as const };

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where: whereClause,
        include: {
          disciplines: { include: { discipline: true } },
          source: true,
        },
        orderBy,
        skip:  (page - 1) * limit,
        take:  limit,
      }),
      prisma.article.count({ where: whereClause }),
    ]);

    return NextResponse.json({
      articles,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });

  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}