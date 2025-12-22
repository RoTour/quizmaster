<script lang="ts">
  import { page } from "$app/stores";
</script>

<div
  class="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4 text-center animate-slide-up"
>
  <div class="relative mb-8">
    <!-- Glitchy Status Code -->
    <h1
      class="font-display text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-cyan select-none relative z-10"
    >
      {$page.status}
    </h1>

    <!-- Glow Effect -->
    <div
      class="absolute inset-0 blur-3xl bg-neon-pink/20 -z-10 rounded-full scale-150"
    ></div>

    <!-- Decorative Elements -->
    <div
      class="absolute -top-4 -right-8 text-neon-yellow text-4xl animate-bounce"
    >
      ?
    </div>
    <div
      class="absolute -bottom-4 -left-8 text-neon-green text-4xl animate-pulse"
    >
      !
    </div>
  </div>

  <h2 class="font-display text-2xl md:text-4xl text-white mb-4">
    {$page.status === 404 ? "Lost in the Cloud?" : "System Malfunction"}
  </h2>

  <p class="text-text-secondary text-lg mb-12">
    {#if $page.status === 404}
      The page you're looking for seems to have drifted into a black hole.
    {:else}
      {$page.error?.message || "An unexpected error occurred in the mainframe."}
    {/if}
  </p>

  <a
    href="/"
    class="btn btn-primary px-8 py-4 text-lg group relative overflow-hidden"
  >
    <div
      class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
    ></div>
    <span class="relative flex items-center gap-2">
      <svg
        class="w-5 h-5 group-hover:-translate-x-1 transition-transform"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      Return to Base
    </span>
  </a>
</div>
