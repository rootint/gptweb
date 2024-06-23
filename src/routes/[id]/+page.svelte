<script>
	import { onMount } from 'svelte';
	import { chatStore } from '$lib/stores/chatStore';
	import { page } from '$app/stores';
	import MessageTextbar from '../../lib/components/MessageTextbar.svelte';
	let messageList = [];
	$: chatId = $page.params.id;

	onMount(async () => {
		// console.log(chatId);
		await chatStore.fetchChatMessages(chatId);
		console.log(chatId);
		const unsubscribe = chatStore.messages.subscribe(async (value) => {
			messageList = value.reverse();
            for (var message in messageList) {
                console.log(messageList[message])
            }
            // messageList = value;
			// await tick();
			// TODO: figure out smoothness
			// scrollToBottom(messagesView);
		});
	});
</script>
<!-- 
<div class="chat">
	<div class="gradient-mask"></div>
	<div class="message-list">
		{#each messageList as message}
			<div class="message">
				{message.text}
			</div>
		{/each}
	</div>
</div> -->

<style>
    .message {
        padding: 16px;
    }
	.chat {
        padding-top: 96px;
		height: 100%;
		display: flex;
		justify-content: center;
        overflow-y: scroll;
        align-items: center;
	}
	.gradient-mask {
		z-index: 2;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 96px;
		background-image: linear-gradient(rgba(21, 21, 21, 255), rgba(21, 21, 21, 0));
	}
	.message-list {
		/* height: 50%; */
		/* overflow-y: scroll; */
		width: 720px;
	}
</style>
