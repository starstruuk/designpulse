import type { PrismaClient } from '../../generated/prisma';
import { prisma } from '../../lib/prisma';
import { fetchAndParseFeeds } from '../../lib/rss';
import { seedDisciplines } from './disciplines';

/** Discipline slugs assigned per RSS source name. */
const SOURCE_DISCIPLINES: Record<string, string[]> = {
  'Nielsen Norman Group': ['ux'],
  'Smashing Magazine':    ['ui', 'product'],
  'UX Design CC':         ['ux'],
  'Figma Blog':           ['product', 'ui'],
  'A List Apart':         ['interaction', 'ux'],
  'Codrops':              ['motion', 'visual'],
  'Prototypr':            ['product', 'ux'],
  'UX Planet':            ['ux'],
};

/** Max articles fetched per RSS source. 8 sources × 40 = 320 articles max. */
const PER_SOURCE_LIMIT = 40;

/** How many articles to upsert concurrently. Keep under 20 to avoid pool exhaustion. */
const BATCH_SIZE = 15;

/**
 * Fetches articles from RSS feeds, upserts Source + Article rows,
 * and creates ArticleDiscipline join records based on source mapping.
 *
 * Optimisations vs. the naive sequential approach:
 *  1. All 9 sources are upserted upfront in parallel → no per-article source lookup
 *  2. Articles are upserted in parallel batches of BATCH_SIZE
 *  3. Discipline tags use createMany + skipDuplicates → one call per article instead of N upserts
 *
 * @param disciplineMap - slug → id map produced by seedDisciplines()
 */
export async function seedArticles(
  prisma: PrismaClient,
  disciplineMap: Record<string, string>,
): Promise<void> {
  const articles = await fetchAndParseFeeds(PER_SOURCE_LIMIT);
  console.log(`  Fetched ${articles.length} articles from RSS (cap: ${PER_SOURCE_LIMIT}/source)`);

  // ── Step 1: upsert all sources in parallel ──────────────────────────────
  const uniqueSourceNames = [...new Set(articles.map((a) => a.sourceName))];
  const sourceEntries = await Promise.all(
    uniqueSourceNames.map((name) =>
      prisma.source.upsert({
        where:  { name },
        create: { name },
        update: {},
        select: { id: true, name: true },
      }),
    ),
  );
  const sourceMap: Record<string, string> = Object.fromEntries(
    sourceEntries.map((s) => [s.name, s.id]),
  );
  console.log(`  Upserted ${sourceEntries.length} sources`);

  // ── Step 2: upsert articles in parallel batches ─────────────────────────
  let count = 0;
  for (let i = 0; i < articles.length; i += BATCH_SIZE) {
    const batch = articles.slice(i, i + BATCH_SIZE);

    await Promise.all(
      batch.map(async (article) => {
        const sourceId = sourceMap[article.sourceName];

        const saved = await prisma.article.upsert({
          where:  { url: article.articleUrl },
          create: {
            title:       article.title,
            excerpt:     article.excerpt ?? null,
            content:     article.content ?? null,
            imageUrl:    article.imageUrl ?? null,
            url:         article.articleUrl,
            publishedAt: article.publishedAt,
            sourceId,
          },
          update: {
            title:       article.title,
            excerpt:     article.excerpt ?? null,
            content:     article.content ?? null,
            imageUrl:    article.imageUrl ?? null,
            publishedAt: article.publishedAt,
            sourceId,
          },
          select: { id: true },
        });

        // ── Step 3: batch-insert discipline tags, skip duplicates ─────────
        const slugs = SOURCE_DISCIPLINES[article.sourceName] ?? [];
        const disciplineRows = slugs
          .map((slug) => disciplineMap[slug])
          .filter(Boolean)
          .map((disciplineId) => ({ articleId: saved.id, disciplineId }));

        if (disciplineRows.length > 0) {
          await prisma.articleDiscipline.createMany({
            data:          disciplineRows,
            skipDuplicates: true,
          });
        }
      }),
    );

    count += batch.length;
    process.stdout.write(`\r  Progress: ${count}/${articles.length}`);
  }

  console.log(`\n✓ Articles — upserted ${count}`);
}

// ── Standalone runner ─────────────────────────────────────────────────────────
if (require.main === module) {
  seedDisciplines(prisma)
    .then((disciplineMap) => seedArticles(prisma, disciplineMap))
    .catch((err) => { console.error(err); process.exit(1); })
    .finally(() => prisma.$disconnect());
}
