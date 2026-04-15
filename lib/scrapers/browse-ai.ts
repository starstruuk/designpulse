/**
 * lib/scrapers/browse-ai.ts
 *
 * Fetches captured event rows from Browse AI robots and maps them to ScrapedEvent.
 *
 * Setup (one-time):
 *   1. Sign up at browse.ai (free tier: 50 rows/month)
 *   2. Create a robot for each site — record yourself browsing the events list
 *      (Luma community page, Eventbrite search results, Meetup group, etc.)
 *   3. Run the robot — Browse AI captures a table of event rows
 *   4. Copy your API key from browse.ai/account and each robot's ID from its URL
 *   5. Add to .env.local:
 *        BROWSE_AI_API_KEY=your_key_here
 *        BROWSE_AI_ROBOT_IDS=robotId1,robotId2,robotId3
 *
 * Field name mapping:
 *   Browse AI captures whatever column names you defined when recording.
 *   This scraper tries many common variants per field so your column names
 *   don't have to match exactly (e.g. "Event Title", "title", "Name" all work).
 *   Set APIFY_DEBUG=true to log the raw first row from each robot so you can
 *   verify the mapping is picking up the right fields.
 *
 * Required .env.local:
 *   BROWSE_AI_API_KEY     — from browse.ai/account
 *   BROWSE_AI_ROBOT_IDS   — comma-separated robot IDs (from each robot's URL)
 *
 * Optional:
 *   APIFY_DEBUG=true      — logs first raw row per robot for field inspection
 */

import { EventType, EventStatus } from '../../generated/prisma';
import type { ScrapedEvent }      from './events';

const BROWSE_AI_BASE = 'https://api.browse.ai/v2';
const DEBUG          = process.env.APIFY_DEBUG === 'true';

/* ─── Browse AI API types ────────────────────────────────────────────────── */

interface BrowseAITask {
  id:            string;
  status:        string;
  finishedAt?:   number;
  capturedLists?: Record<string, Record<string, string>[]>;
}

interface BrowseAITasksResponse {
  statusCode: number;
  robotTasks: {
    items: BrowseAITask[];
  };
}

/* ─── Helpers ────────────────────────────────────────────────────────────── */

/**
 * Reads a field from a Browse AI row, trying multiple case/word variants.
 * Returns the first non-empty match, or undefined.
 */
function pick(row: Record<string, string>, ...keys: string[]): string | undefined {
  const rowLower = Object.fromEntries(
    Object.entries(row).map(([k, v]) => [k.toLowerCase().replace(/[\s_-]+/g, ''), v]),
  );
  for (const key of keys) {
    const val = rowLower[key.toLowerCase().replace(/[\s_-]+/g, '')];
    if (val && val.trim() && val.trim().toLowerCase() !== 'n/a' && val.trim() !== '-') {
      return val.trim();
    }
  }
  return undefined;
}

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

function inferStatus(dateStr: string): EventStatus {
  return new Date(dateStr) < new Date() ? EventStatus.ARCHIVED : EventStatus.UPCOMING;
}

function toDateStr(raw: string | undefined): string | null {
  if (!raw) return null;
  // Handle "April 15, 2026", "2026-04-15", "04/15/2026", ISO strings, etc.
  const d = new Date(raw);
  return isNaN(d.getTime()) ? null : d.toISOString().split('T')[0];
}

function formatTime(raw: string | undefined): string {
  if (!raw) return '12:00 PM EST';
  // Already formatted like "2:00 PM EST" — return as-is
  if (/[aApP][mM]/.test(raw)) return raw.trim();
  // ISO string
  try {
    return new Date(raw).toLocaleTimeString('en-US', {
      hour: 'numeric', minute: '2-digit', timeZoneName: 'short',
      timeZone: 'America/New_York',
    });
  } catch { return '12:00 PM EST'; }
}

/* ─── Row → ScrapedEvent mapper ──────────────────────────────────────────── */

/**
 * Maps a single Browse AI captured row to a ScrapedEvent.
 * Tries many field name variants so the mapping works regardless of
 * what column names you used when recording the robot.
 */
function mapRow(
  row:     Record<string, string>,
  robotId: string,
  index:   number,
): ScrapedEvent | null {
  // Title
  const title = pick(row,
    'title', 'event title', 'event name', 'name', 'eventname', 'eventtitle',
    'event', 'heading', 'subject',
  );
  if (!title) return null;

  // Date
  const dateRaw = pick(row,
    'date', 'event date', 'start date', 'startdate', 'eventdate',
    'start', 'when', 'datetime', 'startdatetime',
  );
  const dateStr = toDateStr(dateRaw);
  if (!dateStr) return null;

  // URL — required
  const url = pick(row,
    'url', 'link', 'event url', 'eventurl', 'event link', 'eventlink',
    'page url', 'pageurl', 'href',
  );
  if (!url) return null;

  // Other fields
  const desc     = pick(row, 'description', 'desc', 'summary', 'about', 'details', 'body') ?? '';
  const timeRaw  = pick(row, 'time', 'start time', 'starttime', 'event time');
  const image    = pick(row, 'image', 'image url', 'imageurl', 'cover', 'photo', 'thumbnail', 'img');
  const host     = pick(row, 'host', 'organizer', 'organiser', 'hosted by', 'presented by', 'speaker', 'author');
  const priceRaw = pick(row, 'price', 'cost', 'ticket price', 'ticketprice', 'fee', 'admission');
  const isFreeRaw= pick(row, 'is free', 'isfree', 'free', 'pricing', 'ticket type');
  const attendRaw= pick(row, 'attendees', 'going', 'rsvp', 'guests', 'capacity', 'registered');
  const typeRaw  = pick(row, 'type', 'event type', 'eventtype', 'category', 'format');

  const isFree = priceRaw
    ? /free|£0|\$0|€0|0\.00/i.test(priceRaw)
    : /yes|true|free/i.test(isFreeRaw ?? 'yes');

  // Infer event type from captured "type" field or title/desc fallback
  let eventType = inferEventType(title, desc);
  if (typeRaw) {
    const t = typeRaw.toLowerCase();
    if (t.includes('conference'))  eventType = EventType.CONFERENCE;
    else if (t.includes('workshop'))  eventType = EventType.WORKSHOP;
    else if (t.includes('webinar'))   eventType = EventType.WEBINAR;
    else if (t.includes('meetup'))    eventType = EventType.MEETUP;
    else if (t.includes('hackathon')) eventType = EventType.HACKATHON;
    else if (t.includes('award'))     eventType = EventType.AWARD;
  }

  return {
    externalId:  `browseai:${robotId}:${index}`,
    title:       title.trim(),
    description: desc.trim() || 'No description available.',
    type:        eventType,
    status:      inferStatus(dateStr),
    date:        dateStr,
    time:        formatTime(timeRaw),
    duration:    '2 hours',
    image,
    isFree,
    price:       !isFree && priceRaw ? priceRaw : undefined,
    attendees:   attendRaw ? parseInt(attendRaw.replace(/\D/g, ''), 10) || 0 : 0,
    tags:        ['design', 'browse-ai'],
    url,
    hostName:    host ?? 'Unknown',
    hostRole:    'Event Organizer',
  };
}

/* ─── Main fetcher ───────────────────────────────────────────────────────── */

/**
 * Fetches the latest successful task from each configured Browse AI robot
 * and maps all captured rows to ScrapedEvents.
 */
export async function scrapeBrowseAIEvents(): Promise<ScrapedEvent[]> {
  const apiKey   = process.env.BROWSE_AI_API_KEY;
  const robotIds = process.env.BROWSE_AI_ROBOT_IDS
    ?.split(',').map((s) => s.trim()).filter(Boolean) ?? [];

  if (!apiKey) {
    console.log('  Browse AI: skipped — BROWSE_AI_API_KEY not set');
    return [];
  }
  if (robotIds.length === 0) {
    console.log('  Browse AI: skipped — BROWSE_AI_ROBOT_IDS not set');
    return [];
  }

  const results: ScrapedEvent[] = [];

  await Promise.allSettled(
    robotIds.map(async (robotId) => {
      try {
        const res = await fetch(
          `${BROWSE_AI_BASE}/robots/${robotId}/tasks?page=1`,
          { headers: { Authorization: `Bearer ${apiKey}` } },
        );

        if (!res.ok) {
          console.warn(`  ⚠ Browse AI robot ${robotId} — HTTP ${res.status}`);
          return;
        }

        const data = await res.json() as BrowseAITasksResponse;
        const tasks = data.robotTasks?.items ?? [];

        // Use the most recent successful task
        const task = tasks
          .filter((t) => t.status === 'successful')
          .sort((a, b) => (b.finishedAt ?? 0) - (a.finishedAt ?? 0))[0];

        if (!task) {
          console.warn(`  ⚠ Browse AI robot ${robotId} — no successful tasks found`);
          console.warn(`    Run the robot in the Browse AI dashboard first`);
          return;
        }

        const lists = task.capturedLists ?? {};
        const listNames = Object.keys(lists);

        if (listNames.length === 0) {
          console.warn(`  ⚠ Browse AI robot ${robotId} — task has no captured lists`);
          return;
        }

        // Use the first (and usually only) captured list
        const rows = lists[listNames[0]] ?? [];

        if (DEBUG && rows[0]) {
          console.log(`\n  [DEBUG] Browse AI robot ${robotId} — first raw row:`);
          console.log(JSON.stringify(rows[0], null, 2));
          console.log(`  Available columns: ${Object.keys(rows[0]).join(', ')}`);
        }

        let mapped = 0;
        rows.forEach((row, i) => {
          const event = mapRow(row, robotId, i);
          if (event) { results.push(event); mapped++; }
        });

        console.log(`  Browse AI robot ${robotId}: ${mapped}/${rows.length} rows mapped`);
      } catch (err) {
        console.warn(`  ⚠ Browse AI robot ${robotId} failed:`, err);
      }
    }),
  );

  return results;
}
