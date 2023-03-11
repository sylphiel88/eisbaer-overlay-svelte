<script lang="ts">
</script>

<div id="background">
	<img src="./eisbaerlogo.png" alt="eisbaerlogo"/>
	<div id="overlay">
		<slot/>
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
	}
	#background {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		width: 100%;
		height: 100%;
        background: linear-gradient(322deg, darken(#ff2600,42%), rgba(#242424, 0) 70%),
			linear-gradient(178deg, #200303, rgba(#200303, 0) 70%),
			linear-gradient(24deg, #750041, rgba(#750041, 0) 35%);
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
</style>
