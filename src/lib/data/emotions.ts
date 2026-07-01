import type { CommentEmotion } from '$lib/types';

// Display metadata for the closed comment-emotion vocabulary. Order defines
// the chip order in the UI.
export const COMMENT_EMOTIONS: { value: CommentEmotion; label: string; emoji: string }[] = [
	{ value: 'comfort', label: '위로', emoji: '🌿' },
	{ value: 'flutter', label: '설렘', emoji: '💗' },
	{ value: 'ache', label: '먹먹함', emoji: '🌧️' },
	{ value: 'insight', label: '통찰', emoji: '💡' },
	{ value: 'immersion', label: '몰입', emoji: '🌊' },
	{ value: 'humor', label: '유쾌', emoji: '🍋' }
];

const byValue = new Map(COMMENT_EMOTIONS.map((e) => [e.value, e]));

export function emotionLabel(value: CommentEmotion): string {
	return byValue.get(value)?.label ?? '';
}

export function emotionEmoji(value: CommentEmotion): string {
	return byValue.get(value)?.emoji ?? '';
}

export function isCommentEmotion(value: unknown): value is CommentEmotion {
	return typeof value === 'string' && byValue.has(value as CommentEmotion);
}
