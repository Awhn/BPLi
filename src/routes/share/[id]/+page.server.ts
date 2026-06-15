import type { PageServerLoad, Actions } from './$types';
import { error } from '@sveltejs/kit';
import { getQuote, markQuoteShared } from '$lib/server/services/quoteService';
import { getBook } from '$lib/server/services/bookService';
import * as quoteRepo from '$lib/server/repositories/quoteRepository';

export const load: PageServerLoad = async ({ params }) => {
	const quote = getQuote(params.id);
	if (!quote) error(404, '구절을 찾을 수 없어요');

	const comments = quoteRepo.findCommentsByQuoteId(quote.id);
	return {
		quote,
		book: getBook(quote.bookId) ?? null,
		comment: comments[0]?.body ?? null
	};
};

export const actions: Actions = {
	shared: async ({ params, locals }) => {
		markQuoteShared(locals.userId, params.id);
		return { success: true };
	}
};
