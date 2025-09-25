<script>
	import { isSidebarShown } from '$lib/stores/sidebarStore';
	import { PencilLine } from 'lucide-svelte';
	import { goto } from '$app/navigation';
    import { chatStore } from '$lib/stores/chatStore';

	function createNewChat() {
        chatStore.clearMessages();
		goto('/');
	}
</script>

<button on:click={createNewChat} class="navbar__btn" style="margin-right: 1.5rem">
	<PencilLine color="#0D1D0CA8" size="22"></PencilLine>
</button>
