<script lang="ts">
	import { enhance } from '$app/forms';
	import QuoteFab from '$lib/components/quote/QuoteFab.svelte';

	let { data, form } = $props();
</script>

<!-- Track-play style chapter view: light, focused reading (CLAUDE.md §15) -->
<header class="px-6 pt-10 pb-6 text-center">
	<a href="/books/{data.book.id}" class="text-xs text-ink-muted hover:text-ink">
		← {data.book.title}
	</a>
	<h1 class="mt-4 font-serif text-2xl font-bold text-paper">{data.chapter.title}</h1>
	<p class="mt-2 text-xs text-ink-muted">
		{data.chapter.estimatedReadingMinutes}분 읽기
		{#if data.chapter.isOriginal}
			· <span class="text-accent">B PLi Original</span>
		{/if}
	</p>
</header>

<article class="px-6 pb-8">
	{#if data.chapter.summary}
		<p class="mb-5 text-sm text-ink-muted">{data.chapter.summary}</p>
	{/if}

	{#if data.chapter.previewBody}
		<!-- The actual reading surface — a real excerpt, not a placeholder (§6.2) -->
		<div class="space-y-4 font-serif text-base leading-loose text-paper/90">
			{#each data.chapter.previewBody.split('\n\n') as para (para)}
				<p>{para}</p>
			{/each}
		</div>
	{:else if data.chapter.contentAvailability === 'metadata_only'}
		<div class="mt-4 rounded-xl bg-surface p-5 text-center text-sm text-ink-muted">
			이 챕터의 본문은 곧 열려요.<br />마음에 남는 페이지에 구절과 감정을 먼저 기록해두세요.
		</div>
	{:else}
		<div class="mt-4 rounded-xl bg-surface p-5 text-center text-sm text-ink-muted">
			미리보기 준비 중이에요. 지금은 구절을 저장하며 시작해보세요.
		</div>
	{/if}
</article>

<!-- Chapter First: mark this track as finished -->
<div class="px-6 pb-8">
	<form method="POST" action="?/complete" use:enhance>
		<button
			type="submit"
			class="w-full rounded-full py-3 text-sm font-medium transition-colors
				{form?.completed
				? 'bg-accent/20 text-accent'
				: 'bg-surface-raised text-ink hover:bg-surface'}"
			disabled={form?.completed}
		>
			{form?.completed ? '완료했어요 ✓' : '이 챕터 다 읽었어요'}
		</button>
	</form>
</div>

<nav class="flex justify-between px-6 pb-10 text-sm">
	{#if data.prevChapter}
		<a
			href="/books/{data.book.id}/chapters/{data.prevChapter.id}"
			class="text-ink-muted hover:text-ink"
		>
			← {data.prevChapter.title}
		</a>
	{:else}
		<span></span>
	{/if}
	{#if data.nextChapter}
		<a
			href="/books/{data.book.id}/chapters/{data.nextChapter.id}"
			class="text-accent hover:text-accent-strong"
		>
			{data.nextChapter.title} →
		</a>
	{/if}
</nav>

<QuoteFab bookId={data.book.id} chapterId={data.chapter.id} />
