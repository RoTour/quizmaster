// src/routes/quiz/[category]/+page.ts

import { getAvailableTopics, getCategoryName, isValidCategory } from '$lib/services/quiz-service';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	if (!isValidCategory(params.category)) {
		error(404, 'Category not found');
	}

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
