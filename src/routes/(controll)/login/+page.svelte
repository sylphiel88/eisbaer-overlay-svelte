<script lang="ts">
	import type { ActionData } from './$types';
	export let form: ActionData;
	import PinField from '../../../components/login_register/PinField.svelte';
	let currIndex = 0;
	let currPinFields: (number | undefined)[] = [
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined
	];
	let pin = '';
	$: {
		if (currPinFields !== undefined) {
			pin = '';
			currPinFields.forEach((field) => {
				pin += field;
			});
		}
	}
	let username = '';
	const writeNumber = (number: number) => {
		currPinFields[currIndex] = number;
		if (currIndex < 5) {
			currIndex += 1;
		}
	};
	const deleteNumber = () => {
		if (currIndex > 0) {
			currPinFields[currIndex] = undefined;
			currIndex -= 1;
		}
	};
</script>

<div id="login-screen">
	<form action="?/login" method="POST" id="login-form">
		<div>
			Hallo <input type="text" name="username" id="login-form-username" bind:value={username} />!
		</div>
		<div>Bitte gebe deinen Pin ein:</div>
		<div id="login-form-pin">
			{#each currPinFields as pinfield, pInd}
				<input
					type="password"
					id={`pinfield${pInd}`}
					name={`pinfield${pInd}`}
					readonly
					class={`${pInd == currIndex ? 'active' : ''}`}
					value={pinfield !== undefined ? pinfield : ''}
				/>
			{/each}
		</div>
		<PinField {deleteNumber} {writeNumber} />
		<button type="submit">Einloggen</button>
		

	{#if form?.invalid}
		<p class="error">Username and password is required.</p>
	{/if}

	{#if form?.credentials}
		<p class="error">You have entered the wrong credentials.</p>
	{/if}
	</form>
</div>

<style lang="scss">
	#login-screen {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	#login-form {
		font-size: 25pt;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		& > div:nth-child(2) {
			align-self: flex-start;
		}
		& input#login-form-username {
			all: unset;
			border-bottom: 1px solid white;
		}
		& > #login-form-pin {
			display: flex;
			flex-direction: row;
			align-items: center;
			width: 100%;
			justify-content: center;
			gap: 1ch;
			& > input[id^='pinfield'] {
				all: unset;
				border: 1px solid white;
				width: 3ch;
				height: 3ch;
				vertical-align: middle;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				text-align: center;
				&.active {
					border: 3px solid #ff260080;
				}
			}
		}
	}
	button {
		background-color: #ff260080;
		box-shadow: unset;
	}
</style>
