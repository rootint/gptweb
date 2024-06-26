import { writable, get } from 'svelte/store';
import { listChats, sendMessage, getMessages, changeInstruction, getInstruction } from '../api/api';
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

	async function handleSendMessage(id, messageToSend, fileToSend) {
		awaitingForResponse.set(true);
		messages.update((currentMessages) => {
			// console.log('update', id, messageToSend);
			// Return a new array with the new message appended
			return [...currentMessages, { sender: 'user', text: messageToSend }];
		});
		let response = await sendMessage(id, messageToSend, fileToSend, 'user');
		// Check if the HTTP response status indicates success before proceeding to read the stream
		if (response.ok) {
			const reader = response.body.getReader();
			let decoder = new TextDecoder();
			let completeResponse = '';
			let extractedId = '';

			// Continuously read from the stream
			reader.read().then(function processText({ done, value }) {
				if (done) {
					awaitingForResponse.set(false);
					return;
				}

				// Decode the stream chunk to text
				let chunkText = decoder.decode(value, { stream: true });

				if (id === '') {
					if (extractedId !== '') {
						completeResponse += chunkText;
					} else {
						// console.log(chunkText);
						extractedId = chunkText.split(',')[0];
						let chatName = chunkText.split(',')[1];
						chatId.set(extractedId);
						// console.log(id);
						let newChats = get(chats);
						newChats = [...newChats.reverse(), { chat_id: extractedId, name: chatName }];
						chats.set(newChats);
						goto('/' + extractedId);
						// currentMessages = [{ sender: 'user', text: messageToSend }];
					}
				} else {
					completeResponse += chunkText;
				}

				messages.update((currentMessages) => {
					let lastMessage = currentMessages[currentMessages.length - 1];
					if (lastMessage && lastMessage.sender === 'assistant') {
            if (id === '') {
              currentMessages[currentMessages.length - 1].text = completeResponse;
            } else {
              currentMessages[currentMessages.length - 1].text = completeResponse;
            }
					} else {
						// currentMessages = [...currentMessages, { sender: 'assistant', text: completeResponse }];
						if (id === '') {
							currentMessages = [
								{ sender: 'user', text: messageToSend },
								{ sender: 'assistant', text: completeResponse }
							];
						} else {
							currentMessages = [
								...currentMessages,
								{ sender: 'assistant', text: completeResponse }
							];
						}
					}
					// currentMessages = [{ sender: 'user', text: messageToSend }, ...currentMessages];
					// console.log('id', id, messageToSend, completeResponse);
					// if (completeResponse === '' && id === '') {
					// console.log('user', messageToSend);
					// currentMessages = [{ sender: 'user', text: messageToSend }, ...currentMessages];
					// }
					// console.log('message', currentMessages);
					// if (id === '') {
					// 	return [{ sender: 'user', text: messageToSend }, ...currentMessages];
					// }
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
