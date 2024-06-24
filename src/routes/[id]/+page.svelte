<script>
	import { onMount, beforeUpdate, afterUpdate } from 'svelte';
	import { chatStore } from '$lib/stores/chatStore';
	import { page } from '$app/stores';

	import { marked } from 'marked';
	import MessageTextbar from '../../lib/components/MessageTextbar.svelte';
	import SvelteMarkdown from 'svelte-markdown';

	let messageList = [];
	$: chatId = $page.params.id;
	let div;
	let autoscroll = false;

	beforeUpdate(() => {
		if (div) {
			const scrollableDistance = div.scrollHeight - div.offsetHeight;
			autoscroll = div.scrollTop > scrollableDistance - 20;
		}
	});

	afterUpdate(() => {
		if (autoscroll) {
			div.scrollTo(0, div.scrollHeight);
		}
	});

	// const scrollToBottom = async (node) => {
	// 	node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	// };

	onMount(async () => {
		// console.log(chatId);
		await chatStore.fetchChatMessages(chatId);
		console.log(chatId);
		const unsubscribe = chatStore.messages.subscribe(async (value) => {
			messageList = value;
			await tick();
		});
		return () => {
			unsubscribe();
		};
	});
</script>

<div class="chat">
	<div class="gradient-mask"></div>
	<div class="message-list" bind:this={div}>
		{#each messageList as message}
			<div
				class="message"
				class:user={message.sender == 'user'}
				class:assistant={message.sender != 'user'}
			>
				{#if message.sender != 'user'}
					<!-- <div class="gpt-circle"></div> -->
					<div class="message-content">
						{@html marked.parse(message.text)}
					</div>
				{:else}
					{message.text}
				{/if}
			</div>
		{/each}
		
	</div>
</div>

<style>
	.message-content {
		display: flex;
		flex-direction: column;
		align-items: start;
	}
	.assistant {
		margin-bottom: 24px;
		/* background-color: red; */
	}
	.user {
		margin-bottom: 32px;
		padding: 16px 24px;
		border-radius: 12px;
		background-color: var(--bg-elevation-1);
		max-width: 544px;
	}
	.gpt-circle {
		width: 12px;
		height: 12px;
		border-radius: 12px;
		background-color: var(--text);
		margin-right: 8px;
		margin-bottom: 1.5px;
		margin-left: -21px;
	}
	.message {
		display: flex;
		/* padding: 16px; */
	}
	.chat {
		padding-top: 96px;
		height: 100%;
		display: flex;
		justify-content: center;
		overflow-y: scroll;
        padding-bottom: 24px;
		/* align-items: center; */
		width: 100%;
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
		display: flex;
		flex-direction: column;
		align-items: end;
		margin-left: 16px;
		padding-bottom: 24px;
		/* height: 50%; */
		/* overflow-y: scroll; */
		width: 740px;
	}
</style>
