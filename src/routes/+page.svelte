<script>
	import CardGrid from '$lib/components/CardGrid.svelte';
	import { chatStore } from '$lib/stores/chatStore';
	import { onMount, beforeUpdate, afterUpdate } from 'svelte';
	import { marked } from 'marked';

	let messageList = [];
	let div;
	let autoscroll = false;
	
	// Show CardGrid when there are no messages
	$: showCardGrid = messageList.length === 0;

	beforeUpdate(() => {
		if (div) {
			const scrollableDistance = div.scrollHeight - div.offsetHeight;
			autoscroll = div.scrollTop > scrollableDistance - 40;
		}
	});

	afterUpdate(() => {
		if (autoscroll) {
			div.scroll(0, div.scrollHeight);
		}
	});

	onMount(async () => {
		const unsubscribe = chatStore.messages.subscribe(async (value) => {
			messageList = value;
            console.log(messageList);
		});
		return () => {
			unsubscribe();
		};
	});
</script>

<div class="main-container">
	{#if showCardGrid}
		<CardGrid></CardGrid>
	{:else}
		<div class="chat" bind:this={div}>
			<div class="gradient-mask"></div>
			<div class="message-list">
				{#each messageList as message}
					<div class="message" class:assistant={message.sender != 'user'}>
						{#if message.sender != 'user'}
							<!-- <div class="gpt-circle"></div> -->
							<div class="message-content">
								{@html marked.parse(message.text)}
                                <!-- {message} -->
							</div>
						{:else}
							<div class="user">
								{message.text}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.main-container {
		flex: 1;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}
	
	.message-content {
		display: flex;
		flex-direction: column;
		align-items: start;
		text-align: start;
	}
	
	.assistant {
		width: 100%;
	}
	
	.user {
		padding: 16px 24px;
		border-radius: 12px;
		background-color: var(--bg-elevation-1);
		max-width: 544px;
	}
	
	.gpt-circle {
		position: absolute;
		width: 12px;
		height: 12px;
		border-radius: 12px;
		background-color: var(--text);
		margin-left: -20px;
		margin-top: 5px;
	}
	
	.message {
		position: relative;
		display: flex;
		padding-bottom: 24px;
	}
	
	.chat {
		padding-top: 96px;
		height: 100%;
		display: flex;
		justify-content: center;
		overflow-y: scroll;
		padding-bottom: 24px;
		position: relative;
		width: 100%;
	}
	
	.gradient-mask {
		z-index: 2;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 96px;
		background-image: linear-gradient(rgba(255, 255, 255, 255), rgba(255, 255, 255, 0));
	}
	
	.message-list {
		display: flex;
		flex-direction: column;
		align-items: end;
		margin-left: 16px;
		padding-bottom: 24px;
		width: 740px;
	}
</style>
