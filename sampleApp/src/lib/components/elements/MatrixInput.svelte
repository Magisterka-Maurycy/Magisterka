<script lang="ts">
	import RowInput from './RowInput.svelte';
	export let matrix: number[][];
	export let constName:undefined|string[]
</script>

<div>
	{#each matrix as row}
		<RowInput bind:row  bind:constName/><br/>
	{/each}
</div>