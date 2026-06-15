// Event logging for Wrapped and recommendations (CLAUDE.md §17).
// Every meaningful user action goes through here from day one.
import type { AppEvent, EventName } from '$lib/types';
import { getStore, newId } from '$lib/server/db/store';

export function logEvent(
	userId: string,
	eventName: EventName,
	properties: Record<string, unknown> = {}
): AppEvent {
	const event: AppEvent = {
		id: newId('evt'),
		userId,
		eventName,
		properties,
		createdAt: new Date().toISOString()
	};
	getStore().events.push(event);
	return event;
}

export function findEventsByUserId(userId: string, eventName?: EventName): AppEvent[] {
	return getStore().events.filter(
		(e) => e.userId === userId && (!eventName || e.eventName === eventName)
	);
}
