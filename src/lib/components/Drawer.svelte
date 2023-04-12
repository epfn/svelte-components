<script context="module" lang="ts">
	import { writable } from 'svelte/store';

	function createStore() {
		const { subscribe, set, update } = writable(false);

		return {
			subscribe,
			close: () => set(false),
			toggle: () => update((b) => !b)
		};
	}

	export const drawerState = createStore();
</script>

<script lang="ts">
	import { BROWSER } from 'esm-env';
	import { fade, fly } from 'svelte/transition';

	export let width = 260;
	export let duration = 150;
	export let placement: 'left' | 'right' = 'left';

	$: if (BROWSER) {
		const body = document.documentElement.querySelector('body');
		if (body) body.style.overflowY = $drawerState ? 'hidden' : 'unset';
	}

	const icons = {
		open: 'M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z',
		close:
			'M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z'
	};
</script>

<svelte:window
	on:resize={(event) => {
		if ($drawerState) {
			const prev = event.currentTarget.innerWidth;
			setTimeout(() => {
				if (prev !== event.currentTarget.innerWidth) drawerState.close;
			}, 500);
		}
	}}
/>

<div class="epfn-drawer">
	<button
		type="button"
		aria-controls="main-menu"
		aria-label="Main Menu Button"
		aria-expanded={$drawerState}
		on:click={drawerState.toggle}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="var(--drawer-{$drawerState ? 'close' : 'open'}-button-color, black)"
			width="24"
			height="24"
		>
			<path fill-rule="evenodd" d={icons[$drawerState ? 'close' : 'open']} clip-rule="evenodd" />
		</svg>
	</button>

	{#if $drawerState}
		<div
			class="backdrop"
			transition:fade={{ duration }}
			on:keydown={() => null}
			on:click={drawerState.close}
		/>
		<div
			class="content"
			id="main-menu"
			style="width: {width}px; {placement}: 0"
			transition:fly={{
				x: placement === 'left' ? -width : width,
				duration,
				opacity: 1
			}}
		>
			<slot><div style="background-color: white;" /></slot>
		</div>
	{/if}
</div>

<style>
	.epfn-drawer {
		display: flex;
		align-items: center;
		isolation: isolate;
		z-index: 10;
	}

	button {
		position: relative;
		z-index: 2;
		-webkit-tap-highlight-color: rgba(255, 255, 255, 0);
	}

	.backdrop {
		position: fixed;
		z-index: -1;
		top: 0;
		left: 0;
		background-color: var(--drawer-backdrop-color, rgba(0, 0, 0, 0.75));
		height: 100%;
		width: 100%;
		cursor: pointer;
	}

	.content {
		position: fixed;
		z-index: 1;
		top: 0;
		height: 100%;
		overflow-y: auto;
		display: grid;
	}
</style>
