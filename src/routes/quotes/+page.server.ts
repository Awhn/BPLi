import type { PageServerLoad } from './$types';
import { getQuotesForUser } from '$lib/server/services/quoteService';

export const load: PageServerLoad = async ({ locals }) => {
	return { quotes: getQuotesForUser(locals.userId) };
};
