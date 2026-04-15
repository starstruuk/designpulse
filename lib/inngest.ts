import { Inngest } from 'inngest';

/**
 * Shared Inngest client.
 * Import this wherever you need to send events or define functions.
 */
export const inngest = new Inngest({ id: 'designpulse' });
