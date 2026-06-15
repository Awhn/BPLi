// Rule-based recommendation feed (CLAUDE.md §11) — no ML, just curated
// sections resolved against the store. Personalization comes later from
// the event log and personality test results.
import type { Book, Chapter, Flow, Quote, RecommendationSection } from '$lib/types';
import { mockRecommendationSections } from '$lib/data/mock';
import * as bookRepo from '$lib/server/repositories/bookRepository';
import * as flowRepo from '$lib/server/repositories/flowRepository';
import * as quoteRepo from '$lib/server/repositories/quoteRepository';

export interface ResolvedSection {
	section: RecommendationSection;
	books: Book[];
	chapters: { chapter: Chapter; book?: Book }[];
	flows: Flow[];
	quotes: { quote: Quote; book?: Book }[];
}

export function getHomeFeed(): ResolvedSection[] {
	return mockRecommendationSections.map((section) => {
		const resolved: ResolvedSection = {
			section,
			books: [],
			chapters: [],
			flows: [],
			quotes: []
		};
		for (const id of section.itemIds) {
			switch (section.itemType) {
				case 'book': {
					const book = bookRepo.findBookById(id);
					if (book) resolved.books.push(book);
					break;
				}
				case 'chapter': {
					const chapter = bookRepo.findChapterById(id);
					if (chapter)
						resolved.chapters.push({ chapter, book: bookRepo.findBookById(chapter.bookId) });
					break;
				}
				case 'flow': {
					const flow = flowRepo.findFlowById(id);
					if (flow) resolved.flows.push(flow);
					break;
				}
				case 'quote': {
					const quote = quoteRepo.findQuoteById(id);
					if (quote) resolved.quotes.push({ quote, book: bookRepo.findBookById(quote.bookId) });
					break;
				}
			}
		}
		return resolved;
	});
}
