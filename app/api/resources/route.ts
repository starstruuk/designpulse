import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { Pricing } from '@prisma/client';

const resourceFilterSchema = z.object({
  category: z.string().optional(),
  pricing:  z.string().optional(),
  search:   z.string().optional(),
  page:     z.coerce.number().default(1),
  limit:    z.coerce.number().default(40),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filters = resourceFilterSchema.parse(
      Object.fromEntries(searchParams.entries())
    );

    const whereClause: any = {};

    // Filter by category slug through the relation
    if (filters.category && filters.category !== 'all') {
      whereClause.category = {
        slug: filters.category,
      };
    }

    // Filter by pricing — convert to uppercase enum value
    if (filters.pricing) {
      whereClause.pricing = filters.pricing.toUpperCase() as Pricing;
    }

    // Filter by search across name and description
    if (filters.search) {
      whereClause.OR = [
        { name:        { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const [resources, total] = await Promise.all([
      prisma.resource.findMany({
        where:    whereClause,
        include:  { category: true },
        orderBy:  { createdAt: 'desc' },
        skip:     (filters.page - 1) * filters.limit,
        take:     filters.limit,
      }),
      prisma.resource.count({ where: whereClause }),
    ]);

    return NextResponse.json({
      resources,
      total,
      page:       filters.page,
      totalPages: Math.ceil(total / filters.limit),
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}