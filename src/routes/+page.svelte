<script lang="ts">
	import HamburgerButton from '$lib/components/HamburgerButton.svelte';
	import InputCheckbox from '$lib/components/InputCheckbox.svelte';
	import InputPassword from '$lib/components/InputPassword.svelte';
	import InputValidation from '$lib/components/InputValidation.svelte';
	import MobileMenu from '$lib/components/ModalDrawer.svelte';
	import { generateID } from '$lib/helpers';
	import { writable } from 'svelte/store';

	let placement = $state<'left' | 'right' | 'bottom' | 'top'>('left');

	let header = $state<HTMLElement>();
	let top = $state(0);
	let size = $state<320 | 'auto' | 'full'>('auto');
	let duration = $state(250);
	let animation = $state<'fly' | 'slide' | 'fade' | 'none'>('fly');

	$effect(() => {
		top = header?.clientHeight ?? 0;
	});

	const id = generateID('drawer');
	let open = writable(false);

	let message = $state('test');
</script>

<div class="bg-slate-200 w-full text-black">
	<header class="flex justify-end gap-4 bg-white px-4 py-2 items-center" bind:this={header}>
		<div class="grid">
			<label for="">Position</label>
			<select name="placement" bind:value={placement}>
				{#each ['left', 'right', 'bottom', 'top'] as value}
					<option {value}>{value}</option>
				{/each}
			</select>
		</div>

		<div class="grid">
			<label>Size</label>
			<select name="size" bind:value={size}>
				{#each ['auto', 'full', 320] as value}
					<option {value}>{value}</option>
				{/each}
			</select>
		</div>

		<div class="grid">
			<label>Animation</label>
			<select name="variant" bind:value={animation}>
				{#each ['fly', 'slide', 'fade', 'none'] as value}
					<option {value}>{value}</option>
				{/each}
			</select>
		</div>

		<div class="grid">
			<label>Duration</label>
			<select name="duration" bind:value={duration}>
				{#each [250, 500, 1000] as value}
					<option {value}>{value}</option>
				{/each}
			</select>
		</div>

		<HamburgerButton for={id} {open} class="border rounded p-1" />

		<MobileMenu
			rootID="body"
			{id}
			{placement}
			{top}
			{duration}
			{animation}
			{size}
			backdrop
			{open}
			class="bg-blue-100 "
		>
			<div class="h-44 aspect-square bg-slate-600">123</div>
			<div class="h-44 aspect-square bg-slate-400">123</div>
			<div class="h-44 aspect-square bg-slate-600">123</div>
			<div class="h-44 aspect-square bg-slate-400">123</div>

			<a href="/button">Button</a>
			<button>123123</button>
		</MobileMenu>
	</header>

	<main>
		<div class="p-4 grid gap-2">
			<input type="text" id="123" bind:value={message} />
			<InputValidation for="123" {message} />

			<InputPassword bind:value={message} />
			<InputCheckbox class="form-checkbox">text</InputCheckbox>
		</div>

		<div class="h-44 aspect-square bg-slate-100">123</div>
		<div class="h-44 aspect-square bg-slate-200">123</div>
		<div class="h-44 aspect-square bg-slate-100">123</div>
		<div class="h-44 aspect-square bg-slate-200">123</div>
		<div class="h-44 aspect-square bg-slate-100">123</div>
		<div class="h-44 aspect-square bg-slate-200">123</div>
		<div class="h-44 aspect-square bg-slate-100">123</div>
		<div class="h-44 aspect-square bg-slate-200">123</div>
		<div class="h-44 aspect-square bg-slate-100">123</div>
		<div class="h-44 aspect-square bg-slate-200">123</div>
		<div class="h-44 aspect-square bg-slate-100">123</div>
		<div class="h-44 aspect-square bg-slate-200">123</div>
		<div class="h-44 aspect-square bg-slate-100">123</div>
		<div class="h-44 aspect-square bg-slate-200">123</div>
	</main>
</div>
