<script>
	import { goto } from '$app/navigation';
</script>

<button
	on:click={async () => {
		const options = {
			method: 'POST'
		};
		const result = await fetch('/api/auth/logout', options);

		alert('user loged out');
		goto('/login');
	}}>Logout</button
>
