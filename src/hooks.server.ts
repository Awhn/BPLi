// Temp user auth (CLAUDE.md §18-3): a cookie-scoped anonymous user until
// real OAuth lands. Every request gets a stable userId for quotes, statuses
// and event logging.
import type { Handle } from '@sveltejs/kit';

const USER_COOKIE = 'bpli_uid';

export const handle: Handle = async ({ event, resolve }) => {
	let userId = event.cookies.get(USER_COOKIE);
	if (!userId) {
		userId = `user-${crypto.randomUUID()}`;
		event.cookies.set(USER_COOKIE, userId, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 365
		});
	}
	event.locals.userId = userId;
	return resolve(event);
};
