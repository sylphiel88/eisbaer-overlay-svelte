<script lang="ts">
	export let filename: string;
</script>

<iframe
	width="1920"
	height="1080"
	src={`https://www.youtube.com/embed/${filename}?autoplay=1`}
	title="YouTube video player"
	frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen
/>