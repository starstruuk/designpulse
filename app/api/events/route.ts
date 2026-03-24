import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { EventType, EventStatus } from '@/generated/prisma';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const status = url.searchParams.get('status') as EventStatus | undefined;
    const type = url.searchParams.get('type') as EventType | undefined;
    const month = url.searchParams.get('month');

    const whereClause: any = {};

    if (status) {
      whereClause.status = status;
    }

    if (type) {
      whereClause.type = type;
    }

    if (month) {
      whereClause.date = {
        startsWith: `${month}-`,
      };
    }

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where: whereClause,
        orderBy: { date: 'asc' },
      }),
      prisma.event.count({ where: whereClause }),
    ]);

    return NextResponse.json({
      events,
      total,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}