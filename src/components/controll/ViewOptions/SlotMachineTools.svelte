<script lang="ts">
    export let setYear:Function
    export let setFontSize:Function
</script>
<div>
    <input type="text" placeholder="Text" on:input={(event)=>{
        let value = event.currentTarget.value
        setYear(value)
    }}/>
    <input type="number" value=12 min=12 max=52 placeholder="Schriftgröße" on:input={(event)=>{
        let value = event.currentTarget.value
        setFontSize(value)
    }}/>
</div>