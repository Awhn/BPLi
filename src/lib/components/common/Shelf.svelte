<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		subtitle,
		children
	}: { title: string; subtitle?: string; children: Snippet } = $props();
</script>

<section class="mb-8">
	<header class="mb-3 px-4">
		<h2 class="text-lg font-bold text-ink">{title}</h2>
		{#if subtitle}
			<p class="text-xs text-ink-muted">{subtitle}</p>
		{/if}
	</header>
	<div class="flex gap-3 overflow-x-auto px-4 pb-2" style="scrollbar-width: none">
		{@render children()}
	</div>
</section>
