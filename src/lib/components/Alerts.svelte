<script context="module" lang="ts">
	export type AlertItem = { text: string; type: 'success' | 'error' | 'warning' };
</script>

<script lang="ts">
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';

	export let items: AlertItem[];
	export let duration = 200;

	export let theme: 'both' | 'light' | 'dark' | undefined = undefined;
	const themeCTX = getContext<typeof theme>('epfn-theme') ?? 'both';

	const icons = {
		success:
			'M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z',
		error:
			'M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z',
		warning:
			'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z'
	};
</script>

{#if items.length > 0}
	<ul class="epfn-alerts">
		{#each items as { text, type }}
			<li data-type={type} in:fade={{ duration: duration }} data-theme={theme ?? themeCTX}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
					<path fill-rule="evenodd" d={icons[type]} clip-rule="evenodd" />
				</svg>
				<span>{text}</span>
			</li>
		{/each}
	</ul>
{/if}

<style lang="scss">
	ul {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	li {
		display: grid;
		grid-template-columns: 1.25rem 1fr 1.25rem;
		align-items: center;
		gap: 0.75rem;
		padding: 0.5rem 1rem;
		min-height: 3rem;
		background-color: var(--background-color, white);
		text-align: center;
		font-weight: 500;
		border-radius: 0.25rem;
		@apply shadow;

		@mixin light {
			color: black;

			&[data-type='success'] {
				--background-color: theme(colors.emerald.50);
				--svg-color: theme(colors.emerald.500);
				@apply shadow-emerald-200;
			}

			&[data-type='error'] {
				--background-color: theme(colors.red.50);
				--svg-color: theme(colors.red.400);
				@apply shadow-red-200;
			}

			&[data-type='warning'] {
				--background-color: theme(colors.yellow.50);
				--svg-color: theme(colors.yellow.500);
				@apply shadow-yellow-200;
			}
		}

		@mixin dark {
			color: white;

			&[data-type='success'] {
				--background-color: theme(colors.green.700);
				--svg-color: theme(colors.green.100);
				@apply shadow-green-900;
			}

			&[data-type='error'] {
				--background-color: theme(colors.red.700);
				--svg-color: theme(colors.red.100);
				@apply shadow-red-900;
			}

			&[data-type='warning'] {
				--background-color: theme(colors.neutral.700);
				--svg-color: theme(colors.neutral.200);
				@apply shadow-neutral-900;
			}
		}

		&[data-theme='both'] {
			@include light;
			@media (prefers-color-scheme: dark) {
				@include dark;
			}
		}

		&[data-theme='light'] {
			@include light;
		}

		&[data-theme='dark'] {
			@include dark;
		}
	}

	svg {
		color: var(--svg-color, gray);
	}
</style>
