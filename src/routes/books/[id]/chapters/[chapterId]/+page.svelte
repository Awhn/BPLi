<script lang="ts">
	import QuoteFab from '$lib/components/quote/QuoteFab.svelte';

	let { data } = $props();
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
		<p class="rounded-xl bg-surface p-5 font-serif text-base leading-loose text-paper/90">
			{data.chapter.summary}
		</p>
	{/if}

	{#if data.chapter.contentAvailability === 'metadata_only'}
		<p class="mt-6 text-center text-sm text-ink-muted">
			이 챕터는 아직 정보만 제공돼요.<br />구절을 저장하며 기록을 시작해보세요.
		</p>
	{:else if data.chapter.contentAvailability === 'original_content'}
		<p class="mt-6 font-serif text-base leading-loose text-paper/85">
			(오리지널 콘텐츠 본문 영역 — Phase 3에서 콘텐츠 플랫폼으로 확장됩니다)
		</p>
	{/if}
</article>

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
