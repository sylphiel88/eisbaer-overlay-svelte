<script lang="ts">
	import { page } from '$app/stores';
	import BackNav from '../../components/login_register/BackNav.svelte';
	import UserNav from '../../components/controll/UserNav.svelte';
    let user = $page.data.user
</script>

<div id="background">
	<img src="./eisbaerlogo.png" alt="eisbaerlogo"/>
	<div id="overlay">
		<div id="main-page">
			{#if user}
				<UserNav user={user}/>
			{:else if $page.url.pathname!=="/"}
				<BackNav/>
			{/if}
			<slot/>
		</div>
	</div>
</div>

<style lang="scss">
	:global(body) {
		background-color: #4e0c00;
		margin: 0;
		padding: 0;
		font-family: 'Bahnschrift';
		width: 100dvw;
		height: 100dvh;
		color: white;
		overflow: hidden;
		box-sizing: border-box;
	}
	:global(button){
			all: unset;
			font-size: 25pt;
			width: 11ch;
			background-color: #ff260080;
			box-shadow: -1px 1px 15px 0 #ff260080;
			color: white;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
	}
	:global(a){
		all: unset;
	}
	#background {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		width: 100dvw;
		height: 100dvh;
        background: 
  linear-gradient(
    153deg,
    hsl(348.21, 71.78%, 31.96%) 0%,
    hsl(346.46, 71.26%, 32.03%) 14.9%,
    hsl(344.1, 70.51%, 32.13%) 27%,
    hsl(341.31, 69.58%, 32.25%) 36.8%,
    hsl(338.25, 68.52%, 32.39%) 44.5%,
    hsl(335.02, 67.36%, 32.55%) 50.6%,
    hsl(331.69, 66.15%, 32.7%) 55.4%,
    hsl(328.3, 64.9%, 32.86%) 59.2%,
    hsl(324.9, 63.65%, 33.02%) 62.5%,
    hsl(321.51, 62.41%, 33.17%) 65.5%,
    hsl(318.16, 61.2%, 33.32%) 68.7%,
    hsl(314.88, 60.04%, 33.46%) 72.5%,
    hsl(311.71, 58.94%, 33.59%) 77.1%,
    hsl(308.66, 57.9%, 33.71%) 83%,
    hsl(305.77, 56.94%, 33.82%) 90.5%,
    hsl(303.09, 56.07%, 33.92%) 100%
  );
		& > img {
			position: absolute;
			width: 50%;
			height: 50%;
			object-fit: contain;
			filter: opacity(0.2);
		}
	}
	#overlay {
		background-color: rgba(0,0,0,0.4);
		width: calc(100dvw - 5dvh);
		height: 95dvh;
		border-radius: 10px;
		box-shadow: 1px -1px 22px 0 rgba(#da2b0d, 0.5);
		backdrop-filter: blur(5px);
	}
    #main-page{
        width: 100%;
        height: 100%;
    }
</style>
