// Dual-source book search: Kakao Books (fast keyword match, cover images)
// + 도서관 정보나루 data4library (ISBN detail, KDC, library holdings).
// Without API keys both sources are skipped and local mock data is used,
// so the app stays fully functional in development (CLAUDE.md §18).
import { env } from '$env/dynamic/private';
import type { Book } from '$lib/types';

interface KakaoBookDocument {
	title: string;
	authors: string[];
	publisher: string;
	isbn: string;
	contents: string;
	thumbnail: string;
}

async function searchKakaoBooks(query: string): Promise<Book[]> {
	const apiKey = env.KAKAO_REST_API_KEY;
	if (!apiKey) return [];
	try {
		const res = await fetch(
			`https://dapi.kakao.com/v3/search/book?query=${encodeURIComponent(query)}&size=10`,
			{ headers: { Authorization: `KakaoAK ${apiKey}` } }
		);
		if (!res.ok) return [];
		const data = (await res.json()) as { documents: KakaoBookDocument[] };
		const now = new Date().toISOString();
		return data.documents.map((doc, i) => ({
			id: `kakao-${doc.isbn.split(' ').pop() ?? i}`,
			title: doc.title,
			author: doc.authors.join(', '),
			publisher: doc.publisher,
			coverImageUrl: doc.thumbnail || undefined,
			description: doc.contents || undefined,
			categories: [],
			isbn: doc.isbn.split(' ').pop(),
			sourceType: 'public_api' as const,
			createdAt: now,
			updatedAt: now
		}));
	} catch {
		return [];
	}
}

interface Data4LibraryDoc {
	bookname: string;
	authors: string;
	publisher: string;
	isbn13: string;
	bookImageURL: string;
	description?: string;
	class_nm?: string;
}

async function searchData4Library(query: string): Promise<Book[]> {
	const authKey = env.DATA4LIBRARY_AUTH_KEY;
	if (!authKey) return [];
	try {
		const res = await fetch(
			`https://data4library.kr/api/srchBooks?authKey=${authKey}&keyword=${encodeURIComponent(query)}&pageNo=1&pageSize=10&format=json`
		);
		if (!res.ok) return [];
		const data = (await res.json()) as {
			response?: { docs?: { doc: Data4LibraryDoc }[] };
		};
		const docs = data.response?.docs ?? [];
		const now = new Date().toISOString();
		return docs.map(({ doc }) => ({
			id: `d4l-${doc.isbn13}`,
			title: doc.bookname,
			author: doc.authors,
			publisher: doc.publisher,
			coverImageUrl: doc.bookImageURL || undefined,
			description: doc.description,
			categories: doc.class_nm ? [doc.class_nm] : [],
			isbn: doc.isbn13,
			sourceType: 'public_api' as const,
			createdAt: now,
			updatedAt: now
		}));
	} catch {
		return [];
	}
}

export async function searchExternalBooks(query: string): Promise<Book[]> {
	const [kakao, d4l] = await Promise.all([searchKakaoBooks(query), searchData4Library(query)]);
	// Kakao first (faster keyword relevance), 정보나루 fills in what's missing
	const seen = new Set(kakao.map((b) => b.isbn).filter(Boolean));
	return [...kakao, ...d4l.filter((b) => !b.isbn || !seen.has(b.isbn))];
}

export interface LibraryAvailability {
	libraryName: string;
	available: boolean;
}

// "이 책 주변 도서관에 있어요" — informational only, no realtime reservation (CLAUDE.md §12)
export async function findLibrariesWithBook(
	isbn: string,
	regionCode = '11' // 서울
): Promise<LibraryAvailability[]> {
	const authKey = env.DATA4LIBRARY_AUTH_KEY;
	if (!authKey) return [];
	try {
		const res = await fetch(
			`https://data4library.kr/api/libSrchByBook?authKey=${authKey}&isbn=${isbn}&region=${regionCode}&format=json`
		);
		if (!res.ok) return [];
		const data = (await res.json()) as {
			response?: { libs?: { lib: { libName: string } }[] };
		};
		return (data.response?.libs ?? []).map(({ lib }) => ({
			libraryName: lib.libName,
			available: true
		}));
	} catch {
		return [];
	}
}
