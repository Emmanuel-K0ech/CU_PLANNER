<script>
	// @ts-nocheck

	import { profile } from '$lib/store/auth';
	import { clearProfile } from '$lib/utils/profile';
</script>

<div class="p-4 flex flex-col gap-4">
	<h1 class="text-3xl">Profile</h1>

	<h3>{$profile.firstName} {$profile.lastName}</h3>
	<button class="logout w-fit py-1 px-4 bg-white text-red-950 rounded-md" on:click={clearProfile}>
		Logout
	</button>
</div>
