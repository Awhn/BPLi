<script lang="ts">
	import type { Flow } from '$lib/types';

	let { flow }: { flow: Flow } = $props();

	const moodGradients: Record<string, string> = {
		calm: 'linear-gradient(150deg, #2b3a55, #1a2238)',
		healing: 'linear-gradient(150deg, #3d2e4f, #241a38)',
		focus: 'linear-gradient(150deg, #4f3a2e, #2e2118)',
		energize: 'linear-gradient(150deg, #2e4f3d, #18301f)'
	};
	const gradient = $derived(moodGradients[flow.mood ?? ''] ?? moodGradients.calm);
</script>

<a href="/flows/{flow.id}" class="block w-40 shrink-0">
	<div
		class="flex h-40 w-40 flex-col justify-between rounded-xl p-3 shadow-lg"
		style="background: {gradient}"
	>
		<div class="flex flex-wrap gap-1">
			{#each flow.tags.slice(0, 2) as tag (tag)}
				<span class="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-paper/90">#{tag}</span>
			{/each}
		</div>
		<div>
			<p class="font-serif text-sm leading-snug font-bold text-paper">{flow.title}</p>
			<p class="mt-1 text-[10px] text-paper/60">{flow.estimatedTotalMinutes}분 · {flow.items.length}개</p>
		</div>
	</div>
</a>
