import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { getBooks, searchBooks, registerBook } from '$lib/server/services/bookService';

export const load: PageServerLoad = async ({ url }) => {
	const query = url.searchParams.get('q') ?? '';
	const results = query ? await searchBooks(query) : getBooks();
	return { query, results };
};

export const actions: Actions = {
	// Add an external search result (Kakao / 정보나루) into the local catalog
	add: async ({ request, locals }) => {
		const form = await request.formData();
		const title = String(form.get('title') ?? '').trim();
		const author = String(form.get('author') ?? '').trim();
		if (!title || !author) return fail(400, { error: '잘못된 도서 정보예요.' });

		const book = registerBook(locals.userId, {
			title,
			author,
			publisher: String(form.get('publisher') ?? '').trim() || undefined,
			isbn: String(form.get('isbn') ?? '').trim() || undefined,
			coverImageUrl: String(form.get('coverImageUrl') ?? '').trim() || undefined,
			description: String(form.get('description') ?? '').trim() || undefined,
			sourceType: 'public_api'
		});
		redirect(303, `/books/${book.id}`);
	},
	register: async ({ request, locals }) => {
		const form = await request.formData();
		const title = String(form.get('title') ?? '').trim();
		const author = String(form.get('author') ?? '').trim();
		if (!title || !author) {
			return fail(400, { error: '제목과 저자를 입력해주세요.' });
		}
		const book = registerBook(locals.userId, {
			title,
			author,
			publisher: String(form.get('publisher') ?? '').trim() || undefined,
			isbn: String(form.get('isbn') ?? '').trim() || undefined
		});
		redirect(303, `/books/${book.id}`);
	}
};
