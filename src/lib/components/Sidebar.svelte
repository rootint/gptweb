<script>
	import { isSidebarShown } from '$lib/stores/sidebarStore';
	import { MessageCircle } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
	import { chatStore } from '../stores/chatStore';

	let chats = [];
	let selectedChatId = '';

	async function selectChat(id) {
		await chatStore.fetchChatMessages(id);
		goto('/' + id);
	}

	onMount(async () => {
		await chatStore.fetchChats();
		const unsubscribe = chatStore.chats.subscribe(async (value) => {
			chats = value.reverse();
		});

		const unsubscribeFromSelected = chatStore.chatId.subscribe(async (value) => {
			selectedChatId = value;
		});

		return () => {
			unsubscribe(); // Cleanup on component unmount
			unsubscribeFromSelected();
		};
	});
</script>

{#if $isSidebarShown}
	<div class="sidebar" transition:fly={{ x: -280, duration: 400 }}>
		<div class="fade-container"></div>
		<div class="scroll-container">
			{#each chats as chat}
				<button
					on:click={() => selectChat(chat.chat_id)}
					class="sidebar__chat-item"
					class:item-selected={chat.chat_id === selectedChatId}
				>
					<div class="text-fade" class:fade-selected={chat.chat_id === selectedChatId}></div>
					<div style="width: 20px; margin-right: 16px;">
						<MessageCircle color={chat.chat_id === selectedChatId ? '#fff' : '#a1a1a1'} size="18"
						></MessageCircle>
					</div>
					<p
						class="sidebar__chat-item__title"
						class:text-selected={chat.chat_id === selectedChatId}
					>
						{chat.name}
					</p>
				</button>
			{/each}
		</div>
	</div>
{/if}

<style>
	.fade-selected {
		background: linear-gradient(
			270deg,
			rgba(21, 21, 21, 1) 0%,
			rgba(21, 21, 21, 0) 100%
		) !important;
	}
	.text-fade {
		z-index: 2;
		position: absolute;
		right: 8px;
		top: 12px;
		bottom: 12px;
		width: 48px;
		/* background-color: red; */
		background: linear-gradient(270deg, rgba(17, 17, 17, 1) 0%, rgba(17, 17, 17, 0) 100%);
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
		height: 100%; /* А какого блядь хуя без этого он не респектит высоту */
		overflow-y: scroll;
		width: 100%;
	}

	.text-selected {
		font-weight: 450 !important;
		color: var(--text) !important;
	}

	.item-selected {
		background-color: var(--bg);
	}

	.sidebar__chat-item__title {
		text-overflow: ellipsis;
		max-lines: 1;
		font-size: 14px;
		color: var(--button);
		font-weight: 400;
		overflow: hidden;
		white-space: nowrap;
		max-width: 200px;
		width: 200px;
		display: flex;
		position: relative;
	}

	.sidebar__chat-item {
		padding: 16px;
		padding-right: 8px;
		margin: 16px;
		margin-right: 0px;
		border-radius: 12px;
		margin-bottom: 0px;
		display: flex;
		align-items: center;
		position: relative;
		width: calc(100% - 16px);
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
