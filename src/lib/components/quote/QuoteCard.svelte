<script lang="ts">
	import type { Quote, Book } from '$lib/types';

	let { quote, book, href }: { quote: Quote; book?: Book; href?: string } = $props();
</script>

<svelte:element
	this={href ? 'a' : 'div'}
	{href}
	class="block rounded-xl bg-surface p-4 shadow transition-colors {href ? 'hover:bg-surface-raised' : ''}"
>
	<blockquote class="font-serif text-sm leading-relaxed text-paper">
		“{quote.text}”
	</blockquote>
	<footer class="mt-3 flex items-center justify-between text-xs text-ink-muted">
		<span class="truncate">
			{#if book}{book.title} · {book.author}{/if}
		</span>
		{#if quote.pageNumber}
			<span class="shrink-0">p.{quote.pageNumber}</span>
		{/if}
	</footer>
</svelte:element>
