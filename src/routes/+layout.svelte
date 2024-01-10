<script>
	import { onMount } from 'svelte';
	import '../app.css';
	import { fetchMinistries, fetchEvents, fetchLibrary } from '../lib/utils/data';
	import Navbar from '../lib/components/nav/Navbar.svelte';
	import { profile, authenticated } from '$lib/store/auth';
	import Auth from '$lib/components/auth/Auth.svelte';

	onMount(() => {
		fetchMinistries();
		fetchEvents();
		fetchLibrary();
	});
</script>

{#if !$authenticated}
	<Auth />
{:else}
	<div class="flex h-screen overflow-hidden">
		<Navbar />
		<div class="w-full h-full overflow-auto bg-slate-200">
			<slot />
		</div>
	</div>
{/if}
