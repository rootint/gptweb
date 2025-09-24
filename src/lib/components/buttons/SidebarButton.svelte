<script>
	import { isSidebarShown } from '$lib/stores/sidebarStore';
	import { PanelLeft } from 'lucide-svelte';

	function toggleSidebar() {
		// isSidebarShown.update((value) => !value);
	}
</script>

<button on:click={toggleSidebar} class="navbar__btn" style="margin-right: 1rem">
	<PanelLeft color="#0D1D0CA8" size="22"></PanelLeft>
</button>
