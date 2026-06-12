<script lang="ts">
	// Floating action button for quick quote capture (CLAUDE.md §16)
	let { bookId, chapterId }: { bookId: string; chapterId?: string } = $props();

	const href = $derived(
		`/quotes/new?bookId=${bookId}${chapterId ? `&chapterId=${chapterId}` : ''}`
	);
</script>

<a
	{href}
	aria-label="구절 저장"
	class="fixed right-5 bottom-20 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent-strong text-2xl text-white shadow-xl transition-transform hover:scale-105"
>
	✏️
</a>
