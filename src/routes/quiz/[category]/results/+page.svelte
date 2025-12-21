<!-- src/routes/quiz/[category]/results/+page.svelte -->
<script lang="ts">
	import type { Question } from "$lib/types/quiz";

	type ReviewItem = {
		question: Question | undefined;
		selectedIndex: number;
		correct: boolean;
	};

	type Props = {
		data: {
			categoryId: string;
			categoryName: string;
			score: number;
			total: number;
			reviewItems: ReviewItem[];
		};
	};

	let { data }: Props = $props();

	const percentage = Math.round((data.score / data.total) * 100);

	function getScoreColor(): string {
		if (percentage >= 80) return "text-neon-green";
		if (percentage >= 60) return "text-neon-yellow";
		return "text-neon-pink";
	}

	function getScoreMessage(): string {
		if (percentage >= 90) return "Excellent! 🎉";
		if (percentage >= 80) return "Great job! 🌟";
		if (percentage >= 60) return "Good effort! 💪";
		if (percentage >= 40) return "Keep practicing! 📚";
		return "Time to study! 🎯";
	}
</script>

<main class="min-h-screen bg-bg-dark px-4 py-8 md:px-8">
	<div class="max-w-3xl mx-auto">
		<!-- Score Card -->
		<div class="card neon-border text-center mb-8 animate-slide-up">
			<h1 class="font-display text-2xl font-bold text-white mb-4">
				{data.categoryName}
			</h1>

			<div class="mb-4">
				<span class="font-display text-6xl md:text-8xl font-extrabold {getScoreColor()}">
					{percentage}%
				</span>
			</div>

			<p class="text-xl text-white mb-2">
				{data.score} / {data.total} correct
			</p>

			<p class="text-lg text-text-secondary">
				{getScoreMessage()}
			</p>
		</div>

		<!-- Action Buttons -->
		<div class="flex gap-4 mb-10 animate-slide-up" style="animation-delay: 100ms">
			<a href="/quiz/{data.categoryId}" class="btn btn-primary flex-1">
				<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
					/>
				</svg>
				Try Again
			</a>
			<a href="/" class="btn btn-secondary flex-1">
				<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
					/>
				</svg>
				Home
			</a>
		</div>

		<!-- Review Section -->
		<section class="animate-slide-up" style="animation-delay: 200ms">
			<h2 class="font-display text-xl font-bold text-white mb-6 flex items-center gap-2">
				<span class="w-2 h-2 rounded-full bg-neon-cyan"></span>
				Review Answers
			</h2>

			<div class="space-y-4">
				{#each data.reviewItems as item, index}
					{#if item.question}
						<details class="card group">
							<summary class="cursor-pointer flex items-start gap-3 list-none">
								<span
									class="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
									class:bg-success={item.correct}
									class:text-white={item.correct}
									class:bg-error={!item.correct}
								>
									{item.correct ? "✓" : "✗"}
								</span>
								<div class="flex-1">
									<p class="text-white text-sm font-medium leading-relaxed pr-8">
										{index + 1}. {item.question.prompt}
									</p>
								</div>
								<svg
									class="w-5 h-5 text-text-muted shrink-0 transition-transform group-open:rotate-180"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
								</svg>
							</summary>

							<div class="mt-4 pt-4 border-t border-bg-elevated space-y-2">
								{#each item.question.options as option, optIndex}
									{@const isSelected = optIndex === item.selectedIndex}
									{@const isCorrect = option.correct}
									{@const isWrongSelection = isSelected && !isCorrect}
									<div
										class="p-3 rounded-lg text-sm
										{isCorrect ? 'bg-success/20 border border-success' : ''}
										{isWrongSelection ? 'bg-error/20 border border-error' : ''}
										{!isCorrect && !isWrongSelection && isSelected ? 'border' : ''}"
									>
										<div class="flex gap-2 items-start">
											<span class="font-bold text-text-muted shrink-0">
												{String.fromCharCode(65 + optIndex)}.
											</span>
											<span class="text-text-primary">
												{option.content}
											</span>
										</div>
									</div>
								{/each}
							</div>
						</details>
					{/if}
				{/each}
			</div>
		</section>
	</div>
</main>
