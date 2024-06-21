<script>
	import { PencilLine, PanelLeft, Settings } from 'lucide-svelte';
	import SidebarButton from './buttons/SidebarButton.svelte';
	import NewChatButton from './buttons/NewChatButton.svelte';
	import SettingsButton from './buttons/SettingsButton.svelte';
</script>

<nav class="navbar">
	<div class="flex">
		<SidebarButton></SidebarButton>
		<NewChatButton></NewChatButton>
		<p class="model-name">GPT-4o</p>
	</div>
	<div class="flex">
		<SettingsButton></SettingsButton>
	</div>
</nav>

<style>
	.model-name {
		font-size: 18px;
		color: var(--button);
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 450;
	}
	.navbar {
		position: fixed;
		top: 0px;
		width: 100vw;
		padding: 20px;
		display: flex;
		justify-content: space-between;
		align-items: start;
		color: white;
		z-index: 1000;
	}
</style>
