<script context="module" lang="ts">
	export type MenuItem = { href: string; label: string; active?: boolean };
</script>

<script lang="ts">
	export let links: MenuItem[];
	export let type: 'header' | 'drawer';
</script>

<ul class="epfn-menu--{type}">
	{#each links as link}
		<li data-active={link.active}>
			<a href={link.href} aria-current={link.active ? 'page' : undefined} on:click>{link.label}</a>
		</li>
	{/each}
</ul>

<style lang="scss">
	.epfn-menu {
		&--drawer {
			display: flex;
			flex-direction: column;

			li {
				display: flex;
				width: 100%;
				border-color: var(--menu-border-color, gray);
				border-top: var(--menu-border-width, 1px) solid rgba(0, 0, 0, 0);

				&:not(:last-child) {
					border-bottom-width: var(--menu-border-width, 1px);
				}
			}

			a {
				width: 100%;
				padding-top: 0.75rem;
				padding-bottom: 0.75rem;
			}
		}

		&--header {
			display: flex;
			align-items: center;
			gap: 1rem;
			height: 100%;

			li {
				height: 100%;
				display: flex;
				align-items: center;
				border-bottom: var(--menu-border-width, 2px) solid rgba(0, 0, 0, 0);
				border-top: var(--menu-border-width, 2px) solid rgba(0, 0, 0, 0);

				&:hover,
				&[data-active='true'] {
					border-bottom-color: var(--menu-border-color, gray);
				}
			}

			a {
				white-space: nowrap;
				padding-top: 0.25rem;
				padding-bottom: 0.25rem;
				height: 100%;
				display: flex;
				align-items: center;
			}
		}
	}
</style>
