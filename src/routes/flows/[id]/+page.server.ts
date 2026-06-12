import type { PageServerLoad, Actions } from './$types';
import { error } from '@sveltejs/kit';
import { getFlowDetail, saveFlow } from '$lib/server/services/flowService';

export const load: PageServerLoad = async ({ params, locals }) => {
	const detail = getFlowDetail(params.id, locals.userId);
	if (!detail) error(404, 'Flow를 찾을 수 없어요');
	return detail;
};

export const actions: Actions = {
	save: async ({ params, locals }) => {
		saveFlow(locals.userId, params.id);
		return { saved: true };
	}
};
