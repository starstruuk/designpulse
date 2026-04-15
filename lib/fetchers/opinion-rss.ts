/**
 * Fetches opinionated design content from curated Substack and blog RSS feeds.
 *
 * Curated sources (add/remove freely):
 *
 *   Dense Discovery           — Kai Brach's weekly design culture curation
 *   Design Lobster            — Henry Hinds' curated design discourse
 *   Subtract                  — Critical design writing
 *   UX Psychology             — Psychology-informed UX takes
 *   Pixels of the Week        — Stéphanie Walter's weekly design curation
 *   Design Observer           — Long-form critical design essays
 *   Sketching for UX          — Krisztina Szerovay: UX, service design, AI
 *   UX Movement               — Anthony Tseng: actionable UI/UX tips
 *   The Digital Designer      — Product design, Figma workflows
 *   Secrets to Great UX       — Raika Sarkett: UX career & practice
 *   Good Graf!                — Carly Ayres: design & tech culture
 *   On Looking                — Julien Posture: illustration & visual culture
 *   Ideas on Design           — David: design thinking essays
 *   Art Delivery              — Danielle Krysa: daily art inspiration
 *   The Gyaan Project         — Digital product craft & AI ethics
 *   Karo Zieminski            — AI product management & UX
 *   Jorge Arango              — Information architecture & design ethics
 *   The Flower Press          — Product design through psychology
 *   Andrew Chen               — Growth, startups & product strategy
 *   Hunter Walk               — Product leadership & startup building
 *   Tangents and Other Detours — Art, craft & design culture
 *
 * To add a new source, append an entry to OPINION_SOURCES below.
 */

import Parser from 'rss-parser';

export interface RSSOpinion {
  title: string;
  excerpt: string;
  snippet: string | null;
  imageUrl: string | null;
  publishedAt: Date;
  readTime: string;
  tags: string[];
  sourceUrl: string;
  sourcePlatform: string;
  subreddit: null;
  upvotes: null;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  authorBio: string | null;
  authorHandle: string | null;
  featured: false;
}

// ─── Sources ─────────────────────────────────────────────────────────────────

interface OpinionSource {
  name: string;
  url: string;
  platform: string;
  /** Default author name when feed items don't specify one */
  defaultAuthor: string;
  /** Author's role/title shown beneath their name */
  authorRole: string;
  /** Short bio shown in author tooltip */
  authorBio: string;
  /** Twitter/X handle (without @) */
  authorHandle?: string;
  /** Avatar URL — uses DiceBear initials fallback if omitted */
  authorAvatar?: string;
  /** Fallback cover image when no image found in feed item */
  fallbackImage: string;
}

const OPINION_SOURCES: OpinionSource[] = [
  {
    name:          'Dense Discovery',
    url:           'https://www.densediscovery.com/feed.xml',
    platform:      'substack',
    defaultAuthor: 'Kai Brach',
    authorRole:    'Writer & Publisher, Dense Discovery',
    authorBio:     'Kai Brach writes Dense Discovery — a slow-tech weekly newsletter at the intersection of design, technology, and culture.',
    authorHandle:  'kaib',
    fallbackImage: 'https://images.unsplash.com/photo-1761628332000-9da4f810183e?w=800&q=80',
  },
  {
    name:          'Design Lobster',
    url:           'https://designlobster.substack.com/feed',
    platform:      'substack',
    defaultAuthor: 'Henry Hinds',
    authorRole:    'Writer, Design Lobster',
    authorBio:     'Design Lobster explores the ideas that make design meaningful — curating and analysing design discourse weekly.',
    authorHandle:  'designlobster',
    fallbackImage: 'https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?w=800&q=80',
  },
  {
    name:          'Subtract',
    url:           'https://subtract.substack.com/feed',
    platform:      'substack',
    defaultAuthor: 'Subtract',
    authorRole:    'Design Criticism Publication',
    authorBio:     'Subtract publishes critical writing on design, technology, and aesthetics.',
    fallbackImage: 'https://images.unsplash.com/photo-1657490017668-b0f0c96d592d?w=800&q=80',
  },
  {
    name:          'UX Psychology',
    url:           'https://uxpsychology.substack.com/feed',
    platform:      'substack',
    defaultAuthor: 'UX Psychology',
    authorRole:    'UX & Behavioural Design Newsletter',
    authorBio:     'Applying psychology and cognitive science to UX — with strong takes on what the industry gets wrong.',
    fallbackImage: 'https://images.unsplash.com/photo-1738512503391-a0c889991257?w=800&q=80',
  },
  {
    name:          'Pixels of the Week',
    url:           'https://stephaniewalter.design/feed/',
    platform:      'blog',
    defaultAuthor: 'Stéphanie Walter',
    authorRole:    'UX/UI Designer & Speaker',
    authorBio:     'Stéphanie Walter shares weekly design curation and strong opinions on accessibility, UX, and product design.',
    authorHandle:  'WalterStephanie',
    fallbackImage: 'https://images.unsplash.com/photo-1761773850623-7dce19588412?w=800&q=80',
  },
  {
    name:          'Design Observer',
    url:           'https://designobserver.com/rss/',
    platform:      'blog',
    defaultAuthor: 'Design Observer',
    authorRole:    'Critical Design Publication',
    authorBio:     'Design Observer has published critical writing on design, culture, and visual communication since 2003.',
    fallbackImage: 'https://images.unsplash.com/photo-1759752394757-323a0adc0d62?w=800&q=80',
  },
  {
    name:          'Sketching for UX',
    url:           'https://sketchingforux.substack.com/feed',
    platform:      'substack',
    defaultAuthor: 'Krisztina Szerovay',
    authorRole:    'UX Designer & Educator, Sketching for UX',
    authorBio:     'Krisztina Szerovay covers UX, service design, and AI through the lens of visual thinking and sketching.',
    authorHandle:  'ux_kri',
    fallbackImage: 'https://images.unsplash.com/photo-1638742385167-96fc60e12f59?w=800&q=80',
  },
  {
    name:          'UX Movement',
    url:           'https://uxmovement.substack.com/feed',
    platform:      'substack',
    defaultAuthor: 'Anthony Tseng',
    authorRole:    'UX Designer & Writer, UX Movement',
    authorBio:     'Anthony Tseng writes actionable UI/UX tips backed by real-world examples and research.',
    authorHandle:  'uxmovement',
    fallbackImage: 'https://images.unsplash.com/photo-1618788372246-79faff0c3742?w=800&q=80',
  },
  {
    name:          'The Digital Designer',
    url:           'https://thedigitaldesigner.substack.com/feed',
    platform:      'substack',
    defaultAuthor: 'The Digital Designer',
    authorRole:    'Product Design & Figma Newsletter',
    authorBio:     'In-depth takes on product design, Figma workflows, and industry insights.',
    fallbackImage: 'https://images.unsplash.com/photo-1576153192621-7a3be10b356e?w=800&q=80',
  },
  {
    name:          'Secrets to Great UX Design',
    url:           'https://greatux.co/feed',
    platform:      'blog',
    defaultAuthor: 'Raika Sarkett',
    authorRole:    'UX Designer & Writer',
    authorBio:     'Raika Sarkett shares practical advice on UX design and career growth for designers at every stage.',
    fallbackImage: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80',
  },
  {
    name:          'Good Graf!',
    url:           'https://goodgraf.substack.com/feed',
    platform:      'substack',
    defaultAuthor: 'Carly Ayres',
    authorRole:    'Writer, Good Graf!',
    authorBio:     'Carly Ayres writes about design, writing, and tech culture with sharp wit and cultural criticism.',
    fallbackImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
  },
  {
    name:          'On Looking',
    url:           'https://onlooking.substack.com/feed',
    platform:      'substack',
    defaultAuthor: 'Julien Posture',
    authorRole:    'Writer, On Looking',
    authorBio:     'Julien Posture explores illustration, advertising, and visual culture — the art of seeing deeply.',
    fallbackImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    name:          'Ideas on Design',
    url:           'https://ideasondesign.substack.com/feed',
    platform:      'substack',
    defaultAuthor: 'David',
    authorRole:    'Writer, Ideas on Design',
    authorBio:     'Exploring design thinking and digital creativity through considered, curious essays.',
    fallbackImage: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
  },
  {
    name:          'Art Delivery',
    url:           'https://artdelivery.substack.com/feed',
    platform:      'substack',
    defaultAuthor: 'Danielle Krysa',
    authorRole:    'Curator & Writer, Art Delivery',
    authorBio:     'Danielle Krysa delivers daily art and illustration inspiration with a curatorial eye.',
    fallbackImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80',
  },
  {
    name:          'The Gyaan Project',
    url:           'https://thegyaanproject.substack.com/feed',
    platform:      'substack',
    defaultAuthor: 'The Gyaan Project',
    authorRole:    'Digital Product Craft & AI Ethics Newsletter',
    authorBio:     'Deep dives into digital product craft, design systems, and the ethical dimensions of AI.',
    fallbackImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
  },
  {
    name:          'Karo Zieminski',
    url:           'https://karozieminski.substack.com/feed',
    platform:      'substack',
    defaultAuthor: 'Karo Zieminski',
    authorRole:    'AI Product Manager & UX Writer',
    authorBio:     'Karo Zieminski writes about AI product management, UX, and viral design frameworks.',
    fallbackImage: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
  },
  {
    name:          'Jorge Arango',
    url:           'https://jarango.com/feed',
    platform:      'blog',
    defaultAuthor: 'Jorge Arango',
    authorRole:    'Information Architect & Author',
    authorBio:     'Jorge Arango writes on systems thinking, information architecture, and the ethics of design.',
    authorHandle:  'jarango',
    fallbackImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
  },
  {
    name:          'The Flower Press',
    url:           'https://theflowerpress.net/feed',
    platform:      'blog',
    defaultAuthor: 'The Flower Press',
    authorRole:    'Digital Product Design & Psychology',
    authorBio:     'The Flower Press unpacks digital product design through the lens of psychology and human behaviour.',
    fallbackImage: 'https://images.unsplash.com/photo-1499678329028-101435549a4e?w=800&q=80',
  },
  {
    name:          'Andrew Chen',
    url:           'https://andrewchen.substack.com/feed',
    platform:      'substack',
    defaultAuthor: 'Andrew Chen',
    authorRole:    'General Partner, a16z',
    authorBio:     'Andrew Chen writes about growth, startups, and product strategy — essential reading for designers building products.',
    authorHandle:  'andrewchen',
    fallbackImage: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80',
  },
  {
    name:          'Hunter Walk',
    url:           'https://hunterwalk.com/feed',
    platform:      'blog',
    defaultAuthor: 'Hunter Walk',
    authorRole:    'Partner, Homebrew VC',
    authorBio:     'Hunter Walk shares candid takes on product leadership, startup building, and the future of work.',
    authorHandle:  'hunterwalk',
    fallbackImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
  },
  {
    name:          'Tangents and Other Detours',
    url:           'https://open.substack.com/pub/tangentsandotherdetours/feed',
    platform:      'substack',
    defaultAuthor: 'Tangents and Other Detours',
    authorRole:    'Art, Craft & Design Culture',
    authorBio:     'Wandering through art, craft, photography, and design culture — beautifully unhurried.',
    fallbackImage: 'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=800&q=80',
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Strips HTML tags from a string. */
function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').trim();
}

/** Estimates read time from plain text (~200 wpm). */
function estimateReadTime(text: string): string {
  const words   = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

/**
 * Generates a deterministic DiceBear initials avatar for a given name.
 */
function initialsAvatar(name: string): string {
  return `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=0f3460,1a1a2e,e94560&fontFamily=Arial`;
}

/** Extracts the first image URL from an RSS item's content or enclosure. */
function extractImageFromItem(item: RSSItem): string | null {
  // media:content
  if (item['media:content']?.$.url) return item['media:content'].$.url;
  // enclosure
  if (item.enclosure?.url) return item.enclosure.url;
  // <img> inside content
  if (item.content) {
    const match = item.content.match(/<img[^>]+src=["']([^"']+)["']/);
    if (match) return match[1];
  }
  if (item['content:encoded']) {
    const match = item['content:encoded'].match(/<img[^>]+src=["']([^"']+)["']/);
    if (match) return match[1];
  }
  return null;
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface RSSItem {
  guid?: string;
  title?: string;
  link?: string;
  contentSnippet?: string;
  content?: string;
  'content:encoded'?: string;
  pubDate?: string | Date;
  isoDate?: string;
  creator?: string;
  author?: string;
  categories?: string[];
  enclosure?: { url: string };
  'media:content'?: { $: { url: string } };
}

// ─── Fetcher ─────────────────────────────────────────────────────────────────

const parser = new Parser({
  customFields: {
    item: ['content:encoded', ['media:content', 'media:content', { keepArray: false }]],
  },
});

/**
 * Fetches up to 10 recent items from a single RSS source.
 * Silently returns [] on failure so one bad feed doesn't block others.
 */
async function fetchSource(source: OpinionSource): Promise<RSSOpinion[]> {
  let feed: { items: RSSItem[] };
  try {
    feed = await parser.parseURL(source.url) as { items: RSSItem[] };
  } catch {
    return [];
  }

  /** Minimum excerpt length — items shorter than this are likely image posts or fluff. */
  const MIN_EXCERPT_LEN = 80;

  /** Titles matching these patterns are newsletter digests / roundups, not opinions. */
  const ROUNDUP_TITLE_RE = /^(issue\s*#?\d|week\s+(of|in)|#\d+[\s–]|\d+\/\d+|vol\.?\s*\d+|this\s+week|links\s+for|what\s+i\s+read|reading\s+list|link\s+roundup)/i;

  return feed.items.slice(0, 10).map((item): RSSOpinion | null => {
    const title = item.title ?? '';

    // Prefer the RSS <description>/summary for the excerpt — it's the author-written teaser
    // and doesn't include sponsored sections, full HTML, or inline ads.
    // Fall back to the body text only when the description is missing or very short.
    const descriptionText = stripHtml(item.contentSnippet ?? '');
    const rawContent      = item['content:encoded'] || item.content || '';
    const bodyText        = stripHtml(rawContent);

    // ── Quality gates ────────────────────────────────────────────
    if (!title || title === '(untitled)')                       return null;
    if (ROUNDUP_TITLE_RE.test(title))                          return null;
    if (descriptionText.length < MIN_EXCERPT_LEN && bodyText.length < MIN_EXCERPT_LEN) return null;

    // Use description as excerpt source (clean), body as snippet (full preview)
    const excerptSource = descriptionText.length >= MIN_EXCERPT_LEN ? descriptionText : bodyText;
    const excerpt = excerptSource.slice(0, 220).replace(/\n+/g, ' ').trim() +
      (excerptSource.length > 220 ? '…' : '');

    const snippet = bodyText.length > 0 ? bodyText.slice(0, 700) : (descriptionText || null);

    const authorName   = item.creator || item.author || source.defaultAuthor;
    const tags         = (item.categories ?? []).slice(0, 4);
    if (!tags.includes(source.name)) tags.unshift(source.name);

    return {
      title,
      excerpt:        excerpt || title,
      snippet,
      imageUrl:       extractImageFromItem(item) ?? source.fallbackImage,
      publishedAt:    new Date(item.isoDate ?? item.pubDate ?? Date.now()),
      readTime:       estimateReadTime(bodyText || descriptionText || title),
      tags,
      sourceUrl:      item.link ?? '',
      sourcePlatform: source.platform,
      subreddit:      null,
      upvotes:        null,
      authorName,
      authorRole:     source.authorRole,
      authorAvatar:   source.authorAvatar ?? initialsAvatar(authorName),
      authorBio:      source.authorBio,
      authorHandle:   source.authorHandle ?? null,
      featured:       false,
    };
  }).filter((o): o is RSSOpinion => o !== null && o.sourceUrl !== '');
}

/**
 * Fetches recent opinionated pieces from all configured RSS sources in parallel.
 * Results are sorted by date descending (newest first).
 */
export async function fetchRSSOpinions(): Promise<RSSOpinion[]> {
  const results = await Promise.allSettled(OPINION_SOURCES.map(fetchSource));
  const items   = results.flatMap((r) => (r.status === 'fulfilled' ? r.value : []));
  return items.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
}
