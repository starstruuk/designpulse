import Parser from 'rss-parser';

// Shape returned by the RSS parser before DB persistence
export interface ParsedArticle {
  title: string;
  excerpt: string;
  content: string | null;
  imageUrl: string | null;
  articleUrl: string;
  sourceName: string;
  publishedAt: Date;
}

interface RSSSource {
  name: string;
  url: string;
}

const SOURCES: RSSSource[] = [
  { name: "Nielsen Norman Group", url: "https://www.nngroup.com/feed/rss/" },
  { name: "Smashing Magazine",    url: "https://www.smashingmagazine.com/feed/" },
  { name: "UX Design CC",         url: "https://uxdesign.cc/feed" },
  { name: "Figma Blog",           url: "https://www.figma.com/blog/feed/atom.xml" },
  { name: "A List Apart",         url: "https://alistapart.com/main/feed" },
  { name: "Codrops",              url: "https://tympanus.net/codrops/feed/" },
  { name: "Prototypr",            url: "https://prototypr.io/feed.xml" },
  { name: "UX Planet",            url: "https://uxplanet.org/feed" },
  // UX Bootcamp removed — feed returns invalid XML (@-character parse error)
];

interface Enclosure {
  url: string;
}

interface MediaContent {
  $: { url: string };
}

interface RSSItem {
  guid?: string;
  title?: string;
  contentSnippet?: string;
  link?: string;
  pubDate?: Date | string;
  isoDate?: string;
  content?: string; // Add the 'content' property to the interface
  enclosure?: Enclosure;
  'media:content'?: MediaContent;
}

export async function fetchAndParseFeeds(perSourceLimit = 40): Promise<ParsedArticle[]> {
  const parser = new Parser();

  const fetchPromises = SOURCES.map(source => parser.parseURL(source.url)
    .then((feed: any) => feed.items.slice(0, perSourceLimit).map((item: RSSItem) => ({
      id: item.guid || item.link || crypto.randomUUID(),
      title: item.title || "",
      excerpt: item.contentSnippet ? item.contentSnippet.replace(/<[^>]+>/g, '') : "",
      content: item.content || null,
      imageUrl: extractImageUrl(item),
      articleUrl: item.link || "",
      sourceName: source.name,
      sourceFavicon: null,
      publishedAt: new Date(item.pubDate || item.isoDate || Date.now()),
      disciplines: [],
      summary: null,
      qualityScore: null,
      createdAt: new Date()
    })))
    .catch(error => {
      console.error(`Failed to fetch feed from ${source.name}:`, error);
      return [];
    })
  );

  const results = await Promise.allSettled(fetchPromises);

  const articles: ParsedArticle[] = results.flatMap(result =>
    result.status === 'fulfilled' ? result.value : []
  );

  return articles.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
}

function extractImageUrl(item: RSSItem): string | null {
  if (item.enclosure && item.enclosure.url) {
    return item.enclosure.url;
  } else if (item['media:content'] && item['media:content'].$.url) {
    return item['media:content'].$.url;
  } else if (item.content) {
    const imgMatch = item.content.match(/<img[^>]+src="([^">]+)/);
    return imgMatch ? imgMatch[1] : null;
  }
  return null;
}