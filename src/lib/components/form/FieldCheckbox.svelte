<script lang="ts">
	import { getContext } from 'svelte';
	import type { EPFNAccent, EPFNTheme } from './type';

	export let name: string;
	export let value: boolean = false;
	export let hidden: boolean = false;
	export let required: boolean = false;

	export let theme: EPFNTheme = undefined;
	const themeCTX = getContext<typeof theme>('epfn-theme') ?? 'both';
	export let accent: EPFNAccent = undefined;
	const accentCTX = getContext<typeof theme>('epfn-accent') ?? 'bw';
</script>

<div class="epfn-field-checkbox" style={hidden ? 'display: none;' : undefined}>
	<input
		id={'epfn-input-' + name}
		type="checkbox"
		value={name}
		bind:checked={value}
		{name}
		{required}
		data-theme={theme ?? themeCTX}
		data-accent={accent ?? accentCTX}
	/>
	<label for={'epfn-input-' + name}>
		<slot />
	</label>
</div>

<style lang="scss">
	@use './styles.scss' as styles;

	div {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	input {
		@apply focus:ring-offset-0;

		&[data-theme='both'] {
			@apply form-checkbox rounded bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-600;
		}

		&[data-theme='light'] {
			@apply form-checkbox rounded bg-neutral-50 border-neutral-200;
		}

		&[data-theme='dark'] {
			@apply form-checkbox rounded bg-neutral-900 border-neutral-600;
		}

		&[data-accent='bw'] {
			@apply text-black focus:ring-neutral-600;
		}

		&[data-accent='gray'] {
			@apply text-neutral-500 focus:ring-neutral-300;
		}

		&[data-accent='blue'] {
			@apply text-blue-500 focus:ring-blue-300;
		}
		&[data-accent='pink'] {
			@apply text-pink-500 focus:ring-pink-300;
		}
	}

	label {
		font-weight: normal;
	}
</style>
