<script context="module" lang="ts">
	export type FieldSelectItem = { value: string | number; label: string };
</script>

<script lang="ts">
	import { getContext } from 'svelte';
	import type { EPFNAccent, EPFNTheme } from './type';

	export let value: string | number = '';
	export let label: string;
	export let name: string;
	export let required: boolean = false;
	export let error: boolean = false;
	export let items: FieldSelectItem[];

	export let theme: EPFNTheme = undefined;
	const themeCTX = getContext<typeof theme>('epfn-theme') ?? 'both';
	export let accent: EPFNAccent = undefined;
	const accentCTX = getContext<typeof theme>('epfn-accent') ?? 'bw';
</script>

<div class="epfn-field-select">
	<label for={'epfn-input-' + name}>{label}</label>
	<select
		id={'epfn-input-' + name}
		bind:value
		{name}
		{required}
		aria-invalid={error}
		data-theme={theme ?? themeCTX}
		data-accent={accent ?? accentCTX}
		on:change
	>
		{#each items as item}
			<option value={item.value}>{item.label}</option>
		{/each}
	</select>
</div>

<style lang="scss">
	@use './styles.scss' as styles;

	div {
		@include styles.field;
	}

	label {
		font-weight: 500;
	}

	select {
		@apply transition-colors;

		&[data-theme='both'] {
			@apply form-select bg-neutral-50 dark:bg-neutral-900 rounded border-neutral-200 dark:border-neutral-600;
		}

		&[data-theme='light'] {
			@apply form-select bg-neutral-50 dark:bg-neutral-900 rounded border-neutral-200;
		}

		&[data-theme='dark'] {
			@apply form-select bg-neutral-50 dark:bg-neutral-900 rounded border-neutral-600;
		}

		@include styles.accent(false);
	}
</style>
