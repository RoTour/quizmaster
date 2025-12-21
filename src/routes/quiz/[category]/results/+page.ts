// src/routes/quiz/[category]/results/+page.ts

import { getCategoryName, getQuestions } from '$lib/services/quiz-service';
import type { Question } from '$lib/types/quiz';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

type ResultsData = {
	categoryId: string;
	score: number;
	total: number;
	answers: Array<{
		questionId: string;
		selectedIndex: number;
		correct: boolean;
	}>;
};

export const load: PageLoad = async ({ params, url }) => {
	const dataParam = url.searchParams.get('data');

	if (!dataParam) {
		throw error(400, 'Missing results data');
	}

	try {
		const resultsData: ResultsData = JSON.parse(decodeURIComponent(dataParam));

		// Fetch all questions to show in review
		const questions = await getQuestions(params.category, 'RANDOM', 500);

		// Create a map for quick lookup
		const questionMap = new Map<string, Question>();
		questions.forEach((q) => questionMap.set(q.id, q));

		// Build review data
		const reviewItems = resultsData.answers.map((answer) => {
			const question = questionMap.get(answer.questionId);
			return {
				question,
				selectedIndex: answer.selectedIndex,
				correct: answer.correct
			};
		});

		return {
			categoryId: params.category,
			categoryName: getCategoryName(params.category),
			score: resultsData.score,
			total: resultsData.total,
			reviewItems
		};
	} catch {
		throw error(400, 'Invalid results data');
	}
};
