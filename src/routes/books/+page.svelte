<script lang="ts">
	import BookCover from '$lib/components/book/BookCover.svelte';

	let { data, form } = $props();
	let showRegister = $state(false);
</script>

<header class="px-4 pt-8 pb-4">
	<h1 class="text-2xl font-bold text-ink">검색</h1>
	<form method="GET" class="mt-4">
		<input
			type="search"
			name="q"
			value={data.query}
			placeholder="책 제목, 저자, 출판사"
			class="w-full rounded-full bg-surface-raised px-5 py-3 text-sm text-ink placeholder:text-ink-muted focus:ring-2 focus:ring-accent focus:outline-none"
		/>
	</form>
</header>

<section class="px-4">
	{#if data.query}
		<p class="mb-3 text-xs text-ink-muted">"{data.query}" 검색 결과 {data.results.length}건</p>
	{/if}

	<ul class="space-y-3">
		{#each data.results as book (book.id)}
			{@const isLocal = book.id.startsWith('book-')}
			<li>
				{#if isLocal}
					<a
						href="/books/{book.id}"
						class="flex gap-3 rounded-xl bg-surface p-3 transition-colors hover:bg-surface-raised"
					>
						<BookCover {book} size="sm" />
						<div class="min-w-0 flex-1 py-1">
							<p class="truncate font-medium text-ink">{book.title}</p>
							<p class="truncate text-sm text-ink-muted">{book.author}</p>
							{#if book.publisher}
								<p class="mt-1 truncate text-xs text-ink-muted/70">{book.publisher}</p>
							{/if}
						</div>
					</a>
				{:else}
					<form method="POST" action="?/add" class="flex gap-3 rounded-xl bg-surface p-3">
						<BookCover {book} size="sm" />
						<div class="min-w-0 flex-1 py-1">
							<p class="truncate font-medium text-ink">{book.title}</p>
							<p class="truncate text-sm text-ink-muted">{book.author}</p>
							{#if book.publisher}
								<p class="mt-1 truncate text-xs text-ink-muted/70">{book.publisher}</p>
							{/if}
						</div>
						<input type="hidden" name="title" value={book.title} />
						<input type="hidden" name="author" value={book.author} />
						<input type="hidden" name="publisher" value={book.publisher ?? ''} />
						<input type="hidden" name="isbn" value={book.isbn ?? ''} />
						<input type="hidden" name="coverImageUrl" value={book.coverImageUrl ?? ''} />
						<input type="hidden" name="description" value={book.description ?? ''} />
						<button
							type="submit"
							class="self-center rounded-full bg-accent-strong px-4 py-2 text-xs font-medium text-white"
						>
							추가
						</button>
					</form>
				{/if}
			</li>
		{/each}
	</ul>

	{#if data.query && data.results.length === 0}
		<p class="py-8 text-center text-sm text-ink-muted">검색 결과가 없어요.</p>
	{/if}

	<div class="mt-6 mb-8">
		<button
			type="button"
			onclick={() => (showRegister = !showRegister)}
			class="w-full rounded-full border border-white/10 py-3 text-sm text-ink-muted transition-colors hover:text-ink"
		>
			찾는 책이 없나요? 직접 등록하기
		</button>

		{#if showRegister}
			<form method="POST" action="?/register" class="mt-4 space-y-3 rounded-xl bg-surface p-4">
				{#if form?.error}
					<p class="text-sm text-red-400">{form.error}</p>
				{/if}
				<input
					name="title"
					placeholder="책 제목 *"
					required
					class="w-full rounded-lg bg-surface-raised px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted"
				/>
				<input
					name="author"
					placeholder="저자 *"
					required
					class="w-full rounded-lg bg-surface-raised px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted"
				/>
				<input
					name="publisher"
					placeholder="출판사"
					class="w-full rounded-lg bg-surface-raised px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted"
				/>
				<input
					name="isbn"
					placeholder="ISBN"
					class="w-full rounded-lg bg-surface-raised px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted"
				/>
				<button
					type="submit"
					class="w-full rounded-full bg-accent-strong py-2.5 text-sm font-medium text-white"
				>
					등록하기
				</button>
			</form>
		{/if}
	</div>
</section>
