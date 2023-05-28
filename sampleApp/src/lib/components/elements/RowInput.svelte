<script lang="ts">
	import NumberInput from "./NumberInput.svelte";
	export let row: number[];
	export let constName: string[]|undefined
</script>

<div
	class="grid w-fit gap-1"
>
		{#each row as cell, ind}
		{#if constName!=undefined}
			{constName[ind]}:
		{/if}
			<NumberInput bind:value={cell} />
		{/each}
</div>