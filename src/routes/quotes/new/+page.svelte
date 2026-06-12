<script lang="ts">
	let { data, form } = $props();

	let mode: 'manual' | 'ocr' = $state('manual');
	let ocrPreview: string | null = $state(null);
	let ocrText = $state('');
	let ocrProcessing = $state(false);

	// OCR UI flow first, real engine later (CLAUDE.md §18-7). The mock fills
	// the textarea after a short delay so the full UX can be validated.
	function handleOcrUpload(event: Event) {
		const input = event.currentTarget as HTMLInputElement;
		const file = input.files?.[0];
		if (!file) return;
		ocrPreview = URL.createObjectURL(file);
		ocrProcessing = true;
		setTimeout(() => {
			ocrText = '(OCR 인식 결과가 여기에 표시돼요. 텍스트를 확인하고 수정해주세요.)';
			ocrProcessing = false;
		}, 1200);
	}
</script>

<header class="px-4 pt-8 pb-4">
	{#if data.book}
		<a href="/books/{data.book.id}" class="text-xs text-ink-muted hover:text-ink">
			← {data.book.title}
		</a>
	{/if}
	<h1 class="mt-2 text-2xl font-bold text-ink">구절 저장</h1>
</header>

<div class="px-4">
	<div class="mb-4 flex gap-2">
		<button
			type="button"
			onclick={() => (mode = 'manual')}
			class="flex-1 rounded-full py-2 text-sm font-medium transition-colors
				{mode === 'manual' ? 'bg-accent-strong text-white' : 'bg-surface-raised text-ink-muted'}"
		>
			직접 입력
		</button>
		<button
			type="button"
			onclick={() => (mode = 'ocr')}
			class="flex-1 rounded-full py-2 text-sm font-medium transition-colors
				{mode === 'ocr' ? 'bg-accent-strong text-white' : 'bg-surface-raised text-ink-muted'}"
		>
			📷 사진으로 입력
		</button>
	</div>

	{#if mode === 'ocr'}
		<div class="mb-4 rounded-xl bg-surface p-4">
			<label class="block cursor-pointer rounded-lg border-2 border-dashed border-white/10 p-6 text-center text-sm text-ink-muted">
				{#if ocrPreview}
					<img src={ocrPreview} alt="업로드한 책 사진" class="mx-auto mb-3 max-h-48 rounded" />
				{/if}
				{ocrProcessing ? '인식 중...' : '책 사진을 촬영하거나 업로드하세요'}
				<input type="file" accept="image/*" capture="environment" class="hidden" onchange={handleOcrUpload} />
			</label>
		</div>
	{/if}

	<form method="POST" class="space-y-4 pb-10">
		{#if form?.error}
			<p class="text-sm text-red-400">{form.error}</p>
		{/if}

		{#if data.book}
			<input type="hidden" name="bookId" value={data.book.id} />
		{:else}
			<select
				name="bookId"
				required
				class="w-full rounded-lg bg-surface-raised px-4 py-3 text-sm text-ink"
			>
				<option value="">책 선택 *</option>
				{#each data.books as book (book.id)}
					<option value={book.id}>{book.title} — {book.author}</option>
				{/each}
			</select>
		{/if}

		{#if data.chapters.length > 0}
			<select
				name="chapterId"
				class="w-full rounded-lg bg-surface-raised px-4 py-3 text-sm text-ink"
			>
				<option value="">챕터 선택 (선택)</option>
				{#each data.chapters as chapter (chapter.id)}
					<option value={chapter.id} selected={chapter.id === data.chapterId}>
						{chapter.order}. {chapter.title}
					</option>
				{/each}
			</select>
		{/if}

		<input type="hidden" name="sourceType" value={mode === 'ocr' ? 'ocr' : 'manual'} />

		<textarea
			name="text"
			rows="5"
			required
			bind:value={ocrText}
			placeholder="마음에 남은 구절을 적어주세요 *"
			class="w-full rounded-lg bg-surface-raised px-4 py-3 font-serif text-sm leading-relaxed text-ink placeholder:font-sans placeholder:text-ink-muted"
		></textarea>

		<div class="flex gap-3">
			<input
				name="pageNumber"
				type="number"
				min="1"
				placeholder="페이지"
				class="w-28 rounded-lg bg-surface-raised px-4 py-3 text-sm text-ink placeholder:text-ink-muted"
			/>
			<input
				name="comment"
				placeholder="이 구절에 대한 내 생각 (선택)"
				class="flex-1 rounded-lg bg-surface-raised px-4 py-3 text-sm text-ink placeholder:text-ink-muted"
			/>
		</div>

		<button
			type="submit"
			class="w-full rounded-full bg-accent-strong py-3 text-sm font-bold text-white"
		>
			저장하고 카드 만들기
		</button>
	</form>
</div>
