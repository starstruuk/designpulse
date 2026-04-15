import { inngest }              from '@/lib/inngest';
import { prisma }               from '@/lib/prisma';
import { seedArticles }         from '@/prisma/seeds/articles';
import { seedDisciplines }      from '@/prisma/seeds/disciplines';
import { scrapeAllEvents }      from '@/lib/scrapers/events';
import { scrapeBrowseAIEvents } from '@/lib/scrapers/browse-ai';
import { fetchRedditOpinions }  from '@/lib/fetchers/reddit';
import { fetchRSSOpinions }     from '@/lib/fetchers/opinion-rss';

// ── RSS Article Refresh ───────────────────────────────────────────────────────

/**
 * Fetches all RSS sources and upserts new articles into the DB.
 * Runs every 6 hours.
 */
export const refreshArticles = inngest.createFunction(
  { id: 'refresh-rss-articles', name: 'Refresh RSS Articles' },
  { cron: '0 */6 * * *' },       // every 6 hours
  async () => {
    const disciplineMap = await seedDisciplines(prisma);
    await seedArticles(prisma, disciplineMap);
    return { status: 'ok' };
  },
);

// ── Event Scraping Refresh ────────────────────────────────────────────────────

/**
 * Scrapes configured event sources and upserts results into the DB.
 * Runs once per day at 04:00 UTC.
 */
export const refreshEvents = inngest.createFunction(
  { id: 'refresh-scraped-events', name: 'Refresh Scraped Events' },
  { cron: '0 4 * * *' },          // daily at 04:00 UTC
  async () => {
    const [htmlEvents, browseAiEvents] = await Promise.all([
      scrapeAllEvents(),
      scrapeBrowseAIEvents(),
    ]);

    // Deduplicate by externalId
    const seen = new Set<string>();
    const events = [...htmlEvents, ...browseAiEvents].filter((ev) => {
      if (seen.has(ev.externalId)) return false;
      seen.add(ev.externalId);
      return true;
    });

    if (events.length === 0) {
      return { status: 'ok', upserted: 0, message: 'No events fetched — check env API keys' };
    }

    let upserted = 0;
    let skipped  = 0;

    for (const ev of events) {
      try {
        await prisma.event.upsert({
          where:  { externalId: ev.externalId },
          create: ev,
          update: {
            status:      ev.status,
            attendees:   ev.attendees,
            image:       ev.image,
            description: ev.description,
            price:       ev.price ?? null,
          },
        });
        upserted++;
      } catch (err: unknown) {
        // Title @unique conflict — manual event has same title, skip scraped copy
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

    return { status: 'ok', upserted, skipped };
  },
);

// ── Opinion Refresh ───────────────────────────────────────────────────────────

/**
 * Fetches fresh opinions from Reddit and curated RSS feeds, then upserts
 * them into the Opinion table. Runs daily at 06:00 UTC.
 */
export const refreshOpinions = inngest.createFunction(
  { id: 'refresh-opinions', name: 'Refresh Opinions' },
  { cron: '0 6 * * *' },           // daily at 06:00 UTC
  async () => {
    const [redditPosts, rssPosts] = await Promise.all([
      fetchRedditOpinions(),
      fetchRSSOpinions(),
    ]);

    const all = [...rssPosts, ...redditPosts];
    let upserted = 0;
    let skipped  = 0;

    for (const opinion of all) {
      if (!opinion.sourceUrl) { skipped++; continue; }

      try {
        await prisma.opinion.upsert({
          where:  { sourceUrl: opinion.sourceUrl },
          create: {
            title:          opinion.title,
            excerpt:        opinion.excerpt,
            snippet:        opinion.snippet ?? null,
            imageUrl:       opinion.imageUrl ?? null,
            publishedAt:    opinion.publishedAt,
            readTime:       opinion.readTime,
            tags:           opinion.tags,
            featured:       false,
            sourceUrl:      opinion.sourceUrl,
            sourcePlatform: opinion.sourcePlatform,
            subreddit:      opinion.subreddit ?? null,
            upvotes:        opinion.upvotes ?? null,
            authorName:     opinion.authorName,
            authorRole:     opinion.authorRole ?? null,
            authorAvatar:   opinion.authorAvatar ?? null,
            authorBio:      opinion.authorBio ?? null,
            authorHandle:   opinion.authorHandle ?? null,
          },
          update: {
            title:      opinion.title,
            excerpt:    opinion.excerpt,
            snippet:    opinion.snippet ?? null,
            imageUrl:   opinion.imageUrl ?? null,
            upvotes:    opinion.upvotes ?? null,
            tags:       opinion.tags,
          },
        });
        upserted++;
      } catch {
        skipped++;
      }
    }

    return { status: 'ok', upserted, skipped, total: all.length };
  },
);
