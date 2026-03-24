import { createBrowserClient } from '@supabase/ssr';

// Browser-safe client that uses public keys.  These values are injected via
// Next.js environment variables and will be replaced at build time.
export const browserClient = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);