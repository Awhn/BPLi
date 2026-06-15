<script lang="ts">
	import { enhance } from '$app/forms';
	import QuoteCard from '$lib/components/quote/QuoteCard.svelte';

	let { data, form } = $props();
</script>

<header class="bg-gradient-to-b from-surface-raised to-bg px-6 pt-12 pb-8 text-center">
	<p class="text-xs tracking-widest text-accent uppercase">
		{data.flow.isEditorial ? 'Editorial Flow' : 'User Flow'}
	</p>
	<h1 class="mt-3 font-serif text-2xl font-bold text-paper">{data.flow.title}</h1>
	{#if data.flow.description}
		<p class="mt-2 text-sm text-ink-muted">{data.flow.description}</p>
	{/if}
	<p class="mt-3 text-xs text-ink-muted">
		{data.flow.estimatedTotalMinutes}분 · {data.items.length}개 항목
	</p>
	<div class="mt-3 flex justify-center gap-1.5">
		{#each data.flow.tags as tag (tag)}
			<span class="rounded-full bg-white/5 px-3 py-1 text-[10px] text-ink-muted">#{tag}</span>
		{/each}
	</div>

	<form method="POST" action="?/save" use:enhance class="mt-5">
		<button
			type="submit"
			class="rounded-full bg-accent-strong px-8 py-2.5 text-sm font-bold text-white"
		>
			{form?.saved ? '저장됨 ✓' : 'Flow 저장하기'}
		</button>
	</form>
</header>

<!-- Playlist-style ordered items (CLAUDE.md §15) -->
<ol class="space-y-3 px-4 py-6 pb-10">
	{#each data.items as item (item.order)}
		<li class="flex items-start gap-3">
			<span class="mt-4 w-5 text-center text-sm text-ink-muted">{item.order}</span>
			<div class="min-w-0 flex-1">
				{#if item.type === 'quote' && item.quote}
					<QuoteCard quote={item.quote} book={item.book} href="/share/{item.quote.id}" />
				{:else if item.chapter}
					<a
						href="/books/{item.chapter.bookId}/chapters/{item.chapter.id}"
						class="block rounded-xl bg-surface p-4 transition-colors hover:bg-surface-raised"
					>
						<p class="font-medium text-ink">
							{item.chapter.title}
							{#if item.chapter.isOriginal}
								<span class="ml-1 rounded bg-accent/20 px-1.5 py-0.5 text-[10px] text-accent">
									Original
								</span>
							{/if}
						</p>
						{#if item.book}
							<p class="mt-1 text-xs text-ink-muted">{item.book.title} · {item.book.author}</p>
						{/if}
						<p class="mt-1 text-xs text-ink-muted">{item.chapter.estimatedReadingMinutes}분 읽기</p>
					</a>
				{/if}
			</div>
		</li>
	{/each}
</ol>
