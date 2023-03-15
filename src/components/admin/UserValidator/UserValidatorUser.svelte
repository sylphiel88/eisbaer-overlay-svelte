<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { Roles, User } from '@prisma/client';
	export let user: User;
	export let roles: Roles[];
	export let setUsers: Function;

	const onSubmit = (event: Event, userId: number) => {
		event.preventDefault();
		let isPermitedCheckbox = document.getElementById(`permit-${userId}`) as HTMLInputElement;
		let isPermited = isPermitedCheckbox.checked;
		let roleSelect = document.getElementById(`role-${userId}`) as HTMLSelectElement;
		let roleId = Number(roleSelect.value);
		fetch('/api/v1/User', {
			method: 'PATCH',
			body: JSON.stringify({
				userId: userId,
				roleId: roleId,
				isPermited: isPermited
			})
		}).then((res) => {
			res.json().then((jRes) => {
				setUsers([...jRes]);
			});
		});
	};

	const onDelete = (event: Event, userId: number) => {
		event.preventDefault();
		fetch('/api/v1/User', {
			method: 'DELETE',
			body: JSON.stringify({
				userId: userId
			})
		}).then((res) => {
			res.json().then((jRes) => {
				setUsers([...jRes]);
			});
		});
	};
</script>

<tr id={`user-${user.userId}`}>
	<td> <input type="text" readonly value={user.username} /></td>
	<td
		><select id={`role-${user.userId}`}>
			{#each roles as role}
				<option value={role.roleId} selected={role.roleId === user.roleId}>{role.name}</option>
			{/each}
		</select></td
	>
	<td style="position: relative;"
		><input
			id={`permit-${user.userId}`}
			name={`permit-${user.userId}`}
			type="checkbox"
			checked={user.isPermited}
		/><label for={`permit-${user.userId}`} /></td
	>
	<td
		><input
			type="checkbox"
			checked={user.refreshtoken !== null}
			id={`refresh-${user.userId}`}
			disabled
		/><label for={`refresh-${user.userId}`} /></td
	>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<td on:click={(event) => onDelete(event, user.userId)}
		><Icon icon="mdi:trash-can-circle-outline" /></td
	>
	<td><button on:click={(event) => onSubmit(event, user.userId)}>Ok</button></td>
</tr>
