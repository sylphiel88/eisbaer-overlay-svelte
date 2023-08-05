<script lang="ts">
	import FaChevronDown from "svelte-icons/fa/FaChevronDown.svelte";
	import FaChevronUp from "svelte-icons/fa/FaChevronUp.svelte"
	export let index: number;
	export let title: string;
	let open: boolean = false;
</script>

<div class={`view-option-element-${index}`}>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div id={`view-option-${index}-opener`}>
		<div on:click={() => (open = !open)}>
			<span>{title ? title.match(/[A-Z][a-z]+/g)?.join(' '):''}</span>
			<div class="fa-icon">
				{#if open}
					<FaChevronUp />
				{:else}
					<FaChevronDown />
				{/if}
			</div>
		</div>
		{#if open}
			<slot />
		{/if}
	</div>
</div>

<style lang="scss">
	div[id^='view-option-'] {
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 0.5rem 1rem;
		gap: 1rem;
		& > div {
			display: flex;
			height: 1rem;
			justify-content: space-between;
		}
	}
	div[id^='view-option-'] {
		box-shadow: -1px 1px 15px 2px rgb(197, 22, 9);
		border-radius: 1rem;
	}
	.fa-icon {
		height: -webkit-fill-available;
		justify-self: flex-end;
	}
</style>
