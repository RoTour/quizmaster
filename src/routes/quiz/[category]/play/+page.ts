// src/routes/quiz/[category]/play/+page.ts

import { getQuestions } from '$lib/services/quiz-service';
import type { QuizType } from '$lib/types/quiz';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, url, fetch }) => {
	const type = (url.searchParams.get('type') ?? 'RANDOM') as QuizType | 'RANDOM';
	const count = parseInt(url.searchParams.get('count') ?? '10', 10) as 10 | 35 | 50;
	const topicsParam = url.searchParams.get('topics');
	const topics = topicsParam ? topicsParam.split(',') : [];

	try {
		const questions = await getQuestions(params.category, type, count, topics, fetch);

		if (questions.length === 0) {
			throw error(404, 'No questions found for this configuration');
		}

		return {
			categoryId: params.category,
			questions,
			type,
			totalCount: count
		};
	} catch (e) {
		throw error(500, 'Failed to load quiz questions');
	}
};
