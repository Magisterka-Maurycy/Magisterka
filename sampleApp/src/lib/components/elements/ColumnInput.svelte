<script lang="ts">
	import NumberInput from "./NumberInput.svelte";
	export let row: number[];
</script>

<div
	class="grid w-fit gap-1"
>
		{#each row as cell}
			<NumberInput bind:value={cell}/><br/><br/>
		{/each}
</div>