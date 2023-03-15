<script lang="ts">
	import type { ActionData } from './$types';
	export let form: ActionData;
	import PinField from '../../../components/login_register/PinField.svelte';
	let currIndex1 = 0;
	let currIndex2 = 0;
	let currPinFields: (number | undefined)[][] = [
		[undefined, undefined, undefined, undefined, undefined, undefined],
		[undefined, undefined, undefined, undefined, undefined, undefined]
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

    let isValid = false

    $:{
        isValid = currPinFields[0].every((field, index)=>{
            return currPinFields[1][index] !== undefined && currPinFields[1][index] === field
        }) && username !== ""
    }

	const writeNumber1 = (number: number) => {
		currPinFields[0][currIndex1] = number;
		if (currIndex1 < 5) {
			currIndex1 += 1;
		}
	};
	const deleteNumber1 = () => {
		if (currIndex1 > 0) {
			currPinFields[0][currIndex1] = undefined;
			currIndex1 -= 1;
		}
	};
	const writeNumber2 = (number: number) => {
		currPinFields[1][currIndex2] = number;
		if (currIndex2 < 5) {
			currIndex2 += 1;
		}
	};
	const deleteNumber2 = () => {
		if (currIndex2 > 0) {
			currPinFields[1][currIndex2] = undefined;
			currIndex2 -= 1;
		}
	};
</script>

<div id="login-screen">
	<form action="?/register" method="POST" id="login-form">
		<div>
			Hallo <input type="text" name="username" id="login-form-username" bind:value={username} />!
		</div>
		<div>Bitte gebe deinen Pin zweimal ein, um ihn zu bestätigen.</div>
        <div id="pin-fields">
            <div id="pin-field-1">
		<div id="login-form-pin-register" class={`${isValid ? 'isValid' : ''}`}>
			{#each currPinFields[0] as pinfield, pInd}
				<input
					type="text"
					id={`pinfield${pInd}`}
					name={`pinfield${pInd}`}
					readonly
					class={`${pInd == currIndex1 ? 'active' : ''}`}
					value={pinfield !== undefined ? pinfield : ''}
				/>
			{/each}
		</div>
		<PinField deleteNumber={deleteNumber1} writeNumber={writeNumber1} />
        </div>
        <div id="pin-field-2">
		<div id="login-form-pin-register" class={`${isValid ? 'isValid' : ''}`}>
			{#each currPinFields[1] as pinfield, pInd}
				<input
					type="text"
					id={`pinfield1${pInd}`}
					name={`pinfield1${pInd}`}
					readonly
					class={`${pInd == currIndex2 ? 'active' : ''}`}
					value={pinfield !== undefined ? pinfield : ''}
				/>
			{/each}
		</div>
		<PinField deleteNumber={deleteNumber2} writeNumber={writeNumber2} />
        </div>
    </div>
		<button type="submit" disabled={!isValid}>Registrieren</button>

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
	}

    #login-form-pin-register{
        position: relative;
    }

	button {
		background-color: #ff260080;
		box-shadow: unset;
	}

    #pin-fields {
        display: flex;
        gap: 1rem;
    }

    div[id^=pin-field-]{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    form {
        position: relative;
    }

    .isValid::before{
        position: absolute;
        content: "\2713";
        bottom: -1rem;
        right: -1rem;
        color: greenyellow;
    }

    div:has(>input[id^='pinfield']){
        display: flex;
    }
    input[id^='pinfield'] {
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
</style>
