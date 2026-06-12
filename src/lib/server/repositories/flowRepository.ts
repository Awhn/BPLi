import type { Flow } from '$lib/types';
import { getStore } from '$lib/server/db/store';

export function findAllFlows(): Flow[] {
	return getStore().flows.filter((f) => f.visibility === 'public');
}

export function findFlowById(id: string): Flow | undefined {
	return getStore().flows.find((f) => f.id === id);
}

export function findEditorialFlows(): Flow[] {
	return getStore().flows.filter((f) => f.isEditorial && f.visibility === 'public');
}
