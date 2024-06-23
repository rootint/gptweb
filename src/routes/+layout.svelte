<script>
	import '../app.css';
	import '../css/styles.css';
	import '../css/fonts.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import MessageTextbar from '../lib/components/MessageTextbar.svelte';
</script>

<svelte:head>
	<title>Chat</title>
	<meta name="description" content="My custom ChatGPT implementation" />
</svelte:head>

<main>
	<Navbar></Navbar>
	<div class="container">
		<!-- <Sidebar></Sidebar> -->
		<div class="chat">
			<slot />
			<div class="textfield">
				<MessageTextbar></MessageTextbar>
			</div>
		</div>
	</div>
</main>

<style>
	.container {
		display: flex;
		height: 100vh;
		width: 100vw;
	}
	.chat {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.textfield {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
