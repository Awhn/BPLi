import type { Book, Chapter } from '$lib/types';
import { getStore, newId } from '$lib/server/db/store';

export function findAllBooks(): Book[] {
	return getStore().books;
}

export function findBookById(id: string): Book | undefined {
	return getStore().books.find((b) => b.id === id);
}

export function findBookByIsbn(isbn: string): Book | undefined {
	return getStore().books.find((b) => b.isbn === isbn);
}

export function searchBooks(query: string): Book[] {
	const q = query.trim().toLowerCase();
	if (!q) return [];
	return getStore().books.filter(
		(b) =>
			b.title.toLowerCase().includes(q) ||
			b.author.toLowerCase().includes(q) ||
			(b.publisher ?? '').toLowerCase().includes(q)
	);
}

export function createBook(input: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>): Book {
	const now = new Date().toISOString();
	const book: Book = { ...input, id: newId('book'), createdAt: now, updatedAt: now };
	getStore().books.push(book);
	return book;
}

export function findChaptersByBookId(bookId: string): Chapter[] {
	return getStore()
		.chapters.filter((c) => c.bookId === bookId)
		.sort((a, b) => a.order - b.order);
}

export function findChapterById(id: string): Chapter | undefined {
	return getStore().chapters.find((c) => c.id === id);
}
