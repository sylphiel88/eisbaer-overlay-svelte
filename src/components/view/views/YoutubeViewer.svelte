<script lang="ts">
	import { onMount } from "svelte";
	import SpotifyAccess from "../../../classes/SpotifyAccess";

	export let filename: string;

	const io = SpotifyAccess.getInstance().io

	onMount(()=>{
		io?.emit('getVideoId')
		io?.on('setVideoId', (id:string)=>{
			filename = id
		})
	})

</script>

<iframe
	style="width:100%;height:100%;"
	src={`https://www.youtube.com/embed/${filename}?autoplay=1`}
	title="YouTube video player"
	frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen
/>