<script lang="ts">
	import FlowCard from '$lib/components/flow/FlowCard.svelte';

	let { data } = $props();

	const allTags = $derived([...new Set(data.flows.flatMap((f) => f.tags))]);
	let selectedTag: string | null = $state(null);

	const filtered = $derived(
		selectedTag ? data.flows.filter((f) => f.tags.includes(selectedTag!)) : data.flows
	);
</script>

<header class="px-4 pt-8 pb-4">
	<h1 class="text-2xl font-bold text-ink">Flow</h1>
	<p class="mt-1 text-sm text-ink-muted">지금 기분에 맞는 독서 플레이리스트</p>
</header>

<div class="flex gap-2 overflow-x-auto px-4 pb-4" style="scrollbar-width: none">
	<button
		type="button"
		onclick={() => (selectedTag = null)}
		class="shrink-0 rounded-full px-4 py-1.5 text-xs font-medium
			{selectedTag === null ? 'bg-accent-strong text-white' : 'bg-surface-raised text-ink-muted'}"
	>
		전체
	</button>
	{#each allTags as tag (tag)}
		<button
			type="button"
			onclick={() => (selectedTag = tag)}
			class="shrink-0 rounded-full px-4 py-1.5 text-xs font-medium
				{selectedTag === tag ? 'bg-accent-strong text-white' : 'bg-surface-raised text-ink-muted'}"
		>
			#{tag}
		</button>
	{/each}
</div>

<div class="grid grid-cols-2 gap-4 px-4 pb-10">
	{#each filtered as flow (flow.id)}
		<FlowCard {flow} />
	{/each}
</div>
