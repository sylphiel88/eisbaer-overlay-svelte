<script lang="ts">
	import type { SvelteComponent } from "svelte";
	import ViewOption from "./ViewOption.svelte";
    import options from './ViewOptions/viewoptions.json'

    export let Components:Promise<SvelteComponent>[]
    export let toggleUseSpotify:Function
    export let toggleUseVirtualDJ:Function
    export let useSpotify:boolean
    export let useVirtualDJ:boolean
</script>
<div id="controll-board">
    {#if Components}
        {#each Components as Component, index}
            <ViewOption {index} title={options[index]}>
                {#await Component then { default: Component }}
                    <svelte:component
                        this={Component}
                        {...{ toggleS: toggleUseSpotify, stateS: useSpotify, toggleV: toggleUseVirtualDJ, stateV: useVirtualDJ }}
                        
                    />
                {/await}
            </ViewOption>
        {/each}
    {/if}
</div>
<style lang="scss">
    #controll-board {
		padding: 2rem;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 5rem;
	}
</style>