<script lang="ts">
	import BookCover from '$lib/components/book/BookCover.svelte';
	import type { ReadingStatusValue } from '$lib/types';

	let { data } = $props();

	const tabs: { value: ReadingStatusValue; label: string }[] = [
		{ value: 'reading', label: '읽는 중' },
		{ value: 'want_to_read', label: '읽고 싶은' },
		{ value: 'finished', label: '완독' },
		{ value: 'paused', label: '잠시 멈춤' }
	];
	let activeTab: ReadingStatusValue = $state('reading');

	const filtered = $derived(data.entries.filter((e) => e.status.status === activeTab));
</script>

<header class="px-4 pt-8 pb-4">
	<h1 class="text-2xl font-bold text-ink">내 서재</h1>
</header>

<div class="flex gap-2 overflow-x-auto px-4 pb-4" style="scrollbar-width: none">
	{#each tabs as tab (tab.value)}
		<button
			type="button"
			onclick={() => (activeTab = tab.value)}
			class="shrink-0 rounded-full px-4 py-1.5 text-xs font-medium
				{activeTab === tab.value ? 'bg-accent-strong text-white' : 'bg-surface-raised text-ink-muted'}"
		>
			{tab.label}
		</button>
	{/each}
</div>

<section class="px-4 pb-10">
	{#if filtered.length === 0}
		<p class="py-12 text-center text-sm text-ink-muted">
			아직 책이 없어요.<br /><a href="/books" class="text-accent">검색</a>에서 책을 추가해보세요.
		</p>
	{:else}
		<ul class="grid grid-cols-3 gap-4">
			{#each filtered as entry (entry.book.id)}
				<li>
					<a href="/books/{entry.book.id}" class="block">
						<BookCover book={entry.book} size="md" />
						<p class="mt-2 truncate text-xs font-medium text-ink">{entry.book.title}</p>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</section>
