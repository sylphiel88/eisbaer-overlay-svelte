<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { View } from '@prisma/client';
	import { SvelteViewType  } from './../../../types/types';

	export let view: View;
    export let setViews: Function;
    export let isNew: boolean = false;

    let viewName:string

	let inputValue: string;
	let inputType: 'url' | 'filename' | 'component' = 'filename';

	let onlyAdmin: boolean = isNew ? false : view.allowOnlyAdmin ?? false
	let forEveryOne: boolean = isNew ? false : view.allowForEveryOne ?? false

    let chosenType:SvelteViewType = view.type as SvelteViewType

	$: {
		if (chosenType !== undefined) {
			switch (chosenType) {
				case 'YOUTUBE':
					inputType = 'url';
                    inputValue = view["url"]?view["url"]:inputValue;
					break;
				case 'COMPONENT':
					inputType = 'component';
                    inputValue = view["component"]?view["component"]:inputValue;
					break;
				default:
					inputType = 'filename';
                    inputValue = view["filename"]?view["filename"]:inputValue;
					break;
			}
            
		}
	}

	

    const onSubmit = (event: Event, viewId: number) => {
		event.preventDefault();
		let filename = ""
        let url = ""
        let component = ""
        if(inputType === "component") component = inputValue
        if(inputType === "filename") filename = inputValue
        if(inputType === "url") url = inputValue

		let data:Omit<View,'viewId'> & {viewId?: number|undefined} = {
				viewId: viewId,
                name: viewName,
                type: chosenType,
                filename: filename,
                url: url,
                component: component,
				allowForEveryOne: forEveryOne,
				allowOnlyAdmin: onlyAdmin
		}

		if(isNew) delete data.viewId

		fetch('/api/v1/View', {
			method: `${isNew ? 'POST' : 'PATCH'}`,
			body: JSON.stringify(data)
		}).then((res) => {
			res.json().then((jRes) => {
				setViews([...jRes]);
			});
		});
	};

	const onDelete = (event: Event, viewId: number) => {
		event.preventDefault();
		fetch('/api/v1/View', {
			method: 'DELETE',
			body: JSON.stringify({
				viewId: viewId
			})
		}).then((res) => {
			res.json().then((jRes) => {
				setViews([...jRes]);
			});
		});
	};

	const adminCallback = (event:Event) => {
		let adminCB = event.currentTarget as HTMLInputElement
		if(adminCB.checked === forEveryOne){
			forEveryOne = false
		}
	}

	const everyCallback = (event:Event) => {
		let everyCB = event.currentTarget as HTMLInputElement
		if(everyCB.checked === onlyAdmin){
			onlyAdmin = false
		}
	}

</script>

<tr>
	<td>
        {#if isNew} 
            <input type="text" bind:value={viewName}/>
        {:else}
        <input type="text" readonly value={view.name}/>
        {/if}
	<td>
		<select disabled={!isNew} bind:value={chosenType}>
			{#each Object.keys(SvelteViewType) as type}
				<option value={type} selected={view.type === type}>{type}</option>
			{/each}
		</select>
	</td>
	<td>
		<input type="text" bind:value={inputValue} />
	</td>
	<td>
			<input type="checkbox" on:change={(event)=>{adminCallback(event)}} bind:checked={onlyAdmin} id={`admin-${view.viewId}`} name="user-group"/><label for={`admin-${view.viewId}`}/>
	</td>
	<td>
			<input type="checkbox" on:change={(event)=>{everyCallback(event)}} bind:checked={forEveryOne} id={`every-${view.viewId}`} name="user-group"/><label for={`every-${view.viewId}`} />
	</td>
    {#if isNew}
    <td>&nbsp;</td>
    {:else}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <td on:click={(event) => onDelete(event, view.viewId)}
        ><Icon icon="mdi:trash-can-circle-outline" /></td
    >
    {/if}
    <td><button on:click={(event) => onSubmit(event, view.viewId)}>Ok</button></td>
</tr>
