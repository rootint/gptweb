<script>
	import { ArrowUp } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { chatStore } from '$lib/stores/chatStore';
	import { afterUpdate, beforeUpdate, onMount, tick } from 'svelte';

	const LINE_HEIGHT = 24;
	let isActive = false;
	let inputElement;
	let message = '';
	let isButtonActive = false;
	let textareaHeight = LINE_HEIGHT;
	let responsePending = false;
	$: chatId = $page.params.id;

	function handleFocus() {
		isActive = true;
	}

	function handleBlur() {
		isActive = false;
	}

	// afterUpdate(() => {
	// 	console.log('afterupdate');
	// });

	// beforeUpdate(() => {
	// 	console.log('beforeupdate');
	// });

	function handleSlashPress(event) {
		if (event.key === '/' && !isActive) {
			event.preventDefault();
			inputElement.focus();
		}
	}

	async function handleMessageSend() {
		if (!message.trim() || responsePending) return;
		let messageCopy = message;
		message = '';
		isButtonActive = false;
		textareaHeight = LINE_HEIGHT;
		await chatStore.handleSendMessage(chatId === undefined ? '' : chatId, messageCopy, null);
		// fileToSend = null;
	}

	function handleKeydown(event) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			handleMessageSend();
		}
	}

	function handleInput(event) {
		isButtonActive = message.trim().length != 0;
		message = event.target.value;
		let amountOfLines = Math.round((event.target.scrollHeight - LINE_HEIGHT) / LINE_HEIGHT);
		textareaHeight = LINE_HEIGHT * (amountOfLines > 10 ? 10 : amountOfLines) + LINE_HEIGHT;
		if (!isButtonActive) {
			textareaHeight = LINE_HEIGHT;
		}
	}

	onMount(async () => {
		setTimeout(() => {}, 0);
		console.log('mounting...');
		inputElement.focus();
	});
</script>

<svelte:window on:keydown={handleSlashPress} />

<div class="textbar" class:active={isActive}>
	<textarea
		bind:this={inputElement}
		on:focus={handleFocus}
		on:blur={handleBlur}
		bind:value={message}
		on:input={handleInput}
		on:keydown={handleKeydown}
		style="height: {textareaHeight}px;"
		placeholder="Message ChatGPT..."
	></textarea>
	<button on:click={handleMessageSend} class="send-btn" class:btn-active={isButtonActive}>
		<ArrowUp size="22" color={isButtonActive ? '#111111' : '#212121'}></ArrowUp>
	</button>
</div>

<style>
	.btn-active {
		background-color: var(--text) !important;
		border: none;
	}
	.send-btn {
		border: none;
		width: 32px;
		height: 32px;
		padding: 5px;
		background-color: var(--highlight);
		border-radius: 8px;
		transition: background-color 0.2s ease;
	}
	.textbar {
		max-width: 740px;
		width: 100%;
		background-color: var(--bg-elevation-1);
		margin-bottom: 20px;
		border-radius: 12px;
		padding: 12px;
		display: flex;
		border: rgba(0, 0, 0, 0) solid 1px;
		transition: border-color 0.2s ease;
		align-items: end;
		z-index: 10;
		position: relative;
	}

	/* .textbar::before {
        content: ' ';
		z-index: 2;
		position: absolute;
		top: -25px;
		left: 0;
		right: 0;
		height: 24px;
		background-image: linear-gradient(rgba(21, 21, 21, 0), rgba(21, 21, 21, 128));
	} */
	textarea {
		width: 100%;
		margin: 4px;
		margin-left: 12px;
		box-sizing: border-box;
		font-weight: 350;
		background-color: var(--bg-elevation-1);
		justify-content: center;
		align-items: center;
		border: none;
		font-size: 16px;
		outline: none;
		resize: none;
	}

	textarea::placeholder {
		color: var(--placeholder);
		font-weight: 350;
	}

	.active {
		border-color: var(--highlight);
	}
</style>
