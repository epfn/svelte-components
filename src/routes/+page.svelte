<script lang="ts">
	import Drawer, { drawerState } from '$lib/components/Drawer.svelte';
	import FieldPassword from '$lib/components/form/FieldPassword.svelte';
	import FieldSearch from '$lib/components/form/FieldSearch.svelte';
	import Menu, { type MenuItem } from '$lib/components/Menu.svelte';

	const links: MenuItem[] = [
		{ href: '/#a', label: 'Active', active: true },
		{ href: '/#b', label: 'Not Active' },
		{ href: '/#c', label: 'Not Active' }
	];
</script>

<header class="flex h-16 gap-8 border border-b-neutral-200 px-4">
	<Drawer>
		<div class="bg-white p-4 pt-12 dark:bg-neutral-800">
			<Menu {links} type="drawer" on:click={drawerState.close} />
		</div>
	</Drawer>
	<Menu {links} type="header" />
</header>

<main>
	<div class="flex max-w-xs flex-col gap-4">
		<FieldPassword label="password" name="password" />
		<FieldSearch label="search" name="search" />
	</div>
</main>
