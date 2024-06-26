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
	<div class="main-container">
		<Sidebar></Sidebar>
		<div class="chat">
			<slot />
			<div class="gradient-mask-reversed"></div>
			<div class="textfield">
				<MessageTextbar></MessageTextbar>
			</div>
		</div>
	</div>
</main>

<style>
	.gradient-mask-reversed {
		z-index: 2;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		/* width: 100%; */
		height: 24px;
		background-image: linear-gradient(rgba(21, 21, 21, 0), rgba(21, 21, 21, 255));
	}
	.main-container {
		display: flex;
		height: 100vh;
		width: 100vw;
	}
	.chat {
        position: relative;
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.textfield {
		/* position: fixed;
        bottom: 0; */
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
