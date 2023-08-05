<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import ViewScreen from '../../../components/view/ViewScreen.svelte';
	import SpotifyAccess from '../../../classes/SpotifyAccess';

	let currView: number = 0;

	let useSpotify: boolean;
	let useVirtualDJ: boolean;
	let useOldVsNew: boolean;

	let year: number | string;

	let fontSize: number;

	let useWaitList:boolean;

	let io = SpotifyAccess.getInstance().io;

	onMount(() => {
		if (browser) {
			io?.emit('joinBeamerRoom')
			io?.emit('getCurrView');
			io?.on('setCurrView', (view: number) => {
				currView = view;
			});
			io?.emit('getUseSpotify');
			io?.on('setUseSpotify', (set: boolean) => {
				useSpotify = set;
			});
			io?.emit('getUseVirtualDJ');
			io?.on('setVirtualDJ', (set: boolean) => {
				useVirtualDJ = set;
			});
			io?.emit('getOldVsNew')
			io?.on('setOldVsNew', (set: boolean) => {
				useOldVsNew = set
			})
			io?.emit('getYear')
			io?.on('setYear', (year: string) => {
				year = year
			})
			
			io?.emit('getFontSize')
			io?.on('setFontSize', (newFontSize: number) => {
				fontSize = newFontSize
			})
			io?.emit('getWaitlistStatus')
			io?.on('setWaitlistStatus', (set: boolean) => {
				useWaitList = set
			})
		}
	});
</script>

<ViewScreen
	view={$page.data.views[currView]}
	{useOldVsNew}
	{useSpotify}
	{useVirtualDJ}
	{year}
	{fontSize}
	{useWaitList}
/>
