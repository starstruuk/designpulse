/**
 * tag-articles.ts
 *
 * Assigns discipline tags to articles that have none yet, using keyword
 * matching on title + excerpt with a source-name fallback.
 *
 * Already-tagged articles are skipped entirely — tags are stored in the DB
 * and never recomputed unless you wipe the ArticleDiscipline rows manually.
 *
 * Called automatically by the master seed after seedArticles().
 * Can also be run standalone:  npm run tag-articles
 */
import type { PrismaClient } from '../generated/prisma';
import { prisma as defaultPrisma } from '../lib/prisma';

/* ─── Keyword → discipline map ───────────────────────────────────────────── */

const DISCIPLINE_KEYWORDS: Record<string, string[]> = {
  ux: [
    'user experience', 'ux', 'user research', 'usability', 'user testing',
    'personas', 'empathy map', 'journey map', 'user journey', 'pain point',
    'user interview', 'user need', 'information architecture', 'ia ',
    'wireframe', 'wireframing', 'card sort', 'tree test', 'heuristic',
    'accessibility', 'a11y', 'inclusive design', 'cognitive load',
    'mental model', 'affordance', 'findability', 'navigation design',
    'user flow', 'task flow', 'ux research', 'ux design', 'ux writing',
  ],
  ui: [
    'ui design', 'user interface', 'design system', 'component library',
    'design token', 'typography', 'color palette', 'spacing', 'grid',
    'layout', 'button', 'modal', 'form design', 'input field', 'icon',
    'dark mode', 'light mode', 'responsive design', 'mobile first',
    'css', 'tailwind', 'figma', 'sketch', 'ui component', 'ui kit',
    'visual hierarchy', 'contrast', 'readability', 'font',
  ],
  product: [
    'product design', 'product manager', 'product strategy', 'product thinking',
    'product development', 'roadmap', 'sprint', 'agile', 'mvp',
    'feature', 'stakeholder', 'okr', 'kpi', 'metrics', 'growth',
    'onboarding', 'retention', 'conversion', 'a/b test', 'experiment',
    'product-led', 'saas', 'b2b', 'b2c', 'go-to-market',
    'discovery', 'delivery', 'pm ',
  ],
  ai: [
    'artificial intelligence', ' ai ', 'machine learning', 'ml ',
    'llm', 'large language model', 'gpt', 'chatgpt', 'generative ai',
    'copilot', 'midjourney', 'stable diffusion', 'dall-e', 'gemini',
    'prompt engineering', 'ai-powered', 'ai tools', 'ai design',
    'ai assistant', 'neural network', 'automation', 'ai product',
    'ai ux', 'responsible ai', 'ethical ai',
  ],
  graphic: [
    'graphic design', 'branding', 'brand identity', 'brand design',
    'logo design', 'logo', 'illustration', 'illustrator', 'vector',
    'print design', 'poster', 'editorial design', 'packaging',
    'visual identity', 'style guide', 'moodboard', 'art direction',
    'adobe', 'photoshop', 'indesign',
  ],
  visual: [
    'visual design', 'visual hierarchy', 'visual storytelling',
    'visual communication', 'composition', 'aesthetics', 'photography',
    'image', 'color theory', 'whitespace', 'balance', 'alignment',
    'contrast ratio', 'gestalt', 'visual weight',
  ],
  motion: [
    'motion design', 'animation', 'micro-interaction', 'micro animation',
    'transition', 'lottie', 'rive', 'framer motion', 'gsap', 'css animation',
    'scroll animation', 'parallax', 'easing', 'keyframe', 'after effects',
    'motion graphic', 'animated', 'interaction animation',
  ],
  interaction: [
    'interaction design', 'ixd', 'interaction designer', 'prototype',
    'prototyping', 'click', 'gesture', 'touch', 'haptic', 'feedback',
    'interactive', 'user input', 'drag and drop', 'hover state',
    'focus state', 'keyboard navigation', 'interaction pattern',
  ],
};

const SOURCE_DISCIPLINES: Record<string, string[]> = {
  'Nielsen Norman Group': ['ux'],
  'Smashing Magazine':    ['ui', 'product'],
  'UX Design CC':         ['ux'],
  'Figma Blog':           ['product', 'ui'],
  'A List Apart':         ['interaction', 'ux'],
  'Codrops':              ['motion', 'visual'],
  'Prototypr':            ['product', 'ux'],
  'UX Planet':            ['ux'],
  'UX Bootcamp':          ['ux'],
};

const BATCH_SIZE = 20;

function matchDisciplines(title: string, excerpt: string | null): Set<string> {
  const haystack = `${title} ${excerpt ?? ''}`.toLowerCase();
  const matched = new Set<string>();
  for (const [slug, keywords] of Object.entries(DISCIPLINE_KEYWORDS)) {
    for (const kw of keywords) {
      if (haystack.includes(kw)) { matched.add(slug); break; }
    }
  }
  return matched;
}

/**
 * Tags only articles that have no disciplines yet.
 * Already-tagged articles are untouched — their tags remain exactly as stored.
 */
export async function tagArticles(prisma: PrismaClient): Promise<void> {
  // Load discipline slug → id map
  const disciplines = await prisma.discipline.findMany();
  if (disciplines.length === 0) {
    console.warn('  No disciplines in DB — skipping tag step');
    return;
  }
  const disciplineMap: Record<string, string> = Object.fromEntries(
    disciplines.map((d) => [d.slug, d.id]),
  );

  // Only fetch articles that have NO discipline tags yet
  const untagged = await prisma.article.findMany({
    where:  { disciplines: { none: {} } },
    select: {
      id:     true,
      title:  true,
      excerpt:true,
      source: { select: { name: true } },
    },
  });

  if (untagged.length === 0) {
    console.log('✓ Tag articles — all articles already tagged, nothing to do');
    return;
  }
  console.log(`  Tagging ${untagged.length} untagged articles…`);

  let tagged = 0;
  let skipped = 0;

  for (let i = 0; i < untagged.length; i += BATCH_SIZE) {
    const batch = untagged.slice(i, i + BATCH_SIZE);

    await Promise.all(
      batch.map(async (article) => {
        const matched = matchDisciplines(article.title, article.excerpt);

        // Fall back to source mapping if no keyword hit
        if (matched.size === 0 && article.source) {
          for (const s of SOURCE_DISCIPLINES[article.source.name] ?? []) {
            matched.add(s);
          }
        }

        if (matched.size === 0) { skipped++; return; }

        const rows = [...matched]
          .map((slug) => disciplineMap[slug])
          .filter(Boolean)
          .map((disciplineId) => ({ articleId: article.id, disciplineId }));

        if (rows.length > 0) {
          await prisma.articleDiscipline.createMany({
            data:           rows,
            skipDuplicates: true,
          });
        }
        tagged++;
      }),
    );
  }

  console.log(`✓ Tag articles — tagged: ${tagged}  |  no match: ${skipped}`);
}

// ── Standalone runner ─────────────────────────────────────────────────────────
if (require.main === module) {
  tagArticles(defaultPrisma)
    .catch((err) => { console.error(err); process.exit(1); })
    .finally(() => defaultPrisma.$disconnect());
}
