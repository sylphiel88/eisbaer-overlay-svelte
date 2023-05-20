<script lang="ts">
    const goToEventEditor = () => {
        window.location.pathname = '/editor'
    }
</script>
<div>
    <button on:click={goToEventEditor}>Zum Event Editor wechseln</button>
</div>
<style lang="scss">
    button {
        width: -webkit-fill-available;
        padding: 0.5rem;
        border-radius: 0.25rem;
        font-size: 20pt;
    }
</style>