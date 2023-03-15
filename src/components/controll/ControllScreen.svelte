<script lang="ts">
	import { browser } from '$app/environment';
	import type { View } from '@prisma/client';
	import ViewSelector from './ViewSelector.svelte';
	import querystring from 'querystring';
	import { page } from '$app/stores';

	export let views: View[];
	let currView = 0;

	const SCOPE = 'user-read-currently-playing';
	const REDIRECT_URI = 'http://localhost:3000/api/spotify/authorizationCodeCallback';

	$: {
		if (browser) {
			localStorage.setItem('currView', `${currView}`);
		}
	}

	const setView = (newView: number) => {
		currView = newView;
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
</div>

<style lang="scss">
	#controll-screen-wrapper {
		width: -webkit-fill-available;
		height: -webkit-fill-available;
		display: flex;
		flex-direction: column;
		padding: 1rem;
	}
</style>
