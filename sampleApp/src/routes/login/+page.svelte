<script lang="ts">
    import type { ActionData } from './$types';

    export let form: ActionData;

	$: if (form?.success) {
		open = true
	}
	let open = false;
	let dialog: HTMLDialogElement;
	$: if (dialog && open) dialog.showModal();
	$: if (dialog && !open) dialog.close();
</script>

<form method="POST">
	<label
		>Username
		<input name="userName" type="text" />
	</label>
	<label
		>Password
		<input name="password" type="password" />
	</label>
	<button>Login</button>
</form>


<dialog bind:this={dialog} on:close={() => (open = false)} on:click|self={() => dialog.close()}>
	Logged in
</dialog>
