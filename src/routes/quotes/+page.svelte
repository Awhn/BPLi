<script lang="ts">
	import QuoteCard from '$lib/components/quote/QuoteCard.svelte';

	let { data } = $props();
</script>

<header class="flex items-center justify-between px-4 pt-8 pb-4">
	<h1 class="text-2xl font-bold text-ink">내 구절</h1>
	<a
		href="/quotes/new"
		class="rounded-full bg-accent-strong px-4 py-2 text-xs font-medium text-white"
	>
		+ 새 구절
	</a>
</header>

<section class="space-y-3 px-4 pb-10">
	{#each data.quotes as { quote, book } (quote.id)}
		<QuoteCard {quote} {book} href="/share/{quote.id}" />
	{:else}
		<p class="py-12 text-center text-sm text-ink-muted">
			아직 저장한 구절이 없어요.<br />마음에 남은 한 문장부터 시작해보세요.
		</p>
	{/each}
</section>
