<script lang="ts">
    export let filename:string
</script>
<video src={`http://localhost:3000/${filename}`}><track kind="captions"></video>