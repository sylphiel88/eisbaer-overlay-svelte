<script lang="ts">
    export let toggle:Function;
    export let state:boolean;
</script>
<div id="StartSpotify">
<span>Spotify-Abruf Starten</span>
<label class="switch">
    <input type="checkbox" bind:checked={state} on:change={()=>toggle()}>
    <span class="slider round"></span>
</label>
</div>
<style lang="scss">
    #StartSpotify{
        display: flex;
        align-items: center;
    }
</style>