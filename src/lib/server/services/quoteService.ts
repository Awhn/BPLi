import type { Quote, Comment, QuoteSourceType, CommentVisibility, CommentEmotion } from '$lib/types';
import * as quoteRepo from '$lib/server/repositories/quoteRepository';
import * as bookRepo from '$lib/server/repositories/bookRepository';
import { logEvent } from './eventService';

export function getQuotesForUser(userId: string) {
	return quoteRepo.findQuotesByUserId(userId).map((quote) => ({
		quote,
		book: bookRepo.findBookById(quote.bookId)
	}));
}

export function getQuotesForBook(bookId: string, userId: string): Quote[] {
	return quoteRepo.findQuotesByBookId(bookId, userId);
}

export function getQuote(id: string): Quote | undefined {
	return quoteRepo.findQuoteById(id);
}

export interface CreateQuoteInput {
	bookId: string;
	chapterId?: string;
	text: string;
	pageNumber?: number;
	sourceType?: QuoteSourceType;
}

export function createQuote(userId: string, input: CreateQuoteInput): Quote {
	const quote = quoteRepo.createQuote({
		userId,
		bookId: input.bookId,
		chapterId: input.chapterId,
		text: input.text,
		pageNumber: input.pageNumber,
		sourceType: input.sourceType ?? 'manual'
	});
	logEvent(userId, 'quote_created', {
		quoteId: quote.id,
		bookId: input.bookId,
		sourceType: quote.sourceType
	});
	return quote;
}

export interface CreateCommentInput {
	bookId: string;
	chapterId?: string;
	quoteId?: string;
	pageNumber?: number;
	body: string;
	emotion?: CommentEmotion;
	visibility?: CommentVisibility;
}

export function createComment(userId: string, input: CreateCommentInput): Comment {
	const comment = quoteRepo.createComment({
		userId,
		bookId: input.bookId,
		chapterId: input.chapterId,
		quoteId: input.quoteId,
		pageNumber: input.pageNumber,
		body: input.body,
		emotion: input.emotion,
		visibility: input.visibility ?? 'private'
	});
	// emotion is a §11 recommendation signal and a §10.3 Wrapped metric
	logEvent(userId, 'comment_created', {
		commentId: comment.id,
		bookId: input.bookId,
		emotion: input.emotion ?? null
	});
	return comment;
}

export function getCommentsForBook(bookId: string): Comment[] {
	return quoteRepo.findCommentsByBookId(bookId);
}

export function markQuoteShared(userId: string, quoteId: string) {
	logEvent(userId, 'quote_shared', { quoteId });
}
