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
			await chatStore.handleSendMessage('', 'Scientific paper', event.target.files[0]);
		} catch (error) {
			console.error('Error uploading file:', error);
			alert('Failed to upload file.');
		}
	}
</script>

<div class="card-grid">
	<div class="card" on:click={handleScientificPaper}>
		<FileText size="22" color="#f25f5c"></FileText>
		<input
			type="file"
			bind:this={file}
			on:change={handleFileChange}
			accept="application/pdf"
			style="display: none;"
		/>
		<p class="card-title">Help me understand a scientific paper</p>
	</div>
	<div class="card">
		<Rocket size="22" color="#a4f25c"></Rocket>
		<p class="card-title">Give me startup advice</p>
	</div>
	<div class="card">
		<Library size="22" color="#5ceff2"></Library>
		<p class="card-title">Use the library for research</p>
	</div>
	<div class="card">
		<MessageSquare size="22" color="#a95cf2"></MessageSquare>
		<p class="card-title">Just chat about something</p>
	</div>
</div>

<style>
	.card-title {
		font-size: 16px;
		font-weight: 350;
		margin-top: 24px;
		color: rgba(255, 255, 255, 0.75);
	}
	.card {
		background-color: var(--bg-elevation-1);
		border-radius: 12px;
		padding: 24px;
		border: rgba(0, 0, 0, 0) solid 1px;
		transition: border-color 0.2s ease;
		display: flex;
		flex-direction: column;
		max-width: 200px;
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
