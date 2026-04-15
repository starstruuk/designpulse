import type { PrismaClient } from '../../generated/prisma';
import { prisma }              from '../../lib/prisma';
import { fetchRSSOpinions }    from '../../lib/fetchers/opinion-rss';
import { fetchRedditOpinions } from '../../lib/fetchers/reddit';

/** How many opinions to upsert concurrently. */
const BATCH_SIZE = 10;

/**
 * Seeds the Opinion table from all configured RSS and Reddit sources.
 * Uses upsert on sourceUrl so re-running is safe (no duplicates).
 *
 * @param prisma - Prisma client instance passed from the master seed script.
 */
export async function seedOpinions(prisma: PrismaClient): Promise<void> {
  console.log('  Fetching RSS opinions…');
  const rssItems    = await fetchRSSOpinions();
  console.log(`  ✓ RSS: ${rssItems.length} items from ${new Set(rssItems.map((i) => i.sourcePlatform + ':' + i.authorName)).size} sources`);

  console.log('  Fetching Reddit opinions…');
  const redditItems = await fetchRedditOpinions();
  console.log(`  ✓ Reddit: ${redditItems.length} posts across ${new Set(redditItems.map((p) => p.subreddit)).size} subreddits`);

  const all = [...rssItems, ...redditItems];
  // Filter out items with no URL (shouldn't happen but guard anyway)
  const valid = all.filter((o) => o.sourceUrl && o.sourceUrl.length > 0);
  console.log(`  Upserting ${valid.length} opinions…`);

  // Process in batches to avoid pool exhaustion
  for (let i = 0; i < valid.length; i += BATCH_SIZE) {
    const batch = valid.slice(i, i + BATCH_SIZE);
    await Promise.all(
      batch.map((o) =>
        prisma.opinion.upsert({
          where:  { sourceUrl: o.sourceUrl },
          update: {
            title:          o.title,
            excerpt:        o.excerpt,
            snippet:        o.snippet,
            imageUrl:       o.imageUrl,
            publishedAt:    o.publishedAt,
            readTime:       o.readTime,
            tags:           o.tags,
            upvotes:        'upvotes' in o ? o.upvotes : null,
            authorName:     o.authorName,
            authorRole:     o.authorRole ?? null,
            authorAvatar:   o.authorAvatar,
            authorBio:      o.authorBio,
            authorHandle:   o.authorHandle ?? null,
          },
          create: {
            title:          o.title,
            excerpt:        o.excerpt,
            snippet:        o.snippet,
            imageUrl:       o.imageUrl,
            publishedAt:    o.publishedAt,
            readTime:       o.readTime,
            tags:           o.tags,
            featured:       false,
            sourceUrl:      o.sourceUrl,
            sourcePlatform: o.sourcePlatform,
            subreddit:      'subreddit' in o ? o.subreddit : null,
            upvotes:        'upvotes' in o ? o.upvotes : null,
            authorName:     o.authorName,
            authorRole:     o.authorRole ?? null,
            authorAvatar:   o.authorAvatar,
            authorBio:      o.authorBio,
            authorHandle:   o.authorHandle ?? null,
          },
        })
      )
    );
  }

  const total = await prisma.opinion.count();
  console.log(`  ✓ Opinion table now has ${total} rows`);
}

// ── Standalone runner ─────────────────────────────────────────────────────────
if (require.main === module) {
  seedOpinions(prisma)
    .catch((err) => { console.error(err); process.exit(1); })
    .finally(() => prisma.$disconnect());
}
