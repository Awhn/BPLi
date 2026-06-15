<script lang="ts">
	import { page } from '$app/state';

	const tabs = [
		{ href: '/', label: '홈', icon: '🏠' },
		{ href: '/books', label: '검색', icon: '🔍' },
		{ href: '/flows', label: 'Flow', icon: '🌊' },
		{ href: '/library', label: '서재', icon: '📚' },
		{ href: '/my', label: 'My', icon: '👤' }
	];

	function isActive(href: string): boolean {
		if (href === '/') return page.url.pathname === '/';
		return page.url.pathname.startsWith(href);
	}
</script>

<nav
	class="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 border-t border-white/5 bg-surface/95 backdrop-blur"
>
	<ul class="flex justify-around py-2">
		{#each tabs as tab (tab.href)}
			<li>
				<a
					href={tab.href}
					class="flex flex-col items-center gap-0.5 px-3 py-1 text-xs transition-colors
						{isActive(tab.href) ? 'text-accent' : 'text-ink-muted hover:text-ink'}"
				>
					<span class="text-lg">{tab.icon}</span>
					<span>{tab.label}</span>
				</a>
			</li>
		{/each}
	</ul>
</nav>
