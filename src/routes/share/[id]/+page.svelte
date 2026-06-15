<script lang="ts">
	import ShareCardPreview from '$lib/components/card/ShareCardPreview.svelte';

	let { data } = $props();
	let ratio: 'story' | 'square' = $state('story');

	async function share() {
		// Log the share event regardless of share method
		fetch(`/share/${data.quote.id}?/shared`, { method: 'POST', body: new FormData() });

		const text = `“${data.quote.text}”${data.book ? ` — ${data.book.title}, ${data.book.author}` : ''}\n\nB PLi에서 책을 플레이하세요`;
		if (navigator.share) {
			try {
				await navigator.share({ title: 'B PLi 구절 카드', text, url: location.href });
			} catch {
				// user cancelled
			}
		} else {
			await navigator.clipboard.writeText(`${text}\n${location.href}`);
			alert('링크가 복사되었어요!');
		}
	}
</script>

<svelte:head>
	<title>{data.book ? `${data.book.title} 구절` : '구절'} — B PLi</title>
	<meta property="og:title" content={data.book ? `${data.book.title}의 한 구절` : 'B PLi 구절 카드'} />
	<meta property="og:description" content={data.quote.text.slice(0, 100)} />
</svelte:head>

<header class="px-4 pt-8 pb-4 text-center">
	<h1 class="text-xl font-bold text-ink">구절 카드</h1>
	<p class="mt-1 text-xs text-ink-muted">저장하거나 공유해보세요</p>
</header>

<div class="mb-4 flex justify-center gap-2">
	<button
		type="button"
		onclick={() => (ratio = 'story')}
		class="rounded-full px-4 py-1.5 text-xs font-medium
			{ratio === 'story' ? 'bg-accent-strong text-white' : 'bg-surface-raised text-ink-muted'}"
	>
		스토리 9:16
	</button>
	<button
		type="button"
		onclick={() => (ratio = 'square')}
		class="rounded-full px-4 py-1.5 text-xs font-medium
			{ratio === 'square' ? 'bg-accent-strong text-white' : 'bg-surface-raised text-ink-muted'}"
	>
		피드 1:1
	</button>
</div>

<div class="px-6">
	<ShareCardPreview quote={data.quote} book={data.book ?? undefined} comment={data.comment ?? undefined} {ratio} />
</div>

<div class="flex justify-center gap-3 px-6 py-8">
	<button
		type="button"
		onclick={share}
		class="rounded-full bg-accent-strong px-8 py-3 text-sm font-bold text-white"
	>
		공유하기
	</button>
	<a
		href="/share/{data.quote.id}/card.svg?ratio={ratio}"
		download="bpli-quote-card.svg"
		class="rounded-full bg-surface-raised px-8 py-3 text-sm font-medium text-ink"
	>
		이미지 저장
	</a>
	{#if data.book}
		<a
			href="/books/{data.book.id}"
			class="rounded-full bg-surface-raised px-8 py-3 text-sm font-medium text-ink"
		>
			책 보기
		</a>
	{/if}
</div>
