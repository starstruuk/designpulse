// types/index.ts

export type Discipline = 'product' | 'ai' | 'graphic' | 'visual' | 'motion' | 'interaction' | 'ux' | 'ui';

// Export the Pricing enum
export enum Pricing {
  FREE = 'free',
  FREEMIUM = 'freemium',
  PAID = 'paid',
}

// Define and export the ResourceFilters interface
export interface ResourceFilters {
  category: string | null;
  pricing: Pricing | null;
  search: string | null;
  page: number;
  limit: number;
}

// Article as returned by the Prisma API (includes source and disciplines relations)
export interface Article {
  id: string;
  title: string;
  url: string;
  excerpt: string | null;
  content: string | null;
  imageUrl: string | null;
  publishedAt: Date | string | null;
  source: { id: string; name: string; url: string | null } | null;
  disciplines: { discipline: { id: string; name: string; slug: string } }[];
}

export interface Resource {
  id: string;
  name: string;
  description?: string; // Optional field
  logoUrl?: string; // Optional field
  url: string;
  category: { color: string, name: string }; // Updated to include color and name
  pricing: Pricing;
  disciplines: Discipline[];
  featured: boolean;
  createdAt: Date;
  logoColor: string; // Added logoColor
  logoLetter: string; // Added logoLetter
}

/** An aggregated opinion post from the DB (Reddit, Substack, Medium, or manual). */
export interface Opinion {
  id:             string;
  title:          string;
  excerpt:        string;
  snippet:        string | null;
  imageUrl:       string | null;
  publishedAt:    string | Date;
  readTime:       string | null;
  tags:           string[];
  featured:       boolean;
  sourceUrl:      string;
  sourcePlatform: string;
  subreddit:      string | null;
  upvotes:        number | null;
  authorName:     string;
  authorRole:     string | null;
  authorAvatar:   string | null;
  authorBio:      string | null;
  authorHandle:   string | null;
  createdAt:      string | Date;
  updatedAt:      string | Date;
}

export interface ArticleFilters {
  disciplines?: Discipline[]; // Optional field
  search?: string; // Optional field
  page?: number; // Optional field
  limit?: number; // Optional field
}

// New Event interface
export interface Event {
  id: string;
  title: string;
  description: string;
  type: string;
  status: 'LIVE' | 'UPCOMING' | 'ARCHIVED';
  date: string;
  time: string;
  duration: string;
  image?: string; // Optional field
  isFree: boolean;
  price?: string;
  attendees: number;
  maxAttendees?: number;
  tags: string[];
  url?: string;
  hostName: string;
  hostRole: string;
  hostAvatar?: string;
  registrationDeadline?: string;
  registrationClosed?: boolean; // computed by API
  createdAt: Date;
}