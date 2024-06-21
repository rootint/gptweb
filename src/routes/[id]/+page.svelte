<script>
	import { onMount } from 'svelte';
	import { chatStore } from '$lib/stores/chatStore';
	export let data;

	onMount(async () => {
		// await chatStore.fetchChatMessages($page.url.pathname.substring(1));
		console.log(data.chatId);
	});
</script>

{data.chatId}
