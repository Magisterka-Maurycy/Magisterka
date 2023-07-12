<script lang="ts">
	import type { ActionData, PageData } from './$types';

	export let data: PageData;

	export let form: ActionData;
	$: if (form?.success) {
		open = true;
	}
	let open = false;
	let dialog: HTMLDialogElement;
	$: if (dialog && open) dialog.showModal();
	$: if (dialog && !open) dialog.close();
	let files: any;
</script>

<p>DSA</p>

<p>Stored files:</p>
<div>
	{#if data.names != undefined}
		{#each data.names as name}
			<p>
				<a rel="external" href="/api/dsa/{name}">{name}</a>
				<button
					on:click={async () => {
						const options = {
							method: 'DELETE'
						};
						await fetch('/api/dsa/' + name, options);
						setTimeout(() => {
							location.reload();
						}, 500);
					}}>Delete</button
				>
			</p>
		{/each}
	{/if}
</div>
<br />
<br />
<br />
<form method="post" enctype="multipart/form-data">
	<input type="file" name="files" bind:files />
	<button>submit</button>
</form>

<dialog
	bind:this={dialog}
	on:close={() => (open = false)}
	on:click|self={() => {
		dialog.close();
		location.reload();
	}}
>
	Data uploaded
</dialog>
