import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import { getQuote } from '$lib/server/services/quoteService';
import { getBook } from '$lib/server/services/bookService';
import * as quoteRepo from '$lib/server/repositories/quoteRepository';
import { renderQuoteCardSvg, type CardRatio } from '$lib/server/image-renderer/quoteCard';

export const GET: RequestHandler = async ({ params, url }) => {
	const quote = getQuote(params.id);
	if (!quote) error(404, '구절을 찾을 수 없어요');

	const ratio: CardRatio = url.searchParams.get('ratio') === 'square' ? 'square' : 'story';
	const book = getBook(quote.bookId) ?? null;
	const comment = quoteRepo.findCommentsByQuoteId(quote.id)[0]?.body ?? null;

	return new Response(renderQuoteCardSvg(quote, book, comment, ratio), {
		headers: {
			'Content-Type': 'image/svg+xml; charset=utf-8',
			'Cache-Control': 'public, max-age=300'
		}
	});
};
