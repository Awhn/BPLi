<script lang="ts">
	import type { Chapter } from '$lib/types';

	let { chapters, bookId }: { chapters: Chapter[]; bookId: string } = $props();
</script>

<ol class="divide-y divide-white/5">
	{#each chapters as chapter (chapter.id)}
		<li>
			<a
				href="/books/{bookId}/chapters/{chapter.id}"
				class="flex items-center gap-3 py-3 transition-colors hover:bg-white/5"
			>
				<span class="w-6 text-center text-sm text-ink-muted">{chapter.order}</span>
				<div class="min-w-0 flex-1">
					<p class="truncate text-sm font-medium text-ink">
						{chapter.title}
						{#if chapter.isOriginal}
							<span class="ml-1 rounded bg-accent/20 px-1.5 py-0.5 text-[10px] text-accent">
								Original
							</span>
						{/if}
					</p>
					{#if chapter.summary}
						<p class="truncate text-xs text-ink-muted">{chapter.summary}</p>
					{/if}
				</div>
				<span class="shrink-0 text-xs text-ink-muted">{chapter.estimatedReadingMinutes}분</span>
			</a>
		</li>
	{/each}
</ol>
