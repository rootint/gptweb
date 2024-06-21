import { chatStore } from '$lib/stores/chatStore';

export function load({ params }) {
	console.log('loading');
	return {
		chatId: params.id
	};
	// const unsubscribe = chatStore.chatId.subscribe((id) => {
	// 	if (id !== null) {
	// 		// loadMessages(id);
	//     return {
	//       // chatId: chatStore.chatId
	//       chatId: id
	//     };
	// 	}
	// });
	// return {
	// 	// chatId: chatStore.chatId
	// 	chatId: 'adsfadsf'
	// };
}
