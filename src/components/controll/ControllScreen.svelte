<script lang="ts">
	import { browser } from '$app/environment';
	import type { View } from '@prisma/client';
	import ViewSelector from './ViewSelector.svelte';
	import querystring from 'querystring';
	import { page } from '$app/stores';
	import ViewOption from './ViewOption.svelte';
	import options from "./ViewOptions/viewoptions.json"
	import VirtualDj from './ViewOptions/VirtualDJ.svelte';
	import ControllBoard from './ControllBoard.svelte';
	import { onMount, type SvelteComponent } from 'svelte';
	import Spotify from './ViewOptions/Spotify.svelte';
	import SpotifyAccess from '../../classes/SpotifyAccess';
	import OldVsNew from './ViewOptions/OldVsNew.svelte';

	export let views: View[];
	let currView = 0;
	let useSpotify: boolean = false;
	let useVirtualDJ: boolean = false;
	let useOldVsNew: boolean = false;
	let useWaitList: boolean = false

	$: {
		console.log(useWaitList)
	}

	let Components: Promise<SvelteComponent>[];

	let io = SpotifyAccess.getInstance().io

	const SCOPE = 'user-read-currently-playing user-read-playback-state playlist-modify-public';
	const REDIRECT_URI = 'http://localhost:2001/spotify/authorizationCodeCallback';

	

	onMount(()=>{
		io?.emit('joinBeamerRoom')
		io?.on('getCurrView', ()=>{
			io?.emit('setCurrView', currView)
		})
		io?.on('getUseSpotify', ()=>{
			io?.emit('setUseSpotify', useSpotify)
		})
		io?.on('getUseVirutalDJ', ()=>{
			io?.emit('setUseVirtualDJ', useVirtualDJ)
		})
		io?.on('getOldVsNew', ()=>{
			io?.emit('setOldVsNew', useOldVsNew)
		})
		io?.on('getWaitlistStatus', ()=>{
			io?.emit('setWaitlistStatus', useWaitList)
		})
	})

	const setView = (newView: number) => {
		currView = newView;
		io?.emit('setCurrView', newView)
	};

	const toggleUseSpotify = () => {
		useSpotify = !useSpotify;
		if(useVirtualDJ && useSpotify){
			useVirtualDJ = false
		}
		io?.emit('setUseSpotify', useSpotify)
	};

	const toggleUseVirtualDJ= () => {
		useVirtualDJ = !useVirtualDJ;
		if(useVirtualDJ && useSpotify){
			useSpotify = false
		}
		io?.emit('setUseVirtualDJ', useVirtualDJ)
	};

	const toggleUseOldVsNew = () => {
		useOldVsNew = !useOldVsNew;
		io?.emit('setOldVsNew', useOldVsNew)
	};

const toggleUseWaitList = () => {
	useWaitList = !useWaitList;
	io?.emit('setWaitlistStatus', useWaitList)
};
</script>

<div id="controll-screen-wrapper">
	<ViewSelector {setView} {views} />
	<div>
		{#if !$page.data.hasRefreshToken}
			<a
				href={'https://accounts.spotify.com/authorize?' +
					querystring.stringify({
						response_type: 'code',
						client_id: $page.data.client_id,
						scope: SCOPE,
						redirect_uri: REDIRECT_URI,
						show_dialog: true
					})}
			>
				Refresh Token holen
			</a>
		{/if}
	</div>
	<ControllBoard user={$page.data.user} toggleUseSpotify={toggleUseSpotify} toggleUseVirtualDJ={toggleUseVirtualDJ}  useSpotify={useSpotify} useVirtualDJ={useVirtualDJ} useOldVsNew={useOldVsNew} toggleUseOldVsNew ={toggleUseOldVsNew} toggleUseWaitList = {toggleUseWaitList} useWaitList = {useWaitList}/>
</div>

<style lang="scss">
	#controll-screen-wrapper {
		width: -webkit-fill-available;
		height: -webkit-fill-available;
		display: flex;
		flex-direction: column;
	}
</style>
