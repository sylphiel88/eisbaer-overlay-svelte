<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import SpotifyAccess from '../../../classes/SpotifyAccess';
	import type { SpotifyTrack, VirtualDJ } from '../../../types/types';
	import VirtualDJAccess from '../../../classes/VirtualDjAccess';

	let SpotifyInstance: SpotifyAccess = SpotifyAccess.getInstance();
	let VirtualDJInstance: VirtualDJAccess = VirtualDJAccess.getInstance();
	SpotifyInstance.useSpotify = false;
	VirtualDJInstance.useVirtualDJ = false;

	let totaltime: number = 0;
	let progress_ms: number = 0;
	let currentSong: SpotifyTrack | undefined;

	export let useSpotify: boolean;

	export let useVirtualDJ: boolean;

	export let useOldVsNew: boolean;

	let interval: NodeJS.Timer | null = null;

	$: console.log(useOldVsNew);

	const calcMinutesAndSeconds = (timeInMs: number) => {
		let minutes = Math.floor(timeInMs / 1000 / 60);
		let seconds = Math.floor((timeInMs - 60000 * minutes) / 1000);
		if (Number.isNaN(minutes) || Number.isNaN(seconds)) {
			return `0:00`;
		}
		let secondsString = `${seconds}`;
		if (seconds < 10) {
			secondsString = `0${seconds}`;
		}
		return `${minutes}:${secondsString}`;
	};

	let timeToNextHalfHour:number = 0

	onMount(async () => {
		let storedUseSpotify = localStorage.getItem('useSpotify');
		if (storedUseSpotify !== null) useSpotify = storedUseSpotify === 'true';
		let storedUseVirtualDJ = localStorage.getItem('useVirtualDJ');
		if (storedUseVirtualDJ !== null) useVirtualDJ = storedUseVirtualDJ === 'true';
		document.addEventListener('settitle', (e: CustomEvent) => {
			progress_ms = useSpotify
				? SpotifyInstance.progress_ms
				: useVirtualDJ
				? VirtualDJInstance.progress_ms
				: 0;
			totaltime = useSpotify
				? SpotifyInstance.duration_ms
				: useVirtualDJ
				? VirtualDJInstance.duration_ms
				: 0;
			currentSong = useSpotify
				? SpotifyInstance.currentSong
				: useVirtualDJ
				? (VirtualDJInstance.currentSong! as SpotifyTrack)
				: undefined;
		});
		document.addEventListener('setprogress', (e: CustomEvent) => {
			progress_ms = useSpotify
				? SpotifyInstance.progress_ms
				: useVirtualDJ
				? VirtualDJInstance.progress_ms
				: 0;
		});
	});

	$: { if(useOldVsNew !== undefined){
		if(interval){
			clearInterval(interval)
		}
		interval = null
		interval = setInterval(()=>{
			timeToNextHalfHour = (getTimeToNextHalfHour() + 2)* 5
		},60000)
	}
	}

	$: if (!useSpotify) {
		SpotifyInstance.resetSong();
	}

	$: SpotifyInstance.useSpotify = useSpotify;

	$: VirtualDJInstance.useVirtualDJ = useVirtualDJ;

	onDestroy(() => {
		SpotifyInstance.interval = null;
		VirtualDJInstance.interval = null;
		if(interval){
			clearInterval(interval)
		}
		interval = null
	});

	const getTimeToNextHalfHour = () => {
		const date = new Date();
		const milli = date.getTime();
		let halfHour = 1000 * 60 * 30;
		// (gerundet(aktulle zeit / halbe stunde) + 1) * halfHour
		let nextHalfHour = (Math.floor(milli / halfHour) + 1) * halfHour;
		let difference = nextHalfHour - milli;
		let minutes5 = Math.floor(Math.floor(Math.floor(difference / 1000) / 60) / 5);
		return minutes5;
	};
</script>

<div id="now-playing-screen">
	<div id="now-playing-eisbaer-logo">
		<img src={`/eisbaerlogo${useOldVsNew ? '_alt' : ''}.png`} alt="" />
		<!-- <span id="Title"
			>{useOldVsNew
				? `Alte Musik! Neue Musik in ca. ${timeToNextHalfHour} Minuten`
				: `Neue Musik! Alte Musik in ca. ${timeToNextHalfHour} Minuten`}</span> -->
	</div>
	<div id="now-playing-album">
		<img
			src={currentSong?.item.album.images[0].url !== undefined
				? currentSong.item.album.images[0].url
				: '/platte.png'}
			alt=""
		/>
		<p>{currentSong?.item.album.name !== undefined ? currentSong?.item.album.name : ''}</p>
	</div>
	<div id="now-playing-marquee" />
	<div id="now-playing-timeline">
		<div id="now-playing-interpreten">
			{currentSong?.item.artists !== undefined
				? currentSong.item.artists.map((artist) => artist.name).join(', ')
				: 'Eisbär Esslingen'}
		</div>
		<div />
		<div id="now-playing-title">
			<span>
				{currentSong?.item.name !== undefined ? currentSong?.item.name : 'This is a Song'}
			</span>
		</div>
		<div id="now-playing-trackbar">
			<div id="now-playing-progress-bar">
				<div id="now-playing-progress" style={`width: ${(progress_ms / totaltime) * 97}%`}>
					<div
						id="now-playing-time-text"
						class={`${progress_ms / totaltime < 0.3 ? 'left' : 'right'}`}
					>
						{calcMinutesAndSeconds(progress_ms)} / {calcMinutesAndSeconds(totaltime)}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	#now-playing-screen {
		// hier kompletter screen
		display: grid;
		grid-template-columns: calc(100dvw - 50dvh) 50dvh;
		grid-template-rows: 60dvh 5dvh 35dvh;
		width: 100dvw;
		height: 100dvh;
		font-family: 'Bahnschrift';
		& > #now-playing-eisbaer-logo {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: flex-end;
			> #Title {
				position: absolute;
				top: 5rem;
				left: 5rem;
				font-size: 30pt;
			}
			& > img {
				width: auto;
				height: 65%;
			}
		}
		& > #now-playing-album {
			display: flex;
			justify-content: flex-start;
			align-items: flex-end;
			position: relative;
			& > img {
				border: 10px inset rgb(150, 150, 150);
				width: 90%;
				aspect-ratio: 1/1;
			}
			& > p {
				position: absolute;
				width: 90%;
				padding: 1%;
				font-size: 35pt;
				background-color: rgba(grey, 0.5);
				text-align: center;
			}
		}
		& > #now-playing-marquee {
			grid-column-start: 1;
			grid-column-end: 3;
		}
		& > #now-playing-timeline {
			grid-column-start: 1;
			grid-column-end: 3;

			display: grid;
			grid-template-rows: 1.5dvh 8dvh 10dvh;
			grid-template-columns: 20dvh repeat(1, calc(100dvw - 20dvh));
			overflow: hidden;
			width: 97dvw;
		}
		& #now-playing-interpreten {
			grid-column-start: 2;
			grid-column-end: 3;
			grid-row-start: 2;
			grid-row-end: 3;
			align-self: flex-end;
			font-size: 40pt;
			color: red;
			overflow: hidden;
			width: 97%;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		& #now-playing-title {
			grid-column-start: 2;
			grid-column-end: 3;
			grid-row-start: 3;
			grid-row-end: 4;
			font-size: 55pt;
			width: 97%;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		& #now-playing-trackbar {
			grid-column-start: 1;
			grid-column-end: 3;
			grid-row-start: 5;
			grid-row-end: 6;
		}
		& #now-playing-progress-bar {
			margin-top: 1rem;
			position: relative;
			height: 5rem;
			width: 97dvw;
			background-color: darken(#ff2600, 40%);
			box-shadow: -1px 1px 30px 0px darken(#ff2600, 15%);
			border-radius: 20rem;
		}
		& #now-playing-progress {
			position: absolute;
			background-color: #ff2600;
			height: 5rem;
			border-bottom-right-radius: 2.5rem;
			border-top-right-radius: 2.5rem;
			box-shadow: -1px 1px 22px 5px #ff2600;
			transition: width 1s ease-in;
		}
	}
	#now-playing-time-text {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		color: white;
		font-size: 54pt;
		font-weight: 600;
		padding-top: 0.5rem;
		white-space: nowrap;
		&.right {
			right: 7%;
		}
		&.left {
			width: 20rem;
			left: 17%;
		}
	}
</style>
