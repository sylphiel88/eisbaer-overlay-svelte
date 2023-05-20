<script lang="ts">
    export let toggleON:Function;
    export let stateON:boolean;
</script>
<div id="StartSpotify">
<label class="switch">
    <input type="checkbox" bind:checked={stateON} on:change={()=>toggleON()}>
    <span class="slider round"></span>
</label>
<span>{stateON ? "Old" : "New"}</span>
</div>
<style lang="scss">
    #StartSpotify{
        display: flex;
        align-items: center;
    }
</style>