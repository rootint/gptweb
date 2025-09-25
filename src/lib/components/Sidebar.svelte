<script>
	import { isSidebarShown } from '$lib/stores/sidebarStore';
	import { MessageCircle } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
</script>

{#if $isSidebarShown}
	<div class="sidebar" transition:fly={{ x: -280, duration: 400 }}>
		<div class="fade-container"></div>
		<div class="scroll-container">
			<div class="no-chats-message">
				<p>Chat history is not available in this version.</p>
			</div>
		</div>
	</div>
{/if}

<style>
	.no-chats-message {
		padding: 20px;
		text-align: center;
		color: #a1a1a1;
		font-size: 14px;
	}
	
	.fade-container {
		position: absolute;
		height: 88px;
		width: 100%;
		z-index: 2;
		background: linear-gradient(180deg, rgba(17, 17, 17, 1) 55%, rgba(17, 17, 17, 0) 100%);
	}
	.scroll-container {
		margin-top: 40px;
		padding-top: 24px;
        padding-bottom: 24px;
		height: 100%;
		overflow-y: scroll;
		width: 100%;
	}

	.sidebar {
		background-color: var(--bg-dark);
		/* padding-top: 88px; */
		height: 100vh;
		width: 280px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		position: relative;
	}
</style>
