import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getQuote } from '$lib/server/services/quoteService';
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

// quote_shared logging lives in ./shared/+server.ts (a dedicated JSON endpoint),
// decoupled from form-action semantics.
