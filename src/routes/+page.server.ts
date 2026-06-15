import type { PageServerLoad } from './$types';
import { getHomeFeed } from '$lib/server/services/recommendationService';
import {
	getPopularLoanBooks,
	getHotTrendBooks
} from '$lib/server/services/data4libraryService';
import type { ResolvedSection } from '$lib/server/services/recommendationService';

export const load: PageServerLoad = async () => {
	const sections = getHomeFeed();

	const [popular, trending] = await Promise.all([getPopularLoanBooks(20), getHotTrendBooks()]);

	// rec-5 is backed by 정보나루 인기 대출 데이터 when an authKey is configured
	const popularSection = sections.find((s) => s.section.id === 'rec-5');
	if (popularSection) popularSection.books = popular;

	const trendSection: ResolvedSection = {
		section: {
			id: 'rec-trend',
			title: '지금 뜨는 책',
			subtitle: '실시간 급상승 (도서관 정보나루)',
			itemType: 'book',
			itemIds: []
		},
		books: trending,
		chapters: [],
		flows: [],
		quotes: []
	};

	return { sections: [...sections, trendSection] };
};
