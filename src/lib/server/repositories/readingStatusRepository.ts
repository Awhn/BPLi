import type { ReadingStatus, ReadingStatusValue } from '$lib/types';
import { getStore, newId } from '$lib/server/db/store';

export function findStatus(userId: string, bookId: string): ReadingStatus | undefined {
	return getStore().readingStatuses.find((s) => s.userId === userId && s.bookId === bookId);
}

export function findStatusesByUserId(userId: string): ReadingStatus[] {
	return getStore().readingStatuses.filter((s) => s.userId === userId);
}

// The "now playing" book: the most recently touched reading-status entry.
export function findCurrentlyReading(userId: string): ReadingStatus | undefined {
	return getStore()
		.readingStatuses.filter((s) => s.userId === userId && s.status === 'reading')
		.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0];
}

// Move the reading head. Auto-starts the book if it wasn't tracked yet, but
// keeps an existing status (e.g. finished) intact while scrubbing.
export function updateCurrentPage(
	userId: string,
	bookId: string,
	page: number
): ReadingStatus {
	const store = getStore();
	const existing = store.readingStatuses.find((s) => s.userId === userId && s.bookId === bookId);
	const status = existing ?? upsertStatus(userId, bookId, 'reading');
	status.currentPage = page;
	status.updatedAt = new Date().toISOString();
	return status;
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
