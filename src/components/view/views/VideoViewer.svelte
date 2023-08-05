<script lang="ts">
    export let filename:string
</script>
<!-- svelte-ignore a11y-media-has-caption -->
<video src={`http://localhost:3000/${filename}`} controls ><track kind="captions"></video>
<style lang="scss">
    video {
        height: 100vh;
        width: 100vw;
    }
</style>