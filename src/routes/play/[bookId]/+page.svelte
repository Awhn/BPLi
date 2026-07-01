<script lang="ts">
	import { untrack } from 'svelte';
	import { enhance } from '$app/forms';
	import BookCover from '$lib/components/book/BookCover.svelte';

	let { data, form } = $props();

	// Local scrubber value, seeded once from the server's currentPage so the
	// reader can drag freely before committing. After a commit the server value
	// already matches, so no re-sync is needed.
	let page = $state(untrack(() => data.currentPage));

	const total = $derived(data.totalPages ?? 0);
	const ratio = $derived(total > 0 ? Math.min(1, page / total) : 0);

	let progressForm: HTMLFormElement;
	function commitProgress() {
		progressForm.requestSubmit();
	}

	const statusLabels: Record<string, string> = {
		want_to_read: '읽고 싶어요',
		reading: '읽는 중',
		finished: '완독',
		paused: '잠시 멈춤'
	};
</script>

<svelte:head>
	<title>{data.book.title} 재생 중 — B PLi</title>
</svelte:head>

<header class="flex items-center justify-between px-4 pt-6 pb-2">
	<a href="/books/{data.book.id}" class="text-sm text-ink-muted hover:text-ink">⌄ 닫기</a>
	<span class="text-xs tracking-widest text-accent uppercase">Now Reading</span>
	<span class="w-10"></span>
</header>

<!-- Album-art style cover -->
<div class="flex flex-col items-center px-6 pt-4">
	<BookCover book={data.book} size="lg" />
	<h1 class="mt-6 text-center text-xl font-bold text-ink">{data.book.title}</h1>
	<p class="mt-1 text-sm text-ink-muted">{data.book.author}</p>
	{#if data.currentChapter}
		<p class="mt-2 rounded-full bg-surface-raised px-3 py-1 text-xs text-ink-muted">
			{data.currentChapter.title}
		</p>
	{/if}
</div>

<!-- Progress scrubber -->
<section class="px-6 pt-8">
	<form method="POST" action="?/progress" bind:this={progressForm} use:enhance>
		<input type="hidden" name="page" value={page} />
		{#if total > 0}
			<input
				type="range"
				min="0"
				max={total}
				bind:value={page}
				onchange={commitProgress}
				class="w-full accent-accent-strong"
				aria-label="현재 페이지"
			/>
			<div class="mt-1 flex justify-between text-xs text-ink-muted">
				<span>p.{page}</span>
				<span>{Math.round(ratio * 100)}%</span>
				<span>{total}p</span>
			</div>
		{:else}
			<div class="flex items-center gap-2">
				<label for="page-input" class="text-xs text-ink-muted">현재 페이지</label>
				<input
					id="page-input"
					type="number"
					min="0"
					bind:value={page}
					onchange={commitProgress}
					class="w-24 rounded-lg bg-surface-raised px-3 py-2 text-sm text-ink"
				/>
			</div>
			<p class="mt-1 text-[11px] text-ink-muted">전체 페이지 정보가 없어 직접 입력해요.</p>
		{/if}
	</form>
</section>

<!-- Reading status controls -->
<section class="px-6 pt-6">
	<form method="POST" action="?/status" use:enhance class="flex flex-wrap justify-center gap-2">
		{#each Object.entries(statusLabels) as [value, label] (value)}
			<button
				type="submit"
				name="status"
				value={value}
				class="rounded-full px-4 py-1.5 text-xs font-medium transition-colors
					{data.status === value
					? 'bg-accent-strong text-white'
					: 'bg-surface-raised text-ink-muted hover:text-ink'}"
			>
				{label}
			</button>
		{/each}
	</form>
</section>

<!-- SoundCloud-style page timeline: comments + shared quotes, by page -->
<section class="mt-8 px-4 pb-10">
	<h2 class="mb-1 px-2 text-lg font-bold text-ink">페이지 타임라인</h2>
	<p class="mb-4 px-2 text-xs text-ink-muted">읽는 순서대로 모두의 의견과 인용구가 흐릅니다</p>

	<ol class="relative space-y-3 border-l border-white/10 pl-4">
		{#each data.timeline as entry (entry.kind + entry.id)}
			{@const near = entry.pageNumber !== null && Math.abs(entry.pageNumber - page) <= 3}
			<li class="relative">
				<span
					class="absolute top-2 -left-[21px] h-2.5 w-2.5 rounded-full ring-2 ring-bg
						{entry.kind === 'quote' ? 'bg-accent' : near ? 'bg-accent-strong' : 'bg-ink-muted'}"
				></span>
				<div
					class="rounded-xl p-3 {entry.kind === 'quote'
						? 'bg-surface-raised'
						: 'bg-surface'} {near ? 'ring-1 ring-accent/40' : ''}"
				>
					<div class="mb-1 flex items-center gap-2 text-[11px] text-ink-muted">
						{#if entry.pageNumber !== null}
							<span class="font-mono text-accent">p.{entry.pageNumber}</span>
						{:else}
							<span class="font-mono">전체</span>
						{/if}
						<span>·</span>
						<span class={entry.isMine ? 'font-medium text-ink' : ''}>{entry.authorName}</span>
						{#if entry.kind === 'quote'}
							<span class="rounded bg-accent/20 px-1.5 py-0.5 text-[10px] text-accent">인용</span>
						{/if}
					</div>
					{#if entry.kind === 'quote'}
						<blockquote class="font-serif text-sm leading-relaxed text-paper">
							“{entry.body}”
						</blockquote>
					{:else}
						<p class="text-sm text-ink">{entry.body}</p>
					{/if}
				</div>
			</li>
		{:else}
			<li class="text-sm text-ink-muted">아직 의견이 없어요. 첫 의견을 남겨보세요.</li>
		{/each}
	</ol>
</section>

<!-- Add opinion at current page -->
<div class="fixed bottom-16 left-1/2 z-30 w-full max-w-md -translate-x-1/2 border-t border-white/5 bg-bg/95 px-4 py-3 backdrop-blur">
	<form method="POST" action="?/comment" use:enhance class="flex items-center gap-2">
		<span class="shrink-0 rounded-lg bg-surface-raised px-2 py-2 font-mono text-xs text-accent">
			{data.currentPage > 0 ? `p.${data.currentPage}` : '전체'}
		</span>
		<input
			name="body"
			required
			placeholder="이 페이지에서 떠오른 생각을 남겨보세요"
			class="min-w-0 flex-1 rounded-lg bg-surface-raised px-3 py-2.5 text-sm text-ink placeholder:text-ink-muted"
		/>
		<button type="submit" class="shrink-0 rounded-lg bg-accent-strong px-4 py-2.5 text-sm font-medium text-white">
			남기기
		</button>
	</form>
	{#if form?.commentError}
		<p class="mt-1 text-xs text-red-400">{form.commentError}</p>
	{/if}
</div>
