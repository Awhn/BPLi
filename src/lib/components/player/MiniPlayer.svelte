<script lang="ts">
	// Persistent mini-player above the tab bar — tap to expand to the full
	// now-playing screen (Spotify pattern).
	type NowPlaying = {
		bookId: string;
		title: string;
		author: string;
		coverImageUrl: string | null;
		currentPage: number;
		totalPages: number | null;
		progressRatio: number;
	};

	let { nowPlaying }: { nowPlaying: NowPlaying } = $props();

	const hasCover = $derived(
		nowPlaying.coverImageUrl && !nowPlaying.coverImageUrl.startsWith('/images/covers/')
	);
</script>

<!-- Outer div owns fixed positioning + horizontal centering (translateX);
	the inner anchor is free to run the slide-up transform animation. -->
<div class="fixed bottom-16 left-1/2 z-40 w-[calc(100%-1rem)] max-w-[calc(28rem-1rem)] -translate-x-1/2">
	<a
		href="/play/{nowPlaying.bookId}"
		class="bpli-slide-up relative flex w-full items-center gap-3 overflow-hidden rounded-xl bg-surface-raised/95 px-3 py-2 shadow-lg backdrop-blur"
	>
		<div class="h-10 w-10 shrink-0 overflow-hidden rounded">
			{#if hasCover}
				<img src={nowPlaying.coverImageUrl} alt="" class="h-full w-full object-cover" />
			{:else}
				<div class="flex h-full w-full items-center justify-center bg-accent-strong/40 text-xs">📖</div>
			{/if}
		</div>
		<div class="min-w-0 flex-1">
			<p class="truncate text-sm font-medium text-ink">{nowPlaying.title}</p>
			<p class="truncate text-xs text-ink-muted">
				{#if nowPlaying.totalPages}
					p.{nowPlaying.currentPage} / {nowPlaying.totalPages}
				{:else}
					p.{nowPlaying.currentPage}
				{/if}
				· {nowPlaying.author}
			</p>
		</div>
		<span class="shrink-0 text-lg text-accent">▶</span>

		<!-- progress hairline -->
		<div class="absolute bottom-0 left-0 h-0.5 bg-accent" style="width: {nowPlaying.progressRatio * 100}%"></div>
	</a>
</div>
