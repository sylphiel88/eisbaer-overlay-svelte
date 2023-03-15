<script lang="ts">
	import type { View } from '@prisma/client';
	import ViewEditorBody from './ViewEditor/ViewEditorBody.svelte';
	import ViewEditorHead from './ViewEditor/ViewEditorHead.svelte';
	import ViewEditorTable from './ViewEditor/ViewEditorTable.svelte';
	import ViewEditorView from './ViewEditor/ViewEditorView.svelte';

	export let views: View[];

	const setViews = (newViews: View[]) => {
		views = newViews;
	};
</script>

<div>
	<ViewEditorTable>
		<ViewEditorHead />
		<ViewEditorBody>
			{#each views as view}
				<ViewEditorView {view} {setViews} />
			{/each}
			<ViewEditorView
				view={{
					viewId: -1,
					name: '',
					type: 'COMPONENT',
					component: '',
					filename: '',
					url: '',
					allowForEveryOne: false,
					allowOnlyAdmin: false
				}}
				{setViews}
				isNew
			/>
		</ViewEditorBody>
	</ViewEditorTable>
</div>
