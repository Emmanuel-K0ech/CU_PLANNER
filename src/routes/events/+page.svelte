<script>
	import { eventReminders, events } from '$lib/store/data';
	import { fetchEvents } from '$lib/utils/data';
	import { BellIcon } from 'svelte-feather-icons';
	import dayjs from 'dayjs';
	import { isAdmin } from '$lib/utils/profile';
	import { profile } from '$lib/store/auth';

	const emptyform = {
		name: '',
		dateTime: '',
		venue: '',
		img_src: ''
	};

	let form = { ...emptyform };

	const uploadEvent = async () => {
		// @ts-ignore
		const data = await fetch('/api/events', {
			method: 'post',
			body: JSON.stringify(form)
		});
		fetchEvents();
		form = { ...emptyform };
	};

	const setReminder = (/** @type {string} */ id) => {
		// @ts-ignore
		eventReminders.set([...$eventReminders, id]);
	};
</script>

{#if isAdmin($profile.email)}
	<form class="grid gap-2 p-4">
		<input type="text" name="" id="" placeholder="Category" bind:value={form.name} />
		<input type="datetime-local" bind:value={form.dateTime} />
		<input placeholder="Venue" bind:value={form.venue} />
		<input placeholder="Image url" bind:value={form.img_src} />

		<button class="py-2 px-4 bg-green-500 rounded-md font-bold text-sm" on:click={uploadEvent}>
			Upload
		</button>
	</form>
{/if}

<div class="flex flex-wrap gap-4 p-4">
	{#each $events as { name, dateTime, venue, img_src, _id }}
		<div class="flex flex-col bg-yellow-400 w-fit gap-2 rounded-lg">
			<div
				class="flex gap-4 bg-white rounded-md rounded-b-2xl shadow-md h-60 w-fit aspect-square relative"
				style="background-image: url({img_src}); background-size : cover; background-position:  center"
			>
				<div
					class="h-full w-full flex flex-col justify-between bg-black/30 rounded-md rounded-b-2xl p-2 text-white"
				>
					<h3 class="text-2xl font-black">{name}</h3>
					<div class="flex flex-col gap-2">
						<span class="text-sm">{dayjs(dateTime).format('dddd, DD MMMM')}</span>
						<span class="text-sm">from {dayjs(dateTime).format('h:mm')}</span>
						<span class="text-sm">Venue : {venue}</span>
					</div>
				</div>

				<div
					class="rounded-full h-fit bg-gray-600 text-white p-2 m-2 absolute bottom-0 right-0 {$eventReminders.includes(
						_id
					)
						? 'bg-blue-600'
						: ''}"
				>
					<BellIcon size="16" strokeWidth={2} />
				</div>
			</div>
			{#if !$eventReminders.includes(_id)}
				<button on:click={() => setReminder(_id)}>Set reminder</button>
			{/if}
		</div>
	{/each}
</div>
