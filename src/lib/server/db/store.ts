// In-memory store backing the MVP. Mirrors the Prisma schema so we can swap
// to PostgreSQL without touching services. Survives for the lifetime of the
// server process only — fine for mock-first development (CLAUDE.md §18).
import type { Book, Chapter, Flow, Quote, Comment, ReadingStatus, AppEvent } from '$lib/types';
import {
	mockBooks,
	mockChapters,
	mockFlows,
	mockQuotes,
	mockComments
} from '$lib/data/mock';

interface Store {
	books: Book[];
	chapters: Chapter[];
	flows: Flow[];
	quotes: Quote[];
	comments: Comment[];
	readingStatuses: ReadingStatus[];
	events: AppEvent[];
}

const globalKey = Symbol.for('bpli.store');

type GlobalWithStore = typeof globalThis & { [globalKey]?: Store };

function createStore(): Store {
	return {
		books: [...mockBooks],
		chapters: [...mockChapters],
		flows: [...mockFlows],
		quotes: [...mockQuotes],
		comments: [...mockComments],
		readingStatuses: [],
		events: []
	};
}

export function getStore(): Store {
	const g = globalThis as GlobalWithStore;
	if (!g[globalKey]) g[globalKey] = createStore();
	return g[globalKey];
}

export function newId(prefix: string): string {
	return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
