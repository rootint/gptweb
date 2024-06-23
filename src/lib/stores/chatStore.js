import { writable } from 'svelte/store';
import { listChats, sendMessage, getMessages, changeInstruction, getInstruction } from '../api/api';

function createChatStore() {
	const messages = writable([]);
	const chatId = writable('');

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

	return { chats, chatId, messages, fetchChats, fetchChatMessages };
}
export const chatStore = createChatStore();
