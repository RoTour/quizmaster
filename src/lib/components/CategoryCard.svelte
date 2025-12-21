<!-- src/lib/components/CategoryCard.svelte -->
<script lang="ts">
	import type { Category } from "$lib/types/quiz";

	type Props = {
		category: Category;
	};

	let { category }: Props = $props();
</script>

<a href="/quiz/{category.id}" class="card group block cursor-pointer">
	<div class="flex items-start justify-between gap-4">
		<div class="flex-1">
			<h2 class="font-display text-xl font-bold text-white group-hover:text-neon-pink transition-colors">
				{category.name}
			</h2>
			<p class="mt-2 text-text-secondary text-sm">
				{category.questionCount} questions available
			</p>
		</div>
		<div class="flex flex-col gap-1">
			{#each category.types as type}
				<span
					class="text-xs font-medium px-2 py-1 rounded-md"
					class:bg-neon-pink={type === "THEORY"}
					class:text-bg-dark={type === "THEORY"}
					class:bg-neon-cyan={type === "ARCHITECT"}
					class:bg-neon-yellow={type === "DEFAULT"}
				>
					{type}
				</span>
			{/each}
		</div>
	</div>

	<div
		class="mt-4 flex items-center gap-2 text-neon-green text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
	>
		<span>Start Quiz</span>
		<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
		</svg>
	</div>
</a>
