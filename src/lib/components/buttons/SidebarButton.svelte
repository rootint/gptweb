<script>
	import { isSidebarShown } from '$lib/stores/sidebarStore';
	import { PanelLeft } from 'lucide-svelte';

	function toggleSidebar() {
		isSidebarShown.update((value) => !value);
	}
</script>

<button on:click={toggleSidebar} class="navbar__btn mr-4">
	<PanelLeft color={$isSidebarShown ? '#ffffff' : '#a1a1a1'} size="22"></PanelLeft>
</button>
