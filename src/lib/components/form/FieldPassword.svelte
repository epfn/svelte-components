<script lang="ts">
	import { getContext } from 'svelte';
	import type { EPFNAccent, EPFNTheme } from './type';

	export let value: string = '';
	export let label: string;
	export let name: string;
	export let required: boolean = false;
	export let readonly: boolean = false;
	export let error: boolean = false;

	export let theme: EPFNTheme = undefined;
	const themeCTX = getContext<typeof theme>('epfn-theme') ?? 'both';
	export let accent: EPFNAccent = undefined;
	const accentCTX = getContext<typeof theme>('epfn-accent') ?? 'bw';

	let isPassword = true;
</script>

<div class="epfn-field-password">
	<label for={'epfn-input' + name}>{label}</label>
	<span>
		{#if isPassword}
			<input
				type="password"
				id={'epfn-input' + name}
				{name}
				{required}
				{readonly}
				aria-invalid={error}
				data-theme={theme ?? themeCTX}
				data-accent={accent ?? accentCTX}
				bind:value
			/>
		{:else}
			<input
				type="text"
				id={'epfn-input' + name}
				{name}
				{required}
				{readonly}
				aria-invalid={error}
				data-theme={theme ?? themeCTX}
				data-accent={accent ?? accentCTX}
				bind:value
			/>
		{/if}

		{#if !readonly}
			<button
				type="button"
				aria-label="{isPassword ? 'show' : 'hide'} password"
				on:click={() => (isPassword = !isPassword)}
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
					{#if isPassword}
						<path
							fill-rule="evenodd"
							d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z"
							clip-rule="evenodd"
						/>
						<path
							d="M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z"
						/>
					{:else}
						<path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
						<path
							fill-rule="evenodd"
							d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
							clip-rule="evenodd"
						/>
					{/if}
				</svg>
			</button>
		{/if}
	</span>
</div>

<style lang="scss">
	@use './styles.scss' as styles;

	div {
		@include styles.field;
	}

	span {
		display: grid;
		grid-auto-flow: column;
		grid-template-columns: 1fr auto;
	}

	label {
		font-weight: 500;
	}

	button {
		grid-area: 1/2/-1/-1;
		padding-inline: 0.5rem;
	}

	svg {
		width: 1.25rem;
		height: 1.25rem;
		@apply transition-colors;
		@apply text-neutral-500;
	}

	input {
		grid-area: 1/1/-1/-1;
		@apply form-input transition-colors rounded;
		padding-right: 2.25rem;

		@include styles.input;

		&:read-only {
			@apply focus:ring-0 cursor-not-allowed;
		}

		@include styles.accent;

		&[data-theme='both'] + button svg {
			&:hover,
			&:focus {
				@apply text-neutral-600 dark:text-neutral-400;
			}
		}

		&[data-theme='light'] + button svg {
			&:hover,
			&:focus {
				@apply text-neutral-600;
			}
		}

		&[data-theme='dark'] + button svg {
			&:hover,
			&:focus {
				@apply text-neutral-400;
			}
		}
	}
</style>
