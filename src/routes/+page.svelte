<script lang="ts">
    
</script>
<main>
    <div id="overlay"/>
</main>
<style lang="scss">
    :global(body){
        background-color: black;
        margin: 0;
        padding: 0;
        font-family: "Bahnschrift";
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100dvw;
        height: 100dvh;
    }
    #overlay{
        background-color: black;
        width: calc(100dvw - 5dvh);
        height: 95dvh;
        border-radius: 10px;
        box-shadow: 1px -1px 22px 0 rgba(#da2b0d, 0.5);
    }
</style>