<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import type { View } from '@prisma/client';
	import { onMount } from 'svelte';
	import ViewScreen from '../../../components/view/ViewScreen.svelte';

	let currView: number = 0;

	let useSpotify:boolean
	let useVirtualDJ:boolean
	let useOldVsNew:boolean

	let year:number

	let user: string | undefined = '';
	let views: View[] = [];

	$: views = $page.data.views;
	$: user = $page.data.user;

	onMount(() => {
		if (browser) {
			let storedCurrView = localStorage.getItem('currView');
			if (user && storedCurrView) currView = Number(storedCurrView);
			window.addEventListener('storage', () => {
				let storedCurrView = localStorage.getItem('currView');
				if (user) {
					currView =
						storedCurrView !== undefined &&
						storedCurrView !== null &&
						storedCurrView !== '' &&
						typeof Number(storedCurrView) === 'number'
							? Number(storedCurrView)
							: 0;
				} else {
					currView = 0;
				}
				if (!user && !(storedCurrView === '1' || storedCurrView === '0')) {
					localStorage.setItem('currView', '0');
				} else if(!user){
					if(storedCurrView === '1' || storedCurrView === '0'){
						currView = Number(storedCurrView)
					} else {
						currView = 0
					}
				}
				let storedUseSpotify = localStorage.getItem('useSpotify');
				if (storedUseSpotify !== null) {
					useSpotify = storedUseSpotify === 'true';
				}
				let storedUseVirtualDJ = localStorage.getItem('useVirtualDJ');
				if (storedUseVirtualDJ !== null) {
					useVirtualDJ = storedUseVirtualDJ === 'true';
				} 
				let storedUseOldVsNew = localStorage.getItem('useOldVsNew');
				if (storedUseVirtualDJ !== null) {
					useOldVsNew = storedUseOldVsNew === 'true';
				}
				let storedYear = localStorage.getItem('year')
				if(storedYear !== null){
					year = Number(storedYear)
				}
				});
		}
	});
</script>

<ViewScreen view={views[currView]} useOldVsNew={useOldVsNew} useSpotify={useSpotify} useVirtualDJ={useVirtualDJ} year={year}/>
