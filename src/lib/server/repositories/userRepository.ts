import { mockUsers } from '$lib/data/mock';

// Display name for a comment/quote author. The active cookie user always
// reads as "나"; seeded mock users use their nickname; unknown ids degrade
// to a short anonymous label.
export function getDisplayName(userId: string, currentUserId?: string): string {
	if (currentUserId && userId === currentUserId) return '나';
	const known = mockUsers.find((u) => u.id === userId);
	if (known) return known.nickname;
	return '익명의 독자';
}
