<script lang="ts">
	import type { ResolvedSection } from '$lib/server/services/recommendationService';
	import Shelf from './Shelf.svelte';
	import BookCard from '$lib/components/book/BookCard.svelte';
	import FlowCard from '$lib/components/flow/FlowCard.svelte';
	import QuoteCard from '$lib/components/quote/QuoteCard.svelte';

	let { section }: { section: ResolvedSection } = $props();

	// Delegated click tracking (§17 recommendation_clicked, §11 signal). An action
	// avoids per-link a11y lint: it captures clicks on any [data-rec-id] card and
	// pings the endpoint just before navigation via sendBeacon (fetch fallback).
	function trackRecClicks(node: HTMLElement, sectionId: string) {
		function handler(event: MouseEvent) {
			const el = (event.target as HTMLElement)?.closest<HTMLElement>('[data-rec-id]');
			if (!el) return;
			const body = JSON.stringify({
				sectionId,
				itemType: el.dataset.recType,
				itemId: el.dataset.recId
			});
			const sent =
				navigator.sendBeacon?.('/recommendation/click', new Blob([body], { type: 'application/json' })) ??
				false;
			if (!sent) {
				fetch('/recommendation/click', {
					method: 'POST',
					headers: { 'content-type': 'application/json' },
					body,
					keepalive: true
				}).catch(() => {});
			}
		}
		node.addEventListener('click', handler, true);
		return {
			destroy() {
				node.removeEventListener('click', handler, true);
			}
		};
	}
</script>

<div use:trackRecClicks={section.section.id} class="bpli-rise">
	<Shelf title={section.section.title} subtitle={section.section.subtitle}>
		{#each section.books as book (book.id)}
			<div class="contents" data-rec-id={book.id} data-rec-type="book">
				<BookCard {book} />
			</div>
		{/each}

		{#each section.chapters as { chapter, book } (chapter.id)}
			<a
				href="/books/{chapter.bookId}/chapters/{chapter.id}"
				data-rec-id={chapter.id}
				data-rec-type="chapter"
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
			<div class="contents" data-rec-id={flow.id} data-rec-type="flow">
				<FlowCard {flow} />
			</div>
		{/each}

		{#each section.quotes as { quote, book } (quote.id)}
			<div class="w-64 shrink-0" data-rec-id={quote.id} data-rec-type="quote">
				<QuoteCard {quote} {book} href="/share/{quote.id}" />
			</div>
		{/each}
	</Shelf>
</div>
