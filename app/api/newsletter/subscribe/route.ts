import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const BodySchema = z.object({
  email: z.string().email(),
});

/**
 * POST /api/newsletter/subscribe
 * Stores the subscriber email in the database.
 * Resend welcome email can be wired up once a verified sender domain is available.
 */
export async function POST(req: NextRequest) {
  const parsed = BodySchema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json({ error: 'Valid email address required' }, { status: 400 });
  }

  const { email } = parsed.data;

  try {
    await prisma.newsletterSubscriber.upsert({
      where:  { email },
      update: {},           // already subscribed — no-op
      create: { email },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to subscribe. Please try again.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
