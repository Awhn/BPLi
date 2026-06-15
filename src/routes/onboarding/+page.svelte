<script lang="ts">
	import { goto } from '$app/navigation';

	const genres = ['에세이', '소설', '시', '인문', '심리', '과학', '경제', '역사', '고전', 'SF'];
	const moods = ['잔잔한', '몰입되는', '위로가 되는', '지적인', '가벼운', '깊이 있는'];
	const goals = ['하루 10분 읽기', '한 달 1권', '구절 수집', '취향 발견'];

	let selectedGenres: string[] = $state([]);
	let selectedMoods: string[] = $state([]);
	let selectedGoal: string | null = $state(null);

	function toggle(list: string[], value: string): string[] {
		return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
	}

	function finish() {
		// MVP: preferences stay client-side; persisted to user profile in Phase 3
		goto('/');
	}
</script>

<header class="px-6 pt-10 pb-6">
	<h1 class="text-2xl font-bold text-ink">취향을 알려주세요</h1>
	<p class="mt-2 text-sm text-ink-muted">맞춤 추천을 위한 첫 설정이에요.</p>
</header>

<section class="px-6 pb-6">
	<h2 class="mb-3 text-sm font-bold text-ink">선호 장르</h2>
	<div class="flex flex-wrap gap-2">
		{#each genres as genre (genre)}
			<button
				type="button"
				onclick={() => (selectedGenres = toggle(selectedGenres, genre))}
				class="rounded-full px-4 py-2 text-xs font-medium transition-colors
					{selectedGenres.includes(genre)
					? 'bg-accent-strong text-white'
					: 'bg-surface-raised text-ink-muted'}"
			>
				{genre}
			</button>
		{/each}
	</div>
</section>

<section class="px-6 pb-6">
	<h2 class="mb-3 text-sm font-bold text-ink">읽고 싶은 분위기</h2>
	<div class="flex flex-wrap gap-2">
		{#each moods as mood (mood)}
			<button
				type="button"
				onclick={() => (selectedMoods = toggle(selectedMoods, mood))}
				class="rounded-full px-4 py-2 text-xs font-medium transition-colors
					{selectedMoods.includes(mood)
					? 'bg-accent-strong text-white'
					: 'bg-surface-raised text-ink-muted'}"
			>
				{mood}
			</button>
		{/each}
	</div>
</section>

<section class="px-6 pb-8">
	<h2 class="mb-3 text-sm font-bold text-ink">독서 목표</h2>
	<div class="flex flex-wrap gap-2">
		{#each goals as goal (goal)}
			<button
				type="button"
				onclick={() => (selectedGoal = goal)}
				class="rounded-full px-4 py-2 text-xs font-medium transition-colors
					{selectedGoal === goal ? 'bg-accent-strong text-white' : 'bg-surface-raised text-ink-muted'}"
			>
				{goal}
			</button>
		{/each}
	</div>
</section>

<div class="px-6 pb-12">
	<button
		type="button"
		onclick={finish}
		class="w-full rounded-full bg-accent-strong py-3.5 text-sm font-bold text-white"
	>
		시작하기
	</button>
</div>
