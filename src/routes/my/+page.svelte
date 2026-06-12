<script lang="ts">
	let { data } = $props();

	const menu = [
		{ href: '/quotes', label: '내 구절', icon: '✏️' },
		{ href: '/personality-test', label: '독서 성향 테스트', icon: '🔮' },
		{ href: '/wrapped', label: '연말 결산 미리보기', icon: '🎁' },
		{ href: '/onboarding', label: '취향 설정', icon: '🎯' }
	];
</script>

<header class="px-4 pt-8 pb-6">
	<h1 class="text-2xl font-bold text-ink">My</h1>
</header>

<section class="mx-4 mb-6 grid grid-cols-3 gap-3">
	<div class="rounded-xl bg-surface p-4 text-center">
		<p class="text-2xl font-bold text-accent">{data.stats.finished}</p>
		<p class="mt-1 text-xs text-ink-muted">완독</p>
	</div>
	<div class="rounded-xl bg-surface p-4 text-center">
		<p class="text-2xl font-bold text-accent">{data.stats.reading}</p>
		<p class="mt-1 text-xs text-ink-muted">읽는 중</p>
	</div>
	<div class="rounded-xl bg-surface p-4 text-center">
		<p class="text-2xl font-bold text-accent">{data.stats.quotes}</p>
		<p class="mt-1 text-xs text-ink-muted">저장 구절</p>
	</div>
</section>

<nav class="mx-4 space-y-2 pb-10">
	{#each menu as item (item.href)}
		<a
			href={item.href}
			class="flex items-center gap-3 rounded-xl bg-surface p-4 text-sm font-medium text-ink transition-colors hover:bg-surface-raised"
		>
			<span>{item.icon}</span>
			{item.label}
		</a>
	{/each}
</nav>
