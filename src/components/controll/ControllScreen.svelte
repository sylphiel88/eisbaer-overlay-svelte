<script lang="ts">
	import { browser } from '$app/environment';
	import type { View } from '@prisma/client';
	import ViewSelector from './ViewSelector.svelte';
	import querystring from 'querystring';
	import { page } from '$app/stores';
	import * as options from './view-options.json';
	import ViewOption from './ViewOption.svelte';

	export let views: View[];
	let currView = 0;
	let useSpotify: boolean = false;

	let Components: Promise<any>[];

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

	const setView = (newView: number) => {
		currView = newView;
	};

	const toggleUseSpotify = () => {
		useSpotify = !useSpotify;
	};

	$: {
		Components = []
		if (options.viewOptions && currView) {
			if (options.viewOptions.length > currView && options.viewOptions[currView].options) {
				Components = options.viewOptions[currView].options.map((fn) => {
					return import(`./ViewOptions/${fn}.svelte`);
				});
			}
		}
	}
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
	<div id="controll-board">
		{#if Components}
			{#each Components as Component, index}
				<ViewOption {index} title={options.viewOptions[currView].options[index]}>
					{#await Component then { default: Component }}
						<svelte:component
							this={Component}
							{...{ toggle: toggleUseSpotify, state: useSpotify }}
						/>
					{/await}
				</ViewOption>
			{/each}
		{/if}
	</div>
</div>

<style lang="scss">
	#controll-screen-wrapper {
		width: -webkit-fill-available;
		height: -webkit-fill-available;
		display: flex;
		flex-direction: column;
	}
	#controll-board {
		padding: 2rem;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 5rem;
	}
</style>
