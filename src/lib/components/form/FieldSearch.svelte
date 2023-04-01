<script lang="ts">
	import { getContext } from 'svelte';
	import type { EPFNAccent, EPFNTheme } from './type';

	export let value: string = '';
	export let placeholder: string = '';
	export let label: string;
	export let name: string;
	export let required: boolean = false;
	export let readonly: boolean = false;
	export let error: boolean = false;

	export let theme: EPFNTheme = undefined;
	const themeCTX = getContext<typeof theme>('epfn-theme') ?? 'both';
	export let accent: EPFNAccent = undefined;
	const accentCTX = getContext<typeof theme>('epfn-accent') ?? 'bw';

	let input: HTMLInputElement;
</script>

<div class="epfn-field-text">
	<label for={'epfn-input-' + name}>{label}</label>
	<span>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
			<path
				fill-rule="evenodd"
				d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
				clip-rule="evenodd"
			/>
		</svg>
		<input
			bind:this={input}
			id={'epfn-input-' + name}
			type="search"
			bind:value
			{name}
			{readonly}
			{required}
			{placeholder}
			aria-invalid={error}
			data-theme={theme ?? themeCTX}
			data-accent={accent ?? accentCTX}
		/>
		{#if !readonly}
			<button
				type="reset"
				on:click={() => {
					value = '';
					input.focus();
				}}
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
					<path
						d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
					/>
				</svg>
			</button>
		{/if}
	</span>
</div>

<style lang="scss">
	@use './styles.scss' as styles;

	$icon-size: 1.25rem;

	div {
		@include styles.field;
	}

	label {
		font-weight: 500;
	}

	span {
		isolation: isolate;
		display: grid;
		grid-auto-flow: column;
		grid-template-columns: auto 1fr auto;
		align-items: center;

		& > svg {
			padding-inline: 0.5rem;
			z-index: 2;
			grid-area: 1/1/2/2;
			height: $icon-size;
			width: 100%;
		}

		& > button {
			padding-inline: 0.5rem;
			z-index: 2;
			height: 100%;
			grid-area: 1/-2/-1/-1;
		}
	}

	svg {
		width: 1.25rem;
		height: 1.25rem;
		@apply text-neutral-500;
	}

	input {
		@apply form-input rounded transition-colors;

		z-index: 1;
		grid-area: 1/1/-1/-1;
		padding-inline: 1rem + $icon-size;

		@include styles.input;

		&:read-only {
			@apply cursor-not-allowed focus:ring-0;
		}

		@include styles.accent;
	}

	[type='search']::-webkit-search-cancel-button,
	[type='search']::-webkit-search-decoration {
		-webkit-appearance: none;
		appearance: none;
	}
</style>
