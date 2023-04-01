<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import SpotifyAccess from '../../../classes/SpotifyAccess';
	import type {SpotifyTrack } from '../../../types/types';
	import Spotify from '../../controll/ViewOptions/Spotify.svelte';

	let SpotifyInstance: SpotifyAccess = SpotifyAccess.getInstance();

	let totaltime: number = 0;
	let progress_ms: number = 0;
	let currentSong:SpotifyTrack|undefined

	let useSpotify: boolean = false;

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

	onMount(async () => {
		let storedUseSpotify = localStorage.getItem('useSpotify');
		if (storedUseSpotify !== null) useSpotify = storedUseSpotify === 'true';
		window.addEventListener('storage', () => {
			let storedUseSpotify = localStorage.getItem('useSpotify');
			if (storedUseSpotify !== null) {
				useSpotify = storedUseSpotify === 'true';
			}
		});
		document.addEventListener('settitle', (e:CustomEvent)=>{
			progress_ms = SpotifyInstance.progress_ms;
			totaltime = SpotifyInstance.duration_ms;
			currentSong = SpotifyInstance.currentSong
		})
		document.addEventListener('setprogress', (e:CustomEvent)=>{
			progress_ms = SpotifyInstance.progress_ms;
		})
	});

	$: SpotifyInstance.useSpotify = useSpotify

	onDestroy(()=>{
		SpotifyInstance.interval = null
	})

</script>

<div id="now-playing-screen">
	<div id="now-playing-eisbaer-logo"><img src="/eisbaerlogo.png" alt="" /></div>
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
				<div id="now-playing-progress" style={`width: ${(progress_ms / totaltime) * 100}%`}>
					<div
						id="now-playing-time-text"
						class={`${progress_ms / totaltime < 0.17 ? 'left' : 'right'}`}
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
		grid-template-columns: calc(100dvw - 60dvh) 60dvh;
		grid-template-rows: 60dvh 5dvh 35dvh;
		width: 100dvw;
		height: 100dvh;
		font-family: 'Bahnschrift';
		& > #now-playing-eisbaer-logo {
			display: flex;
			justify-content: center;
			align-items: flex-end;
			& > img {
				width: auto;
				height: 70%;
			}
		}
		& > #now-playing-album {
			display: flex;
			justify-content: flex-start;
			align-items: flex-end;
			position: relative;
			& > img {
				border: 5px inset rgb(100, 100, 100);
				width: 90%;
				height: 90%;
			}
			& > p {
				position: absolute;
				width: 90%;
				padding: 1%;
				font-size: 45pt;
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
			font-size: 45pt;
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
			font-size: 70pt;
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
			margin-top: -1rem;
			position: relative;
			height: 5rem;
			width: 100%;
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
