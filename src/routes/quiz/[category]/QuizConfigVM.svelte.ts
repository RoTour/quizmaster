// src/routes/quiz/[category]/QuizConfigVM.svelte.ts

import type { QuizType } from '$lib/types/quiz';

export type TypeOption = QuizType | 'RANDOM';
export type CountOption = 10 | 35 | 50;

export class QuizConfigVM {
	categoryId: string;
	categoryName: string;

	selectedType: TypeOption = $state('RANDOM');
	selectedCount: CountOption = $state(10);
	selectedTopics: string[] = $state([]);
	availableTopics: string[] = $state([]);

	readonly typeOptions: { value: TypeOption; label: string; color: string }[] = [
		{ value: 'THEORY', label: 'Theory', color: 'neon-pink' },
		{ value: 'ARCHITECT', label: 'Architect', color: 'neon-cyan' },
		{ value: 'RANDOM', label: 'Random Mix', color: 'neon-green' }
	];

	readonly countOptions: CountOption[] = [10, 35, 50];

	constructor(categoryId: string, categoryName: string, availableTopics: string[]) {
		this.categoryId = categoryId;
		this.categoryName = categoryName;
		this.availableTopics = availableTopics;
	}

	toggleTopic(topic: string) {
		if (this.selectedTopics.includes(topic)) {
			this.selectedTopics = this.selectedTopics.filter(t => t !== topic);
		} else {
			this.selectedTopics = [...this.selectedTopics, topic];
		}
	}

	clearTopics() {
		this.selectedTopics = [];
	}

	get startUrl(): string {
		const params = new URLSearchParams();
		params.set('type', this.selectedType);
		params.set('count', this.selectedCount.toString());
		
		if (this.selectedTopics.length > 0) {
			params.set('topics', this.selectedTopics.join(','));
		}
		
		return `/quiz/${this.categoryId}/play?${params.toString()}`;
	}
}
