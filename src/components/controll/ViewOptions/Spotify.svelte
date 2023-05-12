<script lang="ts">
    export let toggleS:Function;
    export let stateS:boolean;
</script>
<div id="StartSpotify">
<span>Spotify-Abruf Starten</span>
<label class="switch">
    <input type="checkbox" bind:checked={stateS} on:change={()=>toggleS()}>
    <span class="slider round"></span>
</label>
</div>
<style lang="scss">
    #StartSpotify{
        display: flex;
        align-items: center;
    }
</style>