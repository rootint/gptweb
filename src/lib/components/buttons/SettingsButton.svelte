<script>
	import { Settings } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	let isToggled = false;
	let instruction = 'You are an honest and helpful assistant.';

	function toggleSettingsMenu() {
		isToggled = !isToggled;
		console.log('Settings toggled');
		// chatStore.handleChangeInstruction(instruction);
	}
</script>

<div class="flex flex-col items-end">
	<button on:click={toggleSettingsMenu} class="navbar__btn" class:enabled={isToggled}>
		<div class="icon-wrapper" class:spin={isToggled}>
			<Settings color={isToggled ? '#f1f1f1' : '#a1a1a1'} size="22"></Settings>
		</div>
	</button>
	{#if isToggled}
		<div class="settings" transition:fade={{ duration: 200 }}>
			<p class="settings__item-title">Custom Instruction</p>
			<textarea
				class="settings__input"
				bind:value={instruction}
				placeholder="You are an honest and helpful assistant."
			></textarea>
		</div>
	{/if}
</div>

<style>
	.settings__input {
		border-radius: 12px;
		padding: 16px;
		margin-top: 16px;
		background-color: var(--bg-elevation-2);
		border: none;
		resize: none;
		width: 30vw;
		min-width: 200px;
		outline: none;
		color: var(--text);
		height: 128px;
		font-weight: 350;
	}
	.settings__input::placeholder {
		color: var(--placeholder);
	}

	.settings__input:focus {
		/* color: var(--placeholder); */
	}

	.settings__item-title {
		font-weight: 450;
		font-size: 16px;
		margin: 0;
		padding: 0;
	}
	.settings {
		margin-top: 16px;
		border-radius: 12px;
		border: var(--highlight) 1px solid;
		background-color: var(--bg-elevation-1);
		padding: 24px;
	}
	.enabled {
		background-color: var(--bg-elevation-1);
	}
	.icon-wrapper {
		transition: transform 0.5s ease;
	}
	.spin {
		transform: rotate(120deg);
	}
</style>
