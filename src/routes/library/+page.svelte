<script>
	import { profile } from '$lib/store/auth';
	import { library } from '$lib/store/data';
	import { fetchLibrary } from '$lib/utils/data';
	import { isAdmin } from '$lib/utils/profile';
	import { DownloadIcon } from 'svelte-feather-icons';

	const emptyform = {
		category: '',
		dateTime: '',
		topic: '',
		download_url: '',
		img_src: ''
	};

	let form = { ...emptyform };

	const uploadMinistry = async () => {
		const data = await fetch('/api/library', {
			method: 'post',
			body: JSON.stringify(form)
		});
		fetchLibrary();
		form = { ...emptyform };
	};
</script>

{#if isAdmin($profile.email)}
	<form class="grid gap-2 p-4">
		<input type="text" name="" id="" placeholder="Category" bind:value={form.category} />
		<input type="datetime-local" bind:value={form.dateTime} />
		<input placeholder="Topic" bind:value={form.topic} />
		<input placeholder="Document url" bind:value={form.download_url} />
		<input placeholder="Image url" bind:value={form.img_src} />

		<button class="py-2 px-4 bg-green-500 rounded-md font-bold text-sm" on:click={uploadMinistry}>
			Upload
		</button>
	</form>
{/if}

<div class="flex flex-col gap-4 p-4">
	{#each $library as { topic, dateTime, category, download_url, img_src }}
		<div class="flex gap-4 bg-white p-2 rounded-3xl shadow-md">
			<img src={img_src} alt="" class="h-40 aspect-square object-cover rounded-3xl" />
			<div class="flex flex-col gap-2 h-40 justify-between items-end w-full">
				<div class="grid gap-1 w-full">
					<span class="font-bold">{category}</span>
					<span class="text-sm text-gray-500">Starts at {dateTime}</span>
					<span class="underline">Topic {topic}</span>
				</div>
				<button
					class="bg-green-300 w-fit p-2 rounded-md rounded-br-2xl text-sm text-green-900 font-bold flex gap-3"
				>
					Materal
					<DownloadIcon size="16" />
				</button>
			</div>
		</div>
	{/each}
</div>
