// src/routes/quiz/[category]/+page.ts

import { getAvailableTopics, getCategoryName } from '$lib/services/quiz-service';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	try {
		const availableTopics = await getAvailableTopics(params.category, fetch);
		
		return {
			categoryId: params.category,
			categoryName: getCategoryName(params.category),
			availableTopics
		};
	} catch (e) {
		console.error('Error loading topics:', e);
		return {
			categoryId: params.category,
			categoryName: getCategoryName(params.category),
			availableTopics: []
		};
	}
};
