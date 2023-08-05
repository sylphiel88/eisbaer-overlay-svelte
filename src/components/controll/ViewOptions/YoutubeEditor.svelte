<script lang="ts">
	import { onMount } from "svelte";
	import SpotifyAccess from "../../../classes/SpotifyAccess";
    import FaWindowClose from 'svelte-icons/fa/FaWindowClose.svelte'
    import FaPlay from 'svelte-icons/fa/FaPlay.svelte'

    const io = SpotifyAccess.getInstance().io
    let currView:number = 0
    let currVideo:string

    let videos:string[] = []

    onMount(()=>{
        io?.emit('getCurrView')
        io?.on('setCurrView', (set:number)=>{
            currView = set
        })
        io?.on('getVideoId', ()=>{
            io?.emit('setVideoId', currVideo)
        })
    })

    const setVideo = (id:string) => {
        io?.emit('setCurrView', 3)
        io?.emit('setVideoId', id)
    }

    const addVideo = (id:string) => {
        videos = [...videos, id]
    }

    const remVideo = (id:string) => {
        videos = videos.filter(vid => vid!==id)
    }

</script>
<div>
    {#each videos as video}
    <div style="display: flex; gap:0.5rem; height: 2rem; align-items:center; margin-bottom:0.5rem;">
        <span>{video}</span>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <span on:click={()=>{setVideo(video)}} style="height: 60%; aspect-ration: 1/1;"><FaPlay/></span>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <span on:click={()=>{remVideo(video)}} style="height: 60%; aspect-ration: 1/1;">
            <FaWindowClose/>
        </span>
    </div>
    {/each} 
    <input bind:value={currVideo}/>
    <button on:click={()=>{addVideo(currVideo)}}>Ok</button>
</div>