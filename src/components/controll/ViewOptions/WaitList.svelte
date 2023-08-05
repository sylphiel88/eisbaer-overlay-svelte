<script lang="ts">
    export let toggleUseWaitList:Function;
    export let useWaitList:boolean;
</script>
<div id="StartSpotify">
<label class="switch">
    <input type="checkbox" bind:checked={useWaitList} on:change={()=>toggleUseWaitList()}>
    <span class="slider round"></span>
</label>
<span>{useWaitList ? "Wunschliste anzeigen" : "Wunschliste nicht anzeigen"}</span>
</div>
<style lang="scss">
    #StartSpotify{
        display: flex;
        align-items: center;
    }
</style>