<div id="view-body">
    <slot/>
</div>

<style lang="scss">
    :global(body){
        margin: 0;
        padding: 0;
        width: 100dvw;
        height: 100dvh;
        overflow: hidden;
        margin: 0;
        padding: 0;
        background-color: black;
        color: white;
        font-family: "Bahnschrift";
        & * {
          all:unset;  
        }
    }
</style>