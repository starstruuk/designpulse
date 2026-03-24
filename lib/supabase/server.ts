import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// The server client needs to be instantiated inside a request context so it
// can read the user's cookies for session sync.  We export an async helper
// so callers can `await` it in server components (the `cookies` helper is
// async in Next.js).  Ultimately the Supabase helper expects the cookies
// object rather than the accessor function, so we invoke it here.
export async function getServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE!,
    { cookies: cookieStore }
  );
}