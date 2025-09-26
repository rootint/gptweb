<script>
	import { FileText, Rocket, MessageSquare, Library } from 'lucide-svelte';
	import { chatStore } from '$lib/stores/chatStore';

	let file;

	function handleScientificPaper() {
		file.click();
	}

	async function handleFileChange(event) {
		if (!file) {
			alert('Please choose a file first.');
			return;
		}

		const formData = new FormData();
		formData.append('file', file);
		console.log(event.target.files[0]);

		try {
			// const response = await fetch('https://your-backend-url/upload', {
			// 	method: 'POST',
			// 	body: formData
			// });
			// const result = await response.json();
			// console.log('File uploaded successfully:', result);
			// alert('File uploaded successfully!');
			await chatStore.handleSendMessage('Scientific paper');
		} catch (error) {
			console.error('Error uploading file:', error);
			alert('Failed to upload file.');
		}
	}
</script>

<div class="card-grid">
	<div class="card" on:click={() => chatStore.handleSendMessage('Propose alloys similar in properties to CoCrNi')}>
		<Rocket size="22" color="#0D1D0C80"></Rocket>
		<p class="card-title">Propose alloys similar in properties to CoCrNi</p>
	</div>
	<div class="card" on:click={() => chatStore.handleSendMessage('Propose new materials for the development of a wide range of next-generation optoelectronic devices.')}>
		<Rocket size="22" color="#0D1D0C80"></Rocket>
		<p class="card-title">Propose new materials for the development of a wide range of next-generation optoelectronic devices.</p>
	</div>
</div>

<style>
	.card-title {
		font-size: 16px;
		font-weight: 350;
		margin-top: 24px;
		color: var(--text);
	}
	.card {
		background-color: var(--bg-elevation-1);
		border-radius: 12px;
		padding: 24px;
		border: rgba(0, 0, 0, 0) solid 1px;
		transition: border-color 0.2s ease;
		display: flex;
		flex-direction: column;
		max-width: 240px;
		cursor: pointer;
	}
	.card:hover {
		border-color: var(--highlight);
	}
	.card-grid {
		display: grid;
		gap: 32px;
		grid-template-columns: auto auto;
	}
</style>
