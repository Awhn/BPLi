<script lang="ts">
	import type { Book } from '$lib/types';

	let { book, size = 'md' }: { book: Book; size?: 'sm' | 'md' | 'lg' } = $props();

	const sizeClasses = {
		sm: 'h-24 w-16 text-[8px]',
		md: 'h-40 w-28 text-[10px]',
		lg: 'h-64 w-44 text-sm'
	};

	// Deterministic gradient per book so placeholder covers feel like album art
	const hues = [262, 200, 340, 24, 150, 290];
	const hue = $derived(
		hues[Math.abs([...book.id].reduce((a, c) => a + c.charCodeAt(0), 0)) % hues.length]
	);
</script>

{#if book.coverImageUrl && !book.coverImageUrl.startsWith('/images/covers/')}
	<img
		src={book.coverImageUrl}
		alt={book.title}
		class="rounded-lg object-cover shadow-lg {sizeClasses[size]}"
	/>
{:else}
	<div
		class="flex flex-col justify-between rounded-lg p-2 shadow-lg {sizeClasses[size]}"
		style="background: linear-gradient(160deg, hsl({hue}, 45%, 28%), hsl({hue}, 60%, 14%))"
	>
		<span class="font-serif leading-tight font-bold text-paper">{book.title}</span>
		<span class="text-paper/70">{book.author}</span>
	</div>
{/if}
