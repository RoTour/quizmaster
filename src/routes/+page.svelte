<!-- src/routes/+page.svelte -->
<script lang="ts">
	import CategoryCard from "$lib/components/CategoryCard.svelte";
	import { getCategories } from "$lib/services/quiz-service";
	import type { Category } from "$lib/types/quiz";
	import { onMount } from "svelte";

	let categories: Category[] = $state([]);
	let loading = $state(true);

	onMount(async () => {
		categories = await getCategories();
		loading = false;
	});
</script>

<main class="min-h-screen bg-bg-dark px-4 py-8 md:px-8">
	<div class="max-w-4xl mx-auto">
		<!-- Header -->
		<header class="text-center mb-12 animate-slide-up">
			<h1 class="font-display text-5xl md:text-7xl font-extrabold">
				<span class="text-neon-pink">Quiz</span><span class="text-neon-cyan">Master</span>
			</h1>
			<p class="mt-4 text-text-secondary text-lg">Test your knowledge. Level up your skills.</p>
		</header>

		<!-- Categories Grid -->
		<section>
			<h2 class="font-display text-2xl font-bold text-white mb-6 flex items-center gap-3">
				<span class="w-3 h-3 rounded-full bg-neon-green animate-pulse"></span>
				Select a Topic
			</h2>

			{#if loading}
				<div class="grid gap-4 md:grid-cols-2">
					{#each [1, 2] as _}
						<div class="card animate-pulse">
							<div class="h-6 bg-bg-elevated rounded w-3/4 mb-3"></div>
							<div class="h-4 bg-bg-elevated rounded w-1/2"></div>
						</div>
					{/each}
				</div>
			{:else if categories.length === 0}
				<div class="card text-center py-12">
					<p class="text-text-secondary">No quiz categories found.</p>
					<p class="text-text-muted text-sm mt-2">Add quiz JSON files to the /data folder.</p>
				</div>
			{:else}
				<div class="grid gap-4 md:grid-cols-2">
					{#each categories as category (category.id)}
						<div class="animate-slide-up" style="animation-delay: {categories.indexOf(category) * 100}ms">
							<CategoryCard {category} />
						</div>
					{/each}
				</div>
			{/if}
		</section>
	</div>
</main>
