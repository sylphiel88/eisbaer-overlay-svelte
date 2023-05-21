<script lang="ts">
	import type { SvelteComponent } from "svelte";
	import ViewOption from "./ViewOption.svelte";
    import options from './ViewOptions/viewoptions.json'
	import { uRoles, type UserCredentials } from "../../types/types";

    export let toggleUseSpotify:Function
    export let toggleUseVirtualDJ:Function
    export let toggleUseOldVsNew:Function
    export let useSpotify:boolean
    export let useVirtualDJ:boolean
    export let user:UserCredentials|null = null
	let Components = options.map(file=>import(`./ViewOptions/${file.name}.svelte`))
    export let useOldVsNew:boolean
</script>
<div id="controll-board">
    {#if Components}
        {#each Components as Component, index}
        {#if user!==null && options[index].minRole >= Object.values(uRoles).indexOf(user.role)}
            <ViewOption {index} title={options[index].name}>
                {#await Component then { default: Component }}
                    <svelte:component
                        this={Component}
                        {...{ toggleS: toggleUseSpotify, stateS: useSpotify, toggleV: toggleUseVirtualDJ, stateV: useVirtualDJ, toggleON: toggleUseOldVsNew, stateON: useOldVsNew }}
                        
                    />
                {/await}
            </ViewOption>
            {/if}
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