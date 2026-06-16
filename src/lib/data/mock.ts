import type { Book, Chapter, Flow, Quote, Comment, MockUser, RecommendationSection } from '$lib/types';

const now = new Date().toISOString();

// Other readers whose public comments appear on the now-playing timeline.
// 'demo-user' is the seeded "me" before a real cookie user takes over.
export const mockUsers: MockUser[] = [
	{ id: 'demo-user', nickname: '나' },
	{ id: 'user-jiwon', nickname: '지원' },
	{ id: 'user-haneul', nickname: '하늘' },
	{ id: 'user-minseo', nickname: '민서' },
	{ id: 'user-doyun', nickname: '도윤' }
];

export const mockBooks: Book[] = [
	{
		id: 'book-1',
		title: '아무튼, 산책',
		author: '김신회',
		publisher: '위고',
		coverImageUrl: '/images/covers/walk.svg',
		description: '걷다 보면 마음이 가라앉는다. 산책이라는 작고 확실한 행복에 대한 에세이.',
		categories: ['에세이'],
		isbn: '9791186602393',
		totalPages: 196,
		sourceType: 'curated',
		createdAt: now,
		updatedAt: now
	},
	{
		id: 'book-2',
		title: '달과 6펜스',
		author: '서머싯 몸',
		publisher: '민음사',
		coverImageUrl: '/images/covers/moon.svg',
		description: '안정된 삶을 버리고 그림에 모든 것을 건 한 남자의 이야기.',
		categories: ['고전', '소설'],
		isbn: '9788937460876',
		totalPages: 244,
		sourceType: 'public_api',
		createdAt: now,
		updatedAt: now
	},
	{
		id: 'book-3',
		title: '일의 기쁨과 슬픔',
		author: '장류진',
		publisher: '창비',
		coverImageUrl: '/images/covers/work.svg',
		description: '판교 테크노밸리에서 일하는 사람들의 웃기고 슬픈 단편들.',
		categories: ['소설', '단편'],
		isbn: '9788936434598',
		totalPages: 268,
		sourceType: 'curated',
		createdAt: now,
		updatedAt: now
	},
	{
		id: 'book-4',
		title: '시와 산책',
		author: '한정원',
		publisher: '시간의흐름',
		coverImageUrl: '/images/covers/poem.svg',
		description: '시를 읽듯 걷고, 걷듯이 시를 읽는 날들의 기록.',
		categories: ['에세이', '시'],
		isbn: '9791196111890',
		totalPages: 152,
		sourceType: 'curated',
		createdAt: now,
		updatedAt: now
	},
	{
		id: 'book-5',
		title: '버닝아웃: 번아웃의 모든 것',
		author: 'B PLi 에디토리얼',
		publisher: 'B PLi Originals',
		coverImageUrl: '/images/covers/burnout.svg',
		description: '번아웃에서 빠져나오는 짧은 글들. B PLi 오리지널 시리즈.',
		categories: ['오리지널', '심리'],
		totalPages: 88,
		sourceType: 'original',
		createdAt: now,
		updatedAt: now
	},
	{
		id: 'book-6',
		title: '밤의 도서관',
		author: '알베르토 망겔',
		publisher: '세종서적',
		coverImageUrl: '/images/covers/library.svg',
		description: '책과 도서관을 사랑하는 사람을 위한 지적 여행.',
		categories: ['인문'],
		isbn: '9788984074156',
		totalPages: 360,
		sourceType: 'public_api',
		createdAt: now,
		updatedAt: now
	}
];

export const mockChapters: Chapter[] = [
	// 아무튼, 산책
	{ id: 'ch-1-1', bookId: 'book-1', title: '걷기로 했다', order: 1, estimatedReadingMinutes: 8, summary: '산책을 시작하게 된 이유', contentAvailability: 'preview', isOriginal: false, isCurated: true, createdAt: now, updatedAt: now },
	{ id: 'ch-1-2', bookId: 'book-1', title: '혼자 걷는 시간', order: 2, estimatedReadingMinutes: 12, summary: '혼자만의 산책이 주는 것들', contentAvailability: 'preview', isOriginal: false, isCurated: true, createdAt: now, updatedAt: now },
	{ id: 'ch-1-3', bookId: 'book-1', title: '비 오는 날의 산책', order: 3, estimatedReadingMinutes: 10, contentAvailability: 'metadata_only', isOriginal: false, isCurated: false, createdAt: now, updatedAt: now },
	// 달과 6펜스
	{ id: 'ch-2-1', bookId: 'book-2', title: '1장', order: 1, estimatedReadingMinutes: 15, summary: '화자가 스트릭랜드를 처음 알게 되다', contentAvailability: 'preview', isOriginal: false, isCurated: true, createdAt: now, updatedAt: now },
	{ id: 'ch-2-2', bookId: 'book-2', title: '2장', order: 2, estimatedReadingMinutes: 14, contentAvailability: 'metadata_only', isOriginal: false, isCurated: false, createdAt: now, updatedAt: now },
	{ id: 'ch-2-3', bookId: 'book-2', title: '3장', order: 3, estimatedReadingMinutes: 18, contentAvailability: 'metadata_only', isOriginal: false, isCurated: false, createdAt: now, updatedAt: now },
	// 일의 기쁨과 슬픔
	{ id: 'ch-3-1', bookId: 'book-3', title: '잘 살겠습니다', order: 1, estimatedReadingMinutes: 22, summary: '결혼을 앞둔 회사 동료와 청첩장', contentAvailability: 'preview', isOriginal: false, isCurated: true, createdAt: now, updatedAt: now },
	{ id: 'ch-3-2', bookId: 'book-3', title: '일의 기쁨과 슬픔', order: 2, estimatedReadingMinutes: 25, summary: '표제작. 판교의 어느 개발자 이야기', contentAvailability: 'preview', isOriginal: false, isCurated: true, createdAt: now, updatedAt: now },
	{ id: 'ch-3-3', bookId: 'book-3', title: '나의 후쿠오카 가이드', order: 3, estimatedReadingMinutes: 20, contentAvailability: 'metadata_only', isOriginal: false, isCurated: false, createdAt: now, updatedAt: now },
	// 시와 산책
	{ id: 'ch-4-1', bookId: 'book-4', title: '겨울을 걷는 법', order: 1, estimatedReadingMinutes: 7, contentAvailability: 'preview', isOriginal: false, isCurated: true, createdAt: now, updatedAt: now },
	{ id: 'ch-4-2', bookId: 'book-4', title: '고요를 줍다', order: 2, estimatedReadingMinutes: 9, contentAvailability: 'preview', isOriginal: false, isCurated: true, createdAt: now, updatedAt: now },
	// 버닝아웃 (오리지널)
	{ id: 'ch-5-1', bookId: 'book-5', title: '멈춰도 괜찮아', order: 1, estimatedReadingMinutes: 6, summary: '번아웃 신호를 알아차리는 법', contentAvailability: 'original_content', isOriginal: true, isCurated: true, createdAt: now, updatedAt: now },
	{ id: 'ch-5-2', bookId: 'book-5', title: '작은 회복의 기술', order: 2, estimatedReadingMinutes: 8, summary: '하루 10분의 회복 루틴', contentAvailability: 'original_content', isOriginal: true, isCurated: true, createdAt: now, updatedAt: now },
	{ id: 'ch-5-3', bookId: 'book-5', title: '다시 일과 만나기', order: 3, estimatedReadingMinutes: 7, contentAvailability: 'original_content', isOriginal: true, isCurated: true, createdAt: now, updatedAt: now },
	// 밤의 도서관
	{ id: 'ch-6-1', bookId: 'book-6', title: '신화로서의 도서관', order: 1, estimatedReadingMinutes: 16, contentAvailability: 'metadata_only', isOriginal: false, isCurated: false, createdAt: now, updatedAt: now }
];

export const mockFlows: Flow[] = [
	{
		id: 'flow-1',
		title: '퇴근 후 마음을 가라앉히는 20분',
		description: '하루의 소음을 정리하는 짧은 읽기. 산책하듯 가볍게.',
		coverImageUrl: '/images/flows/evening.svg',
		creatorId: 'editorial',
		isEditorial: true,
		visibility: 'public',
		items: [
			{ type: 'chapter', refId: 'ch-1-2', order: 1 },
			{ type: 'chapter', refId: 'ch-4-2', order: 2 },
			{ type: 'quote', refId: 'quote-1', order: 3 }
		],
		tags: ['휴식', '에세이', '저녁'],
		mood: 'calm',
		estimatedTotalMinutes: 21,
		createdAt: now,
		updatedAt: now
	},
	{
		id: 'flow-2',
		title: '번아웃에서 빠져나오는 문장들',
		description: '지친 마음을 위한 B PLi 오리지널 큐레이션.',
		coverImageUrl: '/images/flows/recover.svg',
		creatorId: 'editorial',
		isEditorial: true,
		visibility: 'public',
		items: [
			{ type: 'chapter', refId: 'ch-5-1', order: 1 },
			{ type: 'chapter', refId: 'ch-5-2', order: 2 },
			{ type: 'chapter', refId: 'ch-5-3', order: 3 }
		],
		tags: ['번아웃', '회복', '오리지널'],
		mood: 'healing',
		estimatedTotalMinutes: 21,
		createdAt: now,
		updatedAt: now
	},
	{
		id: 'flow-3',
		title: '15분 안에 읽는 고전 한 장',
		description: '완독 부담 없이, 고전의 한 장면만.',
		coverImageUrl: '/images/flows/classic.svg',
		creatorId: 'editorial',
		isEditorial: true,
		visibility: 'public',
		items: [
			{ type: 'chapter', refId: 'ch-2-1', order: 1 }
		],
		tags: ['고전', '15분'],
		mood: 'focus',
		estimatedTotalMinutes: 15,
		createdAt: now,
		updatedAt: now
	},
	{
		id: 'flow-4',
		title: '일의 감각을 되찾는 짧은 독서',
		description: '월요일 아침, 일과 다시 친해지는 단편들.',
		coverImageUrl: '/images/flows/work.svg',
		creatorId: 'editorial',
		isEditorial: true,
		visibility: 'public',
		items: [
			{ type: 'chapter', refId: 'ch-3-2', order: 1 },
			{ type: 'chapter', refId: 'ch-3-1', order: 2 }
		],
		tags: ['일', '단편소설'],
		mood: 'energize',
		estimatedTotalMinutes: 47,
		createdAt: now,
		updatedAt: now
	}
];

export const mockQuotes: Quote[] = [
	{
		id: 'quote-1',
		userId: 'demo-user',
		bookId: 'book-1',
		chapterId: 'ch-1-2',
		text: '걷는 동안에는 아무것도 하지 않아도 된다. 그것이 산책의 가장 큰 위로다.',
		pageNumber: 43,
		sourceType: 'manual',
		createdAt: now,
		updatedAt: now
	},
	{
		id: 'quote-2',
		userId: 'demo-user',
		bookId: 'book-2',
		chapterId: 'ch-2-1',
		text: '나는 그가 달을 쳐다보느라 6펜스를 보지 못했다고 생각하지 않는다. 그는 달을 선택한 것이다.',
		pageNumber: 87,
		sourceType: 'manual',
		createdAt: now,
		updatedAt: now
	},
	{
		id: 'quote-3',
		userId: 'demo-user',
		bookId: 'book-3',
		text: '월급은 통장을 스칠 뿐이지만, 그 스침이 우리를 살게 한다.',
		pageNumber: 112,
		sourceType: 'ocr',
		createdAt: now,
		updatedAt: now
	},
	// Other readers' shared quotes — interleaved into the page timeline
	{
		id: 'quote-4',
		userId: 'user-jiwon',
		bookId: 'book-1',
		text: '아무 데도 가지 않기 위해 걷는다. 그 무용함이 좋다.',
		pageNumber: 88,
		sourceType: 'manual',
		createdAt: now,
		updatedAt: now
	},
	{
		id: 'quote-5',
		userId: 'user-minseo',
		bookId: 'book-2',
		text: '아름다움은 예술가가 영혼의 고통을 거쳐 만들어내는 경이로운 것이다.',
		pageNumber: 160,
		sourceType: 'manual',
		createdAt: now,
		updatedAt: now
	}
];

export const mockComments: Comment[] = [
	{
		id: 'comment-1',
		userId: 'demo-user',
		bookId: 'book-1',
		quoteId: 'quote-1',
		pageNumber: 43,
		body: '퇴근길에 읽다가 한참을 멈춰 있었다.',
		visibility: 'public',
		createdAt: now,
		updatedAt: now
	},
	{
		id: 'comment-2',
		userId: 'demo-user',
		bookId: 'book-2',
		pageNumber: 90,
		body: '여기서부터 이야기가 완전히 달라진다.',
		visibility: 'private',
		createdAt: now,
		updatedAt: now
	},
	// Public comments from other readers, pinned to page positions (SoundCloud style)
	{
		id: 'comment-3',
		userId: 'user-jiwon',
		bookId: 'book-1',
		pageNumber: 21,
		body: '첫 장부터 마음이 느슨해지는 기분.',
		visibility: 'public',
		createdAt: now,
		updatedAt: now
	},
	{
		id: 'comment-4',
		userId: 'user-haneul',
		bookId: 'book-1',
		pageNumber: 64,
		body: '혼자 걷는 시간에 대한 묘사가 정확해서 밑줄.',
		visibility: 'public',
		createdAt: now,
		updatedAt: now
	},
	{
		id: 'comment-5',
		userId: 'user-doyun',
		bookId: 'book-1',
		pageNumber: 130,
		body: '비 오는 날 챕터는 꼭 비 올 때 읽으세요.',
		visibility: 'public',
		createdAt: now,
		updatedAt: now
	},
	{
		id: 'comment-6',
		userId: 'user-minseo',
		bookId: 'book-2',
		pageNumber: 45,
		body: '스트릭랜드, 처음엔 이해 못 했는데 점점 빠져든다.',
		visibility: 'public',
		createdAt: now,
		updatedAt: now
	},
	{
		id: 'comment-7',
		userId: 'user-jiwon',
		bookId: 'book-2',
		pageNumber: 188,
		body: '여기 이 문단, 올해 읽은 문장 중 최고.',
		visibility: 'public',
		createdAt: now,
		updatedAt: now
	},
	{
		id: 'comment-8',
		userId: 'user-haneul',
		bookId: 'book-3',
		pageNumber: 35,
		body: '판교 다니는 사람은 다 공감할 듯 ㅋㅋ',
		visibility: 'public',
		createdAt: now,
		updatedAt: now
	}
];

export const mockRecommendationSections: RecommendationSection[] = [
	{
		id: 'rec-1',
		title: '오늘의 가벼운 챕터',
		subtitle: '10분이면 충분해요',
		itemType: 'chapter',
		itemIds: ['ch-1-1', 'ch-4-1', 'ch-5-1', 'ch-1-2']
	},
	{
		id: 'rec-2',
		title: '지금 기분에 맞는 Flow',
		subtitle: '오늘 하루는 어땠나요?',
		itemType: 'flow',
		itemIds: ['flow-1', 'flow-2', 'flow-4']
	},
	{
		id: 'rec-3',
		title: '15분 안에 읽는 고전',
		itemType: 'chapter',
		itemIds: ['ch-2-1']
	},
	{
		id: 'rec-4',
		title: '다시 읽기 좋은 구절',
		subtitle: '당신이 저장한 문장들',
		itemType: 'quote',
		itemIds: ['quote-1', 'quote-2', 'quote-3']
	},
	{
		id: 'rec-5',
		title: '20-30대가 지금 가장 많이 읽는 책',
		subtitle: '도서관 정보나루 인기 대출 데이터',
		itemType: 'book',
		itemIds: ['book-3', 'book-1', 'book-2', 'book-6']
	}
];
