<script>
	import { profile } from '$lib/store/auth';
	import { fetchMinistries } from '$lib/utils/data';
	import { isAdmin } from '$lib/utils/profile';
	import MinistryCards from './MinistryCards.svelte';

	const emptyform = {
		name: '',
		img_src: '',
		description: '',
		whatsapp: ''
	};

	let form = { ...emptyform };

	const uploadMinistry = async () => {
		const data = await fetch('/api/ministries', {
			method: 'post',
			body: JSON.stringify(form)
		});
		fetchMinistries();
		form = { ...emptyform };
	};
</script>

{#if isAdmin($profile.email)}
	<form>
		<div class="p-3 grid gap-2">
			<input type="text" name="" id="" placeholder="Ministry name" bind:value={form.name} />
			<textarea name="" id="" placeholder="Description" bind:value={form.description} />
			<input
				type="text"
				name=""
				id=""
				placeholder="Whatsapp Groups URL"
				bind:value={form.whatsapp}
			/>
			<input type="text" name="" id="" placeholder="Image url" bind:value={form.img_src} />
			<button class="py-2 px-4 bg-green-500 rounded-md font-bold text-sm" on:click={uploadMinistry}>
				Upload
			</button>
		</div>
	</form>
{/if}

<MinistryCards />
