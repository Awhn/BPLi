import type { ReadingStatus, ReadingStatusValue } from '$lib/types';
import { getStore, newId } from '$lib/server/db/store';

export function findStatus(userId: string, bookId: string): ReadingStatus | undefined {
	return getStore().readingStatuses.find((s) => s.userId === userId && s.bookId === bookId);
}

export function findStatusesByUserId(userId: string): ReadingStatus[] {
	return getStore().readingStatuses.filter((s) => s.userId === userId);
}

export function upsertStatus(
	userId: string,
	bookId: string,
	status: ReadingStatusValue
): ReadingStatus {
	const store = getStore();
	const now = new Date().toISOString();
	const existing = store.readingStatuses.find((s) => s.userId === userId && s.bookId === bookId);

	if (existing) {
		existing.status = status;
		existing.updatedAt = now;
		if (status === 'reading' && !existing.startedAt) existing.startedAt = now;
		if (status === 'finished') existing.finishedAt = now;
		return existing;
	}

	const created: ReadingStatus = {
		id: newId('rs'),
		userId,
		bookId,
		status,
		startedAt: status === 'reading' ? now : undefined,
		finishedAt: status === 'finished' ? now : undefined,
		updatedAt: now
	};
	store.readingStatuses.push(created);
	return created;
}
