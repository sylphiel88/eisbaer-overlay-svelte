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
    
</style>
