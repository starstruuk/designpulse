import type { PrismaClient } from '../../generated/prisma';
import { prisma } from '../../lib/prisma';

const DISCIPLINE_DATA = [
  { name: 'Product',     slug: 'product'     },
  { name: 'AI',          slug: 'ai'          },
  { name: 'Graphic',     slug: 'graphic'     },
  { name: 'Visual',      slug: 'visual'      },
  { name: 'Motion',      slug: 'motion'      },
  { name: 'Interaction', slug: 'interaction' },
  { name: 'UX',          slug: 'ux'          },
  { name: 'UI',          slug: 'ui'          },
];

/**
 * Upserts all discipline records and returns a slug → id map.
 */
export async function seedDisciplines(
  prisma: PrismaClient,
): Promise<Record<string, string>> {
  const disciplineMap: Record<string, string> = {};

  for (const d of DISCIPLINE_DATA) {
    const result = await prisma.discipline.upsert({
      where:  { slug: d.slug },
      create: d,
      update: { name: d.name },
    });
    disciplineMap[d.slug] = result.id;
  }

  console.log(`✓ Disciplines — upserted ${DISCIPLINE_DATA.length}`);
  return disciplineMap;
}

// ── Standalone runner ─────────────────────────────────────────────────────────
if (require.main === module) {
  seedDisciplines(prisma)
    .catch((err) => { console.error(err); process.exit(1); })
    .finally(() => prisma.$disconnect());
}
