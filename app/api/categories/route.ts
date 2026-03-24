import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: 'asc',
    },
    include: {
      _count: {
        select: { resources: true },
      },
    },
  });

  return NextResponse.json({ categories });
}