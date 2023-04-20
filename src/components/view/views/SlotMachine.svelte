<script lang="ts">
	import { onMount } from 'svelte';

	let numberOfTurns: number = 60;
	let alreadyTakenYears: Number[] = [];
	let year: number;

	const values = [
		[1, 2],
		Array.from(Array(10).keys()),
		Array.from(Array(10).keys()),
		Array.from(Array(10).keys())
	];

	let top: number[] = [0, 0, 0, 0];
	let numbers: [number, number, number, number] = [1, 0, 0, 0];
	let currTurns: number = 0;
	let turns: number[] = [];
	let showResult: boolean = false;
    let interval:NodeJS.Timer|null = null

	$: {
		if (numberOfTurns) {
			turns = Array.from(Array(Number(numberOfTurns)).keys());
		}
	}

	function numberSetter(currTurn: number) {
		let years = Array.from(Array(44).keys());
		years = years
			.map((val) => {return val + 1979})
			.filter((curYear) => !alreadyTakenYears.includes(curYear));
        year = years.splice(Math.floor(Math.random()*years.length),1)[0]
        console.log(year)
		let thousand = Math.floor(year / 1000);
		let hundred = Math.floor((year - 1000 * thousand) / 100);
		let tens = Math.floor((year - 1000 * thousand - 100 * hundred) / 10);
		let digit = Math.floor(year - 1000 * thousand - 100 * hundred - 10 * tens);
		numbers = [thousand, hundred, tens, digit];
		if (currTurn >= numberOfTurns && year !== 1000) {
            clearInterval(interval as NodeJS.Timer)
            interval = null
			currTurns = 0;
			showYear();
		}
	}

	function showYear() {
		showResult = true;
		setTimeout(() => {
            localStorage.setItem('year', `${year}`)
			showResult = false;
			setYearAndChangeView();
		}, 5000);
	}

	const setYearAndChangeView = () => {};

	$: {
		let thousand = Math.floor(year / 1000);
		let hundred = Math.floor((year - 1000 * thousand) / 100);
		let tens = Math.floor((year - 1000 * thousand - 100 * hundred) / 10);
		let digit = Math.floor(year - 1000 * thousand - 100 * hundred - 10 * tens);
		numbers = [thousand, hundred, tens, digit];
	}

	$: {
		top = numbers.map((n, i) => {
			return i === 0 ? 35 - 35 * n : -35 * n;
		});
	}

	onMount(() => {
		let storedNumberOfTurns = Number(localStorage.getItem('numberOfTurns'));
		if (storedNumberOfTurns) {
			numberOfTurns = storedNumberOfTurns || 60;
		}
		document.addEventListener('storage', () => {
			let storedNumberOfTurns = Number(localStorage.getItem('numberOfTurns'));
			if (storedNumberOfTurns) {
				numberOfTurns = storedNumberOfTurns || 60;
			}
		});

		let storedAlreadyTakenYears = Number(localStorage.getItem('alreadyTakenYears'));
		if (storedAlreadyTakenYears) {
			alreadyTakenYears =
				storedAlreadyTakenYears
					.toString()
					.split(',')
					.map((value) => Number(value)) || [];
		}
		document.addEventListener('storage', () => {
			let storedAlreadyTakenYears = Number(localStorage.getItem('alreadyTakenYears'));
			if (storedAlreadyTakenYears) {
				alreadyTakenYears =
					storedAlreadyTakenYears
						.toString()
						.split(',')
						.map((value) => Number(value)) || [];
			}
		});

		let storedYear = Number(localStorage.getItem('year'));
		if (storedYear) {
			year = storedYear || 1000;
		} else {
            year = 1000
        }
		document.addEventListener('storage', () => {
			let storedYear = Number(localStorage.getItem('year'));
			if (storedYear) {
				year = storedYear || 1000;
			} else {
                year = 1000
            }
		});
	});

</script>

<div>
	<div class="slot-machine-wrapper">
		<img src={'http://localhost:3000/slot.png'} class="slot-machine-image" alt="" />
		<div class="slot-machine">
			{#each values as n, i}
				<div class="slot-wrapper">
					<div class="slots" style={`top: ${top[i]}vh;`}>
						{#each n as v}
							<div>
								<span>{v}</span>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
		<button
			class="eisbaer-overlay-button slot-button"
			style="marginTop: 20px;"
			on:click={(e) => {
                currTurns = 0
                if(interval === null){
                interval = setInterval(()=>{
                    currTurns += 1
                    numberSetter(currTurns)}, 500)
                }
            }}
		>
			SPIN!
		</button>
		{#if showResult}
			<div class="shadow-overlay">
				<div class="year-result">
					{year}
					<span class="exclamation-1"> !</span>
					<span class="exclamation-2"> !</span>
					<span class="exclamation-3"> !</span>
				</div>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Ultra&display=swap');

	.slot-machine-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 100vh;
	}

	.slot-machine {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 2.5vw;
		height: 35vh;
		width: 61vw;
		overflow: hidden;
		background-color: rgb(82, 71, 71);
		justify-content: center;
		align-items: center;
		position: relative;
		top: 12vh;
		left: -1.5vw;
	}
	.slot-wrapper {
		position: relative;
		height: 35vh;
		width: 200px;
		overflow: hidden;
	}

	.slots {
		position: absolute;
		width: 100%;
		height: 35vh;
		transition: top ease-in-out 0.5s;
		text-align: center;
		line-height: 35vh;
	}

	.slots > div > span {
		-webkit-text-stroke: 2px rgb(58, 31, 12);
		color: rgb(180, 154, 112);
		font-size: 10vh;
		font-family: 'Ultra';
	}

	.slot-machine-image {
		height: 70vh;
		width: 90vw;
		z-index: 1;
		position: absolute;
	}

	.slot-button {
        all: unset;
		z-index: 3;
		position: absolute;
		top: 15.5vh;
		left: 87.5vw;
        text-align: center;
		background-color: rgba(0, 0, 0, 0) !important;
		height: 12.5vh;
		width: 7.2vw;
		font-size: 22pt;
		line-height: 70px;
		-webkit-text-stroke: 2px rgb(58, 31, 12);
		color: rgb(180, 154, 112);
        border-radius: 50%;
		border: 3px inset rgb(58, 31, 12) !important;
		box-shadow: 0 0 20px rgba(#fff, 0.5), 0 0 10px rgb(58, 31, 12) !important;
	}

	.slots > div {
		height: 35vh;
	}

	.shadow-overlay {
		z-index: 1000;
		position: fixed;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		opacity: 0;
		top: 0;
		left: 0;
		z-index: 100;
		height: 100%;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		animation: showShadow 0.5s linear 0.5s 1 forwards;
		transition: opacity 0.2s ease;
	}

	.exclamation-1 {
		opacity: 0;
		animation: showShadow 0.5s linear 2s 1 forwards;
	}
	.exclamation-2 {
		opacity: 0;
		animation: showShadow 0.5s linear 2.5s 1 forwards;
	}
	.exclamation-3 {
		opacity: 0;
		animation: showShadow 0.5s linear 3s 1 forwards;
	}

	@keyframes showShadow {
		100% {
			opacity: 1;
		}
	}

	.year-result {
		opacity: 0;
		font-size: 30vh;
		animation: yearresanim 4s linear 1s 1 forwards;
	}

	@keyframes yearresanim {
		0% {
			opacity: 0;
		}
		20% {
			opacity: 1;
		}
		80% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}

	.already-taken {
		max-width: 15vw;
	}
</style>
