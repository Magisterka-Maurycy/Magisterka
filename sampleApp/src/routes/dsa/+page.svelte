<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	let files: any;
</script>

<p>DSA</p>

<p>Stored files:</p>
<div>
	{#each data.names as name}
		<p>
			<a rel="external" href="/api/dsa/{name}">{name}</a>
			<button
				on:click={async () => {
					const options = {
						method: 'DELETE'
					};
					const res = await fetch('/api/dsa/' + name, options);
					console.log(res);
					//TODO: better reload on client side after deleting element
					location.reload();
				}}>Delete</button
			>
		</p>
	{/each}
</div>
<br />
<br />
<br />
<form method="post" enctype="multipart/form-data">
	<input type="file" name="files" bind:files />
	<button>submit</button>
</form>
