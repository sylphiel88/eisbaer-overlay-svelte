<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import type { View } from '@prisma/client';
	import ControllScreen from '../../components/controll/ControllScreen.svelte';
    let user:any = $page.data.user
	let views:View[] = []
	$: views = $page.data.views
	let isNowPlaying:boolean = false

	$: {
		if(browser){
			if(isNowPlaying){
				localStorage.setItem('currView', `1`);
			} else {
				localStorage.setItem('currView', `0`);
			}
		}
	}
</script>

<div id="main-controll-page">
	{#if !$page.data.user}
		<div id="not-logged-in">
			<button><a data-sveltekit-preload-data="tap" href="/login">Login</a></button>
			<button><a data-sveltekit-preload-data="tap" href="/register">Registrieren</a></button>
			<div id="nowPlayingSwitch">
				<label class="switch">
					<input type="checkbox" bind:checked={isNowPlaying}>
					<span class="slider round"></span>
			  	</label>
				<span id="nowPlayingText">Spotify Bildschirm {isNowPlaying?'ausblenden':'anzeigen'}</span>
			</div>
		</div>
	{:else}
        <ControllScreen views={views}/>
    {/if}
</div>

<style lang="scss">
	#nowPlayingSwitch {
		display: flex;
		gap: 1rem;
		align-items: center;
		& > #nowPlayingText {
			font-size: 15pt;
		}
	}
	#main-controll-page {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		& > #not-logged-in {
			width: 20%;
			height: fit-content;
			display: flex;
			flex-direction: column;
			gap: 1rem;
			& > button > a {
				all: unset;
			}
		}
	}
	.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ff2600;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #ff2600;
}

input:focus + .slider {
  box-shadow: 0 0 1px #ff2600;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
