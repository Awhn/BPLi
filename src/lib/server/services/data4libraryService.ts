// 도서관 정보나루 (data4library.kr) integrations beyond search:
// popular loans, reader recommendations, book keywords.
// Each call falls back to curated mock data when DATA4LIBRARY_AUTH_KEY is
// missing or the API fails, so the product UX works end-to-end in dev.
import { env } from '$env/dynamic/private';
import type { Book } from '$lib/types';
import { mockBooks } from '$lib/data/mock';

const BASE = 'https://data4library.kr/api';

interface D4LBookDoc {
	bookname: string;
	authors: string;
	publisher: string;
	isbn13: string;
	bookImageURL?: string;
	class_nm?: string;
}

function toBook(doc: D4LBookDoc, idPrefix: string): Book {
	const now = new Date().toISOString();
	return {
		id: `${idPrefix}-${doc.isbn13}`,
		title: doc.bookname,
		author: doc.authors,
		publisher: doc.publisher,
		coverImageUrl: doc.bookImageURL || undefined,
		categories: doc.class_nm ? [doc.class_nm] : [],
		isbn: doc.isbn13,
		sourceType: 'public_api',
		createdAt: now,
		updatedAt: now
	};
}

async function fetchJson<T>(url: string): Promise<T | null> {
	try {
		const res = await fetch(url);
		if (!res.ok) return null;
		return (await res.json()) as T;
	} catch {
		return null;
	}
}

// 인기 대출 도서 — home feed "20-30대가 지금 가장 많이 읽는 책" (loanItemSrch)
export async function getPopularLoanBooks(age = 20): Promise<Book[]> {
	const authKey = env.DATA4LIBRARY_AUTH_KEY;
	if (authKey) {
		const data = await fetchJson<{ response?: { docs?: { doc: D4LBookDoc }[] } }>(
			`${BASE}/loanItemSrch?authKey=${authKey}&age=${age}&pageNo=1&pageSize=8&format=json`
		);
		const docs = data?.response?.docs;
		if (docs?.length) return docs.map(({ doc }) => toBook(doc, 'pop'));
	}
	// fallback: curated picks from the local catalog
	return [mockBooks[2], mockBooks[0], mockBooks[1], mockBooks[5]];
}

// "이 책을 읽은 사람은 이런 책도" — book detail companion shelf (recommandList)
export async function getReaderRecommendations(isbn: string): Promise<Book[]> {
	const authKey = env.DATA4LIBRARY_AUTH_KEY;
	if (authKey && isbn) {
		const data = await fetchJson<{ response?: { docs?: { book: D4LBookDoc }[] } }>(
			`${BASE}/recommandList?authKey=${authKey}&isbn13=${isbn}&format=json`
		);
		const docs = data?.response?.docs;
		if (docs?.length) return docs.slice(0, 6).map(({ book }) => toBook(book, 'rec'));
	}
	// fallback: other curated books from the catalog
	return mockBooks.filter((b) => b.isbn !== isbn).slice(0, 4);
}

// 책별 핵심 키워드 — tag-cloud style hints on the book detail page (keywordList)
export async function getBookKeywords(isbn: string): Promise<string[]> {
	const authKey = env.DATA4LIBRARY_AUTH_KEY;
	if (authKey && isbn) {
		const data = await fetchJson<{
			response?: { items?: { item: { word: string } }[] };
		}>(`${BASE}/keywordList?authKey=${authKey}&isbn13=${isbn}&additionalYN=N&format=json`);
		const items = data?.response?.items;
		if (items?.length) return items.slice(0, 8).map(({ item }) => item.word);
	}
	return [];
}
