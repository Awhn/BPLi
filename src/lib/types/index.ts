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
	previewBody?: string; // short excerpt shown as the actual reading surface (§6.2 Play over Archive)
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

// Structured emotion tag on a comment — a recommendation signal (§11) and a
// Wrapped metric "가장 많이 남긴 감정" (§10.3). Closed vocabulary so it aggregates.
export type CommentEmotion =
	| 'comfort' // 위로
	| 'flutter' // 설렘
	| 'ache' // 먹먹함
	| 'insight' // 통찰
	| 'immersion' // 몰입
	| 'humor'; // 유쾌

export interface Comment {
	id: string;
	userId: string;
	bookId: string;
	chapterId?: string;
	quoteId?: string;
	pageNumber?: number;
	body: string;
	emotion?: CommentEmotion;
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

export interface PersonalityOption {
	label: string;
	// Per-type weights this answer contributes toward the final result
	weights: Partial<Record<PersonalityType, number>>;
}

export interface PersonalityQuestion {
	id: string;
	prompt: string;
	options: PersonalityOption[];
}

export interface PersonalityResult {
	type: PersonalityType;
	name: string; // e.g. 감성 수집가형
	tagline: string;
	description: string;
	recommendedBookIds: string[];
	recommendedFlowIds: string[];
	categories: string[]; // preferred genres, feeds §11 personalization
}

export interface RecommendationSection {
	id: string;
	title: string;
	subtitle?: string;
	itemType: 'book' | 'chapter' | 'flow' | 'quote';
	itemIds: string[];
}
