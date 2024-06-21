<script>
	import '../app.css';
	import '../css/styles.css';
	import '../css/fonts.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
</script>

<svelte:head>
	<title>Chat</title>
	<meta name="description" content="My custom ChatGPT implementation" />
</svelte:head>

<main>
	<!-- <div class="gradient-mask"></div> -->
	<Navbar></Navbar>
	<div class="flex z-10">
		<Sidebar></Sidebar>
		<slot />
	</div>
</main>

<style>
	.gradient-mask {
		z-index: 2;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 64px;
		background-image: linear-gradient(rgba(21, 21, 21, 255), rgba(21, 21, 21, 0));
	}
</style>
