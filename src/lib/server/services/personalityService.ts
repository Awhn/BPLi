// Reading personality test (CLAUDE.md §10.2). Validates submitted answers,
// scores the winning type, persists it to the user's profile (a §11 signal),
// and logs personality_test_completed.
import type { PersonalityType, PersonalityResult } from '$lib/types';
import {
	PERSONALITY_QUESTIONS,
	PERSONALITY_RESULTS,
	scorePersonality
} from '$lib/data/personalityTest';
import { getStore } from '$lib/server/db/store';
import { logEvent } from './eventService';

export function getResult(type: PersonalityType): PersonalityResult {
	return PERSONALITY_RESULTS[type];
}

export function getUserPersonality(userId: string): PersonalityType | undefined {
	return getStore().personalities[userId];
}

// answers: array of chosen option indices, one per question (in order).
export function completeTest(userId: string, answers: number[]): PersonalityResult {
	const scores: Partial<Record<PersonalityType, number>> = {};
	PERSONALITY_QUESTIONS.forEach((question, i) => {
		const choice = answers[i];
		const option = question.options[choice];
		if (!option) return; // skip unanswered / out-of-range
		for (const [type, weight] of Object.entries(option.weights)) {
			scores[type as PersonalityType] = (scores[type as PersonalityType] ?? 0) + (weight ?? 0);
		}
	});

	const type = scorePersonality(scores);
	getStore().personalities[userId] = type;
	logEvent(userId, 'personality_test_completed', { resultType: type });
	return PERSONALITY_RESULTS[type];
}
