<script lang="ts">
	import { page } from '$app/stores';
	import UserValidator from '../../../components/admin/UserValidator.svelte';
	import ViewsEditor from '../../../components/admin/ViewsEditor.svelte';
	let { users, roles, views } = $page.data;
</script>

	<UserValidator {users} {roles} />
	<ViewsEditor {views} />