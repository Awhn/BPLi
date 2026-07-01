// "지금 재생 중" (now playing) — the Spotify-style playback screen for the
// book a reader is currently in. Builds the progress state and the merged,
// page-ordered timeline of comments + shared quotes (SoundCloud style).
import type { Book, Chapter, ReadingStatusValue } from '$lib/types';
import * as bookRepo from '$lib/server/repositories/bookRepository';
import * as quoteRepo from '$lib/server/repositories/quoteRepository';
import * as statusRepo from '$lib/server/repositories/readingStatusRepository';
import { getDisplayName } from '$lib/server/repositories/userRepository';
import { logEvent } from './eventService';

export interface TimelineEntry {
	kind: 'comment' | 'quote';
	id: string;
	pageNumber: number | null;
	body: string;
	authorName: string;
	isMine: boolean;
	createdAt: string;
}

export interface NowPlaying {
	book: Book;
	currentPage: number;
	totalPages: number | null;
	progressRatio: number; // 0–1, 0 when total unknown
	status: ReadingStatusValue | null; // null = untracked, don't fake "reading"
	currentChapter?: Chapter;
}

export interface PlayerView extends NowPlaying {
	timeline: TimelineEntry[];
}

function buildNowPlaying(book: Book, userId: string): NowPlaying {
	const status = statusRepo.findStatus(userId, book.id);
	const currentPage = status?.currentPage ?? 0;
	const totalPages = book.totalPages ?? null;
	const progressRatio =
		totalPages && totalPages > 0 ? Math.min(1, Math.max(0, currentPage / totalPages)) : 0;

	// Which chapter the reader is "in" — last chapter at or before currentPage
	// has no page anchors in mock data, so we approximate by progress ratio.
	const chapters = bookRepo.findChaptersByBookId(book.id);
	let currentChapter: Chapter | undefined;
	if (chapters.length) {
		const idx = Math.min(chapters.length - 1, Math.floor(progressRatio * chapters.length));
		currentChapter = chapters[idx];
	}

	return {
		book,
		currentPage,
		totalPages,
		progressRatio,
		status: status?.status ?? null,
		currentChapter
	};
}

// Lightweight summary for the persistent mini-player (no timeline).
export function getNowPlaying(userId: string): NowPlaying | null {
	const status = statusRepo.findCurrentlyReading(userId);
	if (!status) return null;
	const book = bookRepo.findBookById(status.bookId);
	if (!book) return null;
	return buildNowPlaying(book, userId);
}

// Full playback screen for one book, with the merged page timeline.
export function getPlayerView(userId: string, bookId: string): PlayerView | null {
	const book = bookRepo.findBookById(bookId);
	if (!book) return null;

	const comments = quoteRepo.findVisibleCommentsByBookId(bookId, userId);
	const quotes = quoteRepo.findVisibleQuotesByBookId(bookId);

	const timeline: TimelineEntry[] = [
		...comments.map((c) => ({
			kind: 'comment' as const,
			id: c.id,
			pageNumber: c.pageNumber ?? null,
			body: c.body,
			authorName: getDisplayName(c.userId, userId),
			isMine: c.userId === userId,
			createdAt: c.createdAt
		})),
		...quotes.map((q) => ({
			kind: 'quote' as const,
			id: q.id,
			pageNumber: q.pageNumber ?? null,
			body: q.text,
			authorName: getDisplayName(q.userId, userId),
			isMine: q.userId === userId,
			createdAt: q.createdAt
		}))
	].sort((a, b) => {
		// Unpaged entries sink to the bottom; otherwise by page then time
		const pa = a.pageNumber ?? Number.MAX_SAFE_INTEGER;
		const pb = b.pageNumber ?? Number.MAX_SAFE_INTEGER;
		if (pa !== pb) return pa - pb;
		return a.createdAt.localeCompare(b.createdAt);
	});

	return { ...buildNowPlaying(book, userId), timeline };
}

export function updateProgress(userId: string, bookId: string, page: number) {
	const status = statusRepo.updateCurrentPage(userId, bookId, page);
	logEvent(userId, 'reading_progress_updated', { bookId, page });
	return status;
}
