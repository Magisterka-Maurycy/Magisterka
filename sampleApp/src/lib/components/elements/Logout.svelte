<script lang="ts">
	import { goto } from '$app/navigation';
	let open = false;
	let dialog: HTMLDialogElement;
	$: if (dialog && open) dialog.showModal();
	$: if (dialog && !open) dialog.close();
</script>

<button
	on:click={async () => {
		const options = {
			method: 'POST'
		};
		const result = await fetch('/api/auth/logout', options);
		open = true;
		goto('/login');
	}}>Logout</button
>

<dialog bind:this={dialog} on:close={() => (open = false)} on:click|self={() => dialog.close()}>
	user loged out
</dialog>