<div id="admin-terminals">
	<slot />
</div>

<style lang="scss">
	#admin-terminals {
		width: -webkit-fill-available;
		padding: 2rem;
		height: 80%;
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(2, 1fr);
	}
	#admin-terminals:global(> div) {
		padding: 1rem;
		width: -webkit-fill-available;
		height: -webkit-fill-available;
		background-color: rgba(#ff2600, 0.2);
	}
	#admin-terminals:global(> div > table) {
        width: -webkit-fill-available;
		border-collapse: collapse;
	}
	#admin-terminals:global(> div > table *:not(button, svg)) {
		border: 1px solid #ff260080;
	}
    #admin-terminals:global(> div > table tr){
        width: -webkit-fill-available;
    }
	#admin-terminals:global(> div > table button) {
		all: unset;
		padding: 0.25rem;
		background-color: #ff260080;
	}
	#admin-terminals:global(>div >table td) {
		padding: 0.25rem;
	}
    #admin-terminals:global(>div >table td:has(input[type=checkbox], svg, button)) {
        text-align: center;
	}
	#admin-terminals:global(> div> table input[type=text]) {
		background-color: rgba(0, 0, 0, 0);
		color: white;
	}
	#admin-terminals:global(> div> table [type=checkbox] + label) {
		position: absolute;
		right: 50%;
		transform: translateX(50%);
	}
	#admin-terminals:global(> div> table [type=checkbox]) {
		position: relative;
		z-index: 0;
		-webkit-appearance: none;
		appearance: none;
	}
	#admin-terminals:global(> div > table > tbody > tr > td > input[type=checkbox]+label::before) {
		position: absolute;
		width: 15px;
		height: 15px;
		background-color: lighten(#ff2600, 15%);
		display: block;
		content: '';
		z-index: 5;
		left: -8px;
		top: -1px;
	}
	#admin-terminals:global(> div> table input[type='checkbox']:checked + label::before) {
		background-color: darken(#ff2600, 0%);
	}
	#admin-terminals:global(> div > table td:has(input[type='checkbox'])){
		position: relative;
	}
</style>
