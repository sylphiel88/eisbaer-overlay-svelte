<script lang="ts">
	import { onMount } from 'svelte';
	import type { AuthToken, SpotifyTrack } from '../../../types/types';

	let auth: AuthToken;

	let currentSong: SpotifyTrack;

	let totaltime: number = 0;
	let progress_ms: number = 0;
	let count = 0;

	const getAuthToken = async () => {
		let result = fetch('http://localhost:3000/api/spotify/getAuthToken');
		let jResult = await (await result).json();
		if (jResult.expires_in) {
			setTimeout(() => getAuthToken(), jResult.expires_in * 990);
		}
		return jResult;
	};

	const calcMinutesAndSeconds = (timeInMs: number) => {
		let minutes = Math.floor(timeInMs / 1000 / 60);
		let seconds = Math.floor((timeInMs - 60000 * minutes) / 1000);
        if(Number.isNaN(minutes) || Number.isNaN(seconds)){
            return `0:00`
        }
		let secondsString = `${seconds}`;
		if (seconds < 10) {
			secondsString = `0${seconds}`;
		}
		return `${minutes}:${secondsString}`;
	};

	onMount(async () => {
		if (!auth) {
			auth = await getAuthToken();

			setInterval(() => {
				count += 1;
				if (count % 4 === 0) {
					getNowPlaying();
				} else {
					progress_ms += 1000;
				}
			}, 1000);
		}
	});

	$: progress_ms = currentSong?.progress_ms;
	$: totaltime = currentSong?.item.duration_ms;

	const getNowPlaying = () => {
		fetch('http://localhost:3000/api/spotify/getNowPlaying', {
			method: 'POST',
			body: JSON.stringify({
				access_token: auth.access_token
			})
		}).then((res) =>
			res.json().then((jRes) => {
				currentSong = jRes;
			})
		);
	};
</script>

<div id="now-playing-screen">
	<div id="now-playing-eisbaer-logo"><img src="/eisbaerlogo.png" alt="" /></div>
	<div id="now-playing-album">
        <img src={currentSong?.item.album.images[0].url !== undefined ? currentSong?.item.album.images[0].url : "/platte.png"} alt="" />
        <p>{currentSong?.item.album.name !==undefined ? currentSong?.item.album.name : ''}</p>
    </div>
	<div id="now-playing-marquee" />
	<div id="now-playing-timeline">
		<div id="now-playing-interpreten">
			{currentSong?.item.artists !== undefined ? currentSong.item.artists.map((artist) => artist.name).join(", ") : "Eisbär Esslingen"}
		</div>
		<div />
		<div id="now-playing-title">{currentSong?.item.name !== undefined ? currentSong?.item.name : "This is a Song"}</div>
		<div id="now-playing-trackbar">
			<div id="now-playing-progress-bar">
				<div id="now-playing-progress" style={`width: ${(progress_ms / totaltime) * 100}%`}>
					<div id="now-playing-time-text" class={`${progress_ms / totaltime < 0.17 ? 'left' : 'right'}`}>
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
		grid-template-rows: 60dvh 5dvh 25dvh;
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
                left: 0;
                bottom: 5%;
                width: 90%;
                padding: 1%;
                font-size: 25pt;
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
			grid-template-rows: 1.5dvh repeat(2, 5.66dvh) 3dvh 1.5dvh;
			row-gap: 1dvh;
			grid-template-columns: 20dvh repeat(1, calc(100dvw - 20dvh));
		}
		& #now-playing-interpreten {
			grid-column-start: 2;
			grid-column-end: 3;
			grid-row-start: 2;
			grid-row-end: 3;
			align-self: flex-end;
			font-size: 45pt;
            color: red;
		}
		& #now-playing-title {
			grid-column-start: 2;
			grid-column-end: 3;
			grid-row-start: 3;
			grid-row-end: 4;
			font-size: 70pt;
		}
		& #now-playing-trackbar {
			grid-column-start: 1;
			grid-column-end: 3;
			grid-row-start: 5;
			grid-row-end: 6;
		}
		& #now-playing-progress-bar {
			margin-top: 2rem;
			position: relative;
			height: 5rem;
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
		font-size: 40pt;
		&.right {
			right: 7%;
		}
		&.left {
            width: 20rem;
			left: 17%;
		}
	}
</style>
