<script lang="ts">
	import type { ResolvedSection } from '$lib/server/services/recommendationService';
	import Shelf from './Shelf.svelte';
	import BookCard from '$lib/components/book/BookCard.svelte';
	import FlowCard from '$lib/components/flow/FlowCard.svelte';
	import QuoteCard from '$lib/components/quote/QuoteCard.svelte';

	let { section }: { section: ResolvedSection } = $props();
</script>

<Shelf title={section.section.title} subtitle={section.section.subtitle}>
	{#each section.books as book (book.id)}
		<BookCard {book} />
	{/each}

	{#each section.chapters as { chapter, book } (chapter.id)}
		<a
			href="/books/{chapter.bookId}/chapters/{chapter.id}"
			class="flex h-40 w-40 shrink-0 flex-col justify-between rounded-xl bg-surface-raised p-3 transition-colors hover:bg-surface"
		>
			<span class="text-[10px] text-accent">{chapter.estimatedReadingMinutes}분 읽기</span>
			<div>
				<p class="font-serif text-sm leading-snug font-bold text-paper">{chapter.title}</p>
				{#if book}
					<p class="mt-1 truncate text-[10px] text-ink-muted">{book.title} · {book.author}</p>
				{/if}
			</div>
		</a>
	{/each}

	{#each section.flows as flow (flow.id)}
		<FlowCard {flow} />
	{/each}

	{#each section.quotes as { quote, book } (quote.id)}
		<div class="w-64 shrink-0">
			<QuoteCard {quote} {book} href="/share/{quote.id}" />
		</div>
	{/each}
</Shelf>
