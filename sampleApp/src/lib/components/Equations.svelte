<script lang="ts">
	import ColumnInput from '$lib/components/elements/ColumnInput.svelte';
	import type { EquationDto } from '../../routes/api/math/equations/+server';
	import MatrixInput from './elements/MatrixInput.svelte';

	let coefficients: number[][] = [[0]];
	let constants: number[] = [0];
	let decomposition = 'LUDecomposition';
	let result: number[] | undefined = undefined;
	let constName: string[] = ['x', 'y', 'z', 'a', 'b'];
	async function getResult() {
		const statisticsDto: EquationDto = { coefficients, constants, decomposition };
		const bodySet = JSON.stringify(statisticsDto);
		const options = {
			method: 'POST',
			body: bodySet
		};

		const response = await fetch('/api/math/equations', options);
		if (response.status != 200) {
			result = undefined;
		}
		const jsonResult = await response.json();
		result = jsonResult.solution;
	}
</script>

<div class="flex-container">
	<div class="column1">
		<p>Coefficients</p>
		<MatrixInput bind:matrix={coefficients} bind:constName />
	</div>
	<div class="column2">
		<p>Constants</p>
		<ColumnInput bind:row={constants} />
	</div>
</div>
<button
	on:click={() => {
		if (coefficients.length < 5) {
			let array = [];
			for (let i = 0; i < coefficients.length + 1; i++) {
				array = [...array, 0];
			}
			coefficients.forEach((element) => {
				element.push(0);
			});
			coefficients = [...coefficients, array];
			constants = [...constants, 0];
		}
	}}>Add number</button
>

<button
	on:click={() => {
		if (coefficients.length > 1) {
			coefficients.forEach((element) => {
				element.pop();
			});
			coefficients = [...coefficients.slice(0, coefficients.length - 1)];
			constants = [...constants.slice(0, constants.length - 1)];
		}
	}}>Remove number</button
>

<button
	on:click={async () => {
		getResult();
	}}>Get Result</button
>

{#if result != undefined}
	<p>Result:</p>
	{#each result as num, i}
		{constName[i]}: {num} <br/>
	{/each}
{/if}

<style>
	.flex-container {
		min-height: 300px;
		margin: 0 auto;
		display: -webkit-flex; /* Safari */
		display: flex; /* Standard syntax */
	}
	.flex-container .column1 {
		padding: 10px;
	}
	.flex-container .column2 {
		padding: 10px;
	}
</style>
