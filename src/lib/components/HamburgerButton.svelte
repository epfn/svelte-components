<script lang="ts">
	import type { Writable } from 'svelte/store';

	type Props = {
		for: string;
		open: Writable<boolean>;
		class?: string;
	};

	let { for: id, open, class: className } = $props<Props>();
</script>

<button class={className} onclick={() => open.set(!$open)} aria-expanded={$open} aria-controls={id}>
	<div data-open={$open}></div>
</button>

<style>
	div {
		width: 24px;
		height: 24px;
		background-color: currentColor;
		--webkit-mask: var(--_svg);
		mask: var(--_svg);
	}

	div[data-open='true'] {
		--_svg: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" %3E%3Cpath d="M18 6 6 18"/%3E%3Cpath d="m6 6 12 12"/%3E%3C/svg%3E%0A');
	}

	div[data-open='false'] {
		--_svg: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" %3E%3Cline x1="4" x2="20" y1="12" y2="12" /%3E%3Cline x1="4" x2="20" y1="6" y2="6" /%3E%3Cline x1="4" x2="20" y1="18" y2="18" /%3E%3C/svg%0A%3E%0A');
	}
</style>
