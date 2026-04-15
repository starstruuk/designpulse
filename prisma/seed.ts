/**
 * Master seed script — runs all individual seeders in order.
 *
 * Usage:
 *   npm run seed                  ← run everything
 *   npm run seed:disciplines
 *   npm run seed:articles
 *   npm run seed:resources
 *   npm run seed:events
 *   npm run seed:opinions
 */
import { prisma } from '../lib/prisma';
import { seedDisciplines }    from './seeds/disciplines';
import { seedArticles }       from './seeds/articles';
import { seedResources }      from './seeds/resources';
import { seedEvents }         from './seeds/events';
import { seedScrapedEvents }  from './seeds/scraped-events';
import { seedOpinions }       from './seeds/opinions';
import { tagArticles }        from './tag-articles';

async function main() {
  console.log('── Disciplines ──────────────────────────');
  const disciplineMap = await seedDisciplines(prisma);

  console.log('── Articles ─────────────────────────────');
  await seedArticles(prisma, disciplineMap);

  console.log('── Tag articles ─────────────────────────');
  await tagArticles(prisma);

  console.log('── Resources ────────────────────────────');
  await seedResources(prisma);

  console.log('── Events (static) ──────────────────────');
  await seedEvents(prisma);

  console.log('── Events (scraped) ─────────────────────');
  await seedScrapedEvents(prisma);

  console.log('── Opinions ─────────────────────────────');
  await seedOpinions(prisma);

  console.log('\n✅ All seeding complete');
}

main()
  .catch((err) => { console.error(err); process.exit(1); })
  .finally(() => prisma.$disconnect());
