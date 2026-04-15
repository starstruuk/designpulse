/**
 * lib/scrapers/events.ts
 *
 * Scrapes design events from public web pages using cheerio.
 * Two extraction strategies, tried in order per page:
 *   1. JSON-LD  — <script type="application/ld+json"> with @type Event/EventSeries
 *                 Used by Eventbrite, Smashing Conf, AIGA, Awwwards, WordPress Events Calendar, etc.
 *   2. __NEXT_DATA__ — Next.js SSR payload embedded in <script id="__NEXT_DATA__">
 *
 * No API keys. No paid services. Just fetch + cheerio.
 *
 * Default pages scraped (all public, no auth):
 *   Eventbrite online design search pages
 *   Smashing Conference
 *   Awwwards Conference
 *
 * Add your own pages via .env.local:
 *   EVENT_SCRAPE_URLS=https://example.com/events,https://other.com/conference
 *   APIFY_DEBUG=true   ← logs raw extracted objects to help debug field names
 */

import * as cheerio from 'cheerio';
import { EventType, EventStatus } from '../../generated/prisma';

export interface ScrapedEvent {
  externalId:            string;
  title:                 string;
  description:           string;
  type:                  EventType;
  status:                EventStatus;
  date:                  string;
  time:                  string;
  duration:              string;
  image?:                string;
  isFree:                boolean;
  price?:                string;
  attendees:             number;
  maxAttendees?:         number;
  tags:                  string[];
  url:                   string;
  hostName:              string;
  hostRole:              string;
  hostAvatar?:           string;
  registrationDeadline?: string; // YYYY-MM-DD, from offers.validThrough
}

/* ─── Defaults ───────────────────────────────────────────────────────────── */

const DEFAULT_URLS = [
  // Eventbrite public search pages (server-rendered HTML + JSON-LD per event)
  'https://www.eventbrite.com/d/online/design/',
  'https://www.eventbrite.com/d/online/ux-design/',
  'https://www.eventbrite.com/d/online/product-design/',
  // Design conference sites with JSON-LD structured data
  'https://smashingconf.com/',
  'https://www.awwwards.com/conferences/',
];

/* ─── Helpers ────────────────────────────────────────────────────────────── */

const DEBUG = process.env.APIFY_DEBUG === 'true';

function inferEventType(title: string, desc: string): EventType {
  const t = `${title} ${desc}`.toLowerCase();
  if (t.includes('hackathon'))                                              return EventType.HACKATHON;
  if (t.includes('award') || t.includes('ceremony'))                       return EventType.AWARD;
  if (t.includes('workshop') || t.includes('masterclass'))                 return EventType.WORKSHOP;
  if (t.includes('meetup') || t.includes('meet-up') || t.includes('networking'))
                                                                            return EventType.MEETUP;
  if (t.includes('conference') || t.includes('summit'))                    return EventType.CONFERENCE;
  return EventType.WEBINAR;
}

function inferStatus(dateIso: string): EventStatus {
  return new Date(dateIso) < new Date() ? EventStatus.ARCHIVED : EventStatus.UPCOMING;
}

function toDateStr(raw: string | undefined | null): string | null {
  if (!raw) return null;
  const d = new Date(raw);
  return isNaN(d.getTime()) ? null : d.toISOString().split('T')[0];
}

function formatTime(iso: string | undefined): string {
  if (!iso) return '12:00 PM EST';
  try {
    return new Date(iso).toLocaleTimeString('en-US', {
      hour: 'numeric', minute: '2-digit', timeZoneName: 'short',
      timeZone: 'America/New_York',
    });
  } catch { return '12:00 PM EST'; }
}

function formatDuration(start: string, end: string): string {
  const hours = Math.round((new Date(end).getTime() - new Date(start).getTime()) / 3_600_000);
  if (hours >= 48) return `${Math.round(hours / 24)} days`;
  if (hours >= 24) return '1 day';
  if (hours === 1) return '1 hour';
  if (hours === 0) return '< 1 hour';
  return `${hours} hours`;
}

function stripHtml(s: string): string {
  return s.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

/** Fetch a page's HTML, returning null on network/HTTP errors. */
async function fetchHtml(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent':      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
                           '(KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control':   'no-cache',
      },
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) {
      console.warn(`  ⚠ HTTP ${res.status} — ${url}`);
      return null;
    }
    return await res.text();
  } catch (err) {
    console.warn(`  ⚠ Fetch failed — ${url}:`, (err as Error).message);
    return null;
  }
}

/* ─── Strategy 1: JSON-LD extraction ────────────────────────────────────── */

/**
 * Schema.org Event format used by Eventbrite, WordPress Events Calendar,
 * Smashing Conf, Awwwards, AIGA, and most SEO-conscious event sites.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractJsonLdEvents(html: string): any[] {
  const $ = cheerio.load(html);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const events: any[] = [];

  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const json = JSON.parse($(el).html() ?? '');
      // Handle single object or array
      const items: unknown[] = Array.isArray(json) ? json : [json];
      for (const item of items) {
        if (typeof item !== 'object' || item === null) continue;
        const obj = item as Record<string, unknown>;
        // Accept Event, BusinessEvent, EducationEvent, etc.
        const type = String(obj['@type'] ?? '');
        if (type.toLowerCase().includes('event')) {
          events.push(obj);
        }
        // ItemList containing Events
        if (type === 'ItemList') {
          const elements = (obj['itemListElement'] as unknown[]) ?? [];
          for (const el2 of elements) {
            const inner = (el2 as Record<string, unknown>)?.item ?? el2;
            if (typeof inner === 'object' && inner !== null) {
              const t = String((inner as Record<string, unknown>)['@type'] ?? '');
              if (t.toLowerCase().includes('event')) events.push(inner);
            }
          }
        }
      }
    } catch { /* malformed JSON-LD — skip */ }
  });

  return events;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapJsonLdEvent(e: any, sourceUrl: string, index: number): ScrapedEvent | null {
  const title    = e.name ?? e.headline;
  const startRaw = e.startDate;
  // URL: use @id, url, or the source page itself
  const url      = e.url ?? e['@id'] ?? e.sameAs ?? sourceUrl;

  if (!title || !startRaw) return null;

  const dateStr = toDateStr(startRaw);
  if (!dateStr) return null;

  const desc      = stripHtml(e.description ?? '').slice(0, 600);
  const endRaw    = e.endDate;
  const org       = e.organizer ?? e.performer ?? e.author;
  const orgName   = typeof org === 'string' ? org : (org?.name ?? 'Unknown');
  const image     = typeof e.image === 'string'
    ? e.image : (e.image?.url ?? e.image?.contentUrl);

  // Pricing: check offers array or object
  const offers    = Array.isArray(e.offers) ? e.offers : (e.offers ? [e.offers] : []);
  const isFree    = e.isAccessibleForFree ??
    offers.some((o: Record<string, unknown>) =>
      String(o.price) === '0' || String(o.price).toLowerCase() === 'free',
    ) ?? true;
  const priceObj    = offers[0];
  const rawPrice    = priceObj?.price;
  const validPrice  = rawPrice != null && String(rawPrice) !== '' && String(rawPrice) !== 'null' && String(rawPrice) !== '0';
  const price       = !isFree && validPrice
    ? `${priceObj.priceCurrency ?? '$'}${rawPrice}`
    : undefined;

  // Registration deadline: validThrough or availabilityEnds on any offer
  const deadlineRaw = priceObj?.validThrough ?? priceObj?.availabilityEnds
    ?? offers.find((o: Record<string, unknown>) => o.validThrough)?.validThrough;
  const registrationDeadline = toDateStr(deadlineRaw as string | undefined) ?? undefined;

  const location  = e.location;
  const isOnline  = typeof location === 'object'
    ? String(location?.['@type'] ?? '').includes('Virtual') ||
      String(location?.url ?? '').includes('zoom') ||
      String(location?.url ?? '').includes('meet')
    : false;

  // Build a stable externalId from the URL slug
  const urlSlug = String(url).split('/').filter(Boolean).pop()?.slice(0, 40) ?? String(index);
  const domain  = new URL(sourceUrl).hostname.replace('www.', '').split('.')[0];

  return {
    externalId:           `jsonld:${domain}:${urlSlug}`,
    title:                String(title).trim(),
    description:          desc || 'No description available.',
    type:                 inferEventType(String(title), desc),
    status:               inferStatus(dateStr),
    date:                 dateStr,
    time:                 formatTime(startRaw),
    duration:             endRaw ? formatDuration(startRaw, endRaw) : '2 hours',
    image,
    isFree,
    price,
    attendees:            0,
    tags:                 ['design', domain, isOnline ? 'online' : 'in-person'].filter(Boolean),
    url:                  String(url),
    hostName:             String(orgName),
    hostRole:             'Event Organizer',
    registrationDeadline,
  };
}

/* ─── Strategy 2: __NEXT_DATA__ extraction ───────────────────────────────── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractNextDataEvents(html: string): any[] {
  const $ = cheerio.load(html);
  const raw = $('#__NEXT_DATA__').html();
  if (!raw) return [];

  try {
    const data = JSON.parse(raw);
    const pp   = data?.props?.pageProps ?? {};

    // Try common paths where event arrays live in Next.js apps
    const candidates: unknown =
      pp.serverPayload?.search_data?.events?.results ??
      pp.serverPayload?.events ??
      pp.events ??
      pp.data?.events ??
      pp.initialData?.events ??
      pp.initialData?.entries ??
      pp.entries ??
      pp.searchResults ??
      null;

    if (DEBUG) {
      if (candidates) {
        console.log(`  [DEBUG] __NEXT_DATA__ found array with ${(candidates as unknown[]).length} items`);
      } else {
        console.log(`  [DEBUG] __NEXT_DATA__ pageProps keys: ${Object.keys(pp).join(', ')}`);
      }
    }

    return Array.isArray(candidates) ? candidates : [];
  } catch { return []; }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapNextDataEvent(e: any, sourceUrl: string, index: number): ScrapedEvent | null {
  const title    = e.name?.text ?? e.name ?? e.title ?? e.eventName;
  const startRaw = e.start?.utc ?? e.start?.local ?? e.startDate ?? e.start_at ?? e.startAt ?? e.start;
  const endRaw   = e.end?.utc   ?? e.end?.local   ?? e.endDate   ?? e.end_at   ?? e.endAt   ?? e.end;
  const url      = e.url ?? e.eventUrl ?? e.canonical_url ?? sourceUrl;
  const id       = e.id ?? e.api_id ?? String(index);

  if (!title || !startRaw) return null;

  const dateStr = toDateStr(startRaw);
  if (!dateStr) return null;

  const desc    = stripHtml(e.description?.text ?? e.description ?? e.summary ?? '').slice(0, 600);
  const isFree  = e.is_free ?? e.isFree ?? false;
  const org     = e.organizer ?? e.hosts?.[0] ?? e.user;
  const domain  = new URL(sourceUrl).hostname.replace('www.', '').split('.')[0];

  return {
    externalId:  `nextdata:${domain}:${id}`,
    title:       String(title).trim(),
    description: desc || 'No description available.',
    type:        inferEventType(String(title), desc),
    status:      inferStatus(dateStr),
    date:        dateStr,
    time:        formatTime(startRaw),
    duration:    endRaw ? formatDuration(startRaw, endRaw) : '2 hours',
    image:       e.logo?.url ?? e.cover_url ?? e.coverUrl ?? e.image,
    isFree,
    price:       !isFree
      ? (e.ticket_availability?.minimum_ticket_price?.display ?? e.price ?? undefined)
      : undefined,
    attendees:   e.guest_count ?? e.guestCount ?? 0,
    tags:        ['design', domain],
    url:         String(url),
    hostName:    (typeof org === 'string' ? org : org?.name) ?? 'Unknown',
    hostRole:    'Event Organizer',
    hostAvatar:  org?.logo?.url ?? org?.avatar_url,
  };
}

/* ─── Per-page scraper ───────────────────────────────────────────────────── */

async function scrapePage(url: string): Promise<ScrapedEvent[]> {
  const html = await fetchHtml(url);
  if (!html) return [];

  const results: ScrapedEvent[] = [];

  // Strategy 1: JSON-LD
  const ldEvents = extractJsonLdEvents(html);
  if (DEBUG && ldEvents.length > 0) {
    console.log(`  [DEBUG] JSON-LD — ${ldEvents.length} Event objects at ${url}`);
    console.log(JSON.stringify(ldEvents[0], null, 2).slice(0, 1000));
  }
  ldEvents.forEach((e, i) => {
    const mapped = mapJsonLdEvent(e, url, i);
    if (mapped) results.push(mapped);
  });

  // Strategy 2: __NEXT_DATA__ (only if JSON-LD found nothing)
  if (results.length === 0) {
    const ndEvents = extractNextDataEvents(html);
    ndEvents.forEach((e, i) => {
      const mapped = mapNextDataEvent(e, url, i);
      if (mapped) results.push(mapped);
    });
    if (DEBUG && ndEvents.length > 0) {
      console.log(`  [DEBUG] __NEXT_DATA__ — ${ndEvents.length} items at ${url}`);
    }
  }

  if (DEBUG && results.length === 0) {
    console.log(`  [DEBUG] No events found at ${url} — page may be client-side rendered`);
  }

  return results;
}

/* ─── Main export ────────────────────────────────────────────────────────── */

export async function scrapeAllEvents(): Promise<ScrapedEvent[]> {
  const extraUrls = process.env.EVENT_SCRAPE_URLS
    ?.split(',').map((u) => u.trim()).filter(Boolean) ?? [];

  const urls = [...DEFAULT_URLS, ...extraUrls];
  console.log(`  Scraping ${urls.length} pages…`);

  const settled = await Promise.allSettled(urls.map(scrapePage));

  const seen    = new Set<string>();
  const all: ScrapedEvent[] = [];

  settled.forEach((result, i) => {
    if (result.status === 'rejected') {
      console.warn(`  ⚠ ${urls[i]} failed:`, result.reason);
      return;
    }
    for (const ev of result.value) {
      if (seen.has(ev.externalId)) continue;
      seen.add(ev.externalId);
      all.push(ev);
    }
  });

  console.log(`  Total scraped: ${all.length} events across ${urls.length} pages`);
  return all;
}