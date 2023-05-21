<script lang="ts">
	import { uRoles, type UserCredentials } from '../../types/types';
	export let user: UserCredentials;
</script>

<nav>
	<ul>
		<li><a href="/">Home</a></li>
		{#if user.role === 'admin'}
			<li><a href="/admin">Admin</a></li>
		{/if}
		{#if user.role !== uRoles.ALL}
			<li>
				<form action="/logout" method="POST">
					<button type="submit">Logout</button>
				</form>
			</li>
		{:else}
			<li>
				<form action="/login" method="GET">
					<button type="submit">Login</button>
				</form>
			</li>
		{/if}
	</ul>
</nav>

<style lang="scss">
	nav {
		background-color: rgba(0, 0, 0, 0.6);
		width: -webkit-fill-available;
		height: fit-content;
		display: flex;
		justify-content: flex-end;
		padding: 0 1rem;
		border-top-right-radius: 1rem;
		border-top-left-radius: 1rem;
		& > ul {
			display: flex;
			list-style: none;
			gap: 2rem;
			& > li {
				& > form > button {
					all: unset;
				}
				all: unset;
				padding: 10px;
				width: fit-content;
				height: fit-content;
				border-radius: 100px;
				background-color: #ff260080;
			}
		}
	}
</style>
