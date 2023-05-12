<script lang="ts">
    export let toggleV:Function;
    export let stateV:boolean;
</script>
<div id="StartVirtualDJ">
<span>Virtual DJ abruf starten</span>
<label class="switch">
    <input type="checkbox" bind:checked={stateV} on:change={()=>toggleV()}>
    <span class="slider round"></span>
</label>
</div>
<style lang="scss">
    #StartVirtualDJ{
        display: flex;
        align-items: center;
    }
</style>