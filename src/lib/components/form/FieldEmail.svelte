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
</script>

<div class="epfn-field-email">
	<label for={'epfn-input-' + name}>{label}</label>
	<input
		id={'epfn-input-' + name}
		type="email"
		bind:value
		{name}
		{readonly}
		{required}
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

	input {
		@apply form-input transition-colors rounded;

		@include styles.input;

		&:read-only {
			@apply focus:ring-0 cursor-not-allowed;
		}

		@include styles.accent;
	}
</style>
