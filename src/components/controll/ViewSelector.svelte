<script lang="ts">
	import type { View } from "@prisma/client";

    export let setView:Function
    export let views:View[]

</script>
<div id="view-selector">
    <ul>
        {#each views as view, index}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li on:click={()=>setView(index)}>{view.name}</li>
        {/each}
    </ul>
</div>
<style lang="scss">
    #view-selector{
        width: -webkit-fill-available;
        height: fit-content;
        & > ul {
            display: flex;
            list-style: none;
            gap: 0.5rem;
            background-color: rgb(117, 22, 22);
            border-radius: 100px;
		    margin: 0;
            padding: 0.5rem 0.5rem;
            & > li {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 1rem;
                background-color: #ff260080;
                border-radius: 100px;
            }
        }
    }
</style>
