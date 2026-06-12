<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import TabBar from '$lib/components/common/TabBar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>B PLi — 책을 플레이하다</title>
</svelte:head>

<div class="mx-auto min-h-screen w-full max-w-md bg-bg pb-20">
	{@render children()}
</div>

<TabBar />
