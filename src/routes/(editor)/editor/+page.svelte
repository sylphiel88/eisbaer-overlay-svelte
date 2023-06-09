<script lang="ts">
	import { page } from "$app/stores";

    let year = $page.data.year
    let month = $page.data.month

    const months = [
        "Januar",
        "Februar",
        "März",
        "April",
        "Mai",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "Dezember"
    ]

    let events:Event[] = []

    const getEvents = async() => {
        events = await ((await fetch(`/api/v1/Event?year=${year}&month=${month}`)).json())
    }

    $:{
        if(year!==undefined && month !== undefined){
            getEvents()
        }
    }
</script>

<div id="event-editor">
    <div id="editor-list">
        <div id="editor-event-list">
            <select>
                {#each new Array(12).fill(0) as _, index}
                    <option value={months[index]} selected={index === month - 1}>{months[index]}</option>
                {/each}
            </select>
            <select>
                {#each new Array(5).fill(0).map((_,index)=>year + index) as optYear}
                    <option value={optYear} selected={optYear === year}>{optYear}</option>
                {/each}
            </select>
        </div>
        <div id="editor-event-settings">

        </div>
    </div>
    <div id="editor-preview">
        <div id="editor-preview-settings">

        </div>
        <div id="editor-preview-frame">

        </div>
    </div>
</div>

<style lang="scss">
    #event-editor{
        display: flex;
        flex-direction: row;
        height: 88vh;
        width: 100%;
        padding: 1rem;
        box-sizing: border-box;
    }
    #editor-list, #editor-preview {
        display: flex;
        flex-direction: column;
        height: 100%;
        & > div {
            margin: 0.25rem;
            border-radius: 1rem;
        }
    }
    #editor-list{
        width: 70%;
    }
    #editor-preview {
        width: 30%;
    }
    #editor-event-list {
        height: 85%;
        background-color: green;
    }
    #editor-event-settings {
        height: 15%;
        background-color: red;
    }
    #editor-preview-settings {
        height: 20%;
        background-color: blue;
    }
    #editor-preview-frame {
        height: 80%;
        background-color: purple;
    }
</style>
