<script lang="ts">
	import '../styles/tailwind.css';
</script>

<slot />

<style>
	:global(html) {
		height: 100%;
		color-scheme: light dark;
	}

	:global(body) {
		min-height: 100%;
	}
</style>
