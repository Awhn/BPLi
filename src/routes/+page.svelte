<script lang="ts">
	import RecommendationShelf from '$lib/components/common/RecommendationShelf.svelte';

	let { data } = $props();

	const hour = new Date().getHours();
	const greeting =
		hour < 6 ? '늦은 밤이에요' : hour < 12 ? '좋은 아침이에요' : hour < 18 ? '좋은 오후예요' : '편안한 저녁이에요';
</script>

<header class="px-4 pt-8 pb-6">
	<p class="text-sm text-ink-muted">{greeting}</p>
	<h1 class="mt-1 text-2xl font-bold text-ink">
		지금 기분에 맞는<br />한 챕터부터 시작해요
	</h1>
</header>

{#each data.sections as section (section.section.id)}
	<RecommendationShelf {section} />
{/each}

<section class="mx-4 mb-8 rounded-2xl bg-gradient-to-br from-accent-strong/30 to-surface p-5">
	<h2 class="font-bold text-ink">나의 독서 성향은?</h2>
	<p class="mt-1 text-sm text-ink-muted">2분이면 충분해요. 테스트하고 맞춤 추천을 받아보세요.</p>
	<a
		href="/personality-test"
		class="mt-3 inline-block rounded-full bg-accent-strong px-5 py-2 text-sm font-medium text-white"
	>
		테스트 시작하기
	</a>
</section>
