import type { Book, BookSourceType, Chapter, ReadingStatusValue } from '$lib/types';
import * as bookRepo from '$lib/server/repositories/bookRepository';
import * as statusRepo from '$lib/server/repositories/readingStatusRepository';
import { logEvent } from './eventService';
import { searchExternalBooks } from './bookSearch';

export function getBooks(): Book[] {
	return bookRepo.findAllBooks();
}

export function getBook(id: string): Book | undefined {
	return bookRepo.findBookById(id);
}

export function getChapters(bookId: string): Chapter[] {
	return bookRepo.findChaptersByBookId(bookId);
}

export function getChapter(id: string): Chapter | undefined {
	return bookRepo.findChapterById(id);
}

export async function searchBooks(query: string): Promise<Book[]> {
	const local = bookRepo.searchBooks(query);
	const external = await searchExternalBooks(query);
	// Dedupe by ISBN: local catalog wins over external results
	const seen = new Set(local.map((b) => b.isbn).filter(Boolean));
	const merged = [...local];
	for (const b of external) {
		if (b.isbn && seen.has(b.isbn)) continue;
		merged.push(b);
	}
	return merged;
}

export interface RegisterBookInput {
	title: string;
	author: string;
	publisher?: string;
	isbn?: string;
	description?: string;
	coverImageUrl?: string;
	categories?: string[];
	sourceType?: BookSourceType;
}

export function registerBook(userId: string, input: RegisterBookInput): Book {
	if (input.isbn) {
		const existing = bookRepo.findBookByIsbn(input.isbn);
		if (existing) return existing;
	}
	const book = bookRepo.createBook({
		title: input.title,
		author: input.author,
		publisher: input.publisher,
		isbn: input.isbn,
		description: input.description,
		coverImageUrl: input.coverImageUrl,
		categories: input.categories ?? [],
		sourceType: input.sourceType ?? 'user_added'
	});
	logEvent(userId, 'book_added', { bookId: book.id, title: book.title });
	return book;
}

export function setReadingStatus(userId: string, bookId: string, status: ReadingStatusValue) {
	const result = statusRepo.upsertStatus(userId, bookId, status);
	if (status === 'reading') logEvent(userId, 'book_started', { bookId });
	if (status === 'finished') logEvent(userId, 'book_finished', { bookId });
	return result;
}

export function getReadingStatus(userId: string, bookId: string) {
	return statusRepo.findStatus(userId, bookId);
}

export function getLibrary(userId: string) {
	const statuses = statusRepo.findStatusesByUserId(userId);
	return statuses
		.map((s) => ({ status: s, book: bookRepo.findBookById(s.bookId) }))
		.filter((entry): entry is { status: (typeof statuses)[number]; book: Book } =>
			Boolean(entry.book)
		);
}
