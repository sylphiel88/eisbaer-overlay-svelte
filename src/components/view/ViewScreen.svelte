<script lang="ts">
	import { page } from "$app/stores";
	import type { View } from "@prisma/client";
	import { onDestroy, onMount } from "svelte";
    export let view:View
    export let useSpotify:boolean
    export let useOldVsNew:boolean
    export let useVirtualDJ:boolean
    export let year:number|string
    export let fontSize:number
    export let useWaitList:boolean
    
    let Component: Promise<any>

    let option: string

    const callback = (event:CustomEvent)=>{
            console.log(event, $page.data.views)
            view = $page.data.views.find((view:View)=>view.viewId === Number(event.detail))
        }

    onMount(()=>{
        document.addEventListener('setView',callback)
    })

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
    <svelte:component this={Component} filename={option} useVirtualDj={useVirtualDJ} useSpotify={useSpotify} useOldVsNew={useOldVsNew} year={year} fontSize={fontSize} useWaitList={useWaitList}/>
{/await}
