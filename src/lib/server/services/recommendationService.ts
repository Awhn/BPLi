// Rule + tag-based recommendation feed (CLAUDE.md §11). No ML: curated sections
// are resolved against the store, then re-ranked by a per-user tag profile built
// from the §11 signals we already capture (reading status, saved quotes, opened
// Flows, personality result). Falls back to the static order for anonymous users.
import type { Book, Chapter, Flow, Quote, RecommendationSection } from '$lib/types';
import { mockRecommendationSections } from '$lib/data/mock';
import * as bookRepo from '$lib/server/repositories/bookRepository';
import * as flowRepo from '$lib/server/repositories/flowRepository';
import * as quoteRepo from '$lib/server/repositories/quoteRepository';
import * as statusRepo from '$lib/server/repositories/readingStatusRepository';
import { findEventsByUserId } from './eventService';
import { getUserPersonality, getResult } from './personalityService';

export interface ResolvedSection {
	section: RecommendationSection;
	books: Book[];
	chapters: { chapter: Chapter; book?: Book }[];
	flows: Flow[];
	quotes: { quote: Quote; book?: Book }[];
}

// Weighted map of category/tag/mood → affinity, derived from the user's activity.
function buildTagProfile(userId: string): Map<string, number> {
	const profile = new Map<string, number>();
	const bump = (tag: string, w: number) => profile.set(tag, (profile.get(tag) ?? 0) + w);

	// Reading status → book categories (finished > reading > wishlist)
	for (const s of statusRepo.findStatusesByUserId(userId)) {
		const weight = s.status === 'finished' ? 3 : s.status === 'reading' ? 2 : 1;
		bookRepo.findBookById(s.bookId)?.categories.forEach((c) => bump(c, weight));
	}
	// Saved quotes → book categories
	for (const q of quoteRepo.findQuotesByUserId(userId)) {
		bookRepo.findBookById(q.bookId)?.categories.forEach((c) => bump(c, 1));
	}
	// Opened Flows → their tags + mood
	for (const e of findEventsByUserId(userId, 'flow_opened')) {
		const flow = flowRepo.findFlowById(String(e.properties.flowId ?? ''));
		flow?.tags.forEach((t) => bump(t, 1));
		if (flow?.mood) bump(flow.mood, 1);
	}
	// Personality test result → preferred genres
	const personality = getUserPersonality(userId);
	if (personality) getResult(personality).categories.forEach((c) => bump(c, 2));

	return profile;
}

function scoreTags(tags: string[], profile: Map<string, number>): number {
	return tags.reduce((sum, t) => sum + (profile.get(t) ?? 0), 0);
}

// Stable re-rank: higher affinity first, original order preserved on ties.
function rankBy<T>(items: T[], score: (item: T) => number): T[] {
	return items
		.map((item, i) => ({ item, i, s: score(item) }))
		.sort((a, b) => b.s - a.s || a.i - b.i)
		.map((x) => x.item);
}

export function getHomeFeed(userId?: string): ResolvedSection[] {
	const resolvedSections = mockRecommendationSections.map((section) => {
		const resolved: ResolvedSection = { section, books: [], chapters: [], flows: [], quotes: [] };
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

	if (!userId) return resolvedSections;
	const profile = buildTagProfile(userId);
	if (profile.size === 0) return resolvedSections; // no signal yet → curated order

	// Re-rank items within each section by tag affinity.
	for (const rs of resolvedSections) {
		rs.books = rankBy(rs.books, (b) => scoreTags(b.categories, profile));
		rs.flows = rankBy(rs.flows, (f) => scoreTags([...f.tags, f.mood ?? ''], profile));
		rs.chapters = rankBy(rs.chapters, (c) => scoreTags(c.book?.categories ?? [], profile));
		rs.quotes = rankBy(rs.quotes, (q) => scoreTags(q.book?.categories ?? [], profile));
	}
	return resolvedSections;
}
