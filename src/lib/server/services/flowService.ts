import type { Flow, Book, Chapter, Quote } from '$lib/types';
import * as flowRepo from '$lib/server/repositories/flowRepository';
import * as bookRepo from '$lib/server/repositories/bookRepository';
import * as quoteRepo from '$lib/server/repositories/quoteRepository';
import { logEvent } from './eventService';

export function getFlows(): Flow[] {
	return flowRepo.findAllFlows();
}

export interface ResolvedFlowItem {
	order: number;
	type: 'chapter' | 'quote' | 'original';
	chapter?: Chapter;
	book?: Book;
	quote?: Quote;
}

export function getFlowDetail(id: string, userId?: string) {
	const flow = flowRepo.findFlowById(id);
	if (!flow) return undefined;
	if (userId) logEvent(userId, 'flow_opened', { flowId: id });

	const items: ResolvedFlowItem[] = flow.items
		.slice()
		.sort((a, b) => a.order - b.order)
		.map((item) => {
			if (item.type === 'quote') {
				const quote = quoteRepo.findQuoteById(item.refId);
				return {
					order: item.order,
					type: item.type,
					quote,
					book: quote ? bookRepo.findBookById(quote.bookId) : undefined
				};
			}
			const chapter = bookRepo.findChapterById(item.refId);
			return {
				order: item.order,
				type: item.type,
				chapter,
				book: chapter ? bookRepo.findBookById(chapter.bookId) : undefined
			};
		});

	return { flow, items };
}

export function saveFlow(userId: string, flowId: string) {
	logEvent(userId, 'flow_saved', { flowId });
}
