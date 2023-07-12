<script lang="ts">
	import { onMount } from 'svelte/internal';

	type MBAData = {
		id: string;
		dataStorage: any[];
	};

	let data: MBAData[] | undefined = undefined;
	async function run() {
		const res = await fetch('/api/mba/data');
		data = await res.json();
	}
	onMount(async () => {
		await run();
	});

	let i = 1;
</script>

<p>MBA</p>

<button
	on:click={() => {
		i = i + 1;
	}}
>
	add value</button
>
<button
	on:click={() => {
		if (i > 1) {
			i = i - 1;
		}
	}}
>
	remove value</button
>
<br />

<form method="post" action="?/create">
	<label
		>id
		<input name="id" type="text" />
	</label><br/>
	{#each { length: i } as _, id}
		<label
			>key
			<input name="key{id}" type="text" />
		</label>
		<label
			>value
			<input name="value{id}" type="text" />
		</label>
		<br />
	{/each}
	<button>add data to Database</button>
</form>
<br />
<button
	on:click={async () => {
		await run();
	}}>refresh</button
>
<br />
{#if data != undefined}
	{#each data as element}
		<form method="post" action="?/update">
			<label>
				id:
				<input name="id" bind:value={element.id} readonly/>
			</label><br/>
			{#each Object.entries(element.dataStorage) as value, id}
				<label
					>key
					<input name="key{id}" value={value[0]} />
				</label>
				<label
					>value
					<input name="value{id}" value={value[1]} />
				</label><br/>
			{/each}
			
			<button >Update</button>
			<button  formaction="?/delete">Delete</button>
		</form>
	{/each}
{/if}
