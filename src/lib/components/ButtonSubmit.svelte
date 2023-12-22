<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Props = HTMLButtonAttributes & { loading?: boolean; children: Snippet };

	let { children, loading, disabled, type, ...restProps } = $props<Props>();
</script>

<button {...restProps} disabled={loading || disabled} type={type || 'submit'}>
	{#if loading}
		<span />
	{:else}
		{@render children()}
	{/if}
</button>

<style>
	button {
		gap: 0.25rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	button:disabled {
		cursor: not-allowed;
	}

	span {
		width: 24px;
		height: 24px;
		animation: spin 1s linear infinite;
		background-color: currentColor;
		--webkit-mask: var(--_svg);
		mask: var(--_svg);
		--_svg: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" %3E%3Cpath d="M21 12a9 9 0 1 1-6.219-8.56"/%3E%3C/svg%3E%0A');
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
