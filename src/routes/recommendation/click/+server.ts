import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { logEvent } from '$lib/server/services/eventService';

// Fire-and-forget analytics ping for recommendation clicks (§17, §11 signal).
// Called via sendBeacon/fetch just before the card navigates.
export const POST: RequestHandler = async ({ request, locals }) => {
	let payload: { sectionId?: string; itemType?: string; itemId?: string } = {};
	try {
		payload = await request.json();
	} catch {
		// tolerate empty/malformed beacon bodies
	}
	logEvent(locals.userId, 'recommendation_clicked', {
		sectionId: payload.sectionId ?? null,
		itemType: payload.itemType ?? null,
		itemId: payload.itemId ?? null
	});
	return json({ ok: true });
};
