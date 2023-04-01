<script lang="ts">
	import type { View } from "@prisma/client";
    export let view:View

    let Component: Promise<any>

    let option: string

   $:{
        if(view){
            switch(view.type){
                case "COMPONENT":
                    Component = import(`./views/${view.component}.svelte`)
                    break;
                case "IMAGE":
                    Component = import(`./views/ImageViewer.svelte`)
                    option = view.filename ? view.filename : ""
                    break;
                case "VIDEO":
                    Component = import('./views/VideoViewer.svelte')
                    option = view.filename ? view.filename : ""
                    break;
                case "YOUTUBE":
                    option = view.url ? view.url : ""
                    Component = import('./views/YoutubeViewer.svelte')
            }
        }
    }

</script>
{#await Component then {default: Component}}
    <svelte:component this={Component} filename={option}/>
{/await}
