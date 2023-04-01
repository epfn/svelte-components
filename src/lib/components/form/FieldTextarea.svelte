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
	export let rows: number = 8;

	export let theme: EPFNTheme = undefined;
	const themeCTX = getContext<typeof theme>('epfn-theme') ?? 'both';
	export let accent: EPFNAccent = undefined;
	const accentCTX = getContext<typeof theme>('epfn-accent') ?? 'bw';
</script>

<div class="epfn-field-textarea">
	<label for={'epfn-input-' + name}>{label}</label>
	<textarea
		id={'epfn-input-' + name}
		bind:value
		{name}
		{readonly}
		{required}
		{rows}
		{placeholder}
		aria-invalid={error}
		data-theme={theme ?? themeCTX}
		data-accent={accent ?? accentCTX}
	/>
</div>

<style lang="scss">
	@use './styles.scss' as styles;

	div {
		@include styles.field;
	}

	label {
		font-weight: 500;
	}

	textarea {
		@apply form-input rounded transition-colors;

		@include styles.input;

		&:read-only {
			@apply cursor-not-allowed focus:ring-0;
		}

		@include styles.accent;
	}
</style>
