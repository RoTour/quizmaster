// src/routes/quiz/[category]/play/QuizPlayerVM.svelte.ts

import type { Question } from '$lib/types/quiz';

export type AnswerState = {
	questionId: string;
	selectedIndex: number;
	correct: boolean;
};

export class QuizPlayerVM {
	categoryId: string;
	questions: Question[];

	currentIndex = $state(0);
	score = $state(0);
	answers: Map<string, AnswerState> = $state(new Map());
	selectedOptionIndex: number | null = $state(null);
	showingFeedback = $state(false);

	constructor(categoryId: string, questions: Question[]) {
		this.categoryId = categoryId;
		this.questions = questions;
	}

	get currentQuestion(): Question {
		return this.questions[this.currentIndex];
	}

	get progress(): number {
		return ((this.currentIndex + 1) / this.questions.length) * 100;
	}

	get isLastQuestion(): boolean {
		return this.currentIndex >= this.questions.length - 1;
	}

	get isComplete(): boolean {
		return this.answers.size >= this.questions.length;
	}

	get hasAnsweredCurrent(): boolean {
		return this.answers.has(this.currentQuestion.id);
	}

	selectOption(index: number): void {
		if (this.hasAnsweredCurrent) return;

		this.selectedOptionIndex = index;
		this.showingFeedback = true;

		const option = this.currentQuestion.options[index];
		const correct = option.correct;

		if (correct) {
			this.score++;
		}

		// Create a new Map to trigger Svelte 5 reactivity
		const newAnswers = new Map(this.answers);
		newAnswers.set(this.currentQuestion.id, {
			questionId: this.currentQuestion.id,
			selectedIndex: index,
			correct
		});
		this.answers = newAnswers;
	}

	nextQuestion(): void {
		if (this.currentIndex < this.questions.length - 1) {
			this.currentIndex++;
			this.selectedOptionIndex = null;
			this.showingFeedback = false;
		}
	}

	getOptionState(index: number): 'default' | 'selected' | 'correct' | 'incorrect' {
		if (!this.showingFeedback) return 'default';

		const option = this.currentQuestion.options[index];

		if (option.correct) return 'correct';
		if (index === this.selectedOptionIndex && !option.correct) return 'incorrect';
		return 'default';
	}

	get resultsData(): string {
		const data = {
			categoryId: this.categoryId,
			score: this.score,
			total: this.questions.length,
			answers: Array.from(this.answers.entries()).map(([qId, ans]) => ({
				questionId: qId,
				selectedIndex: ans.selectedIndex,
				correct: ans.correct
			}))
		};
		return encodeURIComponent(JSON.stringify(data));
	}
}
