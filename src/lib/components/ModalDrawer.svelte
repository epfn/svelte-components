<script lang="ts">
	import type { Snippet } from 'svelte';
	import { type Writable } from 'svelte/store';
	import { fade, fly, slide } from 'svelte/transition';

	type Props = {
		children: Snippet;
		open: Writable<boolean>;
		id: string;
		top?: number;
		bottom?: number;
		left?: number;
		right?: number;
		animation?: 'fly' | 'slide' | 'fade' | 'none';
		duration?: number;
		placement?: 'left' | 'right' | 'top' | 'bottom';
		size?: number | 'full' | 'auto';
		backdrop?: boolean;
		class?: string;
	};

	let {
		children,
		open,
		id,
		top = 0,
		bottom = 0,
		left = 0,
		right = 0,
		duration = 200,
		animation = 'fly',
		placement = 'left',
		size = 'auto',
		backdrop = false,
		class: className
	} = $props<Props>();

	function closeMenu() {
		open.set(false);
	}

	function animate(node: HTMLElement) {
		switch (animation) {
			case 'fly':
				const direction = {
					left: { x: '-100%' },
					right: { x: '100%' },
					top: { y: '-100%' },
					bottom: { y: '100%' }
				};
				return fly(node, { ...direction[placement], duration, opacity: 1 });

			case 'slide':
				return slide(node, {
					axis: ['left', 'right'].includes(placement) ? 'x' : 'y',
					duration
				});

			case 'fade':
				return fade(node, { duration });

			default:
				return fly(node, { x: 0, duration: 0, opacity: 1 });
		}
	}

	function side(value: typeof placement) {
		if (placement !== value) return 'auto';
		if (size === 'auto') return 'fit-content(100%)';
		if (typeof size === 'number') return `minmax(auto, ${size}px)`;
	}

	$effect(() => {
		if ($open) {
			//hide scroll and preserve width
			const html = document.documentElement;
			html.style.paddingRight = `${window.innerWidth - html.clientWidth}px`;
			html.style.overflowY = 'hidden';

			//@ts-ignore close menu on ESC and back button on Android
			const watcher = new CloseWatcher();
			watcher.addEventListener('close', closeMenu);

			return () => {
				//show scroll
				html.style.paddingRight = '';
				html.style.overflowY = '';

				watcher.destroy();
			};
		}
	});
</script>

{#if $open}
	<div
		class="wrap"
		style:inset={`${top}px ${right}px ${bottom}px ${left}px`}
		style:grid-template-columns={`${side('left')} ${side('right')}`}
		style:grid-template-rows={`${side('top')} ${side('bottom')}`}
	>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="backdrop"
			onclick={closeMenu}
			class:shadow={backdrop && size !== 'full'}
			transition:fade={{ duration: animation !== 'none' ? duration : 0 }}
		/>
		<div
			{id}
			class="{className} {size !== 'full' ? placement : null} content"
			tabindex="-1"
			style:width={size === 'full' ? window.innerWidth - left - right + 'px' : null}
			style:height={size === 'full' ? window.innerHeight - top - bottom + 'px' : null}
			transition:animate
		>
			{@render children()}
		</div>
	</div>
{/if}

<style>
	.wrap {
		display: grid;
		position: fixed;
		overflow: hidden;
	}

	.backdrop {
		grid-area: 1/1/-1/-1;
	}

	.shadow {
		background-color: rgba(0, 0, 0, 0.25);
	}

	.content {
		display: grid;
		overflow-y: auto;
		grid-area: 1/1/-1/-1;
	}

	.left {
		grid-area: 1/1/-1/2;
	}

	.right {
		grid-area: 1/2/-1/-1;
	}

	.top {
		grid-area: 1/1/2/-1;
	}

	.bottom {
		grid-area: 2/1/-1/-1;
	}
</style>
