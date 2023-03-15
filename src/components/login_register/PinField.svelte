<script lang="ts">
	import Icon from '@iconify/svelte';
	let numbers = [[7, 8, 9], [4, 5, 6], [1, 2, 3], [0]];
	export let writeNumber:(number: number)=>void
	export let deleteNumber:()=>void
</script>

<div id="login-form-pin-key-field">
	{#each numbers as row, rInd}
		<div>
			{#each row as column, cInd}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div id={`login-form-pin-key-field-${column}`} on:click={(event) => writeNumber(column)}>
					{column}
				</div>
				{#if rInd === numbers.length - 1 && cInd === row.length - 1}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div id={`login-form-pin-key-field-remove`} on:click={(event) => deleteNumber()}>
						<Icon icon="ic:sharp-arrow-circle-left" />
					</div>
				{/if}
			{/each}
		</div>
	{/each}
</div>

<style lang="scss">
    #login-form-pin-key-field {
			width: fit-content;
			display: flex;
			flex-direction: column;
			gap: 1ch;
			& > div {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				gap: 1ch;
				& > div {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					background-color: #ff260080;
					backdrop-filter: blur(2px);
					box-shadow: 1px -1px 12px 0 black;
				}
				& > div:not(#login-form-pin-key-field-0, #login-form-pin-key-field-remove) {
					width: 3ch;
					aspect-ratio: 1/1;
				}
				& > #login-form-pin-key-field-0,
				#login-form-pin-key-field-remove {
					width: 5ch;
					height: 3ch;
				}
			}
        }
</style>
