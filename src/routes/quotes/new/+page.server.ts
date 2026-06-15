import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { getBook, getBooks, getChapters } from '$lib/server/services/bookService';
import { createQuote, createComment } from '$lib/server/services/quoteService';
import type { QuoteSourceType } from '$lib/types';

export const load: PageServerLoad = async ({ url }) => {
	const bookId = url.searchParams.get('bookId');
	const chapterId = url.searchParams.get('chapterId');
	const book = bookId ? getBook(bookId) : undefined;

	return {
		book: book ?? null,
		chapterId,
		chapters: book ? getChapters(book.id) : [],
		books: book ? [] : getBooks()
	};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await request.formData();
		const bookId = String(form.get('bookId') ?? '');
		const text = String(form.get('text') ?? '').trim();
		if (!bookId || !text) {
			return fail(400, { error: '책과 구절 내용을 입력해주세요.' });
		}

		const pageRaw = String(form.get('pageNumber') ?? '').trim();
		const pageNumber = pageRaw ? Number(pageRaw) : undefined;
		const chapterId = String(form.get('chapterId') ?? '') || undefined;
		const sourceType = (String(form.get('sourceType') ?? 'manual') || 'manual') as QuoteSourceType;

		const quote = createQuote(locals.userId, {
			bookId,
			chapterId,
			text,
			pageNumber: Number.isFinite(pageNumber) ? pageNumber : undefined,
			sourceType
		});

		const commentBody = String(form.get('comment') ?? '').trim();
		if (commentBody) {
			createComment(locals.userId, {
				bookId,
				chapterId,
				quoteId: quote.id,
				pageNumber: quote.pageNumber,
				body: commentBody
			});
		}

		redirect(303, `/share/${quote.id}`);
	}
};
