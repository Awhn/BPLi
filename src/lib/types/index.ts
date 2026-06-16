// B PLi core domain types — Book = album, Chapter = track, Flow = playlist

export type BookSourceType = 'user_added' | 'public_api' | 'curated' | 'original' | 'licensed';

export interface Book {
	id: string;
	title: string;
	subtitle?: string;
	author: string;
	publisher?: string;
	coverImageUrl?: string;
	description?: string;
	categories: string[];
	isbn?: string;
	totalPages?: number;
	sourceType: BookSourceType;
	createdAt: string;
	updatedAt: string;
}

export type ContentAvailability = 'metadata_only' | 'preview' | 'full_content' | 'original_content';

export interface Chapter {
	id: string;
	bookId: string;
	title: string;
	order: number;
	estimatedReadingMinutes: number;
	summary?: string;
	contentAvailability: ContentAvailability;
	isOriginal: boolean;
	isCurated: boolean;
	createdAt: string;
	updatedAt: string;
}

export type FlowVisibility = 'private' | 'public';
export type FlowItemType = 'chapter' | 'quote' | 'original';

export interface FlowItem {
	type: FlowItemType;
	refId: string;
	order: number;
}

export interface Flow {
	id: string;
	title: string;
	description?: string;
	coverImageUrl?: string;
	creatorId: string;
	isEditorial: boolean;
	visibility: FlowVisibility;
	items: FlowItem[];
	tags: string[];
	mood?: string;
	estimatedTotalMinutes: number;
	createdAt: string;
	updatedAt: string;
}

export type QuoteSourceType = 'manual' | 'ocr' | 'imported';

export interface Quote {
	id: string;
	userId: string;
	bookId: string;
	chapterId?: string;
	text: string;
	pageNumber?: number;
	imageUrl?: string;
	sourceType: QuoteSourceType;
	createdAt: string;
	updatedAt: string;
}

export type CommentVisibility = 'private' | 'followers' | 'public';

export interface Comment {
	id: string;
	userId: string;
	bookId: string;
	chapterId?: string;
	quoteId?: string;
	pageNumber?: number;
	body: string;
	visibility: CommentVisibility;
	createdAt: string;
	updatedAt: string;
}

export type ReadingStatusValue = 'want_to_read' | 'reading' | 'finished' | 'paused';

export interface ReadingStatus {
	id: string;
	userId: string;
	bookId: string;
	status: ReadingStatusValue;
	currentPage?: number;
	startedAt?: string;
	finishedAt?: string;
	updatedAt: string;
}

export type EventName =
	| 'book_added'
	| 'book_started'
	| 'book_finished'
	| 'chapter_opened'
	| 'chapter_completed'
	| 'quote_created'
	| 'quote_shared'
	| 'comment_created'
	| 'flow_opened'
	| 'flow_saved'
	| 'reading_progress_updated'
	| 'personality_test_completed'
	| 'recommendation_clicked';

export interface MockUser {
	id: string;
	nickname: string;
}

export interface AppEvent {
	id: string;
	userId: string;
	eventName: EventName;
	properties: Record<string, unknown>;
	createdAt: string;
}

export type PersonalityType =
	| 'emotional_collector'
	| 'immersive_explorer'
	| 'sentence_gatherer'
	| 'intellectual_wanderer'
	| 'quiet_finisher'
	| 'taste_curator';

export interface RecommendationSection {
	id: string;
	title: string;
	subtitle?: string;
	itemType: 'book' | 'chapter' | 'flow' | 'quote';
	itemIds: string[];
}
