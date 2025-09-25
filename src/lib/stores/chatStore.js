import { writable, get } from 'svelte/store';
import { sendMessage } from '../api/api';
import { goto } from '$app/navigation';

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
		}
		// } else {
		// 	messages.set([]);
		// }
	}

	async function handleSendMessage(messageToSend) {
		awaitingForResponse.set(true);
		messages.update((currentMessages) => {
			// console.log('update', id, messageToSend);
			// Return a new array with the new message appended
			return [...currentMessages, { sender: 'user', text: messageToSend }];
		});
		// let response = await sendMessage(id, messageToSend, fileToSend, 'user');
    let response = await sendMessage(messageToSend);
		// Check if the HTTP response status indicates success before proceeding to read the stream
    awaitingForResponse.set(false);
    console.log(response);
    messages.update((currentMessages) => {
      return [...currentMessages, { sender: 'assistant', text: response.answer }];
    });
		// if (response.ok) {
		// 	// append response to messages
		// 	messages.update((currentMessages) => {
		// 		return [...currentMessages, { sender: 'assistant', text: response.message }];
		// 	});
		// } else {
		// 	// Handle HTTP error responses
		// 	console.error('Fetch error: Failed to load the stream');
		// 	awaitingForResponse.set(false);
		// }
	}

	return { chats, chatId, messages, fetchChats, fetchChatMessages, handleSendMessage };
}
export const chatStore = createChatStore();
