import { writable } from 'svelte/store';
import { listChats, sendMessage, getMessages, changeInstruction, getInstruction } from '../api/api';

function createChatStore() {
	const messages = writable([]);
	const chatId = writable('');

	const awaitingForResponse = writable(false);
	const chats = writable([]);

	async function fetchChats() {
		let response = await listChats();
		chats.set(response);
	}

	async function fetchChatMessages(id) {
		if (id != '') {
			const fetchedMessages = await getMessages(id);
			// const fetchedInstruction = await getInstruction(id);
			chatId.set(id);
			// instruction.set(fetchedInstruction);
			// localStorage.setItem('chatId', id);
			// localStorage.setItem('instruction', fetchedInstruction);
			messages.set(fetchedMessages);
		} else {
			messages.set([]);
		}
	}

	async function handleSendMessage(id, messageToSend, fileToSend) {
		awaitingForResponse.set(true);
		messages.update((currentMessages) => {
			// Return a new array with the new message appended
			return [...currentMessages, { sender: 'user', text: messageToSend }];
		});
		// let currentChatId = '';
		// const unsubscribe = chatId.subscribe((value) => {
		// 	currentChatId = value;
		// });
		// unsubscribe();
		let response = await sendMessage(id, messageToSend, fileToSend, 'user');
		// Check if the HTTP response status indicates success before proceeding to read the stream
		if (response.ok) {
			const reader = response.body.getReader();
			let decoder = new TextDecoder();
			let completeResponse = '';

			// Continuously read from the stream
			reader.read().then(function processText({ done, value }) {
				if (done) {
					awaitingForResponse.set(false);
					return;
				}

				// Decode the stream chunk to text
				let chunkText = decoder.decode(value, { stream: true });
				// Accumulate the streamed chunks (optional)
				completeResponse += chunkText;

				// Log the chunk to console (optional)
				// messages.update((currentMessages) => {
				// 	if (currentMessages.at(-1).sender != 'user') {
				// 		return [
				// 			{ sender: 'assistant', text: completeResponse },
				// 			...currentMessages.slice(0, currentMessages.length - 1)
				// 		];
				// 	} else {
				// 		return [...currentMessages, { sender: 'assistant', text: completeResponse }];
				// 	}
				// });
				// Since we're using reversed lists, prepend the streamed response.
				messages.update((currentMessages) => {
					let lastMessage = currentMessages[currentMessages.length - 1];
					if (lastMessage && lastMessage.sender === 'assistant') {
						// Update last assistant message if it's still being received
						currentMessages[currentMessages.length - 1].text = completeResponse;
					} else {
						// Otherwise, append new assistant message
						currentMessages = [...currentMessages, { sender: 'assistant', text: completeResponse }];
					}
					return currentMessages;
				});

				// Recursively read the next chunk
				reader.read().then(processText);
			});
		} else {
			// Handle HTTP error responses
			console.error('Fetch error: Failed to load the stream');
			awaitingForResponse.set(false);
		}
	}

	return { chats, chatId, messages, fetchChats, fetchChatMessages, handleSendMessage };
}
export const chatStore = createChatStore();
