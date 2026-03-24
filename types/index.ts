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

// Remove duplicate declarations
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  imageUrl?: string; // Optional field
  articleUrl: string;
  sourceName: string;
  sourceFavicon?: string; // Optional field
  publishedAt: Date;
  disciplines: Discipline[];
  summary: any; // This will depend on the format of the summary, could be a simple string or complex type like interface{}
  qualityScore: number;
  createdAt: Date;
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
  price?: number; // Optional field
  attendees: number;
  maxAttendees?: number; // Optional field
  tags: string[];
  url?: string;
  hostName: string;
  hostRole: string;
  hostAvatar?: string; // Optional field
  createdAt: Date;
}