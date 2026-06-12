import type { PageServerLoad } from './$types';
import { getLibrary } from '$lib/server/services/bookService';

export const load: PageServerLoad = async ({ locals }) => {
	return { entries: getLibrary(locals.userId) };
};
