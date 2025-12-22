<!-- src/routes/quiz/[category]/play/+page.svelte -->
<script lang="ts">
	import { goto } from "$app/navigation";
	import type { Question } from "$lib/types/quiz";
	import { QuizPlayerVM } from "./QuizPlayerVM.svelte";

	type Props = {
		data: {
			categoryId: string;
			questions: Question[];
		};
	};

	let { data }: Props = $props();
	const vm = new QuizPlayerVM(data.categoryId, data.questions);

	function handleFinish() {
		goto(`/quiz/${data.categoryId}/results?data=${vm.resultsData}`);
	}
</script>

<main class="min-h-screen bg-bg-dark px-4 py-6 md:px-8">
	<div class="max-w-3xl mx-auto">
		<!-- Progress Bar -->
		<div class="mb-6">
			<div class="flex justify-between items-center mb-2">
				<span class="text-xs text-text-muted font-medium">
					Question {vm.currentIndex + 1} of {vm.questions.length}
				</span>
				<span class="text-xs font-bold text-neon-green">
					Score: {vm.score}
				</span>
			</div>
			<div class="h-2 bg-bg-elevated rounded-full overflow-hidden">
				<div
					class="h-full bg-gradient-to-r from-neon-pink to-neon-cyan transition-all duration-300"
					style="width: {vm.progress}%"
				></div>
			</div>
		</div>

		<!-- Question Card -->
		<div class="card neon-border mb-6 animate-slide-up">
			{#if vm.currentQuestion.topic}
				<div
					class="inline-block px-3 py-1 rounded-full bg-neon-pink/10 border border-neon-pink/30 text-neon-pink text-xs font-bold uppercase tracking-wider mb-4"
				>
					{vm.currentQuestion.topic}
				</div>
			{/if}
			<h2 class="font-display text-lg md:text-xl font-semibold text-white leading-relaxed">
				{vm.currentQuestion.prompt}
			</h2>
		</div>

		<!-- Options -->
		<div class="space-y-3">
			{#each vm.currentQuestion.options as option, index}
				{@const state = vm.getOptionState(index)}
				{@const isAnswered = vm.hasAnsweredCurrent}
				<button
					type="button"
					class="w-full text-left p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer
						{state === 'default' ? 'bg-bg-card border-bg-elevated' : ''}
						{state === 'default' && !isAnswered ? 'hover:border-neon-pink' : ''}
						{state === 'correct' ? 'bg-success/20 border-success' : ''}
						{state === 'incorrect' ? 'bg-error/20 border-error' : ''}
						{isAnswered && state === 'default' ? 'opacity-50' : ''}"
					disabled={isAnswered}
					onclick={() => vm.selectOption(index)}
				>
					<div class="flex gap-3">
						<span
							class="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm
								{state === 'default' ? 'bg-bg-elevated text-text-secondary' : ''}
								{state === 'correct' ? 'bg-success text-white' : ''}
								{state === 'incorrect' ? 'bg-error text-white' : ''}"
						>
							{String.fromCharCode(65 + index)}
						</span>
						<span class="text-white text-sm md:text-base leading-relaxed">
							{option.content}
						</span>
					</div>
				</button>
			{/each}
		</div>

		<!-- Next Button -->
		{#if vm.hasAnsweredCurrent}
			<div class="mt-8 animate-slide-up">
				{#if vm.isLastQuestion}
					<button type="button" class="btn btn-primary w-full text-lg py-4" onclick={handleFinish}>
						View Results
						<svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
						</svg>
					</button>
				{:else}
					<button type="button" class="btn btn-secondary w-full text-lg py-4" onclick={() => vm.nextQuestion()}>
						Next Question
						<svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
						</svg>
					</button>
				{/if}
			</div>
		{/if}
	</div>
</main>
