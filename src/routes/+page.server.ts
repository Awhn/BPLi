import type { PageServerLoad } from './$types';
import { getHomeFeed } from '$lib/server/services/recommendationService';
import { getPopularLoanBooks } from '$lib/server/services/data4libraryService';

export const load: PageServerLoad = async () => {
	const sections = getHomeFeed();

	// rec-5 is backed by 정보나루 인기 대출 데이터 when an authKey is configured
	const popularSection = sections.find((s) => s.section.id === 'rec-5');
	if (popularSection) {
		popularSection.books = await getPopularLoanBooks(20);
	}

	return { sections };
};
