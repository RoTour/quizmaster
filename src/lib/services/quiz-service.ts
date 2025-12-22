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

export async function getAvailableTopics(categoryId: string, customFetch = fetch): Promise<string[]> {
	const meta = CATEGORIES_META[categoryId];
	if (!meta) {
		throw new Error(`Category "${categoryId}" not found`);
	}

	const topics = new Set<string>();

	for (const file of meta.files) {
		const response = await customFetch(`/data/${categoryId}/${file}`);
		const data: QuizData[] = await response.json();

		for (const quizData of data) {
			for (const question of quizData.quiz.questions) {
				if (question.topic) {
					topics.add(question.topic);
				}
			}
		}
	}

	return Array.from(topics).sort();
}

export async function getQuestions(
	categoryId: string,
	type: QuizType | 'RANDOM',
	count: number,
	selectedTopics: string[] = [],
	customFetch = fetch
): Promise<Question[]> {
	const meta = CATEGORIES_META[categoryId];
	if (!meta) {
		throw new Error(`Category "${categoryId}" not found`);
	}

	const allQuestions: Question[] = [];

	for (const file of meta.files) {
		const response = await customFetch(`/data/${categoryId}/${file}`);
		const data: QuizData[] = await response.json();

		for (const quizData of data) {
			// Filter by Type
			if (type !== 'RANDOM' && quizData.quiz.type !== type) {
				continue;
			}

			// Filter by Topics
			const filteredQuestions = quizData.quiz.questions.filter(q => {
				// If no topics selected, include all (or maybe all that have a topic? No, usually all)
				if (selectedTopics.length === 0) return true;
				// If question has no topic, maybe exclude it? Or include? 
				// The requirement is "select topic(s) ... as an optional input".
				// If user selects topics, they probably only want those topics.
				// If question has no topic, it doesn't match the selection.
				return q.topic && selectedTopics.includes(q.topic);
			});

			allQuestions.push(...filteredQuestions);
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

export function isValidCategory(categoryId: string): boolean {
	return categoryId in CATEGORIES_META;
}
