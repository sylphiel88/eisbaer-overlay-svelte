<script>
	import Icon from "@iconify/svelte";

</script>
<nav>
    <ul>
        <li><a href="/"><Icon width="2em" icon="ic:sharp-arrow-circle-left"></Icon></a></li>
    </ul>
</nav>
<style lang="scss">
    nav{
            background-color: rgba(0,0,0,0.6);
            width: -webkit-fill-available;
            height: fit-content;
            display: flex;
            justify-content: flex-end;
            padding: 0 1em;
            border-top-right-radius: 1rem;
            border-top-left-radius: 1rem;
            & > ul {
                display: flex;
                list-style: none;
                gap: 2rem;
                & > li {
                    all: unset;
                    display: flex;
                    padding: -1px;
                    width: fit-content;
                    height: fit-content;
                    border-radius: 100px;
                    & > a > :global(svg) {
                        color: #ff260080;
                    }
                }
            }
	}
</style>