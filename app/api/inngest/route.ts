import { serve }           from 'inngest/next';
import { inngest }         from '@/lib/inngest';
import { refreshArticles, refreshEvents, refreshOpinions } from '@/inngest/functions';

/**
 * Inngest serve handler.
 * Registers all background functions and handles event delivery.
 * GET  — introspection (Inngest dashboard)
 * POST — function execution
 * PUT  — sync / registration
 */
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [refreshArticles, refreshEvents, refreshOpinions],
});
