<script lang="ts">
	import type { Book } from '$lib/types';
	import BookCover from './BookCover.svelte';

	let { book }: { book: Book } = $props();

	// External API results (kakao-/d4l-/pop-/rec- prefixed) are not in the
	// local catalog yet, so they render without a detail link.
	const isLocal = $derived(book.id.startsWith('book-'));
</script>

<svelte:element
	this={isLocal ? 'a' : 'div'}
	href={isLocal ? `/books/${book.id}` : undefined}
	class="block w-28 shrink-0"
>
	<BookCover {book} size="md" />
	<p class="mt-2 truncate text-sm font-medium text-ink">{book.title}</p>
	<p class="truncate text-xs text-ink-muted">{book.author}</p>
</svelte:element>
