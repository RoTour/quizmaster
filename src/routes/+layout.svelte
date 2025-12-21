<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../app.css';

	type Props = {
		children: import('svelte').Snippet;
	};

	let { children }: Props = $props();
</script>

<svelte:head>
	<title>QuizMaster</title>
	<meta name="description" content="Interactive quiz app for AWS certification prep" />
	<meta name="theme-color" content="#0D0D0D" />
	<link rel="manifest" href="/manifest.json" />
</svelte:head>

{@render children()}
