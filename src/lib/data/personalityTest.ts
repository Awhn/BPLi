import type { PersonalityType, PersonalityQuestion, PersonalityResult } from '$lib/types';

// Reading personality test (CLAUDE.md §10.2). 8 questions, each option carries
// weights toward the 6 result types. Scored client-side; the winning type is
// argmax of the accumulated weights.
export const PERSONALITY_QUESTIONS: PersonalityQuestion[] = [
	{
		id: 'q1',
		prompt: '책을 펼치는 순간, 나는',
		options: [
			{ label: '오늘 내 기분에 어울리는지부터 살핀다', weights: { emotional_collector: 2, taste_curator: 1 } },
			{ label: '첫 문장에 빨려 들어갈 준비를 한다', weights: { immersive_explorer: 2 } },
			{ label: '밑줄 그을 문장이 있을지 기대한다', weights: { sentence_gatherer: 2 } },
			{ label: '무엇을 알게 될지 궁금해한다', weights: { intellectual_wanderer: 2 } }
		]
	},
	{
		id: 'q2',
		prompt: '나에게 완독이란',
		options: [
			{ label: '끝까지 읽어야 마음이 놓인다', weights: { quiet_finisher: 2 } },
			{ label: '한 챕터만 읽어도 충분하다', weights: { emotional_collector: 1, sentence_gatherer: 1 } },
			{ label: '이야기에 빠지면 저절로 끝까지 간다', weights: { immersive_explorer: 2 } },
			{ label: '여러 권을 조금씩 오간다', weights: { intellectual_wanderer: 1, taste_curator: 1 } }
		]
	},
	{
		id: 'q3',
		prompt: '좋아하는 문장을 만나면',
		options: [
			{ label: '사진을 찍거나 옮겨 적는다', weights: { sentence_gatherer: 2 } },
			{ label: '그 순간의 감정을 함께 기록한다', weights: { emotional_collector: 2 } },
			{ label: '왜 좋은지 곱씹어 본다', weights: { intellectual_wanderer: 1, quiet_finisher: 1 } },
			{ label: '누군가에게 바로 공유한다', weights: { taste_curator: 2 } }
		]
	},
	{
		id: 'q4',
		prompt: '주말 오후, 나의 독서는',
		options: [
			{ label: '조용한 방에서 한 권을 오래', weights: { quiet_finisher: 2 } },
			{ label: '카페에서 짧은 글 여러 편', weights: { taste_curator: 1, sentence_gatherer: 1 } },
			{ label: '몰입해서 시간 가는 줄 모르게', weights: { immersive_explorer: 2 } },
			{ label: '기분에 맞는 책을 그때그때', weights: { emotional_collector: 2 } }
		]
	},
	{
		id: 'q5',
		prompt: '책을 고를 때 가장 끌리는 것',
		options: [
			{ label: '표지와 분위기', weights: { emotional_collector: 1, taste_curator: 1 } },
			{ label: '탄탄한 이야기', weights: { immersive_explorer: 2 } },
			{ label: '아름다운 문장', weights: { sentence_gatherer: 2 } },
			{ label: '새로운 지식과 관점', weights: { intellectual_wanderer: 2 } }
		]
	},
	{
		id: 'q6',
		prompt: '다 읽은 책은 나에게',
		options: [
			{ label: '완주한 하나의 성취', weights: { quiet_finisher: 2 } },
			{ label: '내 취향을 말해주는 조각', weights: { taste_curator: 2 } },
			{ label: '마음에 남은 장면들', weights: { emotional_collector: 1, immersive_explorer: 1 } },
			{ label: '수집한 문장들의 보관함', weights: { sentence_gatherer: 2 } }
		]
	},
	{
		id: 'q7',
		prompt: '독서 중 가장 남기고 싶은 것',
		options: [
			{ label: '그 순간의 감정', weights: { emotional_collector: 2 } },
			{ label: '인상 깊은 구절', weights: { sentence_gatherer: 2 } },
			{ label: '떠오른 생각과 질문', weights: { intellectual_wanderer: 2 } },
			{ label: '남에게 권하고 싶은 목록', weights: { taste_curator: 2 } }
		]
	},
	{
		id: 'q8',
		prompt: '나에게 책이란',
		options: [
			{ label: '조용히 나를 채우는 시간', weights: { quiet_finisher: 1, intellectual_wanderer: 1 } },
			{ label: '다른 세계로 떠나는 여행', weights: { immersive_explorer: 2 } },
			{ label: '감정을 담는 앨범', weights: { emotional_collector: 2 } },
			{ label: '취향을 완성하는 재료', weights: { taste_curator: 2 } }
		]
	}
];

export const PERSONALITY_RESULTS: Record<PersonalityType, PersonalityResult> = {
	emotional_collector: {
		type: 'emotional_collector',
		name: '감성 수집가형',
		tagline: '문장보다 그때의 마음을 모아요',
		description:
			'당신은 책에서 지식보다 감정을 길어 올립니다. 한 챕터, 한 장면이 마음을 건드리면 그 순간을 오래 간직하죠. B PLi의 구절 카드와 감정 코멘트가 당신을 위한 기능이에요.',
		recommendedBookIds: ['book-1', 'book-4', 'book-5'],
		recommendedFlowIds: ['flow-1', 'flow-2'],
		categories: ['에세이', '시', '심리']
	},
	immersive_explorer: {
		type: 'immersive_explorer',
		name: '몰입 탐험가형',
		tagline: '이야기에 빠지면 시간을 잊어요',
		description:
			'한번 서사에 발을 들이면 끝까지 따라가는 사람. 당신에게 독서는 다른 세계로의 여행입니다. 몰입도 높은 소설과 고전 챕터부터 재생해보세요.',
		recommendedBookIds: ['book-2', 'book-3'],
		recommendedFlowIds: ['flow-4', 'flow-3'],
		categories: ['소설', '고전']
	},
	sentence_gatherer: {
		type: 'sentence_gatherer',
		name: '문장 채집가형',
		tagline: '아름다운 문장을 수집해요',
		description:
			'좋은 문장을 만나면 그냥 지나치지 못하는 사람. 밑줄과 필사로 문장을 모으죠. 저장한 구절이 곧 당신의 서재가 됩니다.',
		recommendedBookIds: ['book-4', 'book-1'],
		recommendedFlowIds: ['flow-1'],
		categories: ['시', '에세이']
	},
	intellectual_wanderer: {
		type: 'intellectual_wanderer',
		name: '지적 방랑자형',
		tagline: '새로운 관점을 찾아 헤매요',
		description:
			'한 권에 머물지 않고 지식과 질문을 따라 여러 책을 오가는 사람. 당신에게 독서는 끝없는 탐구입니다. 인문과 고전 큐레이션이 잘 어울려요.',
		recommendedBookIds: ['book-6', 'book-2'],
		recommendedFlowIds: ['flow-3'],
		categories: ['인문', '고전']
	},
	quiet_finisher: {
		type: 'quiet_finisher',
		name: '고요한 완독가형',
		tagline: '한 권을 끝까지, 조용히',
		description:
			'시작한 책은 끝까지 읽어야 마음이 놓이는 사람. 소란함 없이 깊게 읽는 당신에게는 한 흐름을 진득하게 따라가는 Flow가 어울립니다.',
		recommendedBookIds: ['book-2', 'book-6'],
		recommendedFlowIds: ['flow-3'],
		categories: ['고전', '인문']
	},
	taste_curator: {
		type: 'taste_curator',
		name: '취향 큐레이터형',
		tagline: '읽고, 고르고, 나눠요',
		description:
			'좋은 책을 발견하면 곧장 누군가에게 권하고 싶은 사람. 당신의 취향은 그 자체로 콘텐츠가 됩니다. Flow를 만들고 구절 카드를 공유하며 취향을 퍼뜨려보세요.',
		recommendedBookIds: ['book-3', 'book-5'],
		recommendedFlowIds: ['flow-4', 'flow-2'],
		categories: ['소설', '오리지널']
	}
};

export const ALL_PERSONALITY_TYPES = Object.keys(PERSONALITY_RESULTS) as PersonalityType[];

// Argmax over accumulated weights; ties broken by question-order stability
// (the earliest-declared type wins) so scoring is deterministic.
export function scorePersonality(scores: Partial<Record<PersonalityType, number>>): PersonalityType {
	let best: PersonalityType = ALL_PERSONALITY_TYPES[0];
	let bestScore = -Infinity;
	for (const type of ALL_PERSONALITY_TYPES) {
		const s = scores[type] ?? 0;
		if (s > bestScore) {
			bestScore = s;
			best = type;
		}
	}
	return best;
}
