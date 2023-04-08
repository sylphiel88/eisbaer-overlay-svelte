<script lang="ts">
    export let filename:string
</script>
    <img src={`http://localhost:3000/${filename}`} alt="img"/>

<style lang="scss">
    img {
        width: 100vw;
        height: auto;
       max-width: 100vw;
       max-height: 100vh; 
    }
</style>