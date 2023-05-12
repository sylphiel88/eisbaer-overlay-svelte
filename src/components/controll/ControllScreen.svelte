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
	import type { SvelteComponent } from 'svelte';

	export let views: View[];
	let currView = 0;
	let useSpotify: boolean = false;
	let useVirtualDJ: boolean = false;

	let Components: Promise<SvelteComponent>[];

	const SCOPE = 'user-read-currently-playing';
	const REDIRECT_URI = 'http://localhost:3000/api/spotify/authorizationCodeCallback';

	$: {
		if (browser) {
			localStorage.setItem('currView', `${currView}`);
		}
	}

	$: {
		if (browser) {
			localStorage.setItem('useSpotify', `${useSpotify}`);
		}
	}

	$: {
		if (browser) {
			localStorage.setItem('useVirtualDJ', `${useVirtualDJ}`);
		}
	}

	const setView = (newView: number) => {
		currView = newView;
	};

	const toggleUseSpotify = () => {
		useSpotify = !useSpotify;
		console.log(useSpotify, useVirtualDJ)
		if(useVirtualDJ && useSpotify){
			useVirtualDJ = false
		}
	};

	const toggleUseVirtualDJ= () => {
		useVirtualDJ = !useVirtualDJ;
		console.log(useSpotify, useVirtualDJ)
		if(useVirtualDJ && useSpotify){
			useSpotify = false
		}
	};

	Components = options.map(file=>import(`./ViewOptions/${file}.svelte`))
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
	<ControllBoard Components={Components} toggleUseSpotify={toggleUseSpotify} toggleUseVirtualDJ={toggleUseVirtualDJ}  useSpotify={useSpotify} useVirtualDJ={useVirtualDJ}/>
</div>

<style lang="scss">
	#controll-screen-wrapper {
		width: -webkit-fill-available;
		height: -webkit-fill-available;
		display: flex;
		flex-direction: column;
	}
</style>
