import type { Quote, Comment } from '$lib/types';
import { getStore, newId } from '$lib/server/db/store';

export function findQuotesByUserId(userId: string): Quote[] {
	return getStore()
		.quotes.filter((q) => q.userId === userId)
		.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function findQuotesByBookId(bookId: string, userId?: string): Quote[] {
	return getStore().quotes.filter(
		(q) => q.bookId === bookId && (!userId || q.userId === userId)
	);
}

export function findQuoteById(id: string): Quote | undefined {
	return getStore().quotes.find((q) => q.id === id);
}

export function createQuote(input: Omit<Quote, 'id' | 'createdAt' | 'updatedAt'>): Quote {
	const now = new Date().toISOString();
	const quote: Quote = { ...input, id: newId('quote'), createdAt: now, updatedAt: now };
	getStore().quotes.push(quote);
	return quote;
}

export function findCommentsByBookId(bookId: string): Comment[] {
	return getStore()
		.comments.filter((c) => c.bookId === bookId)
		.sort((a, b) => (a.pageNumber ?? 0) - (b.pageNumber ?? 0));
}

export function findCommentsByQuoteId(quoteId: string): Comment[] {
	return getStore().comments.filter((c) => c.quoteId === quoteId);
}

export function createComment(input: Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>): Comment {
	const now = new Date().toISOString();
	const comment: Comment = { ...input, id: newId('comment'), createdAt: now, updatedAt: now };
	getStore().comments.push(comment);
	return comment;
}
