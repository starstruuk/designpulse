import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const article = await prisma.article.findUnique({
      where: { id },
      include: {
        source:      true,
        disciplines: { include: { discipline: true } },
      },
    });

    if (!article) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // Related: same discipline, different article, latest first
    const firstDisciplineId = article.disciplines[0]?.disciplineId;
    const related = await prisma.article.findMany({
      where: {
        id:  { not: id },
        ...(firstDisciplineId
          ? { disciplines: { some: { disciplineId: firstDisciplineId } } }
          : {}),
      },
      include: {
        source:      true,
        disciplines: { include: { discipline: true } },
      },
      orderBy: { publishedAt: 'desc' },
      take: 3,
    });

    return NextResponse.json({ article, related });
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
