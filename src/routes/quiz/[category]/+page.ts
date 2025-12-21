// src/routes/quiz/[category]/+page.ts

import { getCategoryName } from '$lib/services/quiz-service';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	return {
		categoryId: params.category,
		categoryName: getCategoryName(params.category)
	};
};
