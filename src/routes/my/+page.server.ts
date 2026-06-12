import type { PageServerLoad } from './$types';
import { getLibrary } from '$lib/server/services/bookService';
import { getQuotesForUser } from '$lib/server/services/quoteService';
import { findEventsByUserId } from '$lib/server/services/eventService';

export const load: PageServerLoad = async ({ locals }) => {
	const library = getLibrary(locals.userId);
	return {
		stats: {
			finished: library.filter((e) => e.status.status === 'finished').length,
			reading: library.filter((e) => e.status.status === 'reading').length,
			quotes: getQuotesForUser(locals.userId).length,
			events: findEventsByUserId(locals.userId).length
		}
	};
};
