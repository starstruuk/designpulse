/**
 * Fetches top posts from design-related subreddits using the public Reddit JSON API.
 * No API key required — uses the anonymous .json endpoint.
 *
 * Subreddits covered:
 *   r/design           ~3M members  — broad design discourse
 *   r/userexperience   ~450k members — UX discussion and hot takes
 *   r/graphic_design   ~5M members  — graphic/visual design
 *   r/UI_Design        ~200k members — interface design opinions
 *   r/web_design       ~700k members — web design debate
 *   r/UXDesign         ~350k members — UX-focused debate
 *   r/ProductDesign    ~150k members — product design discussions
 *   r/typography       ~300k members — type and lettering culture
 *   r/logodesign       ~500k members — logo critique and discourse
 *   r/design_critiques ~180k members — direct critique and strong design takes
 */

export interface RedditOpinion {
  title: string;
  excerpt: string;
  snippet: string | null;
  imageUrl: string | null;
  publishedAt: Date;
  readTime: string;
  tags: string[];
  sourceUrl: string;
  sourcePlatform: 'reddit';
  subreddit: string;
  upvotes: number;
  authorName: string;
  authorRole: string;
  authorHandle: string;
  authorAvatar: string;
  authorBio: null;
  featured: false;
}

// ─── Config ─────────────────────────────────────────────────────────────────

const SUBREDDITS = [
  'design',
  'userexperience',
  'graphic_design',
  'UI_Design',
  'web_design',
  'UXDesign',
  'ProductDesign',
  'typography',
  'logodesign',
  'design_critiques',
];

/** Minimum upvote threshold — filters out low-signal noise */
const MIN_SCORE = 100;

/**
 * Fallback cover images per subreddit when Reddit provides no usable thumbnail.
 * Using stable Unsplash photo IDs (no dynamic params that could break).
 */
const FALLBACK_IMAGES: Record<string, string> = {
  design:          'https://images.unsplash.com/photo-1561736953-fab83e00232e?w=800&q=80',
  userexperience:  'https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?w=800&q=80',
  graphic_design:  'https://images.unsplash.com/photo-1657490017668-b0f0c96d592d?w=800&q=80',
  UI_Design:       'https://images.unsplash.com/photo-1761628332000-9da4f810183e?w=800&q=80',
  web_design:      'https://images.unsplash.com/photo-1759752394757-323a0adc0d62?w=800&q=80',
  UXDesign:        'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80',
  ProductDesign:   'https://images.unsplash.com/photo-1576153192621-7a3be10b356e?w=800&q=80',
  typography:        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
  logodesign:        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  design_critiques:  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80',
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Estimates read time from plain text (~200 wpm). */
function estimateReadTime(text: string): string {
  const words   = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

/**
 * Derives a deterministic avatar URL from a username using DiceBear initials.
 * Returns a consistent, visually distinct avatar for every Reddit author.
 */
function redditAvatar(username: string): string {
  return `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(username)}&backgroundColor=0f3460,1a1a2e,e94560&fontFamily=Arial`;
}

/** Extracts the best available image from a Reddit post's data object. */
function extractImage(post: RedditPostData, subreddit: string): string {
  // Prefer high-res preview image (Reddit API encodes & as &amp; in JSON)
  const preview = post.preview?.images?.[0]?.source?.url;
  if (preview) return preview.replace(/&amp;/g, '&');

  // Thumbnail is usable when it's a real URL (not a keyword like "self")
  const badThumbs = new Set(['self', 'default', 'nsfw', 'spoiler', 'image', '']);
  if (post.thumbnail && !badThumbs.has(post.thumbnail) && post.thumbnail.startsWith('http')) {
    return post.thumbnail;
  }

  return FALLBACK_IMAGES[subreddit] ?? FALLBACK_IMAGES['design'];
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface RedditPostData {
  id: string;
  title: string;
  selftext: string;
  author: string;
  score: number;
  permalink: string;
  thumbnail: string;
  link_flair_text: string | null;
  created_utc: number;
  stickied: boolean;
  is_self: boolean;
  preview?: {
    images: Array<{ source: { url: string } }>;
  };
}

// ─── Fetcher ─────────────────────────────────────────────────────────────────

/**
 * Fetches the top posts from a single subreddit (past week, up to 25 posts).
 * Silently returns [] on network error so one bad subreddit doesn't block others.
 */
async function fetchSubreddit(subreddit: string): Promise<RedditOpinion[]> {
  const url = `https://www.reddit.com/r/${subreddit}/top.json?t=week&limit=25`;

  let json: { data?: { children?: Array<{ data: RedditPostData }> } };
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'DesignPulse/1.0 (aggregator; contact hello@designpulse.app)',
      },
      // Cache 1 hour in Next.js fetch cache
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    json = await res.json();
  } catch {
    return [];
  }

  const children = json?.data?.children ?? [];

  return children
    .map((child): RedditOpinion | null => {
      const post = child.data;

      // Skip stickied mod posts and low-signal posts
      if (post.stickied || post.score < MIN_SCORE) return null;
      // Skip extremely short titles (mod announcements etc.)
      if (post.title.length < 20) return null;

      const selftext = post.selftext?.trim() ?? '';
      const excerpt  = selftext.length > 0
        ? selftext.slice(0, 220).replace(/\n+/g, ' ').trim() + (selftext.length > 220 ? '…' : '')
        : post.title;
      const snippet  = selftext.length > 0 ? selftext.slice(0, 700) : null;

      const tags: string[] = [`r/${subreddit}`];
      if (post.link_flair_text) tags.push(post.link_flair_text);

      return {
        title:          post.title,
        excerpt,
        snippet,
        imageUrl:       extractImage(post, subreddit),
        publishedAt:    new Date(post.created_utc * 1000),
        readTime:       estimateReadTime(selftext || post.title),
        tags,
        sourceUrl:      `https://www.reddit.com${post.permalink}`,
        sourcePlatform: 'reddit',
        subreddit,
        upvotes:        post.score,
        authorName:     post.author,
        authorRole:     `r/${subreddit}`,
        authorHandle:   post.author,
        authorAvatar:   redditAvatar(post.author),
        authorBio:      null,
        featured:       false,
      };
    })
    .filter((p): p is RedditOpinion => p !== null);
}

/**
 * Fetches top posts from all configured design subreddits in parallel.
 * Results are sorted by upvotes descending.
 */
export async function fetchRedditOpinions(): Promise<RedditOpinion[]> {
  const results = await Promise.allSettled(SUBREDDITS.map(fetchSubreddit));
  const posts   = results.flatMap((r) => (r.status === 'fulfilled' ? r.value : []));
  return posts.sort((a, b) => b.upvotes - a.upvotes);
}
