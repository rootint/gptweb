<script>
	import CardGrid from '$lib/components/CardGrid.svelte';
	import MessageTextbar from '$lib/components/MessageTextbar.svelte';
</script>

<main>
	<div class="main-container">
		<CardGrid></CardGrid>
	</div>
	<div class="textfield">
		<MessageTextbar></MessageTextbar>
	</div>
</main>

<style>
	.main-container {
		/* flex-grow: 1; */
        /* width: 100%; */
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	main {
		width: 100%;
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
