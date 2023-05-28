<script lang="ts">
	import type { StatisticsDto } from '../../routes/api/math/statistics/+server';
	import RowInput from './elements/RowInput.svelte';

	let row = [0];

	async function getResult() {
		const statisticsDto: StatisticsDto = { inputArray: row };
		const bodySet = JSON.stringify(statisticsDto);
		const options = {
			method: 'POST',
			body: bodySet
		};

		const response = await fetch('/api/math/statistics', options);
		const jsonResult = await response.json();
		mean = jsonResult.mean;
		standardDeviation = jsonResult.standardDeviation;
		median = jsonResult.median;
		max = jsonResult.max;
		min = jsonResult.min;
		skewness = jsonResult.skewness;
		kurtosis = jsonResult.kurtosis;
	}
	let mean: number;
	let standardDeviation: number;
	let median: number;
	let max: number;
	let min: number;
	let skewness: number;
	let kurtosis: number;
</script>

<RowInput bind:row />

<button
	on:click={() => {
		if (row.length < 5) {
			row = [...row, 0];
		}
	}}>Add number</button
>

<button
	on:click={() => {
		if (row.length > 1) {
			row = [...row.slice(0, row.length - 1)];
		}
	}}>Remove number</button
>

<button
	on:click={async () => {
		getResult();
	}}>Get Result</button
>



{#if mean != undefined}
	<p>Results:</p>
	<p>Mean: {mean}</p>
	<p>Standard deviation: {standardDeviation}</p>
	<p>Median: {median}</p>
	<p>Max: {max}</p>
	<p>Min: {min}</p>
	<p>Skewness: {skewness}</p>
	<p>Kurtosis: {kurtosis}</p>
{/if}
