import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { PERSONALITY_QUESTIONS } from '$lib/data/personalityTest';
import { completeTest, getUserPersonality, getResult } from '$lib/server/services/personalityService';
import { getBook } from '$lib/server/services/bookService';
import * as flowRepo from '$lib/server/repositories/flowRepository';
import type { PageServerLoad } from './$types';

function resolveRecommendations(bookIds: string[], flowIds: string[]) {
	return {
		books: bookIds.map((id) => getBook(id)).filter((b) => b !== undefined),
		flows: flowIds.map((id) => flowRepo.findFlowById(id)).filter((f) => f !== undefined)
	};
}

export const load: PageServerLoad = async ({ locals }) => {
	// If the reader already took the test, show their result on return visits.
	const existing = getUserPersonality(locals.userId);
	if (!existing) return { previousResult: null };
	const result = getResult(existing);
	return { previousResult: { result, ...resolveRecommendations(result.recommendedBookIds, result.recommendedFlowIds) } };
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await request.formData();
		let answers: number[];
		try {
			answers = JSON.parse(String(form.get('answers') ?? '[]'));
		} catch {
			return fail(400, { error: '응답을 처리하지 못했어요.' });
		}
		if (!Array.isArray(answers) || answers.length !== PERSONALITY_QUESTIONS.length) {
			return fail(400, { error: '모든 문항에 답해주세요.' });
		}

		const result = completeTest(locals.userId, answers);
		return {
			result,
			...resolveRecommendations(result.recommendedBookIds, result.recommendedFlowIds)
		};
	}
};
