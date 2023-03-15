<script lang="ts">
	import PinField from "./PinField.svelte";

	let currIndex = 0
	let currPinFields:(number|undefined)[] =  [
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined
	];
	let pin = ""
	$:{
		if( currPinFields!==undefined){
			pin = ""
			currPinFields.forEach(field=>{
				pin += field 
			})
		}
	}
	let username = ""
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
		<div>Hallo <input type="text" name="username" id="login-form-username" bind:value={username}/>!</div>
		<div>Bitte gebe deinen Pin ein:</div>
		<div id="login-form-pin">
			{#each currPinFields as pinfield, pInd}
				<input
					type="password"
					id={`login-form-pin-field-${pInd}`}
					name={`pinfield${pInd}`}
					disabled
					class={`${pInd == currIndex ? 'active' : ''}`}
					value={pinfield!==undefined ? pinfield : ''}
				/>
			{/each}
		</div>
		<PinField deleteNumber={deleteNumber} writeNumber={writeNumber}/>
		<button type="submit">Einloggen</button>
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
			& > input[id^='login-form-pin-field-'] {
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
					border: 3px solid #ff2600;
				}
			}
		}
		button {
			all: unset;
			font-size: 25pt;
			width: 11ch;
			background-color: #ff2600;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
	}
</style>
