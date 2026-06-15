<script lang="ts">
	import type { Quote, Book } from '$lib/types';

	let {
		quote,
		book,
		comment,
		ratio = 'story'
	}: { quote: Quote; book?: Book; comment?: string; ratio?: 'story' | 'square' } = $props();
</script>

<!-- Quote share card (CLAUDE.md §10.1) — paper-texture mood, watermarked -->
<div
	class="relative mx-auto flex w-full max-w-xs flex-col justify-between overflow-hidden rounded-2xl bg-paper p-6 text-[#2a2433] shadow-2xl
		{ratio === 'story' ? 'aspect-[9/16]' : 'aspect-square'}"
>
	<div class="flex-1" aria-hidden="true"></div>

	<blockquote class="font-serif text-lg leading-relaxed font-medium">
		“{quote.text}”
	</blockquote>

	{#if comment}
		<p class="mt-4 border-l-2 border-[#2a2433]/20 pl-3 text-sm text-[#2a2433]/70">{comment}</p>
	{/if}

	<div class="flex-1" aria-hidden="true"></div>

	<footer class="mt-6">
		{#if book}
			<p class="text-sm font-bold">{book.title}</p>
			<p class="text-xs text-[#2a2433]/60">{book.author}</p>
		{/if}
		<p class="mt-4 text-right text-[10px] font-bold tracking-widest text-[#8e6aff]">B PLi</p>
	</footer>
</div>
