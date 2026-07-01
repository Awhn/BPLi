import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { markQuoteShared } from '$lib/server/services/quoteService';

// Dedicated analytics ping for a share action (quote_shared, §17). Kept separate
// from the page's form actions so the client can fire-and-forget it.
export const POST: RequestHandler = async ({ params, locals }) => {
	markQuoteShared(locals.userId, params.id);
	return json({ ok: true });
};
