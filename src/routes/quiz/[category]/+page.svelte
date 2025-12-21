<!-- src/routes/quiz/[category]/+page.svelte -->
<script lang="ts">
  import { QuizConfigVM } from "./QuizConfigVM.svelte";

  type Props = {
    data: {
      categoryId: string;
      categoryName: string;
      availableTopics: string[];
    };
  };

  let { data }: Props = $props();
  let vm = $derived(
    new QuizConfigVM(data.categoryId, data.categoryName, data.availableTopics),
  );
</script>

<main class="min-h-screen bg-bg-dark px-4 py-8 md:px-8">
  <div class="max-w-4xl mx-auto">
    <!-- Back Link -->
    <a
      href="/"
      class="inline-flex items-center gap-2 text-text-secondary hover:text-neon-pink transition-colors mb-8"
    >
      <svg
        class="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <span>Back to Topics</span>
    </a>

    <!-- Header -->
    <header class="mb-10 animate-slide-up">
      <h1 class="font-display text-3xl md:text-4xl font-bold text-white">
        {vm.categoryName}
      </h1>
      <p class="mt-2 text-text-secondary">Configure your quiz settings</p>
    </header>

    <!-- Type Selection -->
    <section class="mb-8 animate-slide-up" style="animation-delay: 100ms">
      <h2
        class="font-display text-lg font-semibold text-white mb-4 flex items-center gap-2"
      >
        <span class="w-2 h-2 rounded-full bg-neon-pink"></span>
        Question Type
      </h2>
      <div class="custom-grid">
        {#each vm.typeOptions as option}
          {@const isSelected = vm.selectedType === option.value}
          {@const borderClass = isSelected
            ? option.color === "neon-pink"
              ? "neon-border"
              : option.color === "neon-cyan"
                ? "neon-border-cyan"
                : "neon-border-green"
            : ""}
          <button
            type="button"
            class="card cursor-pointer text-left transition-all relative {borderClass}"
            onclick={() => (vm.selectedType = option.value)}
          >
            <div class="flex items-center justify-between gap-2">
              <div class="flex-1">
                <div class="font-display font-semibold text-white">
                  {option.label}
                </div>
                <div class="text-xs text-text-muted mt-1">
                  {#if option.value === "THEORY"}
                    Concept-focused
                  {:else if option.value === "ARCHITECT"}
                    Scenario-based
                  {:else}
                    Mix of all types
                  {/if}
                </div>
              </div>
              {#if isSelected}
                <svg
                  class="w-5 h-5 text-neon-cyan shrink-0 absolute right-4 top-1/2 -translate-y-1/2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              {/if}
            </div>
          </button>
        {/each}
      </div>
    </section>

    <!-- Count Selection -->
    <section class="mb-10 animate-slide-up" style="animation-delay: 200ms">
      <h2
        class="font-display text-lg font-semibold text-white mb-4 flex items-center gap-2"
      >
        <span class="w-2 h-2 rounded-full bg-neon-cyan"></span>
        Number of Questions
      </h2>
      <div
        style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem;"
      >
        {#each vm.countOptions as count}
          <button
            type="button"
            class="card cursor-pointer text-center transition-all {vm.selectedCount ===
            count
              ? 'neon-border-cyan'
              : ''}"
            onclick={() => (vm.selectedCount = count)}
          >
            <span class="font-display text-2xl font-bold text-white"
              >{count}</span
            >
            <span class="block text-xs text-text-muted mt-1">questions</span>
          </button>
        {/each}
      </div>
    </section>

    <!-- Topics Selection -->
    <section class="mb-10 animate-slide-up" style="animation-delay: 250ms">
      <h2
        class="font-display text-lg font-semibold text-white mb-4 flex items-center gap-2"
      >
        <span class="w-2 h-2 rounded-full bg-neon-yellow"></span>
        Topics
        <span class="text-text-muted text-sm font-normal ml-2">(optional)</span>
      </h2>

      {#if vm.availableTopics.length > 0}
        <div class="flex flex-wrap gap-2 items-center">
          <!-- 'All' Badge -->
          <button
            type="button"
            class="px-4 py-2 rounded-full text-sm font-medium transition-all border-2 cursor-pointer"
            class:bg-neon-yellow={vm.selectedTopics.length === 0}
            class:bg-opacity-20={vm.selectedTopics.length === 0}
            class:border-neon-yellow={vm.selectedTopics.length === 0}
            class:text-black={vm.selectedTopics.length === 0}
            class:border-bg-elevated={vm.selectedTopics.length > 0}
            class:text-text-secondary={vm.selectedTopics.length > 0}
            class:hover:border-neon-yellow={vm.selectedTopics.length > 0}
            class:hover:text-white={vm.selectedTopics.length > 0}
            onclick={() => vm.clearTopics()}
          >
            All
          </button>

          <!-- Vertical Divider -->
          <div class="w-px h-6 bg-bg-elevated mx-2"></div>

          {#each vm.availableTopics as topic}
            {@const isSelected = vm.selectedTopics.includes(topic)}
            <button
              type="button"
              class="px-4 py-2 rounded-full text-sm font-medium transition-all border-2 cursor-pointer"
              class:bg-neon-yellow={isSelected}
              class:bg-opacity-20={isSelected}
              class:border-neon-yellow={isSelected}
              class:text-black={isSelected}
              class:border-bg-elevated={!isSelected}
              class:text-text-secondary={!isSelected}
              class:hover:border-neon-yellow={!isSelected}
              class:hover:text-white={!isSelected}
              onclick={() => vm.toggleTopic(topic)}
            >
              {topic}
            </button>
          {/each}
        </div>
      {/if}
    </section>

    <!-- Start Button -->
    <div class="animate-slide-up" style="animation-delay: 300ms">
      <a href={vm.startUrl} class="btn btn-primary w-full text-lg py-4">
        <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
        Start Quiz
      </a>
    </div>
  </div>
</main>

<style lang="postcss">
  /*
   default grid for question type options
  */
  .custom-grid {
    @apply grid;
    gap: 0.75rem;
    grid-template-columns: repeat(2, 1fr);
  }

  .custom-grid > :nth-child(3) {
    grid-column: span 2 / span 2;
  }

  /*
   lg grid for question type options
  */
  @media (min-width: 768px) {
    .custom-grid {
      grid-template-columns: repeat(3, 1fr);
    }
    .custom-grid > :nth-child(3) {
      grid-column: span 1;
    }
  }
</style>
