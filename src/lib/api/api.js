// const BASE_URL = 'http://localhost:1337'; // Adjust this to your Flask app's URL
// const BASE_URL = 'https://74b1-5-166-180-180.ngrok-free.app';
const BASE_URL = 'http://158.160.2.64:5000';

// Helper function for fetching data
async function fetchWithTimeout(resource, options = {}) {
	const response = await fetch(resource, {
		headers: { 'ngrok-skip-browser-warning': 'skip-browser-warning' },
		...options
	});
	if (!response.ok) throw new Error(response.statusText);
	return response;
}

export async function listChats() {
  return 0;
	// const response = await fetchWithTimeout(`${BASE_URL}/`, {
	// 	method: 'GET'
	// });
	// return response.json();
}

export async function sendMessage(text) {
	const response = await fetchWithTimeout(`${BASE_URL}/ask`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			query: text
		})
	});
	const data = await response.json();
	return data;
}
