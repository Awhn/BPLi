<script lang="ts">
	import { enhance } from '$app/forms';
	import BookCover from '$lib/components/book/BookCover.svelte';
	import BookCard from '$lib/components/book/BookCard.svelte';
	import ChapterList from '$lib/components/chapter/ChapterList.svelte';
	import QuoteCard from '$lib/components/quote/QuoteCard.svelte';
	import QuoteFab from '$lib/components/quote/QuoteFab.svelte';
	import Shelf from '$lib/components/common/Shelf.svelte';

	let { data, form } = $props();

	const statusOptions = [
		{ value: 'want_to_read', label: '읽고 싶어요' },
		{ value: 'reading', label: '읽는 중' },
		{ value: 'finished', label: '완독' },
		{ value: 'paused', label: '잠시 멈춤' }
	] as const;
</script>

<header class="flex flex-col items-center px-4 pt-10 pb-6 text-center">
	<BookCover book={data.book} size="lg" />
	<h1 class="mt-5 text-xl font-bold text-ink">{data.book.title}</h1>
	{#if data.book.subtitle}
		<p class="mt-1 text-sm text-ink-muted">{data.book.subtitle}</p>
	{/if}
	<p class="mt-1 text-sm text-ink-muted">{data.book.author}</p>
	{#if data.book.sourceType === 'original'}
		<span class="mt-2 rounded-full bg-accent/20 px-3 py-1 text-xs text-accent">B PLi Original</span>
	{/if}
	{#if data.libraryCount > 0}
		<span class="mt-2 rounded-full bg-surface-raised px-3 py-1 text-xs text-ink-muted">
			📍 주변 도서관 {data.libraryCount}곳에 있어요
		</span>
	{/if}
	{#if data.keywords.length > 0}
		<div class="mt-3 flex flex-wrap justify-center gap-1.5">
			{#each data.keywords as keyword (keyword)}
				<span class="rounded-full bg-white/5 px-2.5 py-1 text-[10px] text-ink-muted">#{keyword}</span>
			{/each}
		</div>
	{/if}
</header>

<div class="px-4">
	<a
		href="/play/{data.book.id}"
		class="flex items-center justify-center gap-2 rounded-full bg-accent-strong py-3 text-sm font-bold text-white"
	>
		▶ 지금 읽기
	</a>
</div>

<section class="px-4 pt-3">
	<form method="POST" action="?/status" use:enhance class="flex flex-wrap justify-center gap-2">
		{#each statusOptions as option (option.value)}
			<button
				type="submit"
				name="status"
				value={option.value}
				class="rounded-full px-4 py-2 text-xs font-medium transition-colors
					{data.readingStatus === option.value
					? 'bg-accent-strong text-white'
					: 'bg-surface-raised text-ink-muted hover:text-ink'}"
			>
				{option.label}
			</button>
		{/each}
	</form>
</section>

{#if data.book.description}
	<p class="px-6 py-6 text-center text-sm leading-relaxed text-ink-muted">
		{data.book.description}
	</p>
{/if}

{#if data.chapters.length > 0}
	<section class="px-4 pb-4">
		<h2 class="mb-2 text-lg font-bold text-ink">챕터</h2>
		<ChapterList chapters={data.chapters} bookId={data.book.id} />
	</section>
{/if}

{#if data.quotes.length > 0}
	<section class="px-4 pb-4">
		<h2 class="mb-3 text-lg font-bold text-ink">저장한 구절</h2>
		<div class="space-y-3">
			{#each data.quotes as quote (quote.id)}
				<QuoteCard {quote} book={data.book} href="/share/{quote.id}" />
			{/each}
		</div>
	</section>
{/if}

<section class="px-4 pb-4">
	<h2 class="mb-3 text-lg font-bold text-ink">페이지 코멘트</h2>
	{#if data.comments.length > 0}
		<ul class="mb-4 space-y-2">
			{#each data.comments as comment (comment.id)}
				<li class="flex gap-3 rounded-lg bg-surface p-3 text-sm">
					{#if comment.pageNumber}
						<span class="shrink-0 font-mono text-xs text-accent">p.{comment.pageNumber}</span>
					{/if}
					<p class="text-ink">{comment.body}</p>
				</li>
			{/each}
		</ul>
	{/if}

	<!-- SoundCloud-style positioned comment: emotion pinned to a page (CLAUDE.md §9.5) -->
	<form method="POST" action="?/comment" use:enhance class="flex gap-2">
		<input
			name="pageNumber"
			type="number"
			min="1"
			placeholder="p."
			class="w-16 rounded-lg bg-surface-raised px-3 py-2.5 text-sm text-ink placeholder:text-ink-muted"
		/>
		<input
			name="body"
			required
			placeholder="이 페이지에서 느낀 감정을 남겨보세요"
			class="flex-1 rounded-lg bg-surface-raised px-3 py-2.5 text-sm text-ink placeholder:text-ink-muted"
		/>
		<button type="submit" class="rounded-lg bg-accent-strong px-4 text-sm font-medium text-white">
			남기기
		</button>
	</form>
	{#if form?.commentError}
		<p class="mt-2 text-xs text-red-400">{form.commentError}</p>
	{/if}
</section>

{#if data.recommendations.length > 0}
	<div class="-mx-0 pb-6">
		<Shelf title="함께 읽는 책" subtitle="이 책을 읽은 사람들이 함께 빌린 책 (도서관 정보나루)">
			{#each data.recommendations as rec (rec.id)}
				<BookCard book={rec} />
			{/each}
		</Shelf>
	</div>
{/if}

<QuoteFab bookId={data.book.id} />
