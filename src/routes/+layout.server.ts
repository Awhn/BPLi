import type { LayoutServerLoad } from './$types';
import { getNowPlaying } from '$lib/server/services/playerService';

export const load: LayoutServerLoad = async ({ locals }) => {
	const np = getNowPlaying(locals.userId);
	// Keep the payload tiny — the mini-player only needs these fields.
	return {
		nowPlaying: np
			? {
					bookId: np.book.id,
					title: np.book.title,
					author: np.book.author,
					coverImageUrl: np.book.coverImageUrl ?? null,
					currentPage: np.currentPage,
					totalPages: np.totalPages,
					progressRatio: np.progressRatio
				}
			: null
	};
};
