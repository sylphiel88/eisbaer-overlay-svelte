<script lang="ts">
	import { onMount } from "svelte";
	import type { AuthToken, SpotifyTrack } from "../../../types/types";

    let auth:AuthToken

    let currentSong:SpotifyTrack

    $: console.log(currentSong?.item?.artists[0].name);

    const getAuthToken = async() => {
        let result = fetch('http://localhost:3000/api/spotify/getAuthToken')
        let jResult = (await (await result).json())
        if(jResult.expires_in){
            setTimeout(()=>getAuthToken(), jResult.expires_in * 0.98 * 1000)
        }
        return jResult
    }

    $: if(auth){
        fetch('http://localhost:3000/api/spotify/getNowPlaying',{
            method: 'POST',
            body: JSON.stringify({
                access_token: auth.access_token
            })
        }).then((res)=>res.json().then((jRes)=>{
            currentSong = jRes
        }))
    }

    onMount(async()=>{
        if(!auth) auth = await getAuthToken()
    })
</script>
<p>Now Playing</p>