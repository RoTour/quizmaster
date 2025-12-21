// src/routes/quiz/[category]/QuizConfigVM.svelte.ts

import type { QuizType } from '$lib/types/quiz';

export type TypeOption = QuizType | 'RANDOM';
export type CountOption = 10 | 35 | 50;

export class QuizConfigVM {
	categoryId: string;
	categoryName: string;

	selectedType: TypeOption = $state('RANDOM');
	selectedCount: CountOption = $state(10);

	readonly typeOptions: { value: TypeOption; label: string; color: string }[] = [
		{ value: 'THEORY', label: 'Theory', color: 'neon-pink' },
		{ value: 'ARCHITECT', label: 'Architect', color: 'neon-cyan' },
		{ value: 'RANDOM', label: 'Random Mix', color: 'neon-green' }
	];

	readonly countOptions: CountOption[] = [10, 35, 50];

	constructor(categoryId: string, categoryName: string) {
		this.categoryId = categoryId;
		this.categoryName = categoryName;
	}

	get startUrl(): string {
		return `/quiz/${this.categoryId}/play?type=${this.selectedType}&count=${this.selectedCount}`;
	}
}
