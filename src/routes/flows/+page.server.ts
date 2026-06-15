import type { PageServerLoad } from './$types';
import { getFlows } from '$lib/server/services/flowService';

export const load: PageServerLoad = async () => {
	return { flows: getFlows() };
};
