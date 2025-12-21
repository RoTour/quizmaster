// src/lib/services/quiz-service.ts

import type { Category, Question, QuizData, QuizType } from '$lib/types/quiz';

// Categories metadata - in a real app, you might auto-discover this from the file system
const CATEGORIES_META: Record<string, { name: string; files: string[] }> = {
	'aws-saa': {
		name: 'AWS Solutions Architect Associate',
		files: ['aws-saa-1-21.json']
	}
	// Add more categories as needed:
	// 'aws-cp': {
	//   name: 'AWS Cloud Practitioner',
	//   files: ['aws-cp-1.json']
	// }
};

export async function getCategories(): Promise<Category[]> {
	const categories: Category[] = [];

	for (const [id, meta] of Object.entries(CATEGORIES_META)) {
		const allQuestions: Question[] = [];
		const typesSet = new Set<QuizType>();

		for (const file of meta.files) {
			const response = await fetch(`/data/${id}/${file}`);
			const data: QuizData[] = await response.json();

			for (const quizData of data) {
				allQuestions.push(...quizData.quiz.questions);
				typesSet.add(quizData.quiz.type);
			}
		}

		categories.push({
			id,
			name: meta.name,
			questionCount: allQuestions.length,
			types: Array.from(typesSet)
		});
	}

	return categories;
}

export async function getQuestions(
	categoryId: string,
	type: QuizType | 'RANDOM',
	count: number
): Promise<Question[]> {
	const meta = CATEGORIES_META[categoryId];
	if (!meta) {
		throw new Error(`Category "${categoryId}" not found`);
	}

	const allQuestions: Question[] = [];

	for (const file of meta.files) {
		const response = await fetch(`/data/${categoryId}/${file}`);
		const data: QuizData[] = await response.json();

		for (const quizData of data) {
			if (type === 'RANDOM' || quizData.quiz.type === type) {
				allQuestions.push(...quizData.quiz.questions);
			}
		}
	}

	// Shuffle questions
	const shuffled = allQuestions.sort(() => Math.random() - 0.5);

	// Return requested count (or all if less available)
	return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function getCategoryName(categoryId: string): string {
	return CATEGORIES_META[categoryId]?.name ?? categoryId;
}
