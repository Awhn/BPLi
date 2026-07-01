import type { PageServerLoad, Actions } from './$types';
import { error } from '@sveltejs/kit';
import { getBook, getChapter, getChapters } from '$lib/server/services/bookService';
import { logEvent } from '$lib/server/services/eventService';

export const load: PageServerLoad = async ({ params, locals }) => {
	const book = getBook(params.id);
	const chapter = getChapter(params.chapterId);
	if (!book || !chapter || chapter.bookId !== book.id) error(404, '챕터를 찾을 수 없어요');

	logEvent(locals.userId, 'chapter_opened', { chapterId: chapter.id, bookId: book.id });

	const chapters = getChapters(book.id);
	const idx = chapters.findIndex((c) => c.id === chapter.id);

	return {
		book,
		chapter,
		prevChapter: idx > 0 ? chapters[idx - 1] : null,
		nextChapter: idx < chapters.length - 1 ? chapters[idx + 1] : null
	};
};

export const actions: Actions = {
	// Chapter First (§6.1): completion is a first-class signal for Wrapped (§10.3)
	// and recommendations (§11).
	complete: async ({ params, locals }) => {
		const chapter = getChapter(params.chapterId);
		if (!chapter || chapter.bookId !== params.id) return { completed: false };
		logEvent(locals.userId, 'chapter_completed', { chapterId: chapter.id, bookId: params.id });
		return { completed: true };
	}
};
