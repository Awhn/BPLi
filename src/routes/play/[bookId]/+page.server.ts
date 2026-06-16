import type { PageServerLoad, Actions } from './$types';
import { error, fail } from '@sveltejs/kit';
import { getPlayerView, updateProgress } from '$lib/server/services/playerService';
import { setReadingStatus, getReadingStatus } from '$lib/server/services/bookService';
import { createComment } from '$lib/server/services/quoteService';
import type { ReadingStatusValue } from '$lib/types';

const validStatuses: ReadingStatusValue[] = ['want_to_read', 'reading', 'finished', 'paused'];

export const load: PageServerLoad = async ({ params, locals }) => {
	const view = getPlayerView(locals.userId, params.bookId);
	if (!view) error(404, '책을 찾을 수 없어요');
	return view;
};

export const actions: Actions = {
	// Drag the scrubber — moves the reading head and re-anchors new comments
	progress: async ({ request, params, locals }) => {
		const form = await request.formData();
		const page = Number(form.get('page'));
		if (!Number.isFinite(page) || page < 0) return fail(400, { error: '잘못된 페이지예요.' });
		updateProgress(locals.userId, params.bookId, Math.floor(page));
		return { progressSaved: true };
	},

	status: async ({ request, params, locals }) => {
		const form = await request.formData();
		const status = String(form.get('status')) as ReadingStatusValue;
		if (!validStatuses.includes(status)) return fail(400, { error: '잘못된 상태예요.' });
		setReadingStatus(locals.userId, params.bookId, status);
		return { statusSaved: true };
	},

	// New opinion → pinned to the reader's current page (CLAUDE.md §9.5)
	comment: async ({ request, params, locals }) => {
		const form = await request.formData();
		const body = String(form.get('body') ?? '').trim();
		if (!body) return fail(400, { commentError: '의견을 입력해주세요.' });

		const current = getReadingStatus(locals.userId, params.bookId)?.currentPage;
		createComment(locals.userId, {
			bookId: params.bookId,
			body,
			pageNumber: current && current > 0 ? current : undefined,
			visibility: 'public'
		});
		return { commentSaved: true };
	}
};
