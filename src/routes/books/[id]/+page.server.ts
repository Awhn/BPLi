import type { PageServerLoad, Actions } from './$types';
import { error, fail } from '@sveltejs/kit';
import {
	getBook,
	getChapters,
	getReadingStatus,
	setReadingStatus
} from '$lib/server/services/bookService';
import {
	getQuotesForBook,
	getCommentsForBook,
	createComment
} from '$lib/server/services/quoteService';
import {
	getReaderRecommendations,
	getBookKeywords
} from '$lib/server/services/data4libraryService';
import { findLibrariesWithBook } from '$lib/server/services/bookSearch';
import type { ReadingStatusValue } from '$lib/types';

const validStatuses: ReadingStatusValue[] = ['want_to_read', 'reading', 'finished', 'paused'];

export const load: PageServerLoad = async ({ params, locals }) => {
	const book = getBook(params.id);
	if (!book) error(404, '책을 찾을 수 없어요');

	const [recommendations, keywords, libraries] = await Promise.all([
		getReaderRecommendations(book.isbn ?? ''),
		getBookKeywords(book.isbn ?? ''),
		book.isbn ? findLibrariesWithBook(book.isbn) : Promise.resolve([])
	]);

	return {
		book,
		chapters: getChapters(book.id),
		quotes: getQuotesForBook(book.id, locals.userId),
		comments: getCommentsForBook(book.id),
		readingStatus: getReadingStatus(locals.userId, book.id)?.status ?? null,
		recommendations,
		keywords,
		libraryCount: libraries.length
	};
};

export const actions: Actions = {
	status: async ({ request, params, locals }) => {
		const form = await request.formData();
		const status = String(form.get('status')) as ReadingStatusValue;
		if (!validStatuses.includes(status)) {
			return fail(400, { error: '잘못된 상태예요.' });
		}
		setReadingStatus(locals.userId, params.id, status);
		return { success: true };
	},
	comment: async ({ request, params, locals }) => {
		const form = await request.formData();
		const body = String(form.get('body') ?? '').trim();
		if (!body) return fail(400, { commentError: '코멘트 내용을 입력해주세요.' });

		const pageRaw = String(form.get('pageNumber') ?? '').trim();
		const pageNumber = pageRaw ? Number(pageRaw) : undefined;

		createComment(locals.userId, {
			bookId: params.id,
			body,
			pageNumber: Number.isFinite(pageNumber) ? pageNumber : undefined
		});
		return { commentSuccess: true };
	}
};
