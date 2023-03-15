<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { Roles, User } from '@prisma/client';
	import UserValidatorBody from './UserValidator/UserValidatorBody.svelte';
	import UserValidatorHead from './UserValidator/UserValidatorHead.svelte';
	import UserValidatorTable from './UserValidator/UserValidatorTable.svelte';
	import UserValidatorUser from './UserValidator/UserValidatorUser.svelte';
	export let users: (User & { Role: Roles })[];
	export let roles: Roles[];

	const setUsers = (newUsers:(User & {Role: Roles})[]) => {
		users = newUsers
	}
</script>

<div>
		<UserValidatorTable>
			<UserValidatorHead/>
			<UserValidatorBody>
				{#if users && roles}
					{#each users as user}
						<UserValidatorUser roles={roles} user={user} setUsers={setUsers}/>
					{/each}
				{/if}
			</UserValidatorBody>
		</UserValidatorTable>
</div>
