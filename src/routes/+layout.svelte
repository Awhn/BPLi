<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.svg';
	import TabBar from '$lib/components/common/TabBar.svelte';
	import MiniPlayer from '$lib/components/player/MiniPlayer.svelte';

	let { children, data } = $props();

	// Hide the mini-player on the full now-playing screen itself
	const showMiniPlayer = $derived(
		data.nowPlaying && !page.url.pathname.startsWith(`/play/${data.nowPlaying.bookId}`)
	);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>B PLi — 책을 플레이하다</title>
</svelte:head>

<div class="mx-auto min-h-screen w-full max-w-md bg-bg {showMiniPlayer ? 'pb-32' : 'pb-20'}">
	{@render children()}
</div>

{#if showMiniPlayer && data.nowPlaying}
	<MiniPlayer nowPlaying={data.nowPlaying} />
{/if}

<TabBar />
