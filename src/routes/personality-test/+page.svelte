<script lang="ts">
	import { tick } from 'svelte';
	import { enhance } from '$app/forms';
	import { fly, fade } from 'svelte/transition';
	import { PERSONALITY_QUESTIONS } from '$lib/data/personalityTest';
	import BookCard from '$lib/components/book/BookCard.svelte';
	import FlowCard from '$lib/components/flow/FlowCard.svelte';

	let { data, form } = $props();

	// A completed result comes from the form action (just finished) or from
	// load (previously taken). Form takes precedence.
	const shownResult = $derived(form?.result ? form : data.previousResult);

	let step = $state(0);
	let answers = $state<number[]>([]);
	let submitForm = $state<HTMLFormElement>();

	const total = PERSONALITY_QUESTIONS.length;
	const current = $derived(PERSONALITY_QUESTIONS[step]);
	const progress = $derived(Math.round((step / total) * 100));

	async function choose(optionIndex: number) {
		answers[step] = optionIndex;
		if (step < total - 1) {
			step += 1;
		} else {
			// Flush the hidden input (bound to `answers`) to the DOM before submit
			await tick();
			submitForm?.requestSubmit();
		}
	}

	function restart() {
		step = 0;
		answers = [];
	}

	async function shareResult() {
		if (!shownResult?.result) return;
		const r = shownResult.result;
		const text = `나의 독서 성향은 '${r.name}' — ${r.tagline}\n\nB PLi에서 나의 독서 성향을 알아보세요`;
		if (navigator.share) {
			try {
				await navigator.share({ title: 'B PLi 독서 성향', text, url: location.origin + '/personality-test' });
			} catch {
				/* cancelled */
			}
		} else {
			await navigator.clipboard.writeText(`${text}\n${location.origin}/personality-test`);
			alert('결과가 복사되었어요!');
		}
	}
</script>

<svelte:head>
	<title>독서 성향 테스트 — B PLi</title>
</svelte:head>

{#if shownResult?.result}
	{@const r = shownResult.result}
	<div in:fade={{ duration: 300 }}>
		<!-- Result card (§10.2 결과 카드) -->
		<section class="px-6 pt-10">
			<div class="mx-auto flex aspect-[4/5] max-w-xs flex-col justify-between rounded-2xl bg-paper p-6 text-[#2a2433] shadow-2xl">
				<p class="text-xs tracking-widest text-[#8e6aff] uppercase">My Reading Type</p>
				<div>
					<h1 class="font-serif text-3xl font-bold">{r.name}</h1>
					<p class="mt-2 text-sm text-[#2a2433]/70">{r.tagline}</p>
				</div>
				<p class="text-right text-[10px] font-bold tracking-widest text-[#8e6aff]">B PLi</p>
			</div>
		</section>

		<p class="px-8 py-6 text-center text-sm leading-relaxed text-ink-muted">{r.description}</p>

		<div class="flex justify-center gap-3 px-6 pb-8">
			<button
				type="button"
				onclick={shareResult}
				class="rounded-full bg-accent-strong px-8 py-3 text-sm font-bold text-white"
			>
				결과 공유하기
			</button>
			<button
				type="button"
				onclick={restart}
				class="rounded-full bg-surface-raised px-6 py-3 text-sm font-medium text-ink"
			>
				다시 하기
			</button>
		</div>

		{#if shownResult.books?.length}
			<section class="mb-6">
				<h2 class="mb-3 px-6 text-lg font-bold text-ink">{r.name}을 위한 책</h2>
				<div class="flex gap-3 overflow-x-auto px-6 pb-2" style="scrollbar-width: none">
					{#each shownResult.books as book (book.id)}
						<BookCard {book} />
					{/each}
				</div>
			</section>
		{/if}

		{#if shownResult.flows?.length}
			<section class="mb-6">
				<h2 class="mb-3 px-6 text-lg font-bold text-ink">어울리는 Flow</h2>
				<div class="flex gap-3 overflow-x-auto px-6 pb-2" style="scrollbar-width: none">
					{#each shownResult.flows as flow (flow.id)}
						<FlowCard {flow} />
					{/each}
				</div>
			</section>
		{/if}

		<!-- Signup nudge (§10.2 가입 유도) -->
		<section class="mx-6 mb-12 rounded-2xl bg-gradient-to-br from-accent-strong/30 to-surface p-5 text-center">
			<p class="text-sm text-ink">이 취향에 맞춰 매일 새로운 챕터를 추천받아 보세요.</p>
			<a href="/onboarding" class="mt-3 inline-block rounded-full bg-accent-strong px-6 py-2 text-sm font-medium text-white">
				B PLi 시작하기
			</a>
		</section>
	</div>
{:else}
	<!-- Question funnel -->
	<header class="px-6 pt-10 pb-4">
		<div class="mb-3 h-1 w-full overflow-hidden rounded-full bg-surface-raised">
			<div class="h-full rounded-full bg-accent-strong transition-all duration-300" style="width: {progress}%"></div>
		</div>
		<p class="text-xs text-ink-muted">{step + 1} / {total}</p>
	</header>

	{#key step}
		<section class="px-6 pt-6" in:fly={{ x: 24, duration: 250 }}>
			<h1 class="mb-6 font-serif text-2xl leading-snug font-bold text-ink">{current.prompt}</h1>
			<div class="space-y-3">
				{#each current.options as option, i (i)}
					<button
						type="button"
						onclick={() => choose(i)}
						class="w-full rounded-xl bg-surface p-4 text-left text-sm text-ink transition-colors hover:bg-surface-raised"
					>
						{option.label}
					</button>
				{/each}
			</div>
		</section>
	{/key}

	{#if step > 0}
		<div class="px-6 pt-6">
			<button type="button" onclick={() => (step -= 1)} class="text-sm text-ink-muted hover:text-ink">
				← 이전
			</button>
		</div>
	{/if}

	{#if form?.error}
		<p class="px-6 pt-4 text-sm text-red-400">{form.error}</p>
	{/if}

	<form method="POST" bind:this={submitForm} use:enhance class="hidden">
		<input type="hidden" name="answers" value={JSON.stringify(answers)} />
	</form>
{/if}
