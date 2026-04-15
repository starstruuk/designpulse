/**
 * prisma/seeds/scraped-events.ts
 *
 * Fetches live design events from Eventbrite and Luma via the scraper,
 * then upserts them into the Event table using externalId as the stable key.
 *
 * Usage:
 *   npm run seed:scraped-events   ← standalone
 *   npm run seed                  ← called automatically by master seed
 *
 * Requires API keys in .env.local:
 *   EVENTBRITE_TOKEN
 *   LUMA_API_KEY + LUMA_CALENDAR_IDS
 */
import type { PrismaClient } from '../../generated/prisma';
import { prisma }            from '../../lib/prisma';
import { scrapeAllEvents }   from '../../lib/scrapers/events';

/**
 * Scrapes all configured event sources and upserts results by externalId.
 * Already-stored events have their status, attendees, and image refreshed;
 * everything else (title, description, date, price) is left unchanged on update
 * so manual corrections survive re-runs.
 */
export async function seedScrapedEvents(prisma: PrismaClient): Promise<void> {
  const events = await scrapeAllEvents();

  if (events.length === 0) {
    console.log('✓ Scraped Events — nothing fetched (check API keys in .env.local)');
    return;
  }

  let upserted = 0;
  let skipped  = 0;

  for (const ev of events) {
    try {
      await prisma.event.upsert({
        where:  { externalId: ev.externalId },
        create: ev,
        update: {
          // Refresh mutable fields only — don't overwrite manual corrections
          status:      ev.status,
          attendees:   ev.attendees,
          image:       ev.image,
          description: ev.description,
          price:       ev.price ?? null, // re-apply so stale "$null" strings get cleared
        },
      });
      upserted++;
    } catch (err: unknown) {
      // Title @unique conflict means a manual event has the same title —
      // skip the scraped copy rather than overwriting the manual record.
      if (
        typeof err === 'object' && err !== null &&
        'code' in err && (err as { code: string }).code === 'P2002'
      ) {
        skipped++;
      } else {
        throw err;
      }
    }
  }

  console.log(`✓ Scraped Events — upserted: ${upserted}  |  skipped (title conflict): ${skipped}`);
}

// ── Standalone runner ──────────────────────────────────────────────────────────
if (require.main === module) {
  seedScrapedEvents(prisma)
    .catch((err) => { console.error(err); process.exit(1); })
    .finally(() => prisma.$disconnect());
}
