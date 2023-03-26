<script lang="ts">
	import Drawer from '$lib/components/Drawer.svelte';
	import Menu, { type MenuItem } from '$lib/components/Menu.svelte';

	let isOpen = false;
	const links: MenuItem[] = [
		{ href: '/#a', label: 'Active', active: true },
		{ href: '/#b', label: 'Not Active' },
		{ href: '/#c', label: 'Not Active' }
	];
</script>

<header class="flex h-16 gap-8 border border-b-neutral-200 px-4">
	<Drawer bind:isOpen>
		<div class="bg-white p-4 pt-12 dark:bg-neutral-800">
			<Menu {links} type="drawer" on:click={() => (isOpen = false)} />
		</div>
	</Drawer>
	<Menu {links} type="header" />
</header>
