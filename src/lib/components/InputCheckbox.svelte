<script lang="ts">
	import { generateID } from '$lib/helpers';
	import type { Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = Omit<HTMLInputAttributes, 'type'> & { children: Snippet };

	let { id = generateID('checkbox'), children, ...restProps } = $props<Props>();
</script>

<div>
	<input {...restProps} type="checkbox" {id} />
	<label for={id}>{@render children()}</label>
</div>

<style>
	div {
		gap: 1ch;
		display: flex;
		align-items: center;
	}
</style>
