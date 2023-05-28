<script lang="ts">
	import Logout from '$lib/components/elements/Logout.svelte';
	import { onDestroy } from 'svelte';
	//TODO: change method with which refresh is done differently
	const interval = setInterval(async () => {
		const options = { method: 'POST' };
		const result = await fetch('/api/auth/refresh', options);
		const json = await result.text();
	}, 30000);
	onDestroy(() => clearInterval(interval));
</script>

<svelte:head>
	<title>Sample App</title>
</svelte:head>

<nav>
	<a href="/">Home</a>
	<a href="/login">Login</a>
	<a href="/register">Register</a>
	<a href="/math">Math</a>
	<a href="/mba">MBA</a>
	<a href="/dsa">DSA</a>
</nav>
<Logout />

<slot />
